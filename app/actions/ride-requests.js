import {
  RIDE_REQUEST_CREATE_REQUEST,
  RIDE_REQUEST_CREATE_SUCCESS,
  RIDE_REQUEST_CREATE_FAILURE,
  RIDE_REQUEST_CHANGE_REQUEST,
  RIDE_REQUEST_CHANGE_SUCCESS,
  RIDE_REQUEST_CHANGE_FAILURE,
} from '../constants/action-types'
import { APIEndpoints } from '../constants/constants'

export function createRideRequest(ride_id, places) {
  return {
    types: [
      RIDE_REQUEST_CREATE_REQUEST,
      RIDE_REQUEST_CREATE_SUCCESS,
      RIDE_REQUEST_CREATE_FAILURE
    ],
    payload: {
      request: {
        method: 'post',
        url: APIEndpoints.RIDE_REQUESTS,
        data: {
          ride_id,
          places
        },
        simple: false
      }
    }
  }
}

export function changeRideRequest(rideRequestId, status) {
  return {
    types: [
      RIDE_REQUEST_CHANGE_REQUEST,
      RIDE_REQUEST_CHANGE_SUCCESS,
      RIDE_REQUEST_CHANGE_FAILURE
    ],
    payload: {
      request: {
        method: 'put',
        url: `${APIEndpoints.RIDE_REQUESTS}/${rideRequestId}`,
        data: {
          status
        },
        simple: false
      }
    }
  }
}
