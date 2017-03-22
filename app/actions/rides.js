import {
  RIDES_FETCH_REQUEST,
  RIDES_FETCH_SUCCESS,
  RIDES_FETCH_FAILURE,
  RIDES_REFRESH_REQUEST,
  RIDES_REFRESH_SUCCESS,
  RIDES_REFRESH_FAILURE,
  RIDES_AS_PASSENGER_FETCH_REQUEST,
  RIDES_AS_PASSENGER_FETCH_SUCCESS,
  RIDES_AS_PASSENGER_FETCH_FAILURE,
  RIDES_AS_PASSENGER_REFRESH_REQUEST,
  RIDES_AS_PASSENGER_REFRESH_SUCCESS,
  RIDES_AS_PASSENGER_REFRESH_FAILURE,
  RIDES_AS_DRIVER_FETCH_REQUEST,
  RIDES_AS_DRIVER_FETCH_SUCCESS,
  RIDES_AS_DRIVER_FETCH_FAILURE,
  RIDES_AS_DRIVER_REFRESH_REQUEST,
  RIDES_AS_DRIVER_REFRESH_SUCCESS,
  RIDES_AS_DRIVER_REFRESH_FAILURE,
  RIDE_FILTER_UPDATE,
  RIDE_SEARCH_UPDATE,
  RIDE_AS_DRIVER_FILTER_UPDATE,
  RIDE_AS_PASSENGER_FILTER_UPDATE,
  RIDE_INITIALIZE,
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
  RIDE_AS_DRIVER_FILTER_CLEAR,
  RIDE_AS_PASSENGER_FILTER_CLEAR,
  RIDES_SET_DEFAULT_PER,
  RIDES_AS_PASSENGER_SET_DEFAULT_PER,
  RIDES_AS_DRIVER_SET_DEFAULT_PER,
} from '../constants/action-types';
import { APIEndpoints } from '../constants/constants';

export function refreshRides(per = 20) {
  return (dispatch, getState) => {
    const { ridesFilters } = getState()
    const filters = ridesFilters.filters
    const search = ridesFilters.search

    return dispatch({
      types: [
        RIDES_REFRESH_REQUEST,
        RIDES_REFRESH_SUCCESS,
        RIDES_REFRESH_FAILURE
      ],
      payload: {
        request: {
          url: APIEndpoints.RIDES,
          params: {
            page: 1,
            per,
            filters,
            search,
          }
        }
      },
    })
  }
}

export function fetchRides(page = 1, per = 20) {
  return (dispatch, getState) => {
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

export function refreshRidesAsPassenger(user_id, per = 20) {
  return (dispatch, getState) => {
    const { ridesAsPassengerFilters } = getState()
    const filters = ridesAsPassengerFilters.filters

    return dispatch({
      types: [
        RIDES_AS_PASSENGER_REFRESH_REQUEST,
        RIDES_AS_PASSENGER_REFRESH_SUCCESS,
        RIDES_AS_PASSENGER_REFRESH_FAILURE
      ],
      payload: {
        request: {
          url: `${APIEndpoints.RIDES}/as_passenger`,
          params: {
            page: 1,
            per,
            user_id,
            filters,
          }
        }
      }
    })
  }
}

export function fetchRidesAsPassenger(user_id, page = 1, per = 20) {
  return (dispatch, getState) => {
    const { ridesAsPassengerFilters } = getState()
    const filters = ridesAsPassengerFilters.filters

    return dispatch({
      types: [
        RIDES_AS_PASSENGER_FETCH_REQUEST,
        RIDES_AS_PASSENGER_FETCH_SUCCESS,
        RIDES_AS_PASSENGER_FETCH_FAILURE
      ],
      payload: {
        request: {
          url: `${APIEndpoints.RIDES}/as_passenger`,
          params: {
            page,
            per,
            user_id,
            filters,
          }
        }
      }
    })
  }
}

export function refreshRidesAsDriver(user_id, per = 20) {
  return (dispatch, getState) => {
    const { ridesAsDriverFilters } = getState()
    const filters = ridesAsDriverFilters.filters

    return dispatch({
      types: [
        RIDES_AS_DRIVER_REFRESH_REQUEST,
        RIDES_AS_DRIVER_REFRESH_SUCCESS,
        RIDES_AS_DRIVER_REFRESH_FAILURE
      ],
      payload: {
        request: {
          url: `${APIEndpoints.RIDES}/as_driver`,
          params: {
            page: 1,
            per,
            user_id,
            filters,
          }
        }
      }
    })
  }
}

export function fetchRidesAsDriver(user_id, page = 1, per = 20) {
  return (dispatch, getState) => {
    const { ridesAsDriverFilters } = getState()
    const filters = ridesAsDriverFilters.filters

    return dispatch({
      types: [
        RIDES_AS_DRIVER_FETCH_REQUEST,
        RIDES_AS_DRIVER_FETCH_SUCCESS,
        RIDES_AS_DRIVER_FETCH_FAILURE
      ],
      payload: {
        request: {
          url: `${APIEndpoints.RIDES}/as_driver`,
          params: {
            page,
            per,
            user_id,
            filters,
          }
        }
      }
    })
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

export function updateRidesAsDriverFilters(filters = {}) {
  return {
    type: RIDE_AS_DRIVER_FILTER_UPDATE,
    filters: filters
  }
}

export function clearRidesAsDriverFilters() {
  return {
    type: RIDE_AS_DRIVER_FILTER_CLEAR,
  }
}

export function updateRidesAsPassengerFilters(filters = {}) {
  return {
    type: RIDE_AS_PASSENGER_FILTER_UPDATE,
    filters: filters
  }
}

export function clearRidesAsPassengerFilters() {
  return {
    type: RIDE_AS_PASSENGER_FILTER_CLEAR,
  }
}

export function setDefaultRidesPer(per) {
  return {
    type: RIDES_SET_DEFAULT_PER,
    per: per,
  }
}

export function setDefaultRidesAsPassengerPer(per) {
  return {
    type: RIDES_AS_PASSENGER_SET_DEFAULT_PER,
    per: per,
  }
}

export function setDefaultRidesAsDriverPer(per) {
  return {
    type: RIDES_AS_DRIVER_SET_DEFAULT_PER,
    per: per,
  }
}

export function initializeRide(ride) {
  return {
    type: RIDE_INITIALIZE,
    item: ride,
  }
}
