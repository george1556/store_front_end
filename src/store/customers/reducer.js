import {
  FETCH_ALL_CUSTOMERS_PENDING,
  FETCH_ALL_CUSTOMERS_SUCCESS,
  FETCH_ALL_CUSTOMERS_FAILED,
  ADD_NEW_CUSTOMER_PENDING,
  ADD_NEW_CUSTOMER_SUCCESS,
  ADD_NEW_CUSTOMER_FAILED,
  DELETE_CUSTOMER_PENDING,
  DELETE_CUSTOMER_SUCCESS,
  DELETE_CUSTOMER_FAILED,
  UPDATE_CUSTOMER_PENDING,
  UPDATE_CUSTOMER_FAILED,
  UPDATE_CUSTOMER_SUCCESS
} from "./constants";

//Using a default logged in user ID: 1, until authentication and login properly owrks.
const initialState = {
  all: [],
  err: {},
  loggedInUser: 1
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ALL_CUSTOMERS_PENDING:
    case ADD_NEW_CUSTOMER_PENDING:
    case DELETE_CUSTOMER_PENDING:
    case UPDATE_CUSTOMER_PENDING:
      return state;
    case FETCH_ALL_CUSTOMERS_SUCCESS:
      // case UPDATE_CUSTOMER_SUCCESS:
      return {
        ...state,
        all: action.payload
      };

    case ADD_NEW_CUSTOMER_SUCCESS:
      return {
        ...state,
        all: [...state.all, action.payload]
      };

    case UPDATE_CUSTOMER_SUCCESS:
      return {
        ...state,
        all: [
          ...state.all.filter(CUSTOMER => CUSTOMER.id !== action.payload.id),
          action.payload
        ]
      };

    case DELETE_CUSTOMER_SUCCESS:
      return {
        ...state,
        all: state.all.filter(CUSTOMER => CUSTOMER.id !== action.payload.id)
      };

    case FETCH_ALL_CUSTOMERS_FAILED:
    case ADD_NEW_CUSTOMER_FAILED:
    case DELETE_CUSTOMER_FAILED:
    case UPDATE_CUSTOMER_FAILED:
      return {
        ...state,
        err: action.payload
      };
    default:
      return state;
  }
};
