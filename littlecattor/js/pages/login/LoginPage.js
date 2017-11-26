/**
 * @providesModule LoginPage
 */

import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	View
} from 'react-native';

import { NavigationActions } from 'react-navigation'
import { Button } from 'antd-mobile';

export default class LoginPage extends Component {
	static navigationOptions = ({ navigation }) => {
		const { state, setParams } = navigation;
		return {
			header: null
		};
	};

	componentDidMount() {

	}

	navigateTo = (routeName) => {
		if (routeName == 'Home') {
			const resetAction = NavigationActions.reset({
				index: 0,
				actions: [
					NavigationActions.navigate({ routeName })
				]
			})
			this.props.navigation.dispatch(resetAction);
		} else {
			this.props.navigation.navigate(routeName)
		}
	}

	render() {
		const { state } = this.props.navigation;
		return (
			<View style={styles.container}>
				<Text>登录页</Text>
				<Button type="primary" onClick={this.navigateTo.bind(this, 'Home')}>登录</Button>
				<Button type="primary" onClick={this.navigateTo.bind(this, 'ForgetPassword')}>忘记密码</Button>
				<Button type="primary" onClick={this.navigateTo.bind(this, 'Register')}>注册</Button>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		padding: 20,
	},
});