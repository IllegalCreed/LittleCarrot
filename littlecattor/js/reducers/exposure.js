/** 
 * @providesModule ExposureReducer
 */

import {
    handleReducerError,
    requestState
} from 'ReducerCommon';

export const InitialExposureState = {
    getExposureListState: requestState.IDLE,
    getExposureListErrorObj: null,

    publishExposureState: requestState.IDLE,
    publishExposureErrorObj: null,

    getExposureDetailState: requestState.IDLE,
    getExposureDetailErrorObj: null,

    supportExposureState: requestState.IDLE,
    supportExposureErrorObj: null,

    exposureList: [],
    exposureDetail: {},
};

export function exposure(state = InitialExposureState, action) {
    const response = action.payload ? action.payload.data : null;
    switch (action.type) {
        /* getExposureList */
        case 'getExposureListAction':
            return Object.assign({}, state, {
                getExposureListState: requestState.LOADING,
            })
        case 'getExposureListAction_SUCCESS':
            if (response && response.res_code == 1) {
                if (action.meta.previousAction.payload.request.data.page_index == 0) {
                    return Object.assign({}, state, {
                        getExposureListState: requestState.SUCCESS,
                        exposureList: response.msg
                    });
                } else {
                    return Object.assign({}, state, {
                        getExposureListState: requestState.SUCCESS,
                        exposureList: state.exposureList.concat(response.msg)
                    });
                }
            } else {
                return handleReducerError(action.type, state, response, {
                    getExposureListState: requestState.FAIL,
                    getExposureListErrorObj: response,
                });
            }
        case 'getExposureListAction_FAIL':
            return handleReducerError(action.type, state, response, {
                getExposureListState: requestState.FAIL,
                getExposureListErrorObj: action.error,
            });
        case 'resetGetExposureListState':
            return Object.assign({}, state, {
                getExposureListState: requestState.IDLE,
            });

        /* publishExposure */
        case 'publishExposureAction':
            return Object.assign({}, state, {
                publishExposureState: requestState.LOADING,
            })
        case 'publishExposureAction_SUCCESS':
            if (response && response.res_code == 1) {
                return Object.assign({}, state, {
                    publishExposureState: requestState.SUCCESS,
                });
            } else {
                return handleReducerError(action.type, state, response, {
                    publishExposureState: requestState.FAIL,
                    publishExposureErrorObj: response,
                });
            }
        case 'publishExposureAction_FAIL':
            return handleReducerError(action.type, state, response, {
                publishExposureState: requestState.FAIL,
                publishExposureErrorObj: action.error,
            });
        case 'resetPublishExposureState':
            return Object.assign({}, state, {
                publishExposureState: requestState.IDLE,
            });

        /* getExposureDetail */
        case 'getExposureDetailAction':
            return Object.assign({}, state, {
                getExposureDetailState: requestState.LOADING,
            })
        case 'getExposureDetailAction_SUCCESS':
            if (response && response.res_code == 1) {
                return Object.assign({}, state, {
                    getExposureDetailState: requestState.SUCCESS,
                    exposureDetail: response.msg
                });
            } else {
                return handleReducerError(action.type, state, response, {
                    getExposureDetailState: requestState.FAIL,
                    getExposureDetailErrorObj: response,
                });
            }
        case 'getExposureDetailAction_FAIL':
            return handleReducerError(action.type, state, response, {
                getExposureDetailState: requestState.FAIL,
                getExposureDetailErrorObj: action.error,
            });
        case 'resetGetExposureDetailState':
            return Object.assign({}, state, {
                getExposureDetailState: requestState.IDLE,
            })

        /* supportExposure */
        case 'supportExposureAction':
            return Object.assign({}, state, {
                supportExposureState: requestState.LOADING,
            })
        case 'supportExposureAction_SUCCESS':
            if (response && response.res_code == 1) {
                console.log(response)
                return Object.assign({}, state, {
                    supportExposureState: requestState.SUCCESS,
                });
            } else {
                return handleReducerError(action.type, state, response, {
                    supportExposureState: requestState.FAIL,
                    supportExposureErrorObj: response,
                });
            }
        case 'supportExposureAction_FAIL':
            return handleReducerError(action.type, state, response, {
                supportExposureState: requestState.FAIL,
                supportExposureErrorObj: action.error,
            });
        case 'resetSupportExposureState':
            return Object.assign({}, state, {
                supportExposureState: requestState.IDLE,
            })

        default:
            return state;
    }
}