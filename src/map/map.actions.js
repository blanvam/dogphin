import actionTypes from './map.action-types'

export const updateMapLocation = location => {
  return {
    type: actionTypes.UPDATE_MAP_LOCATION_SUCCESS,
    location,
  }
}

export const setMapMarkers = markers => {
  return {
    type: actionTypes.SET_MAP_MARKERS,
    markers,
  }
}

export const addMapMarkers = (id, ref) => {
  return {
    type: actionTypes.ADD_MAP_MARKER,
    id, 
    ref,
  }
}