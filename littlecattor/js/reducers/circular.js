/** 
 * @providesModule CircularReducer
 */

import {
    handleReducerError,
    requestState
} from 'ReducerCommon';

export const InitialCircularState = {
    getCircularListState: requestState.IDLE,
    getCircularListErrorObj: null,

    getCircularTagListState: requestState.IDLE,
    getCircularTagListErrorObj: null,

    publishCircularState: requestState.IDLE,
    publishCircularErrorObj: null,

    getCircularDetailState: requestState.IDLE,
    getCircularDetailErrorObj: null,

    circularList: [],
    tagList: [],
    circularDetail: {},
};

export function circular(state = InitialCircularState, action) {
    const response = action.payload ? action.payload.data : null;
    switch (action.type) {
        /* getCircularList */
        case 'getCircularListAction':
            return Object.assign({}, state, {
                getCircularListState: requestState.LOADING,
            })
        case 'getCircularListAction_SUCCESS':
            if (response && response.res_code == 1) {
                if (action.meta.previousAction.payload.request.data.page_index == 0) {
                    return Object.assign({}, state, {
                        getCircularListState: requestState.SUCCESS,
                        circularList: response.msg
                    });
                } else {
                    return Object.assign({}, state, {
                        getCircularListState: requestState.SUCCESS,
                        circularList: state.circularList.concat(response.msg)
                    });
                }
            } else {
                return handleReducerError(action.type, state, response, {
                    getCircularListState: requestState.FAIL,
                    getCircularListErrorObj: response,
                });
            }
        case 'getCircularListAction_FAIL':
            return handleReducerError(action.type, state, response, {
                getCircularListState: requestState.FAIL,
                getCircularListErrorObj: action.error,
            });
        case 'resetGetCircularListState':
            return Object.assign({}, state, {
                getCircularListState: requestState.IDLE,
            });

        /* getCircularTagList */
        case 'getCircularTagListAction':
            return Object.assign({}, state, {
                getCircularTagListState: requestState.LOADING,
            })
        case 'getCircularTagListAction_SUCCESS':
            if (response && response.res_code == 1) {
                return Object.assign({}, state, {
                    getCircularTagListState: requestState.SUCCESS,
                    tagList: response.msg
                });
            } else {
                return handleReducerError(action.type, state, response, {
                    getCircularTagListState: requestState.FAIL,
                    getCircularTagListErrorObj: response,
                });
            }
        case 'getCircularTagListAction_FAIL':
            return handleReducerError(action.type, state, response, {
                getCircularTagListState: requestState.FAIL,
                getCircularTagListErrorObj: action.error,
            });
        case 'resetGetCircularTagListState':
            return Object.assign({}, state, {
                getCircularTagListState: requestState.IDLE,
            });


        /* publishCircular */
        case 'publishCircularAction':
            return Object.assign({}, state, {
                publishCircularState: requestState.LOADING,
            })
        case 'publishCircularAction_SUCCESS':
            if (response && response.res_code == 1) {
                return Object.assign({}, state, {
                    publishCircularState: requestState.SUCCESS,
                });
            } else {
                return handleReducerError(action.type, state, response, {
                    publishCircularState: requestState.FAIL,
                    publishCircularErrorObj: response,
                });
            }
        case 'publishCircularAction_FAIL':
            return handleReducerError(action.type, state, response, {
                publishCircularState: requestState.FAIL,
                publishCircularErrorObj: action.error,
            });
        case 'resetPublishCircularState':
            return Object.assign({}, state, {
                publishCircularState: requestState.IDLE,
            });

        /* getCircularDetail */
        case 'getCircularDetailAction':
            return Object.assign({}, state, {
                getCircularDetailState: requestState.LOADING,
            })
        case 'getCircularDetailAction_SUCCESS':
            if (response && response.res_code == 1) {
                return Object.assign({}, state, {
                    getCircularDetailState: requestState.SUCCESS,
                    circularDetail: response.msg
                });
            } else {
                console.log(response)
                return handleReducerError(action.type, state, response, {
                    getCircularDetailState: requestState.FAIL,
                    getCircularDetailErrorObj: response,
                });
            }
        case 'getCircularDetailAction_FAIL':
            return handleReducerError(action.type, state, response, {
                getCircularDetailState: requestState.FAIL,
                getCircularDetailErrorObj: action.error,
            });
        case 'resetGetCircularDetailState':
            return Object.assign({}, state, {
                getCircularDetailState: requestState.IDLE,
            })

        default:
            return state;
    }
}