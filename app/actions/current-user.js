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
          headers: {
            'X-User-Email': session.item.email,
            'X-User-Token': session.item.access_token
          }
        }
      }
    })
  }
}

export function createCurrentUser(body) {
  return (dispatch, getState) => {
    const { session } = getState()
    return dispatch({
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
    })
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
          headers: {
            'Content-Type': 'multipart/form-data',
            'X-User-Email': session.item.email,
            'X-User-Token': session.item.access_token
          },
          data: body,
          simple: false
        }
      }
    })
  }
}
