import {
  RIDE_INITIALIZE,
  RIDE_FETCH_REQUEST,
  RIDE_FETCH_SUCCESS,
  RIDE_CREATE_REQUEST,
  RIDE_CREATE_SUCCESS,
  RIDE_UPDATE_REQUEST,
  RIDE_UPDATE_SUCCESS,
  RIDE_REQUEST_CREATE_SUCCESS,
  RIDE_REQUEST_CHANGE_SUCCESS,
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
  case RIDE_INITIALIZE:
    console.log('RIDE_INITIALIZE');
    return {
      ...initialState,
      item: action.item,
      isStarted: true,
    };
  case RIDE_FETCH_REQUEST:
    console.log('RIDE_FETCH_REQUEST');
    return {
      ...state,
      isFetching: true,
    };
  case RIDE_FETCH_SUCCESS:
    console.log('RIDE_FETCH_SUCCESS');
    item = action.payload.data
    return {
      ...state,
      isFetching: false,
      item: {
        ...item,
        start_date: new Date(item.start_date),
        places: item.places.toString(),
      }
    };
  case RIDE_CREATE_REQUEST:
    console.log('RIDE_CREATE_REQUEST');
    return {
      ...state,
      isSaving: true
    };
  case RIDE_CREATE_SUCCESS:
    console.log('RIDE_CREATE_SUCCESS');
    item = action.payload.data
    return {
      ...state,
      isSaving: false,
      item: {
        ...item,
        start_date: new Date(item.start_date),
        places: item.places.toString(),
      }
    };
  case RIDE_UPDATE_REQUEST:
    console.log('RIDE_UPDATE_REQUEST');
    return {
      ...state,
      isSaving: true
    };
  case RIDE_UPDATE_SUCCESS:
    console.log('RIDE_UPDATE_SUCCESS');
    item = action.payload.data
    return {
      ...state,
      isSaving: false,
      item: {
        ...item,
        start_date: new Date(item.start_date),
        places: item.places.toString(),
      }
    };
   case RIDE_REQUEST_CREATE_SUCCESS:
    console.log('RIDE_REQUEST_CREATE_SUCCESS');
    item = action.payload.data
    return {
      ...state,
      item: {
        ...item,
        start_date: new Date(item.start_date),
        places: item.places.toString(),
      }
    };
  case RIDE_REQUEST_CHANGE_SUCCESS:
    console.log('RIDE_REQUEST_CHANGE_SUCCESS');
    item = action.payload.data
    return {
      ...state,
      item: {
        ...item,
        start_date: new Date(item.start_date),
        places: item.places.toString(),
      }
    };
  default:
    return state;
  }
}
