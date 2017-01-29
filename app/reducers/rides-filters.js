import {
  RIDE_FILTER_UPDATE,
  RIDE_SEARCH_UPDATE,
} from '../constants/action-types';

export const initialState = {
  filters: {},
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
  default:
    return state;
  }
};
