import actionTypes from './map.action-types'

export const updateMapLocation = location => {
  return {
    type: actionTypes.UPDATE_MAP_LOCATION_SUCCESS,
    location,
  }
}
