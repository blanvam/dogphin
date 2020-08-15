import actionsTypes from './push.action-types'

const INITIAL_STATE = {
  notifier: null,
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionsTypes.SET_PUSH_NOTIFICATION:
      return { ...state, notifier: action.notifier }
    default:
      return state;
  }
}
