import {
  CARS_FETCH_REQUEST,
  CARS_FETCH_SUCCESS,
  CARS_FETCH_FAILURE,
  CAR_FETCH_REQUEST,
  CAR_FETCH_SUCCESS,
  CAR_FETCH_FAILURE,
} from '../constants/action-types'
import { APIEndpoints } from '../constants/constants'

export function fetchCars(userId, page = 1, per = 10) {
  return (dispatch, getState) => {
    const { session } = getState()
    return dispatch({
      types: [
        CARS_FETCH_REQUEST,
        CARS_FETCH_SUCCESS,
        CARS_FETCH_FAILURE
      ],
      payload: {
        request: {
          url: `${APIEndpoints.USERS}/${userId}/cars`,
          headers: {
            'X-User-Email': session.item.email,
            'X-User-Token': session.item.access_token
          },
          params: {
            page,
            per,
          }
        }
      }
    })
  }
}

export function fetchCar(carId) {
  return (dispatch, getState) => {
    const { session } = getState()
    return dispatch({
      types: [
        CAR_FETCH_REQUEST,
        CAR_FETCH_SUCCESS,
        CAR_FETCH_FAILURE
      ],
      payload: {
        request: {
          url: `${APIEndpoints.CARS}/${carId}`,
          headers: {
            'X-User-Email': session.item.email,
            'X-User-Token': session.item.access_token
          }
        }
      }
    })
  }
}
