import actionTypes from './home.action-types'
import configurationService from '../services/configuration.service'

//configurationService.set('android', getState().home.config, () => {console.log('SAVED')})
    //configurationService.set('default', getState().home.config, () => {console.log('SAVED')})
    //configurationService.set('ios', getState().home.config, () => {console.log('SAVED')})
    //configurationService.set('native', getState().home.config, () => {console.log('SAVED')})
    
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
