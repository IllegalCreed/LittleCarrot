/** 
 * @providesModule AccusationReducer
 */

import {
    handleReducerError,
    requestState
} from 'ReducerCommon';

export const InitialAccusationState = {
    getAccusationTypeListState: requestState.IDLE,
    getAccusationTypeListErrorObj: null,

    addAccusationState: requestState.IDLE,
    addAccusationErrorObj: null,

    getMyAccusationListState: requestState.IDLE,
    getMyAccusationListErrorObj: null,

    getAccusationDetailState: requestState.IDLE,
    getAccusationDetailErrorObj: null,

    accusationTypes: [],
    myAccusationList: [],
    accusationDetail: {},
};


export function accusation(state = InitialAccusationState, action) {
    const response = action.payload ? action.payload.data : null;
    switch (action.type) {
        /* getAccusationTypeList */
        case 'getAccusationTypeListAction':
            return Object.assign({}, state, {
                getAccusationTypeListState: requestState.LOADING,
            })
        case 'getAccusationTypeListAction_SUCCESS':
            if (response && response.res_code == 1) {
                return Object.assign({}, state, {
                    getAccusationTypeListState: requestState.SUCCESS,
                    accusationTypes: response.msg
                });
            } else {
                return handleReducerError(action.type, state, response, {
                    getAccusationTypeListState: requestState.FAIL,
                    getAccusationTypeListErrorObj: response,
                });
            }
        case 'getAccusationTypeListAction_FAIL':
            return handleReducerError(action.type, state, response, {
                getAccusationTypeListState: requestState.FAIL,
                getAccusationTypeListErrorObj: action.error,
            });
        case 'resetGetAccusationTypeListState':
            return Object.assign({}, state, {
                getAccusationTypeListState: requestState.IDLE,
            });

        /* addAccusation */
        case 'addAccusationAction':
            return Object.assign({}, state, {
                addAccusationState: requestState.LOADING,
            })
        case 'addAccusationAction_SUCCESS':
            if (response && response.res_code == 1) {
                return Object.assign({}, state, {
                    addAccusationState: requestState.SUCCESS,
                });
            } else {
                return handleReducerError(action.type, state, response, {
                    addAccusationState: requestState.FAIL,
                    addAccusationErrorObj: response,
                });
            }
        case 'addAccusationAction_FAIL':
            return handleReducerError(action.type, state, response, {
                addAccusationState: requestState.FAIL,
                addAccusationErrorObj: action.error,
            });
        case 'resetAddAccusationState':
            return Object.assign({}, state, {
                addAccusationState: requestState.IDLE,
            });

        /* getMyAccusationList */
        case 'getMyAccusationListAction':
            return Object.assign({}, state, {
                getMyAccusationListState: requestState.LOADING,
            })
        case 'getMyAccusationListAction_SUCCESS':
            if (response && response.res_code == 1) {
                if (action.meta.previousAction.payload.request.data.page_index == 0) {
                    return Object.assign({}, state, {
                        getMyAccusationListState: requestState.SUCCESS,
                        myAccusationList: response.msg
                    });
                } else {
                    return Object.assign({}, state, {
                        getMyAccusationListState: requestState.SUCCESS,
                        myAccusationList: state.myAccusationList.concat(response.msg)
                    });
                }
            } else {
                return handleReducerError(action.type, state, response, {
                    getMyAccusationListState: requestState.FAIL,
                    getMyAccusationListErrorObj: response,
                });
            }
        case 'getMyAccusationListAction_FAIL':
            return handleReducerError(action.type, state, response, {
                getMyAccusationListState: requestState.FAIL,
                getMyAccusationListErrorObj: action.error,
            });
        case 'resetGetMyAccusationListState':
            return Object.assign({}, state, {
                getMyAccusationListState: requestState.IDLE,
            });

        /* getAccusationDetail */
        case 'getAccusationDetailAction':
            return Object.assign({}, state, {
                getAccusationDetailState: requestState.LOADING,
            })
        case 'getAccusationDetailAction_SUCCESS':
            if (response && response.res_code == 1) {
                return Object.assign({}, state, {
                    getAccusationDetailState: requestState.SUCCESS,
                    accusationDetail: response.msg
                });
            } else {
                return handleReducerError(action.type, state, response, {
                    getAccusationDetailState: requestState.FAIL,
                    getAccusationDetailErrorObj: response,
                });
            }
        case 'getAccusationDetailAction_FAIL':
            return handleReducerError(action.type, state, response, {
                getAccusationDetailState: requestState.FAIL,
                getAccusationDetailErrorObj: action.error,
            });
        case 'resetGetAccusationDetailState':
            return Object.assign({}, state, {
                getAccusationDetailState: requestState.IDLE,
            })

        default:
            return state;
    }
}