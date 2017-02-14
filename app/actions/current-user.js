import {
  CURRENT_USER_FETCH_REQUEST,
  CURRENT_USER_FETCH_SUCCESS,
  CURRENT_USER_FETCH_FAILURE,
  CURRENT_USER_CREATE_REQUEST,
  CURRENT_USER_CREATE_SUCCESS,
  CURRENT_USER_CREATE_FAILURE,
  CURRENT_USER_UPDATE_REQUEST,
  CURRENT_USER_UPDATE_SUCCESS,
  CURRENT_USER_UPDATE_FAILURE,
} from '../constants/action-types'
import { APIEndpoints } from '../constants/constants'

export function fetchCurrentUser() {
  return (dispatch, getState) => {
    const { session } = getState()
    return dispatch({
      types: [
        CURRENT_USER_FETCH_REQUEST,
        CURRENT_USER_FETCH_SUCCESS,
        CURRENT_USER_FETCH_FAILURE
      ],
      payload: {
        request: {
          url: `${APIEndpoints.USERS}/${session.item.id}/profile`,
        }
      }
    })
  }
}

export function createCurrentUser(body) {
  return {
    types: [
      CURRENT_USER_CREATE_REQUEST,
      CURRENT_USER_CREATE_SUCCESS,
      CURRENT_USER_CREATE_FAILURE
    ],
    payload: {
      request: {
        method: 'post',
        url: APIEndpoints.USERS,
        data: body,
        simple: false
      }
    }
  }
}

export function updateCurrentUser(body) {
  return (dispatch, getState) => {
    const { session } = getState()
    return dispatch({
      types: [
        CURRENT_USER_UPDATE_REQUEST,
        CURRENT_USER_UPDATE_SUCCESS,
        CURRENT_USER_UPDATE_FAILURE
      ],
      payload: {
        request: {
          method: 'put',
          url: `${APIEndpoints.USERS}/${session.item.id}`,
          data: body,
          simple: false
        }
      }
    })
  }
}
