import actionsTypes from './user.action-types'

const INITIAL_STATE = {
  user: {},
  location: { latitude: 36.374665, longitude: -6.240144 }
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionsTypes.UPDATE_USER_SUCCESS:
      return { ...state, user: action.user }
    case actionsTypes.UPDATE_LOCATION_SUCCESS:
      return { ...state, location: action.location }
    default:
      return state
  }
}