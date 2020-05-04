import actionTypes from './user.action-types'

export const update = user => {
  return {
    type: actionTypes.UPDATE_USER_SUCCESS,
    user,
  }
}

export const updateLocation = location => {
  return {
    type: actionTypes.UPDATE_LOCATION_SUCCESS,
    location,
  }
}
