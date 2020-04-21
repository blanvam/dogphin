import actionTypes from './notification.action-types'
import NotificationService from './notification.service'


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
    return NotificationService.all(
      (querySnapshot) => {
        let alerts = NotificationService.listAlert(querySnapshot)
        dispatch(getNotificationsSuccess(alerts))
        dispatch(toggleNotificationsLoader(false))
        return alerts
      }
    )
  }
}
