/** 
 * @providesModule Selectors 
 * */

import { createSelector } from 'reselect';

export const getHello = state => state.hello.hello;

export const getIsLogin = state => state.user.isLogin;
export const getLoginState = state => state.user.loginState;
export const getLoginErrorMsg = state => state.user.loginErrorObj