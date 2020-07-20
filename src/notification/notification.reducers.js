import actionsTypes from './notification.action-types'

const INITIAL_STATE = {
  showNotificationsLoader: true,
  notificationSelectedId: null,
  notifications: [],
  notificationsBar: [],
  notificationCreated: false,
  notificationCreatedName: '',
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionsTypes.TOGGLE_NOTIFICATIONS_LOADER:
      return { ...state, showNotificationsLoader: action.status }
    case actionsTypes.NOTIFICATION_SELECTED_ID:
      return { ...state, notificationSelectedId: action.id }
    case actionsTypes.GET_NOTIFICATIONS_SUCCESS:
      return { ...state, notifications: action.notifications }
    case actionsTypes.GET_NOTIFICATIONS_BAR_SUCCESS:
      return { ...state, notificationsBar: action.notifications }
    case actionsTypes.CREATE_NOTIFICATION_SUCCESS:
      return { ...state, notificationCreated: action.value }
    case actionsTypes.CREATE_NOTIFICATION_NAME:
      return { ...state, notificationCreatedName: action.value }
    default:
      return state;
  }
}
