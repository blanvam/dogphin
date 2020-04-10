import { combineReducers } from 'redux';

import menu from './../menu/menu.reducers';
import profile from '../user/profile/profile.reducers';

export default combineReducers({
  menu,
  profile,
});
