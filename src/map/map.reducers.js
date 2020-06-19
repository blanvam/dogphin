import actionsTypes from './map.action-types'

const INITIAL_STATE = {
  location: { latitude: 36.374665, longitude: -6.240144 },
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionsTypes.UPDATE_MAP_LOCATION_SUCCESS:
      return { ...state, location: action.location } 
    default:
      return state
  }
}