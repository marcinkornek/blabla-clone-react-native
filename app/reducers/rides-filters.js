import {
  RIDE_FILTER_UPDATE,
  RIDE_FILTER_CLEAR,
  RIDE_SEARCH_UPDATE,
  RIDE_SEARCH_CLEAR,
} from '../constants/action-types';

export const initialState = {
  filters: {
    currency: undefined,
    order: undefined,
    show_past: false,
    show_full: true,
    show_as_driver: true,
    show_requested: true,
  },
  search: {},
};

export function ridesFilters(state = initialState, action) {
  let items, pagination, filters
  switch (action.type) {
  case RIDE_FILTER_UPDATE:
    console.log('RIDE_FILTER_UPDATE');
    return {
      ...state,
      filters: action.filters
    };
  case RIDE_SEARCH_UPDATE:
    console.log('RIDE_SEARCH_UPDATE');
    return {
      ...state,
      search: action.search
    };
  case RIDE_FILTER_CLEAR:
    console.log('RIDE_FILTER_CLEAR');
    return {
      ...state,
      filters: initialState.filters,
    };
  case RIDE_SEARCH_CLEAR:
    console.log('RIDE_SEARCH_CLEAR');
    return {
      ...state,
      search: {}
    };
  default:
    return state;
  }
};
