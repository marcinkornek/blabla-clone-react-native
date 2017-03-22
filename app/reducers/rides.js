import {
  RIDES_FETCH_REQUEST,
  RIDES_FETCH_SUCCESS,
  RIDES_REFRESH_REQUEST,
  RIDES_REFRESH_SUCCESS,
  RIDES_SET_DEFAULT_PER,
} from '../constants/action-types';
import { unionWith, sortWith, ascend, prop } from 'ramda';
const comparator = function(a1, a2) { return a1.id === a2.id; };
const startDateSort = sortWith([
  ascend(prop('start_date')),
]);

export const initialState = {
  isStarted: false,
  isFetching: false,
  items: [],
  pagination: {},
  defaultPer: 20,
};

export function rides(state = initialState, action) {
  let items, pagination
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
    return {
      ...state,
      isFetching: false,
      items: startDateSort(unionWith(
        comparator,
        items,
        state.items,
      )),
      pagination: pagination,
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
    const currentPage = pagination.per / state.defaultPer
    const totalPages = Math.ceil(pagination.total_count / state.defaultPer)
    return {
      ...state,
      isFetching: false,
      items: items,
      pagination: {
        ...pagination,
        current_page: currentPage,
        next_page: currentPage + 1,
        prev_page: currentPage - 1,
        total_pages: totalPages,
      },
    };
  case RIDES_SET_DEFAULT_PER:
    console.log('RIDES_SET_DEFAULT_PER');
    return {
      ...state,
      defaultPer: action.per,
    };
  default:
    return state;
  }
};
