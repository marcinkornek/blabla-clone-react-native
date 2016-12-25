import {
  CURRENT_USER_FETCH_REQUEST,
  CURRENT_USER_FETCH_SUCCESS,
  CURRENT_USER_FETCH_FAILURE,
} from '../constants/action-types'

export const initialState = {
  isStarted: false,
  isFetching: false,
  isSaving: false,
  errors: [],
  item: undefined,
}

export function currentUser(state = initialState, action) {
  let item, errors
  switch (action.type) {
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
        date_of_birth: new Date(item.date_of_birth)
      }
    };
  case CURRENT_USER_FETCH_FAILURE:
    console.log('CURRENT_USER_FETCH_FAILURE');
    console.log(action);
  default:
    return state;
  }
}
