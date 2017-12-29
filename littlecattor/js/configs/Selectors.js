/** 
 * @providesModule Selectors 
 * */

import { createSelector } from 'reselect';

export const getHello = state => state.hello.hello;

/** 用户相关 */
export const getIsLogin = state => state.user.isLogin;
export const getLoginState = state => state.user.loginState;
export const getLoginErrorMsg = state => state.user.loginErrorObj;

/** 通告相关 */
export const getCircularListState = state => state.circular.getCircularListState;
export const getCircularListErrorObj = state => state.circular.getCircularListErrorObj;
export const getCircularList = state => state.circular.circularList;

export const getCircularTagListState = state => state.circular.getCircularTagListState;
export const getCircularTagListErrorObj = state => state.circular.getCircularTagListErrorObj;
export const getTagList = state => state.circular.tagList;

export const getPublishCircularState = state => state.circular.publishCircularState;
export const getPublishCircularErrorObj = state => state.circular.publishCircularErrorObj;

export const getCircularDetailState = state => state.circular.getCircularDetailState;
export const getCircularDetailErrorObj = state => state.circular.getCircularDetailErrorObj;
export const getCircularDetail = state => state.circular.circularDetail;

/** 举报相关 */
export const getAddAccusationState = state => state.accusation.addAccusationState;
export const getAddAccusationErrorObj = state => state.accusation.addAccusationErrorObj;
export const getAccusationTypes = state => state.accusation.accusationTypes;

/** 曝光相关 */
export const getExposureListState = state => state.exposure.getExposureListState;
export const getExposureListErrorObj = state => state.exposure.getExposureListErrorObj;
export const getExposureList = state => state.exposure.exposureList;

export const getPublishExposureState = state => state.exposure.publishExposureState;
export const getPublishExposureErrorObj = state => state.exposure.publishExposureErrorObj;

export const getExposureDetailState = state => state.exposure.getExposureDetailState;
export const getExposureDetailErrorObj = state => state.exposure.getExposureDetailErrorObj;
export const getExposureDetail = state => state.exposure.exposureDetail;

export const getSupportExposureState = state => state.exposure.supportExposureState;
export const getSupportExposureErrorObj = state => state.exposure.supportExposureErrorObj;