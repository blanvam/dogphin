import actionTypes from './home.action-types'
import configurationService from '../services/configuration.service'

const defaultConfiguration = {}

export const getConfiguration = (id) => {
  console.log('getconf')
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
