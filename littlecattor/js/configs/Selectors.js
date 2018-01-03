/** 
 * @providesModule Selectors 
 * */

import { createSelector } from 'reselect';

export const getHello = state => state.hello.hello;

/** 用户相关 */
export const getIsLogin = state => state.user.isLogin;
export const getLoginState = state => state.user.loginState;
export const getLoginErrorMsg = state => state.user.loginErrorObj;

export const getRegisterState = state => state.user.registerState;
export const getRegisterErrorObj = state => state.user.registerErrorObj;

export const getResetPwdState = state => state.user.resetPwdState;
export const getResetPwdErrorObj = state => state.user.resetPwdErrorObj;

export const getUpdateUserInfoState = state => state.user.updateUserInfoState;
export const getUpdateUserInfoErrorObj = state => state.user.updateUserInfoErrorObj;

export const getUserInfoState = state => state.user.getUserInfoState;
export const getUserInfoErrorObj = state => state.user.getUserInfoErrorObj;
export const getUserInfo = state => state.user.userInfo;

export const getMyCircularListState = state => state.user.getMyCircularListState;
export const getMyCircularListErrorObj = state => state.user.getMyCircularListErrorObj;
export const getMyCircularList = state => state.user.myCircularList;

export const getMyExposureListState = state => state.user.getMyExposureListState;
export const getMyExposureListErrorObj = state => state.user.getMyExposureListErrorObj;
export const getMyExposureList = state => state.user.myExposureList;

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

export const getMyAccusationListState = state => state.accusation.getMyAccusationListState;
export const getMyAccusationListErrorObj = state => state.accusation.getMyAccusationListErrorObj;
export const getMyAccusationList = state => state.accusation.myAccusationList;

export const getAccusationDetailState = state => state.accusation.getAccusationDetailState;
export const getAccusationDetailErrorObj = state => state.accusation.getAccusationDetailErrorObj;
export const getAccusationDetail = state => state.accusation.accusationDetail;

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

export const getSearchWechatState = state => state.exposure.searchWechatState;
export const getSearchWechatErrorObj = state => state.exposure.searchWechatErrorObj;
export const getWechatList = state => state.exposure.wechatList;

export const getFakeCircularListState = state => state.circular.getFakeCircularListState;
export const getFakeCircularListErrorObj = state => state.circular.getFakeCircularListErrorObj;
export const getFakeCircularList = state => state.circular.fakeCircularList;