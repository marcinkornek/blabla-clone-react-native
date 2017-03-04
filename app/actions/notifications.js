import {
  NOTIFICATION_ADD_SUCCESS,
  NOTIFICATION_ACTIVE_ADD,
  NOTIFICATIONS_FETCH_REQUEST,
  NOTIFICATIONS_FETCH_SUCCESS,
  NOTIFICATIONS_FETCH_FAILURE,
  NOTIFICATIONS_REFRESH_REQUEST,
  NOTIFICATIONS_REFRESH_SUCCESS,
  NOTIFICATIONS_REFRESH_FAILURE,
  NOTIFICATION_UPDATE_REQUEST,
  NOTIFICATION_UPDATE_SUCCESS,
  NOTIFICATION_UPDATE_FAILURE,
} from '../constants/action-types'
import { APIEndpoints } from '../constants/constants'

export function refreshNotifications(per = 10) {
  return {
    types: [
      NOTIFICATIONS_REFRESH_REQUEST,
      NOTIFICATIONS_REFRESH_SUCCESS,
      NOTIFICATIONS_REFRESH_FAILURE
    ],
    payload: {
      request: {
        url: APIEndpoints.NOTIFICATIONS,
        params: {
          page: 1,
          per,
        }
      }
    }
  }
}

export function fetchNotifications(page = 1, per = 10) {
  return {
    types: [
      NOTIFICATIONS_FETCH_REQUEST,
      NOTIFICATIONS_FETCH_SUCCESS,
      NOTIFICATIONS_FETCH_FAILURE
    ],
    payload: {
      request: {
        url: APIEndpoints.NOTIFICATIONS,
        params: {
          page,
          per,
        }
      }
    }
  }
}

export function markNotificationAsSeen(notificationId) {
  return {
    types: [
      NOTIFICATION_UPDATE_REQUEST,
      NOTIFICATION_UPDATE_SUCCESS,
      NOTIFICATION_UPDATE_FAILURE
    ],
    payload: {
      request: {
        method: 'put',
        url: `${APIEndpoints.NOTIFICATIONS}/${notificationId}/mark_as_seen`,
      }
    }
  }
}

export function userNotificationAdd(notification) {
  return {
    type: NOTIFICATION_ADD_SUCCESS,
    item: notification
  }
}

export function addActiveNotification(notification) {
  return {
    type: NOTIFICATION_ACTIVE_ADD,
    item: notification
  }
}
