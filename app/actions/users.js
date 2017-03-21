import {
  USERS_FETCH_REQUEST,
  USERS_FETCH_SUCCESS,
  USERS_FETCH_FAILURE,
  USERS_REFRESH_REQUEST,
  USERS_REFRESH_SUCCESS,
  USERS_REFRESH_FAILURE,
  USER_INITIALIZE,
  USER_FETCH_REQUEST,
  USER_FETCH_SUCCESS,
  USER_FETCH_FAILURE,
} from '../constants/action-types'
import { APIEndpoints } from '../constants/constants'

export function refreshUsers(per = 10) {
  return {
    types: [
      USERS_REFRESH_REQUEST,
      USERS_REFRESH_SUCCESS,
      USERS_REFRESH_FAILURE
    ],
    payload: {
      request: {
        url: APIEndpoints.USERS,
        params: {
          page: 1,
          per,
        }
      }
    }
  }
}

export function fetchUsers(page = 1, per = 10) {
  return {
    types: [
      USERS_FETCH_REQUEST,
      USERS_FETCH_SUCCESS,
      USERS_FETCH_FAILURE
    ],
    payload: {
      request: {
        url: APIEndpoints.USERS,
        params: {
          page,
          per,
        }
      }
    }
  }
}

export function fetchUser(userId) {
  return {
    types: [
      USER_FETCH_REQUEST,
      USER_FETCH_SUCCESS,
      USER_FETCH_FAILURE
    ],
    payload: {
      request: {
        url: `${APIEndpoints.USERS}/${userId}`,
      }
    }
  }
}

export function initializeUser(user) {
  return {
    type: USER_INITIALIZE,
    item: user,
  }
}
