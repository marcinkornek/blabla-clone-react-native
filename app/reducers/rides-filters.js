import {
  RIDE_FILTER_UPDATE,
} from '../constants/action-types';

export const initialState = {
  filters: {}
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
  default:
    return state;
  }
};
