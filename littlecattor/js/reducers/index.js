/** 
 * @providesModule Reducers 
 */

import { combineReducers } from 'redux';

import { hello } from 'HelloReducer';
import { user } from 'UserReducer';
import { circular } from 'CircularReducer';
import { accusation } from 'AccusationReducer';

export default {
  hello,
  user,
  circular,
  accusation,
};