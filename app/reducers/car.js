import {
  CAR_FETCH_REQUEST,
  CAR_FETCH_SUCCESS,
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
  case CAR_FETCH_REQUEST:
    console.log('CAR_FETCH_REQUEST')
    return {
      ...state,
      isStarted: true,
      isFetching: true
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
  default:
    return state;
  }
}
