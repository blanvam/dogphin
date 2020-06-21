import actionsTypes from './emergency.action-types'

const INITIAL_STATE = {
  showEmergencyModal: false,
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionsTypes.TOGGLE_EMERGENCY_MODAL:
      return { ...state, showEmergencyModal: action.status }
    default:
      return state;
  }
}
