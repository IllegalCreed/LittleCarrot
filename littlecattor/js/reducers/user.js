/** 
 * @providesModule UserReducer
 */

import {
    handleReducerError,
    requestState
} from 'ReducerCommon';

export const InitialUserState = {
    loginState: requestState.IDLE,
    loginErrorObj: null,

    updateUserInfoState: requestState.IDLE,
    updateUserInfoErrorObj: null,

    getUserInfoState: requestState.IDLE,
    getUserInfoErrorObj: null,

    isLogin: false,
    phone: null,
    token: null,
    userInfo: {},
};

export function user(state = InitialUserState, action) {
    const response = action.payload ? action.payload.data : null;
    switch (action.type) {
        /* login */
        case 'loginAction':
            return Object.assign({}, state, {
                loginState: requestState.LOADING,
            })
        case 'loginAction_SUCCESS':
            if (response && response.res_code == 1) {
                return Object.assign({}, state, {
                    loginState: requestState.SUCCESS,
                    isLogin: true,
                    token: response.msg,
                    phone: action.meta.previousAction.phone
                });
            } else {
                return handleReducerError(action.type, state, response, {
                    loginState: requestState.FAIL,
                    loginErrorObj: response,
                    isLogin: false,
                    token: null,
                    phone: null,
                });
            }
        case 'loginAction_FAIL':
            return handleReducerError(action.type, state, response, {
                loginState: requestState.FAIL,
                loginErrorObj: action.error,
                isLogin: false,
                token: null,
                phone: null,
            });
        case 'resetLoginState':
            return Object.assign({}, state, {
                loginState: requestState.IDLE,
            });

        /* updateUserInfo */
        case 'updateUserInfoAction':
            return Object.assign({}, state, {
                updateUserInfoState: requestState.LOADING,
            })
        case 'updateUserInfoAction_SUCCESS':
            if (response && response.res_code == 1) {
                return Object.assign({}, state, {
                    updateUserInfoState: requestState.SUCCESS,
                });
            } else {
                return handleReducerError(action.type, state, response, {
                    updateUserInfoState: requestState.FAIL,
                    updateUserInfoErrorObj: response,
                });
            }
        case 'updateUserInfoAction_FAIL':
            return handleReducerError(action.type, state, response, {
                updateUserInfoState: requestState.FAIL,
                updateUserInfoErrorObj: action.error,
            });
        case 'resetUpdateUserInfoState':
            return Object.assign({}, state, {
                updateUserInfoState: requestState.IDLE,
            });

        /* getUserInfo */
        case 'getUserInfoAction':
            return Object.assign({}, state, {
                getUserInfoState: requestState.LOADING,
            })
        case 'getUserInfoAction_SUCCESS':
            if (response && response.res_code == 1) {
                return Object.assign({}, state, {
                    getUserInfoState: requestState.SUCCESS,
                    userInfo: response.msg
                });
            } else {
                return handleReducerError(action.type, state, response, {
                    getUserInfoState: requestState.FAIL,
                    getUserInfoErrorObj: response,
                });
            }
        case 'getUserInfoAction_FAIL':
            return handleReducerError(action.type, state, response, {
                getUserInfoState: requestState.FAIL,
                getUserInfoErrorObj: action.error,
            });
        case 'resetGetUserInfoState':
            return Object.assign({}, state, {
                getUserInfoState: requestState.IDLE,
            });

        default:
            return state;
    }
}