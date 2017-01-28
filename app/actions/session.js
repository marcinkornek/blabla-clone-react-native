import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
} from '../constants/action-types'
import { APIEndpoints } from '../constants/constants'

export function logInFromStorage(data) {
  return {
    types: [
      LOGIN_REQUEST,
      LOGIN_SUCCESS,
      LOGIN_FAILURE
    ],
    payload: {
      request: {
        url: `${APIEndpoints.SESSIONS}/get_user`,
        headers: {
          'X-User-Email': data.email,
          'X-User-Token': data.access_token
        }
      }
    }
  }
}

export function logInEmailBackend(data) {
  return {
    types: [
      LOGIN_REQUEST,
      LOGIN_SUCCESS,
      LOGIN_FAILURE
    ],
    payload: {
      request: {
        method: 'post',
        url: APIEndpoints.LOGIN_EMAIL,
        data: data
      }
    }
  }
}

export function logInFacebookBackend(data) {
  return {
    types: [
      LOGIN_REQUEST,
      LOGIN_SUCCESS,
      LOGIN_FAILURE
    ],
    payload: {
      request: {
        method: 'post',
        url: APIEndpoints.LOGIN_FB,
        data: {
          uid: data.profile.id,
          provider: data.provider,
          email: data.profile.email,
          first_name: data.profile.first_name,
          last_name: data.profile.last_name,
          avatar: data.profile.picture.data.url
        }
      }
    }
  }
}

export function logoutCurrentUser() {
  return (dispatch, getState) => {
    const { session } = getState()
    return dispatch({
      types: [
        LOGOUT_REQUEST,
        LOGOUT_SUCCESS,
        LOGOUT_FAILURE
      ],
      payload: {
        request: {
          method: 'delete',
          url: APIEndpoints.SESSIONS,
        }
      }
    })
  }
}
