/**
 * @providesModule LoginPage
 */

import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	View
} from 'react-native';
import {
	List,
	Button,
	InputItem,
} from 'antd-mobile';

import { NavigationActions } from 'react-navigation';
import { Spacing } from 'AntDesignConfig';


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
				<Text style={styles.logo}>LOGO</Text>
				<List style={{ alignSelf: 'stretch', marginTop: 64 }}>
					<InputItem placeholder='请输入手机号' clear>手机号</InputItem>
					<InputItem type='password' placeholder='请输入密码' clear>密码</InputItem>
				</List>
				<Text onPress={this.navigateTo.bind(this, 'ForgetPassword')} style={styles.link}>忘记密码</Text>
				<View style={styles.buttonContainer}>
					<Button type="primary" onClick={this.navigateTo.bind(this, 'Home')}>登录</Button>
					<Button style={{ marginTop: Spacing.small }} type="ghost" onClick={this.navigateTo.bind(this, 'Register')}>注册</Button>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "column",
		alignItems: "center",
		paddingTop: 128,
		backgroundColor: '#f4f3fd',
	},
	logo: {
		fontSize: 48,
		fontWeight: 'bold',
	},
	link: {
		color: '#108ee9',
		marginTop: Spacing.middle,
		marginRight: Spacing.middle,
		alignSelf: 'flex-end',
	},
	buttonContainer: {
		flex: 1,
		flexDirection: "column",
		alignSelf: 'stretch',
		paddingHorizontal: Spacing.middle,
		marginTop: 64,
	},
});