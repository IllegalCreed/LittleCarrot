/** 
 * @providesModule SystemReducer
 */

import {
    handleReducerError,
    requestState
} from 'ReducerCommon';

export const InitialSystemState = {
    updatePVCountState: requestState.IDLE,
    updatePVCountErrorObj: null,
};

export function system(state = InitialSystemState, action) {
    const response = action.payload ? action.payload.data : null;
    switch (action.type) {
        /* updatePVCount */
        case 'updatePVCountAction':
            return Object.assign({}, state, {
                updatePVCountState: requestState.LOADING,
            })
        case 'updatePVCountAction_SUCCESS':
            if (response && response.res_code == 1) {
                return Object.assign({}, state, {
                    updatePVCountState: requestState.SUCCESS,
                });
            } else {
                return handleReducerError(action.type, state, response, {
                    updatePVCountState: requestState.FAIL,
                    updatePVCountErrorObj: response,
                });
            }
        case 'updatePVCountAction_FAIL':
            return handleReducerError(action.type, state, response, {
                updatePVCountState: requestState.FAIL,
                updatePVCountErrorObj: action.error,
            });
        default:
            return state;
    }
}