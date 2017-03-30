import {
  CAR_INITIALIZE,
  CAR_FETCH_REQUEST,
  CAR_FETCH_SUCCESS,
  CAR_CREATE_SUCCESS,
  CAR_CREATE_REQUEST,
  CAR_UPDATE_REQUEST,
  CAR_UPDATE_SUCCESS,
  CAR_UPDATE_FAILURE,
} from '../constants/action-types'

export const initialState = {
  isStarted: false,
  isFetching: false,
  isSaving: false,
  item: undefined,
}

export function car(state = initialState, action) {
  let item
  switch (action.type) {
  case CAR_INITIALIZE:
    console.log('CAR_INITIALIZE');
    return {
      ...initialState,
      item: action.item,
      isStarted: true,
    };
  case CAR_FETCH_REQUEST:
    console.log('CAR_FETCH_REQUEST')
    return {
      ...state,
      isFetching: true,
    };
  case CAR_FETCH_SUCCESS:
    console.log('CAR_FETCH_SUCCESS')
    item = action.payload.data
    return {
      ...state,
      isFetching: false,
      item: {
        ...item,
        places: item.places.toString()
      }
    };
  case CAR_CREATE_REQUEST:
    console.log('CAR_CREATE_REQUEST');
    return {
      ...state,
      isSaving: true
    };
  case CAR_CREATE_SUCCESS:
    console.log('CAR_CREATE_SUCCESS');
    return {
      ...state,
      isSaving: false
    };
  case CAR_UPDATE_REQUEST:
    console.log('CAR_UPDATE_REQUEST');
    return {
      ...state,
      isSaving: true
    };
  case CAR_UPDATE_SUCCESS:
    console.log('CAR_UPDATE_SUCCESS');
    return {
      ...state,
      isSaving: false
    };
  case CAR_UPDATE_FAILURE:
    console.log('CAR_UPDATE_FAILURE');
    return {
      ...state,
      isSaving: false
    };
  default:
    return state;
  }
}
