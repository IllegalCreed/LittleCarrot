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

    isLogin: false,
    phone: null,
    token: null,
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
        default:
            return state;
    }
}