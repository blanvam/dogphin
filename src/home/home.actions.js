import actionTypes from './home.action-types'
import configurationService from '../services/configuration.service'

export const getConfiguration = (id) => {
  return dispatch => {
    return configurationService.get(
      id,
      configuration => {
        if (configuration) {
          dispatch(getConfigurationSuccess(configuration))
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
