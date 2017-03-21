import {
  USER_INITIALIZE,
  USER_FETCH_REQUEST,
  USER_FETCH_SUCCESS,
  USER_FETCH_FAILURE,
} from '../constants/action-types'

export const initialState = {
  item: undefined,
  isStarted: false,
  isFetching: false,
  isSaving: false,
  errors: [],
}

export function user(state = initialState, action) {
  let item
  switch (action.type) {
  case USER_INITIALIZE:
    console.log('USER_INITIALIZE');
    return {
      ...initialState,
      item: action.item,
      isStarted: true,
    };
  case USER_FETCH_REQUEST:
    console.log('USER_FETCH_REQUEST');
    return {
      ...state,
      errors: [],
      isFetching: true,
    };
  case USER_FETCH_SUCCESS:
    console.log('USER_FETCH_SUCCESS');
    item = action.payload.data
    return {
      ...state,
      isFetching: false,
      item: {
        ...item,
        date_of_birth: new Date(item.date_of_birth)
      }
    };
  case USER_FETCH_FAILURE:
    console.log('USER_FETCH_FAILURE');
    return {
      ...state,
      isFetching: false
    };
  default:
    return state;
  }
}
