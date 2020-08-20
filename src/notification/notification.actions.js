import actionTypes from './notification.action-types'
import notificationService from './notification.service'
import firestore from '@react-native-firebase/firestore'
import * as RNLocalize from 'react-native-localize'
import translations from '../home/translations.json'

const usedLanguages = RNLocalize.getLocales()

let allLanguages = Object.keys(translations)
let languages = usedLanguages.map(e => e.languageCode)
let lenguage = languages.filter(e => allLanguages.includes(e))[0] || 'en'
let i18n = (translations[lenguage]).translation

export const toggleNotificationsLoader = status => {
  return {
    type: actionTypes.TOGGLE_NOTIFICATIONS_LOADER,
    status,
  }
}

export const selectNotificationId = id => {
  return {
    type: actionTypes.NOTIFICATION_SELECTED_ID,
    id,
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

export const getNotifications = dblocation => {
  return (dispatch, getState) => {
    return notificationService.near(
      dblocation,
      getState().home.config.queryDistance,
      notifications => {
        let oldNotifs = getState().notification.notifications
        console.log('AAAAAAA NEW NOTIF')
        console.log(oldNotifs)
        console.log('AAAAAAA OLD NOTIF')
        console.log(notifications)
        //let newNotifications = getState().notification.notifications - notifications
        let newNotifications = notifications.filter(({ id: id1 }) => !oldNotifs.some(({ id: id2 }) => id2 === id1))        
        console.log('AAAAAAA DIF')
        console.log(newNotifications)
        dispatch(getNotificationsSuccess(notifications))
        dispatch(getNotificationsBarSuccess(notifications.slice(0, getState().home.config.notificationsBarShow)))
        dispatch(toggleNotificationsLoader(false))
        return notifications
      }
      //changes => {
      //  let notifAddedLen = changes['added'].length
      //  let title, message
      //  if (notifAddedLen == 1) {
      //    title = i18n.pushedNewAlertTitle
      //    message = `${i18n.pushedNewAlertMsg}`
      //  } else if (notifAddedLen > 1) {
      //    title = i18n.pushedNewAlertTitlePlural
      //    message = `${notifAddedLen} ${i18n.pushedNewAlertMsgPlural}`
      //  }
      //  if (title) {
      //    getState().push.notifier.localNotif(title, message)
      //  }
      //}
    )
  }
}

export const createNotification = notification => {
  const timestamp = firestore.Timestamp.now()
  return (dispatch, getState) => {
    const milisExpiration = (getState().home.config.notificationExpiration * 60 * 60 * 1000)
    const coordinates = getState().user.location
    return notificationService.add(
      { 
        ...notification,
        user: getState().user.user.uid,
        phoneNumber: getState().user.user.phoneNumber,
        coordinates: new firestore.GeoPoint(coordinates.latitude, coordinates.longitude),
        createdAt: new firestore.FieldValue.serverTimestamp(),
        expiredAt: timestamp.toMillis() + milisExpiration,
      },
      () => {
        dispatch(changeNotificationName(notification.name))
        dispatch(changeNotificationSuccess(true))
        return notification
      }
    )
  }
}

export const deleteNotification = notificationId => {
  return _ => {
    notificationService.delete(notificationId)
  }
}

export const updateLocations = (userId, coordinates) => {
  return _ => {
    notificationService.updateLocationUserQuery(userId, coordinates)
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