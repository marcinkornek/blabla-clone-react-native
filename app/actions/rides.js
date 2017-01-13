import {
  RIDES_FETCH_REQUEST,
  RIDES_FETCH_SUCCESS,
  RIDES_FETCH_FAILURE,
  RIDE_FETCH_REQUEST,
  RIDE_FETCH_SUCCESS,
  RIDE_FETCH_FAILURE,
  RIDE_OPTIONS_FETCH_REQUEST,
  RIDE_OPTIONS_FETCH_SUCCESS,
  RIDE_OPTIONS_FETCH_FAILURE,
  RIDE_CREATE_REQUEST,
  RIDE_CREATE_SUCCESS,
  RIDE_CREATE_FAILURE,
} from '../constants/action-types';
import { APIEndpoints } from '../constants/constants';

export function fetchRides(page = 1, per = 10, { start_city, destination_city, start_date, hide_full } = {}) {
  return {
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
  return (dispatch, getState) => {
    const { session } = getState()
    return dispatch({
      types: [
        RIDE_CREATE_REQUEST,
        RIDE_CREATE_SUCCESS,
        RIDE_CREATE_FAILURE
      ],
      payload: {
        request: {
          method: 'post',
          url: APIEndpoints.RIDES,
          headers: {
            'X-User-Email': session.item.email,
            'X-User-Token': session.item.access_token
          },
          data: body
        }
      }
    })
  }
}

export function fetchRideOptions() {
  return (dispatch, getState) => {
    const { session } = getState()
    return dispatch({
      types: [
        RIDE_OPTIONS_FETCH_REQUEST,
        RIDE_OPTIONS_FETCH_SUCCESS,
        RIDE_OPTIONS_FETCH_FAILURE
      ],
      payload: {
        request: {
          url: `${APIEndpoints.RIDES}/options`,
          headers: {
            'X-User-Email': session.item.email,
            'X-User-Token': session.item.access_token
          }
        }
      }
    })
  }
}
