import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_CLEAR_ERRORS,
  LOGOUT_SUCCESS,
} from '../constants/action-types'

export const initialState = {
  isStarted: false,
  isFetching: false,
  errors: [],
  isOauth: undefined,
  isAuthenticated: false,
  item: {},
}

export function session(state = initialState, action) {
  let item, errors
  switch (action.type) {
  case LOGIN_REQUEST:
    console.log('LOGIN_REQUEST');
    return {
      ...state,
      isStarted: true,
      isFetching: true,
      isOauth: action.isOauth,
    };
  case LOGIN_SUCCESS:
    console.log('LOGIN_SUCCESS');
    item = action.payload.data
    return {
      ...state,
      errors: [],
      isFetching: false,
      isAuthenticated: true,
      item: item,
    };
  case LOGIN_FAILURE:
    console.log('LOGIN_FAILURE');
    errors = action.error.response.data.errors
    return {
      ...initialState,
      errors: [errors],
    };
  case LOGIN_CLEAR_ERRORS:
    console.log('LOGIN_CLEAR_ERRORS');
    return {
      ...state,
      errors: [],
    };
  case LOGOUT_SUCCESS:
    console.log('LOGOUT_SUCCESS');
    return {
      ...initialState
    };
  default:
    return state;
  }
}
