import actionTypes from './push.action-types'


export const setPushNotification = notifier => {
  return {
    type: actionTypes.SET_PUSH_NOTIFICATION,
    notifier,
  }
}
