import actionsTypes from './notification.action-types'

const INITIAL_STATE = {
  toggleNotificationsLoader: true,
  notifications: [],
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionsTypes.TOGGLE_NOTIFICATIONS_LOADER:
      return { ...state, toggleNotificationsLoader: action.status }
    case actionsTypes.GET_NOTIFICATIONS_SUCCESS:
      return { ...state, notifications: action.notifications }
    default:
      return state;
  }
}
