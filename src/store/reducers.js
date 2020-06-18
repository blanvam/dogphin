import { combineReducers } from 'redux'

import menu from './../menu/menu.reducers'
import user from '../user/user.reducers'
import notification from './../notification/notification.reducers'
import alert from './../alert/alert.reducers'
import emergency from './../emergency/emergency.reducers'

export default combineReducers({
  menu,
  user,
  notification,
  alert,
  emergency,
})
