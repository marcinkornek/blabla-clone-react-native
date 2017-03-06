import {
  USERS_FETCH_REQUEST,
  USERS_FETCH_SUCCESS,
  USERS_REFRESH_REQUEST,
  USERS_REFRESH_SUCCESS,
} from '../constants/action-types'
import { unionWith } from 'ramda';
const comparator = function(a1, a2) { return a1.id === a2.id; };

export const initialState = {
  isStarted: false,
  isFetching: false,
  items: [],
  pagination: {}
}

export function users(state = initialState, action) {
  let items, pagination
  switch (action.type) {
  case USERS_FETCH_REQUEST:
    console.log('USERS_FETCH_REQUEST');
    return {
      ...state,
      isStarted: true,
      isFetching: true,
    };
  case USERS_FETCH_SUCCESS:
    console.log('USERS_FETCH_SUCCESS');
    items = action.payload.data.items
    pagination = action.payload.data.meta
    return {
      ...state,
      isFetching: false,
      items: unionWith(
        comparator,
        items,
        state.items,
      ),
      pagination: pagination
    };
  case USERS_REFRESH_REQUEST:
    console.log('USERS_REFRESH_REQUEST');
    return {
      ...state,
      isStarted: true,
      isFetching: true,
      items: [],
    };
  case USERS_REFRESH_SUCCESS:
    console.log('USERS_REFRESH_SUCCESS');
    items = action.payload.data.items
    pagination = action.payload.data.meta
    return {
      ...state,
      isFetching: false,
      items: unionWith(
        comparator,
        items,
        state.items,
      ),
      pagination: pagination,
    };
  default:
    return state;
  }
}
