/**
 * @providesModule Router
 */
import React, { Component } from 'react';
import {
	Image
} from 'react-native';
import { StackNavigator, TabNavigator, TabBarBottom, TabBarTop } from 'react-navigation';

import LoginPage from 'LoginPage';
import RegisterPage from 'RegisterPage';
import ForgetPasswordPage from 'ForgetPasswordPage';

import MinePage from 'MinePage';
import UserInfoPage from 'UserInfoPage';
import MyCircularPage from 'MyCircularPage';
import MyExposurePage from 'MyExposurePage';
import MyAccusationPage from 'MyAccusationPage';
import AccusationDetailPage from 'AccusationDetailPage';
import AboutPage from 'AboutPage';

import ExposurePublishPage from 'ExposurePublishPage';
import ExposurePublishResultPage from 'ExposurePublishResultPage';
import ExposureSearchPage from 'ExposureSearchPage';
import ExposureCircularPage from 'ExposureCircularPage';
import ExposureDetailPage from 'ExposureDetailPage';
import ExposureExperiencePage from 'ExposureExperiencePage';

import CircularPage from 'CircularPage';
import CircularDetailPage from 'CircularDetailPage';
import CircularPublishPage from 'CircularPublishPage';
import CircularAccusationPage from 'CircularAccusationPage';
import CircularAccusationResultPage from 'CircularAccusationResultPage';

export const ExposureNavigator = TabNavigator({
	ExposureSearch: {
		screen: ExposureSearchPage,
	},
	ExposureExperience: {
		screen: ExposureExperiencePage,
	},
	ExposureCircular: {
		screen: ExposureCircularPage,
	}
}, {
		initialRouteName: 'ExposureExperience',
		tabBarComponent: TabBarTop,
		tabBarPosition: 'top',
		swipeEnabled: false,
		animationEnabled: true,
		tabBarOptions: {
			style: { paddingTop: 20 }
		}
	})

export const HomeNavigator = TabNavigator({
	Circular: {
		screen: CircularPage,
	},
	Exposure: {
		screen: ExposureNavigator,
		navigationOptions: ({ navigation }) => ({
			title: '曝光',
			tabBarIcon: ({ tintColor }) => (
				<Image
					source={require('./img/browse.png')}
					style={{ tintColor: tintColor, width: 30, height: 30 }}
				/>
			),
		})
	},
	Mine: {
		screen: MinePage,
	}
}, {
		initialRouteName: 'Circular',
		tabBarComponent: TabBarBottom,
		tabBarPosition: 'bottom',
		swipeEnabled: false,
		animationEnabled: true,
		tabBarOptions: {
			activeTintColor: '#f5317f',
			labelStyle: { fontSize: 12 }
		}
	})

export const RootNavigator = StackNavigator({
	Login: {
		screen: LoginPage,
	},
	Register: {
		screen: RegisterPage,
	},
	ForgetPassword: {
		screen: ForgetPasswordPage,
	},
	Home: {
		screen: HomeNavigator,
		navigationOptions: ({ navigation }) => ({
			header: null,
		})
	},
	UserInfo: {
		screen: UserInfoPage,
	},
	MyCircular: {
		screen: MyCircularPage,
	},
	MyExposure: {
		screen: MyExposurePage,
	},
	About:{
		screen: AboutPage,
	},
	MyAccusation: {
		screen: MyAccusationPage,
	},
	AccusationDetail: {
		screen: AccusationDetailPage,
	},
	ExposurePublish: {
		screen: ExposurePublishPage,
	},
	ExposurePublishResult: {
		screen: ExposurePublishResultPage,
	},
	ExposureDetail: {
		screen: ExposureDetailPage,
	},
	CircularPublish: {
		screen: CircularPublishPage,
	},
	CircularAccusation: {
		screen: CircularAccusationPage,
	},
	CircularAccusationResult: {
		screen: CircularAccusationResultPage,
	},
	CircularDetail: {
		screen: CircularDetailPage,
	},
}, {
		initialRouteName: 'Login',
	});

