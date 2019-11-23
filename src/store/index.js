import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import moviesReducer from "./movies/reducer";
// import customersReducer from "./customers/reducer";
// import customerTeeTimesReducer from "./customersteetimes/reducer";

const rootReducer = combineReducers({
  movies: moviesReducer
  //   customers: customersReducer,
  //   customersTeeTimes: customerTeeTimesReducer
});

const middleware = [thunk, logger];

export default createStore(rootReducer, applyMiddleware(...middleware));
