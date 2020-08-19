import actionsTypes from './home.action-types'
import user from '../user/user.json'
import emergency from '../emergency/emergency.json'
import alerts from '../alert/alerts.json'
import i18n from './i18n.json'

const INITIAL_STATE = {
  config: {
    queryDistance: 100, // kms
    notificationExpiration: 12, // horas
    notificationsBarShow: 4,
    distanceUserUpdate: 20, // meters
    expirationTimeUserUpdate: 300000, // milis
    user: user,
    emergency: emergency,
    alerts: alerts,
    i18n: i18n,
  },
  translations: i18n['en']
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionsTypes.INIT_CONFIG:
      return { ...state, config: action.config }
      case actionsTypes.SET_TRANSLATIONS:
        return { ...state, translations: action.translations }
    default:
      return state;
  }
};