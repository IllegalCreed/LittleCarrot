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
    getBannerState: requestState.IDLE,
    getBannerErrorObj: null,

    banners: []
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
        /* getBanner */
        case 'getBannerAction':
            return Object.assign({}, state, {
                getBannerState: requestState.LOADING,
            })
        case 'getBannerAction_SUCCESS':
            if (response && response.res_code == 1) {
                return Object.assign({}, state, {
                    getBannerState: requestState.SUCCESS,
                    banners: response.msg
                });
            } else {
                return handleReducerError(action.type, state, response, {
                    getBannerState: requestState.FAIL,
                    getBannerErrorObj: response,
                });
            }
        case 'getBannerAction_FAIL':
            return handleReducerError(action.type, state, response, {
                getBannerState: requestState.FAIL,
                getBannerErrorObj: action.error,
            });
        default:
            return state;
    }
}