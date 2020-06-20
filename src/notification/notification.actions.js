import actionTypes from './notification.action-types'
import notificationService from './notification.service'
import firestore from '@react-native-firebase/firestore'


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
  const timestamp = firestore.Timestamp.now()
  const milisExpiration = (12 * 60 * 60 * 1000)
  return (dispatch, getState) => {
    return notificationService.add(
      { 
        ...notification,
        user: getState().user.user.email,
        location: new firestore.GeoPoint(notification.location.latitude, notification.location.longitude),
        createdAt: new firestore.FieldValue.serverTimestamp(),
        expiredAt: timestamp.toMillis() + milisExpiration,
      },
      () => {
        dispatch(changeNotificationName(notification.name))
        dispatch(changeNotificationSuccess(true))
        return notification
      },
      () => {
        dispatch(changeNotificationName(notification.name))
        dispatch(changeNotificationSuccess(false))
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