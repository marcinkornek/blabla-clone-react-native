import {
  RIDES_FETCH_REQUEST,
  RIDES_FETCH_SUCCESS,
  RIDES_REFRESH_REQUEST,
  RIDES_REFRESH_SUCCESS,
} from '../constants/action-types';
import { unionWith } from 'ramda';
const comparator = function(a1, a2) { return a1.id === a2.id; };

export const initialState = {
  isStarted: false,
  isFetching: false,
  items: [],
  pagination: {},
  filters: {}
};

export function rides(state = initialState, action) {
  let items, pagination, filters
  switch (action.type) {
  case RIDES_FETCH_REQUEST:
    console.log('RIDES_FETCH_REQUEST');
    return {
      ...state,
      isStarted: true,
      isFetching: true,
    };
  case RIDES_FETCH_SUCCESS:
    console.log('RIDES_FETCH_SUCCESS');
    items = action.payload.data.items
    pagination = action.payload.data.meta
    filters = action.payload.data.filters
    return {
      ...state,
      isFetching: false,
      items: unionWith(
        comparator,
        items,
        state.items,
      ),
      pagination: pagination,
      filters: filters
    };
  case RIDES_REFRESH_REQUEST:
    console.log('RIDES_REFRESH_REQUEST');
    return {
      ...state,
      isStarted: true,
      isFetching: true,
      items: [],
    };
  case RIDES_REFRESH_SUCCESS:
    console.log('RIDES_REFRESH_SUCCESS');
    items = action.payload.data.items
    pagination = action.payload.data.meta
    filters = action.payload.data.filters
    return {
      ...state,
      isFetching: false,
      items: unionWith(
        comparator,
        items,
        state.items,
      ),
      pagination: pagination,
      filters: filters
    };
  default:
    return state;
  }
};
