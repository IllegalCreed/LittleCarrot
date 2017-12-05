/** 
 * @providesModule Reducers 
 */

import { combineReducers } from 'redux';

import { hello } from 'HelloReducer';
import { user } from 'UserReducer';
import { circular } from 'CircularReducer';

export default {
  hello,
  user,
  circular,
};