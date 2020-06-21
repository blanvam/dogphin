import { combineReducers } from 'redux'

import home from './../home/home.reducers'
import user from '../user/user.reducers'
import map from '../map/map.reducers'
import notification from './../notification/notification.reducers'
import alert from './../alert/alert.reducers'
import emergency from './../emergency/emergency.reducers'

export default combineReducers({
  home,
  user,
  map,
  notification,
  alert,
  emergency,
})
