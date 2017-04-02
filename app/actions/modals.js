import {
  SHOW_MODAL,
  UPDATE_MODAL,
  HIDE_MODAL,
} from '../constants/action-types'
import { APIEndpoints } from '../constants/constants'

export function showModal(modalType, modalProps) {
  return {
    type: SHOW_MODAL,
    modalType: modalType,
    modalProps: modalProps,
  }
}

export function updateModal(modalProps) {
  return {
    type: UPDATE_MODAL,
    modalProps: modalProps,
  }
}

export function hideModal() {
  return {
    type: HIDE_MODAL,
  }
}
