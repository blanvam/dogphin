import actionsTypes from './home.action-types'
import user from '../user/user.json'
import emergency from '../emergency/emergency.json'
import alerts from '../alert/alerts.json'

const INITIAL_STATE = {
  config: {
    queryDistance: 100, // kms
    notificationExpiration: 12, // horas
    notificationsBarShow: 4,
    user: user,
    emergency: emergency,
    alerts: alerts,
  }
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionsTypes.INIT_CONFIG:
      return { ...state, config: action.config }
    default:
      return state;
  }
};