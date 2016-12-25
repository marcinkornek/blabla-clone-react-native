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
