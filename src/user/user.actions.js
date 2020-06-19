import actionTypes from './user.action-types'
import userServices from './user.services'
import * as mapActions from '../map/map.actions'

import firestore from '@react-native-firebase/firestore'

export const update = user => {
  return {
    type: actionTypes.UPDATE_USER_SUCCESS,
    user,
  }
}

export const updateLocation = location => {
  return (dispatch, getState) => {
    dispatch(mapActions.updateMapLocation(location))
    let dblocation = new firestore.GeoPoint(location.latitude, location.longitude)
    // TODO: send to firestore actual location (new firestore.GeoPoint(53.483959, -2.244644))
    userServices.update(
      getState().user.user.email,
      {currentLocation: dblocation},
      () => {}
    )
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