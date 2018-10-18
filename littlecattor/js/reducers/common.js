export function handleReducerError(action, state, response, newState) {
    console.log("=====reducer_error=====")
	console.log(action);
	if (newState) {
		return Object.assign({}, state, newState);
	}
	else {
		return state;
	}
}

export const requestState = {
	IDLE:'idle',
	LOADING:'loading',
	SUCCESS:'success',
	FAIL:'fail',
}