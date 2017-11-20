/**
 * @providesModule Router
 */

import { StackNavigator, TabNavigator } from 'react-navigation';

import LoginPage from 'LoginPage';

import ExposurePage from 'ExposurePage';
import MinePage from 'MinePage';

import CircularPage from 'CircularPage';
import CircularDetailPage from 'CircularDetailPage';

export const HomeNavigator = TabNavigator({
	Circular:{
		screen: CircularPage,
	},
	Exposure:{
		screen: ExposurePage,
	},
	Mine:{
		screen: MinePage,
	}
})


export const RootNavigator = StackNavigator({
	Login: {
		screen: LoginPage,
	},
	Home: {
		screen: HomeNavigator,
	},
	CircularDetailPage: {
		screen: CircularDetailPage,
	},
}, {
	initialRouteName: 'Login',
});

