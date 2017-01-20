import {
  RIDE_FETCH_REQUEST,
  RIDE_FETCH_SUCCESS,
  RIDE_UPDATE_REQUEST,
  RIDE_UPDATE_SUCCESS,
  RIDE_REQUEST_CREATE_SUCCESS,
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
    console.log('RIDE_FETCH_REQUEST');
    return {
      ...state,
      isStarted: true,
      isFetching: true
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
        start_city: {
          address: item.start_city,
          lattitude: item.start_city_lat,
          longitude: item.start_city_lng,
        },
        destination_city: {
          address: item.destination_city,
          lattitude: item.destination_city_lat,
          longitude: item.destination_city_lng,
        }
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
        start_city: {
          address: item.start_city,
          lattitude: item.start_city_lat,
          longitude: item.start_city_lng,
        },
        destination_city: {
          address: item.destination_city,
          lattitude: item.destination_city_lat,
          longitude: item.destination_city_lng,
        }
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
        start_city: {
          address: item.start_city,
          lattitude: item.start_city_lat,
          longitude: item.start_city_lng,
        },
        destination_city: {
          address: item.destination_city,
          lattitude: item.destination_city_lat,
          longitude: item.destination_city_lng,
        }
      }
    };
  default:
    return state;
  }
}
