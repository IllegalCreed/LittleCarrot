/** 
 * @providesModule Selectors 
 * */

import { createSelector } from 'reselect';

export const getHello = state => state.hello.hello;

export const getIsLogin = state => state.user.isLogin;
export const getLoginState = state => state.user.loginState;
export const getLoginErrorMsg = state => state.user.loginErrorObj;

export const getCircularListState = state => state.circular.getCircularListState;
export const getCircularListErrorObj = state => state.circular.getCircularListErrorObj;
export const getCircularList = state => state.circular.circularList;

export const getCircularTagListState = state => state.circular.getCircularTagListState;
export const getCircularTagListErrorObj = state => state.circular.getCircularTagListErrorObj;
export const getTagList = state => state.circular.tagList;

export const getPublishCircularState = state => state.circular.publishCircularState;
export const getPublishCircularErrorObj = state => state.circular.publishCircularErrorObj;