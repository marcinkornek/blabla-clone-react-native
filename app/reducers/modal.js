import {
  SHOW_MODAL,
  UPDATE_MODAL,
  HIDE_MODAL,
} from '../constants/action-types'

export const initialState = {
  modalType: undefined,
  modalProps: {},
}

export function modal(state = initialState, action) {
  switch (action.type) {
    case SHOW_MODAL:
      console.log('SHOW_MODAL')
      return {
        ...initialState,
        modalType: action.modalType,
        modalProps: action.modalProps,
      }
    case UPDATE_MODAL:
      console.log('UPDATE_MODAL')
      return {
        ...state,
        modalProps: action.modalProps,
      }
    case 'HIDE_MODAL':
      console.log('HIDE_MODAL')
      return initialState
    default:
      return state
  }
}
