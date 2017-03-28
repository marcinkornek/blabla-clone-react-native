import {
  RIDE_AS_PASSENGER_FILTER_UPDATE,
  RIDE_AS_PASSENGER_FILTER_CLEAR,
} from '../constants/action-types';

export const initialState = {
  filters: {
    currency: undefined,
    order: undefined,
    status: undefined,
    show_past: false,
    show_full: true,
  },
};

export function ridesAsPassengerFilters(state = initialState, action) {
  let items, pagination, filters
  switch (action.type) {
  case RIDE_AS_PASSENGER_FILTER_UPDATE:
    console.log('RIDE_AS_PASSENGER_FILTER_UPDATE');
    return {
      ...state,
      filters: action.filters
    };
  case RIDE_AS_PASSENGER_FILTER_CLEAR:
    console.log('RIDE_AS_PASSENGER_FILTER_CLEAR');
    return {
      ...initialState,
    };
  default:
    return state;
  }
};
