import axios from "axios";
// import * as types from "./constants";
import {
  FETCH_ALL_MOVIES_PENDING,
  FETCH_ALL_MOVIES_SUCCESS,
  FETCH_ALL_MOVIES_FAILED
} from "./constants";

export const fetchAllMovies = () => async dispatch => {
  dispatch({
    type: FETCH_ALL_MOVIES_PENDING
  });
  try {
    let response = await axios.get(`http://localhost:8000/movies`);
    dispatch({
      type: FETCH_ALL_MOVIES_SUCCESS,
      payload: response.data
    });
  } catch (err) {
    dispatch({
      type: FETCH_ALL_MOVIES_FAILED,
      payload: err
    });
  }
};

// // Add new TEE_TIME
// export const addNewTeeTime = newTeeTime => async dispatch => {
//   dispatch({
//     type: types.ADD_NEW_TEE_TIME_PENDING
//   });

//   try {
//     let response = await axios.post(
//       `http://localhost:8000/teetimes`,
//       newTeeTime
//     );
//     dispatch({
//       type: ADD_NEW_TEE_TIME_SUCCESS,
//       payload: response.data
//     });
//   } catch (err) {
//     dispatch({
//       type: ADD_NEW_TEE_TIME_FAILED,
//       payload: err
//     });
//   }
// };

// // Delete a vehicle
// export const deleteTeeTime = id => async dispatch => {
//   dispatch({
//     type: types.REMOVE_TEE_TIME_PENDING
//   });
//   try {
//     let response = await axios.delete(`http://localhost:8000/teetimes/${id}`);
//     dispatch({
//       type: types.REMOVE_TEE_TIME_SUCCESS,
//       payload: response.data
//     });
//   } catch (err) {
//     dispatch({
//       type: types.REMOVE_TEE_TIME_FAILED,
//       payload: err
//     });
//   }
// };

// // Update Tee Time
// export const updateTeeTime = (updateTeeTime, id) => async dispatch => {
//   dispatch({
//     type: types.UPDATE_TEE_TIME_PENDING
//   });

//   try {
//     let response = await axios.patch(
//       `http://localhost:8000/teetimes/${id}`,
//       updateTeeTime
//     );
//     dispatch({
//       type: UPDATE_TEE_TIME_SUCCESS,
//       payload: response.data
//     });
//   } catch (err) {
//     dispatch({
//       type: UPDATE_TEE_TIME_FAILED,
//       payload: err
//     });
//   }
// };
