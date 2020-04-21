import actionTypes from './notification.action-types'
import NotificationService from './notification.service'
import alertService from '../services/alert.service'

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
    return alertService.all(
      (querySnapshot) => {
        let alerts = NotificationService.listAlert(querySnapshot)
        dispatch(getNotificationsSuccess(alerts))
        dispatch(toggleNotificationsLoader(false))
        return alerts
      }
    )
  }
}
