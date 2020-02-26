import { INIT_HOME } from './home.action-types';

const INITIAL_STATE = {
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case INIT_HOME:
      return { ...state, ...INITIAL_STATE };
    default:
      return state;
  }
};