/**
 * @providesModule ReduxConfig
 */
import {
	AsyncStorage,
} from 'react-native';

import {
	createStore,
	applyMiddleware,
	compose
} from 'redux'
import thunkMiddleware from 'redux-thunk';
import axiosMiddleware from 'redux-axios-middleware';

import {
	persistStore,
	persistCombineReducers,
} from 'redux-persist';
import createFilter from 'redux-persist-transform-filter';
import createExpirationTransform from 'redux-persist-transform-expire';

import Reducers from 'Reducers';
import {
	InitialHelloState
} from 'HelloReducer';
import {
	InitialUserState
} from 'UserReducer';

const helloFilter = createFilter(
	'hello', 
	[
		'hello'
	]
);

const userFilter = createFilter(
	'user', 
	[
		'isLogin',
		'phone',
		'token',
	]
);

//缓存时间 30天*24小时*60分钟*60秒*1000毫秒
const expireSpan = 30 * 24 * 60 * 60 * 1000;

const expireTransform = createExpirationTransform({
	'hello': {
		expireSpan,
		default: InitialHelloState
	},
	'user': {
		expireSpan,
		default: InitialUserState
	}
});

const persistConfig = {
	key: 'root',
	whitelist: ['hello','user'],
	storage: AsyncStorage,
	transforms: [
		helloFilter,
		userFilter,
		expireTransform
	]
};

const reducer = persistCombineReducers(persistConfig, Reducers);

global.reduxStore = createStore(
	reducer,
	compose(
		applyMiddleware(thunkMiddleware, axiosMiddleware(global.axiosClient)),
	)
);

global.persistor = persistStore(global.reduxStore, null, (err, restoredState) => {
	if (err) {
		console.log('rehydration error:' + err);
	} else {
		console.log('rehydration complete');
	}
});
