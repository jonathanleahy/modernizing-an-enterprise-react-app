import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import CheckoutItem from '../../components/CheckoutItem/CheckoutItem';
import Loader from '../../components/Loader/Loader';
import {
  FETCH_CHECKOUT_PRODUCTS_ERROR,
  REMOVE_PRODUCT_FROM_CHECKOUT_ERROR,
  PRODUCT_REMOVED_FROM_CHECKOUT_SUCCESS,
} from '../../constants/constants';
import * as checkoutApi from '../../services/checkoutApi';
import './Checkout.css';

class Checkout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      checkoutItems: [],
      loading: true,
      error: false,
    };
  }

  async componentDidMount() {
    const checkoutItems = await checkoutApi.getAllCheckoutItems();
    if (checkoutItems !== FETCH_CHECKOUT_PRODUCTS_ERROR) {
      this.setState({ checkoutItems, loading: false, error: false });
    } else {
      this.setState({ loading: false, error: true });
    }
  }

  removeItemFromCheckout = async (id) => {
    const remainingCheckoutItems = await checkoutApi.removeProductFromCheckout(
      id,
    );
    if (remainingCheckoutItems !== REMOVE_PRODUCT_FROM_CHECKOUT_ERROR) {
      this.setState({
        checkoutItems: remainingCheckoutItems,
        loading: false,
        error: false,
      });
      this.props.updateCheckoutCount();
      toast.success(PRODUCT_REMOVED_FROM_CHECKOUT_SUCCESS);
    } else {
      toast.error(remainingCheckoutItems);
      this.setState({ loading: false, error: true });
    }
  };

  render() {
    const { checkoutItems, loading, error } = this.state;
    const { removeItemFromCheckout } = this;

    return (
      <div>
        <h1 className="checkout-title">Checkout Page</h1>
        <div>
          {loading ? <Loader message="Fetching items to checkout..." /> : null}
          {error ? (
            <p className="checkout-message">
              {FETCH_CHECKOUT_PRODUCTS_ERROR} Please refresh the page or try
              again later.
            </p>
          ) : null}
          {!loading & !error && checkoutItems.length ? (
            <div>
              <div className="checkout-header">
                <div>Product Information</div>
                <div>Suggested Retail Price</div>
                <div>Update Checkout</div>
              </div>
              <ul className="checkout-list-wrapper">
                {checkoutItems.map((item) => (
                  <CheckoutItem
                    key={item.id}
                    item={item}
                    removeItemFromCheckout={removeItemFromCheckout}
                  />
                ))}
              </ul>
            </div>
          ) : null}
          {!loading && !error && !checkoutItems.length ? (
            <p className="checkout-message">
              The checkout is currently empty. Add some items from the&nbsp;
              <NavLink className="page-link" to="/my-products">
                My Products
              </NavLink>
              &nbsp;page.
            </p>
          ) : null}
        </div>
      </div>
    );
  }
}

export default Checkout;
