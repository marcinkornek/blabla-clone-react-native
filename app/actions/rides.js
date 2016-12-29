import {
  RIDES_FETCH_REQUEST,
  RIDES_FETCH_SUCCESS,
  RIDES_FETCH_FAILURE,
  RIDE_FETCH_REQUEST,
  RIDE_FETCH_SUCCESS,
  RIDE_FETCH_FAILURE,
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
