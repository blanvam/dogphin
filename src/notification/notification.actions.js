import actionTypes from './notification.action-types'
import notificationService from './notification.service'
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

export const getNotificationsBarSuccess = notifications => {
  return {
    type: actionTypes.GET_NOTIFICATIONS_BAR_SUCCESS,
    notifications,
  }
}

export const getNotifications = num => {
  return dispatch => {
    return notificationService.lasts(
      notifications => {
        dispatch(getNotificationsSuccess(notifications))
        dispatch(getNotificationsBarSuccess(notifications.slice(0, num)))
        dispatch(toggleNotificationsLoader(false))
        return notifications
      }
    )
  }
}

export const createNotification = notification => {
  return dispatch => {
    return alertService.create(
      notification,
      (result, _) => {
        dispatch(changeNotificationName(notification.name))
        dispatch(changeNotificationSuccess(result === 'success'))
        return notification
      }
    )
  }
}

export const changeNotificationSuccess = value => {
  return {
    type: actionTypes.CREATE_NOTIFICATION_SUCCESS,
    value,
  }
}

export const changeNotificationName = value => {
  return {
    type: actionTypes.CREATE_NOTIFICATION_NAME,
    value,
  }
}