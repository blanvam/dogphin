import actionTypes from './notification.action-types'
import notificationService from './notification.service'


export const toggleNotificationsLoader = status => {
  return {
    type: actionTypes.TOGGLE_NOTIFICATIONS_LOADER,
    status,
  }
}

export const getNotificationsSuccess = notifications => {
  return {
    type: actionTypes.GET_NOTIFICATIONS_SUCCESS,
    notifications,
  }
}

export const getNotifications = () => {
  return dispatch => {
    return notificationService.lasts(
      notifications => {
        dispatch(getNotificationsSuccess(notifications))
        dispatch(toggleNotificationsLoader(false))
        return notifications
      }
    )
  }
}
