import {
  RIDE_OPTIONS_FETCH_REQUEST,
  RIDE_OPTIONS_FETCH_SUCCESS,
} from '../constants/action-types'

export const initialState = {
  isStarted: false,
  isFetching: false,
  currencies: [],
  cars: []
}

export function rideOptions(state = initialState, action) {
  let item
  switch (action.type) {
  case RIDE_OPTIONS_FETCH_REQUEST:
    console.log('RIDE_OPTIONS_FETCH_REQUEST');
    return {
      ...state,
      isStarted: true,
      isFetching: true,
    };
  case RIDE_OPTIONS_FETCH_SUCCESS:
    console.log('RIDE_OPTIONS_FETCH_SUCCESS');
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
