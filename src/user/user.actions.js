import actionTypes from './user.action-types'
import userServices from './user.services'
import * as mapActions from '../map/map.actions'
import * as notificationActions from '../notification/notification.actions'

import firestore from '@react-native-firebase/firestore'


export const update = user => {
  return {
    type: actionTypes.UPDATE_USER_SUCCESS,
    user,
  }
}

export const updateNewUser = user => {
  return (_, getState) => {
    let oldUserUid = getState().user.user.uid
    let newUserUid = user.uid
    if (newUserUid != oldUserUid) {
      userServices.delete(oldUserUid)
      console.log(`Deleted user ${oldUserUid}`)
    }
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
      },
      e => console.log(`ERROR in getNearUsers -> ${e}`)
    )
  }
}

export const updateUserLocation = location => {
  return (dispatch, getState) => {
    dispatch(mapActions.updateMapLocation(location))
    let dblocation = new firestore.GeoPoint(location.latitude, location.longitude)
    let userId = getState().user.user.uid
    if (userId) {
      userServices.update(userId, {active: true, coordinates: dblocation}, () => {})
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
