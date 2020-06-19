import actionsTypes from './user.action-types'

const INITIAL_STATE = {
  user: {},
  location: { latitude: 36.374665, longitude: -6.240144 },
  permissions: true,
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionsTypes.UPDATE_USER_SUCCESS:
      return { ...state, user: action.user }
    case actionsTypes.UPDATE_LOCATION_SUCCESS:
      return { ...state, location: action.location }
    case actionsTypes.UPDATE_PERMISSIONS_SUCCESS:
      return { ...state, permissions: action.value }
    default:
      return state
  }
}