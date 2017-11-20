/** 
 * @providesModule Selectors 
 * */

import { createSelector } from 'reselect';

export const getHello = state => state.hello.hello;