import axios from "axios";
// import * as types from "./constants";
import {
  FETCH_ALL_MOVIES_PENDING,
  FETCH_ALL_MOVIES_SUCCESS,
  FETCH_ALL_MOVIES_FAILED,
  ADD_NEW_MOVIE_SUCCESS,
  ADD_NEW_MOVIE_PENDING,
  ADD_NEW_MOVIE_FAILED,
  UPDATE_MOVIE_PENDING,
  UPDATE_MOVIE_FAILED,
  UPDATE_MOVIE_SUCCESS,
  DELETE_MOVIE_FAILED,
  DELETE_MOVIE_PENDING,
  DELETE_MOVIE_SUCCESS
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
// Add new Movie
export const addNewMovie = newMovie => async dispatch => {
  dispatch({
    type: ADD_NEW_MOVIE_PENDING
  });

  try {
    let response = await axios.post(`http://localhost:8000/movies`, newMovie);
    dispatch({
      type: ADD_NEW_MOVIE_SUCCESS,
      payload: response.data
    });
  } catch (err) {
    dispatch({
      type: ADD_NEW_MOVIE_FAILED,
      payload: err
    });
  }
};

// Delete a movie
export const deleteMovie = id => async dispatch => {
  dispatch({
    type: DELETE_MOVIE_PENDING
  });
  try {
    let response = await axios.delete(`http://localhost:8000/movies/${id}`);
    dispatch({
      type: DELETE_MOVIE_SUCCESS,
      payload: response.data
    });
  } catch (err) {
    dispatch({
      type: DELETE_MOVIE_FAILED,
      payload: err
    });
  }
};

// Update Movie
export const updateMovie = (updateMovie, id) => async dispatch => {
  dispatch({
    type: UPDATE_MOVIE_PENDING
  });

  try {
    let response = await axios.patch(
      `http://localhost:8000/movies/${id}`,
      updateMovie
    );
    dispatch({
      type: UPDATE_MOVIE_SUCCESS,
      payload: response.data
    });
  } catch (err) {
    dispatch({
      type: UPDATE_MOVIE_FAILED,
      payload: err
    });
  }
};
