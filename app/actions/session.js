import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
} from '../constants/action-types'
import { APIEndpoints } from '../constants/constants'

export function logInEmailBackend({ email, password } = {}) {
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
          email,
          password
        }
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
          last_name: data.profile.last_name
        }
      }
    }
  }
}
