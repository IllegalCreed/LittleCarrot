import {
    handleReducerError,
    requestState
} from './common';

export const InitialUserState = {
    loginState: requestState.IDLE,
    loginErrorObj: null,

    registerState: requestState.IDLE,
    registerErrorObj: null,

    resetPwdState: requestState.IDLE,
    resetPwdErrorObj: null,

    updateUserInfoState: requestState.IDLE,
    updateUserInfoErrorObj: null,

    getUserInfoState: requestState.IDLE,
    getUserInfoErrorObj: null,

    getMyCircularListState: requestState.IDLE,
    getMyCircularListErrorObj: null,

    getMyExposureListState: requestState.IDLE,
    getMyExposureListErrorObj: null,

    isLogin: false,
    phone: null,
    token: null,
    userInfo: {},
    myCircularList: [],
    myExposureList: [],
};

export function user(state = InitialUserState, action) {
    const response = action.payload ? action.payload.data : null;
    switch (action.type) {
        /* logout */
        case 'logoutAction':
            return Object.assign({}, state, {
                isLogin: false,
                phone: null,
                token: null,
                userInfo: {}
            })
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

        /* register */
        case 'registerAction':
            return Object.assign({}, state, {
                registerState: requestState.LOADING,
            })
        case 'registerAction_SUCCESS':
            if (response && response.res_code == 1) {
                return Object.assign({}, state, {
                    registerState: requestState.SUCCESS,
                    isLogin: true,
                    token: response.msg,
                    phone: action.meta.previousAction.phone
                });
            } else {
                return handleReducerError(action.type, state, response, {
                    registerState: requestState.FAIL,
                    registerErrorObj: response,
                    isLogin: false,
                    token: null,
                    phone: null,
                });
            }
        case 'registerAction_FAIL':
            return handleReducerError(action.type, state, response, {
                registerState: requestState.FAIL,
                registerErrorObj: action.error,
                isLogin: false,
                token: null,
                phone: null,
            });
        case 'resetRegisterState':
            return Object.assign({}, state, {
                registerState: requestState.IDLE,
            });

        /* resetPwd */
        case 'resetPwdAction':
            return Object.assign({}, state, {
                resetPwdState: requestState.LOADING,
            })
        case 'resetPwdAction_SUCCESS':
            if (response && response.res_code == 1) {
                return Object.assign({}, state, {
                    resetPwdState: requestState.SUCCESS,
                });
            } else {
                return handleReducerError(action.type, state, response, {
                    resetPwdState: requestState.FAIL,
                    resetPwdErrorObj: response,
                });
            }
        case 'resetPwdAction_FAIL':
            return handleReducerError(action.type, state, response, {
                resetPwdState: requestState.FAIL,
                resetPwdErrorObj: action.error,
            });
        case 'resetResetPwdState':
            return Object.assign({}, state, {
                resetPwdState: requestState.IDLE,
            });

        /* sendSMS */
        case 'sendSMSAction':
            return Object.assign({}, state, {
                sendSMSState: requestState.LOADING,
            })
        case 'sendSMSAction_SUCCESS':
            if (response && response.res_code == 1) {
                return Object.assign({}, state, {
                    sendSMSState: requestState.SUCCESS,
                });
            } else {
                return handleReducerError(action.type, state, response, {
                    sendSMSState: requestState.FAIL,
                    sendSMSSErrorObj: response,
                });
            }
        case 'sendSMSAction_FAIL':
            return handleReducerError(action.type, state, response, {
                sendSMSState: requestState.FAIL,
                sendSMSSErrorObj: action.error,
            });
        case 'resetSendSMSState':
            return Object.assign({}, state, {
                sendSMSState: requestState.IDLE,
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

        /* getMyCircularList */
        case 'getMyCircularListAction':
            return Object.assign({}, state, {
                getMyCircularListState: requestState.LOADING,
            })
        case 'getMyCircularListAction_SUCCESS':
            if (response && response.res_code == 1) {
                if (action.meta.previousAction.payload.request.data.page_index == 0) {
                    return Object.assign({}, state, {
                        getMyCircularListState: requestState.SUCCESS,
                        myCircularList: response.msg
                    });
                } else {
                    return Object.assign({}, state, {
                        getMyCircularListState: requestState.SUCCESS,
                        myCircularList: state.myCircularList.concat(response.msg)
                    });
                }
            } else {
                return handleReducerError(action.type, state, response, {
                    getMyCircularListState: requestState.FAIL,
                    getMyCircularListErrorObj: response,
                });
            }
        case 'getMyCircularListAction_FAIL':
            return handleReducerError(action.type, state, response, {
                getMyCircularListState: requestState.FAIL,
                getMyCircularListErrorObj: action.error,
            });
        case 'resetGetMyCircularListState':
            return Object.assign({}, state, {
                getMyCircularListState: requestState.IDLE,
            });

        /* getMyExposureList */
        case 'getMyExposureListAction':
            return Object.assign({}, state, {
                getMyExposureListState: requestState.LOADING,
            })
        case 'getMyExposureListAction_SUCCESS':
            if (response && response.res_code == 1) {
                if (action.meta.previousAction.payload.request.data.page_index == 0) {
                    return Object.assign({}, state, {
                        getMyExposureListState: requestState.SUCCESS,
                        myExposureList: response.msg
                    });
                } else {
                    return Object.assign({}, state, {
                        getMyExposureListState: requestState.SUCCESS,
                        myExposureList: state.myExposureList.concat(response.msg)
                    });
                }
            } else {
                return handleReducerError(action.type, state, response, {
                    getMyExposureListState: requestState.FAIL,
                    getMyExposureListErrorObj: response,
                });
            }
        case 'getMyExposureListAction_FAIL':
            return handleReducerError(action.type, state, response, {
                getMyExposureListState: requestState.FAIL,
                getMyExposureListErrorObj: action.error,
            });
        case 'resetGetMyExposureListState':
            return Object.assign({}, state, {
                getMyExposureListState: requestState.IDLE,
            });

        default:
            return state;
    }
}