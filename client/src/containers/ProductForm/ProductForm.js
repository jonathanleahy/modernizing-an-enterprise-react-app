import React, { Component } from 'react';
import { toast } from 'react-toastify';
import Loader from '../../components/Loader/Loader';
import {
  ADD_NEW_PRODUCT_ERROR,
  ADD_NEW_PRODUCT_SUCCESS,
  FETCH_DEPARTMENT_DATA_ERROR,
} from '../../constants/constants';
import * as departmentApi from '../../services/departmentApi';
import * as productApi from '../../services/productApi';
import './ProductForm.css';

const defaultsForNewProduct = {
  departmentId: null,
  name: '',
  brand: '',
  description: '',
  retailPrice: 0,
};
class ProductForm extends Component {
  constructor() {
    super();

    this.state = {
      newProduct: { ...defaultsForNewProduct },
      loading: true,
      error: false,
      saved: false,
      departments: [],
    };
  }

  async componentDidMount() {
    const departments = await departmentApi.getAllDepartments();
    if (departments !== FETCH_DEPARTMENT_DATA_ERROR) {
      this.setState({
        departments,
        loading: false,
        error: false,
      });
    } else {
      this.setState({
        loading: false,
        error: true,
      });
      toast.error(`${departments} Please try adding this product later.`);
    }
  }

  onChange = (propName, val) => {
    const updatedProduct = { ...this.state.newProduct };
    updatedProduct[propName] = val;
    this.setState({ newProduct: updatedProduct });
  };

  isValid = () => {
    if (!this.state.newProduct.departmentId) {
      return false;
    }
    if (!this.state.newProduct.name) {
      return false;
    }
    if (!this.state.newProduct.brand) {
      return false;
    }
    if (!this.state.newProduct.retailPrice) {
      return false;
    }
    return true;
  };

  onSubmit = async () => {
    const addProduct = await productApi.addNewProduct(this.state.newProduct);
    if (addProduct !== ADD_NEW_PRODUCT_ERROR) {
      this.setState({
        newProduct: { ...defaultsForNewProduct },
        saved: true,
        loading: false,
      });
      toast.success(ADD_NEW_PRODUCT_SUCCESS);
    } else {
      this.setState({
        loading: false,
        error: true,
      });
      toast.error(`${addProduct} Please refresh the page and try again.`);
    }
  };

  render() {
    const { onSubmit, onChange, isValid } = this;
    const { newProduct, departments, loading, error } = this.state;

    return (
      <div>
        <h1 className="product-form-header">Add A New Product</h1>
        {loading ? <Loader message="Loading new product form data..." /> : null}
        {!loading ? (
          <form className="product-form">
            <ul className="product-form-list">
              <li className="product-form-list-item">
                <label htmlFor="department">Department</label>
                <select
                  className="product-form-dropdown"
                  id="department"
                  value={newProduct.departmentId || ''}
                  onChange={(e) =>
                    onChange('departmentId', Number(e.target.value) || null)
                  }
                >
                  <option key={-1} value="">
                    Please select a department...
                  </option>
                  {departments.length > 0
                    ? departments.map((dept) => (
                        <option key={dept.id} value={dept.id}>
                          {dept.name}
                        </option>
                      ))
                    : null}
                </select>
              </li>
              <li className="product-form-list-item">
                <label htmlFor="name">Product Name</label>
                <input
                  className="product-form-input"
                  id="name"
                  type="text"
                  placeholder="Name"
                  value={newProduct.name}
                  onChange={(e) => onChange('name', e.target.value)}
                />
              </li>
              <li className="product-form-list-item">
                <label htmlFor="brand">Brand</label>
                <input
                  className="product-form-input"
                  id="brand"
                  type="text"
                  placeholder="Brand"
                  value={newProduct.brand}
                  onChange={(e) => onChange('brand', e.target.value)}
                />
              </li>
              <li className="product-form-list-item">
                <label htmlFor="description">Description</label>
                <textarea
                  className="product-form-input"
                  id="description"
                  type="text"
                  placeholder="Description"
                  value={newProduct.description}
                  onChange={(e) => onChange('description', e.target.value)}
                />
              </li>
              <li className="product-form-list-item">
                <label htmlFor="price">Retail Price</label>
                <input
                  className="product-form-input"
                  id="price"
                  type="text"
                  placeholder="Retail Price"
                  value={newProduct.retailPrice}
                  onChange={(e) =>
                    onChange('retailPrice', Number(e.target.value))
                  }
                />
              </li>
              <li className="product-form-list-item">
                <button
                  data-testid="submit"
                  type="button"
                  className="primary"
                  onClick={onSubmit}
                  disabled={!isValid()}
                >
                  Submit
                </button>
              </li>
            </ul>
          </form>
        ) : null}
      </div>
    );
  }
}

export default ProductForm;
