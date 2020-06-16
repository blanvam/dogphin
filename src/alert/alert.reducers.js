import actionsTypes from './alert.action-types'

const INITIAL_STATE = {
  showModal: false,
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionsTypes.TOGGLE_MODAL:
      return { ...state, showModal: action.status }
    default:
      return state;
  }
}
