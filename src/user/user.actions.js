import actionTypes from './user.action-types'

export const updateSuccess = user => {
  return {
    type: actionTypes.UPDATE_USER_SUCCESS,
    user,
  }
}