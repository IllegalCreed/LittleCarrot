/** 
 * @providesModule Reducers 
 */

import { combineReducers } from 'redux';

import { hello } from 'HelloReducer';
import { user } from 'UserReducer';

export default {
  hello,
  user,
};