import {
  FETCH_ALL_MOVIES_PENDING,
  FETCH_ALL_MOVIES_SUCCESS,
  FETCH_ALL_MOVIES_FAILED,
  ADD_NEW_MOVIE_PENDING,
  ADD_NEW_MOVIE_SUCCESS,
  ADD_NEW_MOVIE_FAILED,
  REMOVE_MOVIE_PENDING,
  REMOVE_MOVIE_SUCCESS,
  REMOVE_MOVIE_FAILED,
  UPDATE_MOVIE_PENDING,
  UPDATE_MOVIE_FAILED,
  UPDATE_MOVIE_SUCCESS
} from "./constants";

const initialState = {
  all: [],
  err: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ALL_MOVIES_PENDING:
    case ADD_NEW_MOVIE_PENDING:
    case REMOVE_MOVIE_PENDING:
    case UPDATE_MOVIE_PENDING:
      return state;
    case FETCH_ALL_MOVIES_SUCCESS:
      // case UPDATE_MOVIE_SUCCESS:
      return {
        ...state,
        all: action.payload
      };

    case ADD_NEW_MOVIE_SUCCESS:
      return {
        ...state,
        all: [...state.all, action.payload]
      };

    case UPDATE_MOVIE_SUCCESS:
      return {
        ...state,
        all: [
          ...state.all.filter(MOVIE => MOVIE.id !== action.payload.id),
          action.payload
        ]
      };

    case REMOVE_MOVIE_SUCCESS:
      return {
        ...state,
        all: state.all.filter(MOVIE => MOVIE.id !== action.payload.id)
      };

    case FETCH_ALL_MOVIES_FAILED:
    case ADD_NEW_MOVIE_FAILED:
    case REMOVE_MOVIE_FAILED:
    case UPDATE_MOVIE_FAILED:
      return {
        ...state,
        err: action.payload
      };
    default:
      return state;
  }
};
