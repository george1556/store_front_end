import axios from "axios";
// import * as types from "./constants";
import {
  FETCH_ALL_CUSTOMERS_PENDING,
  FETCH_ALL_CUSTOMERS_SUCCESS,
  FETCH_ALL_CUSTOMERS_FAILED,
  ADD_NEW_CUSTOMER_SUCCESS,
  ADD_NEW_CUSTOMER_PENDING,
  ADD_NEW_CUSTOMER_FAILED,
  UPDATE_CUSTOMER_PENDING,
  UPDATE_CUSTOMER_FAILED,
  UPDATE_CUSTOMER_SUCCESS,
  DELETE_CUSTOMER_FAILED,
  DELETE_CUSTOMER_PENDING,
  DELETE_CUSTOMER_SUCCESS
} from "./constants";

export const fetchAllCustomers = () => async dispatch => {
  dispatch({
    type: FETCH_ALL_CUSTOMERS_PENDING
  });
  try {
    let response = await axios.get(`http://localhost:8000/customers`);
    dispatch({
      type: FETCH_ALL_CUSTOMERS_SUCCESS,
      payload: response.data
    });
  } catch (err) {
    dispatch({
      type: FETCH_ALL_CUSTOMERS_FAILED,
      payload: err
    });
  }
};
// Add new CUSTOMER
export const addNewCustomer = newCustomer => async dispatch => {
  dispatch({
    type: ADD_NEW_CUSTOMER_PENDING
  });

  try {
    let response = await axios.post(
      `http://localhost:8000/customers`,
      newCustomer
    );
    dispatch({
      type: ADD_NEW_CUSTOMER_SUCCESS,
      payload: response.data
    });
  } catch (err) {
    dispatch({
      type: ADD_NEW_CUSTOMER_FAILED,
      payload: err
    });
  }
};

// Delete a CUSTOMER
export const deleteCustomer = id => async dispatch => {
  dispatch({
    type: DELETE_CUSTOMER_PENDING
  });
  try {
    let response = await axios.delete(`http://localhost:8000/customers/${id}`);
    dispatch({
      type: DELETE_CUSTOMER_SUCCESS,
      payload: response.data
    });
  } catch (err) {
    dispatch({
      type: DELETE_CUSTOMER_FAILED,
      payload: err
    });
  }
};

// Update CUSTOMER
export const updateCustomer = (updateCustomer, id) => async dispatch => {
  dispatch({
    type: UPDATE_CUSTOMER_PENDING
  });

  try {
    let response = await axios.patch(
      `http://localhost:8000/customers/${id}`,
      updateCustomer
    );
    dispatch({
      type: UPDATE_CUSTOMER_SUCCESS,
      payload: response.data
    });
  } catch (err) {
    dispatch({
      type: UPDATE_CUSTOMER_FAILED,
      payload: err
    });
  }
};
