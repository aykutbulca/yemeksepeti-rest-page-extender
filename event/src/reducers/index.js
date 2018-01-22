import {combineReducers} from 'redux';

import orders from './orders';
import globals from './globals';

export default combineReducers({
  orders,
  globals
});
