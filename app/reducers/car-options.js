import {
  CAR_OPTIONS_FETCH_REQUEST,
  CAR_OPTIONS_FETCH_SUCCESS,
} from '../constants/action-types'

export const initialState = {
  isStarted: false,
  isFetching: false,
  colors: [],
  comforts: [],
  categories: []
}

export function carOptions(state = initialState, action) {
  let item
  switch (action.type) {
  case CAR_OPTIONS_FETCH_REQUEST:
    console.log('CAR_OPTIONS_FETCH_REQUEST');
    return {
      ...state,
      isStarted: true,
      isFetching: true,
    };
  case CAR_OPTIONS_FETCH_SUCCESS:
    console.log('CAR_OPTIONS_FETCH_SUCCESS');
    item = action.payload.data
    return {
      ...state,
      isFetching: false,
      ...item
    };
  default:
    return state;
  }
}
