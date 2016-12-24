import {
  RIDE_FETCH_REQUEST,
  RIDE_FETCH_SUCCESS,
} from '../constants/action-types'

export const initialState = {
  isStarted: false,
  isFetching: false,
  isSaving: false,
  item: undefined,
}

export function ride(state = initialState, action) {
  let item
  switch (action.type) {
  case RIDE_FETCH_REQUEST:
    return {
      ...state,
      isStarted: true,
      isFetching: true
    };
  case RIDE_FETCH_SUCCESS:
    item = action.payload.data
    return {
      ...state,
      isFetching: false,
      item: {
        ...item,
        start_date: new Date(item.start_date)
      }
    };
  default:
    return state;
  }
}
