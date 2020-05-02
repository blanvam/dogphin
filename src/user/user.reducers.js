import actionsTypes from './user.action-types'

const INITIAL_STATE = {
  user: null,
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionsTypes.UPDATE_USER_SUCCESS:
      return { ...state, user: action.user }
    default:
      return state
  }
}