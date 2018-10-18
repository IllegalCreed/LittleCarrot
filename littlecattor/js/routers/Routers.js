import React, { Component } from 'react';

import {
	Image,
	Platform
} from 'react-native';
import { createStackNavigator, createBottomTabNavigator,createMaterialTopTabNavigator} from 'react-navigation';

import IndexPage from '../pages/login/IndexPage';
import LoginPage from '../pages/login/LoginPage';
import RegisterPage from '../pages/login/RegisterPage';
import ForgetPasswordPage from '../pages/login/ForgetPasswordPage';
import UserAgreement from '../pages/login/UserAgreement';

import MinePage from '../pages/mine/MinePage';
import UserInfoPage from '../pages/mine/UserInfoPage';
import MyCircularPage from '../pages/mine/MyCircularPage';
import MyExposurePage from '../pages/mine/MyExposurePage';
import MyAccusationPage from '../pages/mine/MyAccusationPage';
import AccusationDetailPage from '../pages/mine/AccusationDetailPage';
import AboutPage from '../pages/mine/AboutPage';

import ExposurePublishPage from '../pages/exposure/ExposurePublishPage';
import ExposurePublishResultPage from '../pages/exposure/ExposurePublishResultPage';
import ExposureSearchPage from '../pages/exposure/ExposureSearchPage';
import ExposureCircularPage from '../pages/exposure/ExposureCircularPage';
import ExposureDetailPage from '../pages/exposure/ExposureDetailPage';
import ExposureExperiencePage from '../pages/exposure/ExposureExperiencePage';

import CircularPage from '../pages/circular/CircularPage';
import CircularDetailPage from '../pages/circular/CircularDetailPage';
import CircularPublishPage from '../pages/circular/CircularPublishPage';
import CircularAccusationPage from '../pages/circular/CircularAccusationPage';
import CircularAccusationResultPage from '../pages/circular/CircularAccusationResultPage';

export const ExposureNavigator = createMaterialTopTabNavigator({
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
		swipeEnabled: false,
		animationEnabled: true,
		tabBarOptions: {
			style: { paddingTop: Platform.OS === 'ios' ? 20 : 0, backgroundColor: '#f5317f', }
		}
	})

export const HomeNavigator = createBottomTabNavigator({
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
					style={{ tintColor: tintColor, width: 20, height: 25 }}
				/>
			),
		})
	},
	Mine: {
		screen: MinePage,
	}
}, {
		initialRouteName: 'Circular',
		tabBarOptions: {
			activeTintColor: '#f5317f',
			labelStyle: { fontSize: 14 },
			style: {
				backgroundColor: '#fff',
			},
		}
	})

export const RootNavigator = createStackNavigator({
	Index: {
		screen: IndexPage,
	},
	Login: {
		screen: LoginPage,
	},
	Register: {
		screen: RegisterPage,
	},
	ForgetPassword: {
		screen: ForgetPasswordPage,
	},
	UserAgreement: {
		screen: UserAgreement,
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
	About: {
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
		initialRouteName: 'Index',
	});


	