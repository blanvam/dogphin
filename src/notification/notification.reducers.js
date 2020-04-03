import { LIST_NOTIFICATIONS } from './notification.action-types';

const INITIAL_STATE = {
  notifications: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LIST_NOTIFICATIONS:
      return Object.assign({}, state, { notifications: action.notifications });
    default:
      return state;
  }
};
