import {
  RIDE_REQUEST_CREATE_REQUEST,
  RIDE_REQUEST_CREATE_SUCCESS,
  RIDE_REQUEST_CREATE_FAILURE,
} from '../constants/action-types'
import { APIEndpoints } from '../constants/constants'

export function createRideRequest(ride_id, places) {
  return (dispatch, getState) => {
    const { session } = getState()
    return dispatch({
      types: [
        RIDE_REQUEST_CREATE_REQUEST,
        RIDE_REQUEST_CREATE_SUCCESS,
        RIDE_REQUEST_CREATE_FAILURE
      ],
      payload: {
        request: {
          method: 'post',
          url: APIEndpoints.RIDE_REQUESTS,
          headers: {
            'X-User-Email': session.item.email,
            'X-User-Token': session.item.access_token
          },
          data: {
            ride_id,
            places
          },
          simple: false
        }
      }
    })
  }
}
