import {
  RIDES_AS_PASSENGER_FETCH_REQUEST,
  RIDES_AS_PASSENGER_FETCH_SUCCESS,
  RIDES_AS_PASSENGER_REFRESH_REQUEST,
  RIDES_AS_PASSENGER_REFRESH_SUCCESS,
} from '../constants/action-types';
import { unionWith } from 'ramda';

export const initialState = {
  isStarted: false,
  isFetching: false,
  items: [],
  pagination: {},
  filters: {}
};

export function ridesAsPassenger(state = initialState, action) {
  let items, pagination, filters
  switch (action.type) {
  case RIDES_AS_PASSENGER_FETCH_REQUEST:
    console.log('RIDES_AS_PASSENGER_FETCH_REQUEST');
    return {
      ...state,
      isStarted: true,
      isFetching: true,
    };
  case RIDES_AS_PASSENGER_FETCH_SUCCESS:
    console.log('RIDES_AS_PASSENGER_FETCH_SUCCESS');
    items = action.payload.data.items
    pagination = action.payload.data.meta
    filters = action.payload.data.filters
    return {
      ...state,
      isFetching: false,
      items: unionWith(
        comparator,
        state.items,
        items,
      ),
      pagination: pagination,
      filters: filters
    };
  case RIDES_AS_PASSENGER_REFRESH_REQUEST:
    console.log('RIDES_AS_PASSENGER_REFRESH_REQUEST');
    return {
      ...state,
      isStarted: true,
      isFetching: true,
      items: [],
    };
  case RIDES_AS_PASSENGER_REFRESH_SUCCESS:
    console.log('RIDES_AS_PASSENGER_REFRESH_SUCCESS');
    items = action.payload.data.items
    pagination = action.payload.data.meta
    filters = action.payload.data.filters
    return {
      ...state,
      isFetching: false,
      items: unionWith(
        comparator,
        state.items,
        items,
      ),
      pagination: pagination,
      filters: filters
    };
  default:
    return state;
  }
};
