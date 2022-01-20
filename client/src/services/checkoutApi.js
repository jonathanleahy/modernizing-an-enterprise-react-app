import axios from 'axios';
import {
  FETCH_CHECKOUT_COUNT_ERROR,
  FETCH_CHECKOUT_PRODUCTS_ERROR,
  REMOVE_PRODUCT_FROM_CHECKOUT_ERROR,
  ADD_PRODUCT_TO_CHECKOUT_ERROR,
  PRODUCT_ALREADY_IN_CHECKOUT_ERROR,
  PRODUCT_ADDED_TO_CHECKOUT_SUCCESS,
  PRODUCT_ADDED_TO_CHECKOUT_ERROR,
} from '../constants/constants';

export const getAllCheckoutItems = async () => {
  try {
    const { data } = await axios.get('/checkout');
    return data;
  } catch (err) {
    console.error(err);
    const errMsg = FETCH_CHECKOUT_PRODUCTS_ERROR;
    return errMsg;
  }
};

export const getCheckoutCount = async () => {
  try {
    const { data } = await axios.get('/checkout');
    return data.length;
  } catch (err) {
    console.error(err);
    const errMsg = FETCH_CHECKOUT_COUNT_ERROR;
    return errMsg;
  }
};

export const addItemToCheckout = async (item) => {
  try {
    // fetch existing items in cart
    const existingCheckoutItems = await getAllCheckoutItems();
    // check if item to add to cart already exists in cart
    const found = existingCheckoutItems.find((it) => it.productId === item.id);
    // if it does, tell the user it's already in checkout
    if (found) {
      const errMsg = PRODUCT_ALREADY_IN_CHECKOUT_ERROR;
      return errMsg;
      // if it doesn't update the cart with a new product
    } else {
      const { id, ...newCartItem } = item;
      try {
        await axios.post(`/checkout/`, {
          ...newCartItem,
          productId: id,
          quantity: 1,
        });
        return PRODUCT_ADDED_TO_CHECKOUT_SUCCESS;
      } catch (err) {
        console.error(err);
        const errMsg = PRODUCT_ADDED_TO_CHECKOUT_ERROR;
        return errMsg;
      }
    }
  } catch (err) {
    console.error(err);
    const errMsg = ADD_PRODUCT_TO_CHECKOUT_ERROR;
    return errMsg;
  }
};

export const removeProductFromCheckout = async (id) => {
  try {
    const existingCheckoutItems = await getAllCheckoutItems();
    await axios.delete(`/checkout/${id}`);
    const remainingCheckoutItems = existingCheckoutItems.filter(
      (item) => item.id !== id,
    );
    return remainingCheckoutItems;
  } catch (err) {
    console.error(err);
    const errMsg = REMOVE_PRODUCT_FROM_CHECKOUT_ERROR;
    return errMsg;
  }
};
