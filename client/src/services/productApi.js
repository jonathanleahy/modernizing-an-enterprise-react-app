import axios from 'axios';
import {
  FETCH_PRODUCT_DATA_ERROR,
  ADD_NEW_PRODUCT_ERROR,
  ADD_NEW_PRODUCT_SUCCESS,
} from '../constants/constants';

export const getAllProducts = async () => {
  try {
    const { data } = await axios.get('/products');
    return data;
  } catch (err) {
    console.error(err);
    const errMsg = FETCH_PRODUCT_DATA_ERROR;
    return errMsg;
  }
};

export const addNewProduct = async (productToAdd) => {
  try {
    await axios.post(`/products/`, productToAdd);
    return ADD_NEW_PRODUCT_SUCCESS;
  } catch (err) {
    console.error(err);
    const errMsg = ADD_NEW_PRODUCT_ERROR;
    return errMsg;
  }
};
