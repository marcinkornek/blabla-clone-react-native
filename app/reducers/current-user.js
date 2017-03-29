import {
  CURRENT_USER_FETCH_REQUEST,
  CURRENT_USER_FETCH_SUCCESS,
  CURRENT_USER_FETCH_FAILURE,
  CURRENT_USER_UPDATE_REQUEST,
  CURRENT_USER_UPDATE_SUCCESS,
  CURRENT_USER_UPDATE_FAILURE,
  LOGOUT_SUCCESS
} from '../constants/action-types'

export const initialState = {
  isStarted: false,
  isFetching: false,
  isSaving: false,
  errors: [],
  item: undefined,
}

function getDateOfBirth(item) {
  if (item.date_of_birth) {
    return item.date_of_birth
  } else {
    return null
  }
}

export function currentUser(state = initialState, action) {
  let item, errors
  switch (action.type) {
  case LOGOUT_SUCCESS:
    return {
      ...initialState
    };
  case CURRENT_USER_FETCH_REQUEST:
    console.log('CURRENT_USER_FETCH_REQUEST');
    return {
      ...state,
      errors: [],
      isStarted: true,
      isFetching: true,
    };
  case CURRENT_USER_FETCH_SUCCESS:
    item = action.payload.data
    console.log('CURRENT_USER_FETCH_SUCCESS');
    return {
      ...state,
      isFetching: false,
      item: {
        ...item,
        date_of_birth: getDateOfBirth(item)
      }
    };
  case CURRENT_USER_FETCH_FAILURE:
    console.log('CURRENT_USER_FETCH_FAILURE');
    console.log(action);
  case CURRENT_USER_UPDATE_REQUEST:
    console.log('CURRENT_USER_UPDATE_REQUEST');
    return {
      ...state,
      isSaving: true
    };
  case CURRENT_USER_UPDATE_SUCCESS:
    console.log('CURRENT_USER_UPDATE_SUCCESS');
    item = action.payload.data
    return {
      ...state,
      isSaving: false,
      item: {
        ...item,
        date_of_birth: getDateOfBirth(item)
      },
      errors: {}
    };
  case CURRENT_USER_UPDATE_FAILURE:
    console.log('CURRENT_USER_UPDATE_FAILURE');
    errors = action.error.response.data
    return {
      ...state,
      isSaving: false,
      errors: errors
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
