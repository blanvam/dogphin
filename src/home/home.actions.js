import actionTypes from './home.action-types'
import configurationService from '../services/configuration.service'
import emergency from '../emergency/emergency.json'
import alerts from '../alert/alerts.json'

const defaultConfiguration = {
  queryDistance: 12, // millas
  notificationExpiration: 12, // horas
  emergency: emergency,
  alerts: alerts
}

export const getConfiguration = (id) => {
  return dispatch => {
    return configurationService.get(
      id,
      configuration => {
        dispatch(getConfigurationSuccess(configuration? configuration : defaultConfiguration))
        return configuration
      }
    )
  }
}

export const getConfigurationSuccess = config => {
  return {
    type: actionTypes.INIT_CONFIG,
    config,
  }
}
