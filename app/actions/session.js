import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_CLEAR_ERRORS,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
} from '../constants/action-types'
import { APIEndpoints } from '../constants/constants'

export function logInFromStorage(data, player_id) {
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
        },
        params: {
          player_id,
        }
      }
    },
    isOauth: false
  }
}

export function logInEmailBackend(data, player_id) {
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
        data: {
          ...data,
          player_id,
        }
      }
    },
    isOauth: false
  }
}

export function logInFacebookBackend(data, player_id) {
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
          avatar: data.profile.picture.data.url,
          player_id,
        }
      }
    },
    isOauth: true
  }
}

export function loginClearErrors() {
  return {
    type: LOGIN_CLEAR_ERRORS,
  }
}

export function logoutCurrentUser() {
  return {
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
  }
}
