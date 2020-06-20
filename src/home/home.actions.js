import actionTypes from './home.action-types'
import configurationService from '../services/configuration.service'

const defaultConfiguration = {}

export const getConfiguration = (id) => {
  console.log('getconf')
  return dispatch => {
    return configurationService.get(
      id,
      configuration => {
        if (configuration) {
          dispatch(getConfigurationSuccess(configuration))
        } else {
          dispatch(getConfigurationSuccess(defaultConfiguration))
        }        
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
