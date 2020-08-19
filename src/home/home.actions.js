import actionTypes from './home.action-types'
import configurationService from '../services/configuration.service'

//configurationService.set('android', getState().home.config, () => {console.log('SAVED')})
    //configurationService.set('default', getState().home.config, () => {console.log('SAVED')})
    //configurationService.set('ios', getState().home.config, () => {console.log('SAVED')})
    //configurationService.set('native', getState().home.config, () => {console.log('SAVED')})
    
export const getConfiguration = (id, usedLanguages) => {
  return (dispatch, getState) => {
    return configurationService.get(
      id,
      configuration => {
        if (configuration) {
          dispatch(getConfigurationSuccess(configuration))
          let i18n = configuration.translations || []
          let allLanguages = Object.keys(i18n)
          let languages = usedLanguages.map(e => e.languageCode)
          let lenguage = languages.filter(e => allLanguages.includes(e))[0] || 'en'
          let translations = i18n[lenguage] || getState().home.config.translations[lenguage]
          dispatch(setTranslations(translations))
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

export const setTranslations = (translations) => {
  return {
    type: actionTypes.SET_TRANSLATIONS,
    translations,
  }
}