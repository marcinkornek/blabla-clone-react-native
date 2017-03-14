import {
  NOTIFICATION_ACTIVE_ADD,
  NOTIFICATION_ACTIVE_REMOVE,
} from '../constants/action-types'

export const initialState = {
  item: {},
}

export function notificationActive(state = initialState, action) {
  switch (action.type) {
    case NOTIFICATION_ACTIVE_ADD:
      console.log('NOTIFICATION_ACTIVE_ADD')
      return {
        item: action.item,
      }
    case 'NOTIFICATION_ACTIVE_REMOVE':
      console.log('NOTIFICATION_ACTIVE_REMOVE')
      return initialState
    default:
      return state
  }
}
