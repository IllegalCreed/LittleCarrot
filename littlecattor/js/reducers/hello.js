/** 
 * @providesModule HelloReducer
 */

export const InitialHelloState = {
	hello: null
};

export function hello(state = InitialHelloState, action) {
	switch (action.type) {
		case 'helloAction':
			return Object.assign({}, state, {
				hello: 'hello'
			});
		default:
			return state;
	}
}