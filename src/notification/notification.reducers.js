import actionsTypes from './notification.action-types'

const INITIAL_STATE = {
  showNotificationsLoader: true,
  notifications: [],
  notificationsBar: [],
  notificationCreated: false,
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionsTypes.TOGGLE_NOTIFICATIONS_LOADER:
      return { ...state, showNotificationsLoader: action.status }
    case actionsTypes.GET_NOTIFICATIONS_SUCCESS:
      return { ...state, notifications: action.notifications }
    case actionsTypes.GET_NOTIFICATIONS_BAR_SUCCESS:
      return { ...state, notificationsBar: action.notifications }
    case actionsTypes.CREATE_NOTIFICATION_SUCCESS:
      return { ...state, notificationCreated: action.created }
    default:
      return state;
  }
}
