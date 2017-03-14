import {
  UPDATE_SETTINGS,
  RESET_SETTINGS,
} from '../constants/action-types'
import { APIEndpoints } from '../constants/constants'

export function updateSettings(settings) {
  return {
    type: UPDATE_SETTINGS,
    settings: settings,
  }
}

export function resetSettings() {
  return {
    type: RESET_SETTINGS,
  }
}
