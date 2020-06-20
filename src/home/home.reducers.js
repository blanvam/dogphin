import actionsTypes from './home.action-types'

const INITIAL_STATE = {
  config: {}
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionsTypes.INIT_CONFIG:
      return { ...state, config: action.config }
    default:
      return state;
  }
};