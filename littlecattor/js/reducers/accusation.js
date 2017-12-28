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

    accusationTypes: []
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
        default:
            return state;
    }
}