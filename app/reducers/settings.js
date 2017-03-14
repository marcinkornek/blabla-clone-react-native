import {
  UPDATE_SETTINGS,
  RESET_SETTINGS,
} from '../constants/action-types'

export const initialState = {
  layout: 'base',
  pushNotifications: true,
}

export function settings(state = initialState, action) {
  switch (action.type) {
    case UPDATE_SETTINGS:
      console.log('UPDATE_SETTINGS')
      return {
        ...action.settings,
      }
    case 'RESET_SETTINGS':
      console.log('RESET_SETTINGS')
      return initialState
    default:
      return state
  }
}
