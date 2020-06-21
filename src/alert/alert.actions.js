import actionTypes from './alert.action-types'


export const toggleModal = status => {
  return {
    type: actionTypes.TOGGLE_MODAL,
    status,
  }
}
