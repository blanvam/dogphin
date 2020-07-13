import actionTypes from './user.action-types'
import userServices from './user.services'
import * as mapActions from '../map/map.actions'
import * as notificationActions from '../notification/notification.actions'

import firestore from '@react-native-firebase/firestore'


export const signOut = _ => {
  return dispatch => {
    return userServices.authSignOut(
      (usr) => {
        dispatch(update(usr))
      }
    )
  }
}

export const update = user => {
  return {
    type: actionTypes.UPDATE_USER_SUCCESS,
    user,
  }
}

export const updateNewUser = user => {
  return (dispatch, getState) => {
    console.log(`updateNewUser`)
    let oldUseruId = getState().user.user.uid
    let newUserUid = user.uid
    console.log(`AAAABBBCCCC ${oldUseruId} - ${newUserUid} - ${JSON.stringify(user)}`)
    if (newUserUid != oldUseruId) {
      dispatch(notificationActions.moveUserOwnerNotifications(oldUseruId, newUserUid))
      userServices.update(newUserUid, {locationEnabled: true}, () => {})
      userServices.delete(oldUseruId) 
    }
    dispatch(update(user))
  }
}

export const getNearUsersSuccess = nearUsers => {
  return {
    type: actionTypes.UPDATE_NEAR_USERS_SUCCESS,
    nearUsers,
  }
}

export const getNearUsers = dblocation => {
  return (dispatch, getState) => {
    return userServices.nearVisible(
      dblocation,
      getState().home.config.queryDistance,
      users => {
        dispatch(getNearUsersSuccess(users))
        return users
      }
    )
  }
}

export const updateUserLocation = location => {
  return (dispatch, getState) => {
    dispatch(mapActions.updateMapLocation(location))
    let dblocation = new firestore.GeoPoint(location.latitude, location.longitude)
    let userId = getState().user.user.uid
    if (userId) {
      userServices.update(userId, {coordinates: dblocation}, () => {})
      dispatch(notificationActions.updateLocations(userId, dblocation))
    }
    dispatch(getNearUsers(dblocation))
    dispatch(notificationActions.getNotifications(dblocation))
    dispatch(updateLocationSuccess(location))
  }
}

export const updateLocationSuccess = location => {
  return {
    type: actionTypes.UPDATE_LOCATION_SUCCESS,
    location,
  }
}

export const updatePermissions = value => {
  return {
    type: actionTypes.UPDATE_PERMISSIONS_SUCCESS,
    value,
  }
}
