import React, { Component } from 'react';
import { toast } from 'react-toastify';
import Product from '../../components/Product/Product';
import Loader from '../../components/Loader/Loader';
import { formatFilters } from '../../helpers/formatFilters';
import {
  PRODUCT_ADDED_TO_CHECKOUT_SUCCESS,
  FETCH_DEPARTMENT_DATA_ERROR,
  FETCH_PRODUCT_DATA_ERROR,
  MULTIPLE_ERRORS,
} from '../../constants/constants';
import * as productApi from '../../services/productApi';
import * as checkoutApi from '../../services/checkoutApi';
import * as departmentApi from '../../services/departmentApi';
import './ProductList.css';

class ProductList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [],
      loading: true,
      error: false,
      errMsg: '',
      filtersByBrand: [],
      filtersByDepartment: [],
      activeFilter: [],
    };
  }

  async componentDidMount() {
    const products = await productApi.getAllProducts();
    const filtersByDepartment = await departmentApi.getAllDepartments();

    if (
      products !== FETCH_PRODUCT_DATA_ERROR &&
      filtersByDepartment !== FETCH_DEPARTMENT_DATA_ERROR
    ) {
      const filtersByBrand = formatFilters(products, 'brand').sort((a, b) => {
        const nameA = a.name.toUpperCase();
        const nameB = b.name.toUpperCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });

      this.setState({
        products,
        loading: false,
        error: false,
        filtersByBrand,
        filtersByDepartment,
      });
    } else {
      if (products === FETCH_PRODUCT_DATA_ERROR) {
        this.setState({
          loading: false,
          error: true,
          errMsg: products,
        });
      }
      if (filtersByDepartment === FETCH_DEPARTMENT_DATA_ERROR) {
        this.setState({
          loading: false,
          error: true,
          errMsg: filtersByDepartment,
        });
      }
      if (
        products === FETCH_PRODUCT_DATA_ERROR &&
        filtersByDepartment === FETCH_DEPARTMENT_DATA_ERROR
      ) {
        this.setState({
          loading: false,
          error: true,
          errMsg: MULTIPLE_ERRORS,
        });
      }
    }
  }

  addItemToCheckout = async (product) => {
    const productAdded = await checkoutApi.addItemToCheckout(product);
    if (productAdded === PRODUCT_ADDED_TO_CHECKOUT_SUCCESS) {
      this.setState({
        loading: false,
        error: false,
      });
      this.props.updateCheckoutCount();
      toast.success(PRODUCT_ADDED_TO_CHECKOUT_SUCCESS);
    } else {
      this.setState({
        error: false,
        loading: false,
      });
      toast.error(productAdded);
    }
  };

  onFilterChange(filter) {
    if (this.state.activeFilter.includes(filter)) {
      const filterIndex = this.state.activeFilter.indexOf(filter);
      const newFilter = [...this.state.activeFilter];
      newFilter.splice(filterIndex, 1);
      this.setState({ activeFilter: newFilter });
    } else {
      this.setState({ activeFilter: [...this.state.activeFilter, filter] });
    }
  }

  render() {
    let filteredList;
    const { loading, error, errMsg } = this.state;

    if (
      this.state.activeFilter.length === 0 ||
      this.state.activeFilter.length ===
        this.state.filtersByBrand.length + this.state.filtersByDepartment.length
    ) {
      filteredList = this.state.products;
    } else {
      filteredList = this.state.products.filter((item) => {
        return (
          this.state.activeFilter.includes(item.brand) ||
          this.state.activeFilter.includes(item.departmentId)
        );
      });
    }

    return (
      <div className="product-list-container">
        <section className="filter-wrapper">
          <p className="filter-title">Filter by Department</p>
          <div className="filter-data">
            {error ? <p>Cannot load department filters.</p> : null}
            {!error && this.state.filtersByDepartment.length
              ? this.state.filtersByDepartment.map((filter) => (
                  <span key={filter.id} className="filter-item">
                    <label htmlFor={filter.id}>{filter.name}</label>
                    <input
                      className="filter-checkbox"
                      id={filter.id}
                      type="checkbox"
                      checked={this.state.activeFilter.includes(filter.id)}
                      onChange={() => this.onFilterChange(filter.id)}
                    />
                  </span>
                ))
              : null}
          </div>
          <p className="filter-title">Filter by Brand</p>
          <div className="filter-data">
            {error ? <p>Cannot load product brand filters.</p> : null}
            {!error && this.state.filtersByBrand.length
              ? this.state.filtersByBrand.map((filter, index) => (
                  <span key={index} className="filter-item">
                    <label htmlFor={index}>{filter.name}</label>
                    <input
                      className="filter-checkbox"
                      id={index}
                      type="checkbox"
                      checked={this.state.activeFilter.includes(filter.value)}
                      onChange={() => this.onFilterChange(filter.value)}
                    />
                  </span>
                ))
              : null}
          </div>
        </section>
        <h1 className="product-list-header">My Products</h1>
        <section className="products-container">
          {error ? (
            <p className="product-list-message">
              {errMsg} Please refresh the page or try again later.
            </p>
          ) : null}
          {loading ? <Loader message="Loading product list..." /> : null}
          <div className="product-list-product-wrapper">
            {!loading && !error && filteredList.length
              ? filteredList.map((product) => (
                  <Product
                    key={product.id}
                    product={product}
                    addItemToCheckout={this.addItemToCheckout}
                  />
                ))
              : null}
            {!loading && !error && !filteredList.length ? (
              <p className="product-list-message">
                There are no products that match your filters. Please clear some
                filters to see more producs.
              </p>
            ) : null}
          </div>
        </section>
      </div>
    );
  }
}

export default ProductList;
