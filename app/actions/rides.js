import {
  RIDES_FETCH_REQUEST,
  RIDES_FETCH_SUCCESS,
  RIDES_FETCH_FAILURE,
  RIDE_FILTER_UPDATE,
  RIDE_SEARCH_UPDATE,
  RIDE_FETCH_REQUEST,
  RIDE_FETCH_SUCCESS,
  RIDE_FETCH_FAILURE,
  RIDE_OPTIONS_FETCH_REQUEST,
  RIDE_OPTIONS_FETCH_SUCCESS,
  RIDE_OPTIONS_FETCH_FAILURE,
  RIDE_CREATE_REQUEST,
  RIDE_CREATE_SUCCESS,
  RIDE_CREATE_FAILURE,
  RIDE_UPDATE_REQUEST,
  RIDE_UPDATE_SUCCESS,
  RIDE_UPDATE_FAILURE,
  RIDE_SEARCH_CLEAR,
  RIDE_FILTER_CLEAR,
} from '../constants/action-types';
import { APIEndpoints } from '../constants/constants';

export function fetchRides(page = 1, per = 10) {
  return (dispatch, getState) => {
    const { session } = getState()
    const { ridesFilters } = getState()
    const filters = ridesFilters.filters
    const search = ridesFilters.search

    return dispatch({
      types: [
        RIDES_FETCH_REQUEST,
        RIDES_FETCH_SUCCESS,
        RIDES_FETCH_FAILURE
      ],
      payload: {
        request: {
          url: APIEndpoints.RIDES,
          params: {
            page,
            per,
            filters,
            search,
          }
        }
      }
    })
  }
}

export function fetchRidesAsPassenger(page = 1, per = 10, { user_id } = {}) {
  return {
    types: [
      RIDES_FETCH_REQUEST,
      RIDES_FETCH_SUCCESS,
      RIDES_FETCH_FAILURE
    ],
    payload: {
      request: {
        url: `${APIEndpoints.RIDES}/as_passenger`,
        params: {
          page,
          per,
          user_id
        }
      }
    }
  }
}

export function fetchRidesAsDriver(page = 1, per = 10, { user_id } = {}) {
  return {
    types: [
      RIDES_FETCH_REQUEST,
      RIDES_FETCH_SUCCESS,
      RIDES_FETCH_FAILURE
    ],
    payload: {
      request: {
        url: `${APIEndpoints.RIDES}/as_driver`,
        params: {
          page,
          per,
          user_id,
        }
      }
    }
  }
}

export function fetchRide(rideId) {
  return {
    types: [
      RIDE_FETCH_REQUEST,
      RIDE_FETCH_SUCCESS,
      RIDE_FETCH_FAILURE
    ],
    payload: {
      request: {
        url: `${APIEndpoints.RIDES}/${rideId}`,
      }
    }
  }
}

export function createRide(body) {
  return {
    types: [
      RIDE_CREATE_REQUEST,
      RIDE_CREATE_SUCCESS,
      RIDE_CREATE_FAILURE
    ],
    payload: {
      request: {
        method: 'post',
        url: APIEndpoints.RIDES,
        data: body
      }
    }
  }
}

export function fetchRideOptions() {
  return {
    types: [
      RIDE_OPTIONS_FETCH_REQUEST,
      RIDE_OPTIONS_FETCH_SUCCESS,
      RIDE_OPTIONS_FETCH_FAILURE
    ],
    payload: {
      request: {
        url: `${APIEndpoints.RIDES}/options`,
      }
    }
  }
}

export function updateRide(body, rideId) {
  return {
    types: [
      RIDE_UPDATE_REQUEST,
      RIDE_UPDATE_SUCCESS,
      RIDE_UPDATE_FAILURE
    ],
    payload: {
      request: {
        method: 'put',
        url: `${APIEndpoints.RIDES}/${rideId}`,
        data: body
      }
    }
  }
}

export function updateRidesSearch(search = {}) {
  return {
    type: RIDE_SEARCH_UPDATE,
    search: search
  }
}

export function updateRidesFilters(filters = {}) {
  return {
    type: RIDE_FILTER_UPDATE,
    filters: filters
  }
}

export function clearRidesSearch() {
  return {
    type: RIDE_SEARCH_CLEAR,
  }
}

export function clearRidesFilters() {
  return {
    type: RIDE_FILTER_CLEAR,
  }
}
