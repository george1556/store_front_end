import axios from "axios";
// import * as types from "./constants";
import {
  FETCH_ALL_TRANSACTIONS_PENDING,
  FETCH_ALL_TRANSACTIONS_SUCCESS,
  FETCH_ALL_TRANSACTIONS_FAILED,
  ADD_NEW_TRANSACTION_SUCCESS,
  ADD_NEW_TRANSACTION_PENDING,
  ADD_NEW_TRANSACTION_FAILED,
  UPDATE_TRANSACTION_PENDING,
  UPDATE_TRANSACTION_FAILED,
  UPDATE_TRANSACTION_SUCCESS,
  DELETE_TRANSACTION_FAILED,
  DELETE_TRANSACTION_PENDING,
  DELETE_TRANSACTION_SUCCESS
} from "./constants";

export const fetchAllTransactions = () => async dispatch => {
  dispatch({
    type: FETCH_ALL_TRANSACTIONS_PENDING
  });
  try {
    let response = await axios.get(`http://localhost:8000/transactions`);
    dispatch({
      type: FETCH_ALL_TRANSACTIONS_SUCCESS,
      payload: response.data
    });
  } catch (err) {
    dispatch({
      type: FETCH_ALL_TRANSACTIONS_FAILED,
      payload: err
    });
  }
};
// Add new TRANSACTION
export const addNewTransaction = newTRANSACTION => async dispatch => {
  dispatch({
    type: ADD_NEW_TRANSACTION_PENDING
  });

  try {
    let response = await axios.post(
      `http://localhost:8000/transactions`,
      newTRANSACTION
    );
    dispatch({
      type: ADD_NEW_TRANSACTION_SUCCESS,
      payload: response.data
    });
  } catch (err) {
    dispatch({
      type: ADD_NEW_TRANSACTION_FAILED,
      payload: err
    });
  }
};

// Delete a TRANSACTION
export const deleteTransaction = id => async dispatch => {
  dispatch({
    type: DELETE_TRANSACTION_PENDING
  });
  try {
    let response = await axios.delete(
      `http://localhost:8000/transactions/${id}`
    );
    dispatch({
      type: DELETE_TRANSACTION_SUCCESS,
      payload: response.data
    });
  } catch (err) {
    dispatch({
      type: DELETE_TRANSACTION_FAILED,
      payload: err
    });
  }
};

// Update TRANSACTION
export const updateTransaction = (updateTRANSACTION, id) => async dispatch => {
  dispatch({
    type: UPDATE_TRANSACTION_PENDING
  });

  try {
    let response = await axios.patch(
      `http://localhost:8000/transactions/${id}`,
      updateTRANSACTION
    );
    dispatch({
      type: UPDATE_TRANSACTION_SUCCESS,
      payload: response.data
    });
  } catch (err) {
    dispatch({
      type: UPDATE_TRANSACTION_FAILED,
      payload: err
    });
  }
};
