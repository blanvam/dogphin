import actionTypes from './user.action-types'
import userServices from './user.services'
import notificationService from '../notification/notification.service'
import * as mapActions from '../map/map.actions'

import firestore from '@react-native-firebase/firestore'

export const update = user => {
  return {
    type: actionTypes.UPDATE_USER_SUCCESS,
    user,
  }
}

export const updateUserLocation = location => {
  return (dispatch, getState) => {
    dispatch(mapActions.updateMapLocation(location))
    let dblocation = new firestore.GeoPoint(location.latitude, location.longitude)
    let email = getState().user.user.email
    userServices.update(
      email,
      {coordinates: dblocation},
      () => {}
    )
    notificationService.updateLocationUserQuery(email, {location: dblocation})
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