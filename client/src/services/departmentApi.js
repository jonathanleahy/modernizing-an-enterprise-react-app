import axios from 'axios';
import { FETCH_DEPARTMENT_DATA_ERROR } from '../constants/constants';

export const getAllDepartments = async () => {
  try {
    const { data } = await axios.get('/departments');
    return data;
  } catch (err) {
    console.error(err);
    const errMsg = FETCH_DEPARTMENT_DATA_ERROR;
    return errMsg;
  }
};
