import actionsTypes from './map.action-types'

const INITIAL_STATE = {
  location: { latitude: 36.374665, longitude: -6.240144 },
  markers: {},
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionsTypes.UPDATE_MAP_LOCATION_SUCCESS:
      return { ...state, location: action.location }
    case actionsTypes.SET_MAP_MARKERS:
      return { ...state, markers: action.markers } 
    case actionsTypes.ADD_MAP_MARKER:
      let newMarkers = {...state.markers}
      newMarkers[action.id] = action.ref
      return { ...state, markers: newMarkers } 
    default:
      return state
  }
}