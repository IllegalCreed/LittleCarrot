/**
 * @providesModule ForgetPasswordPage
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
	InputItem
} from 'antd-mobile';

import { NavigationActions } from 'react-navigation';
import { Spacing } from 'AntDesignConfig';

export default class ForgetPasswordPage extends Component {
	static navigationOptions = ({ navigation }) => {
		const { state, setParams } = navigation;
		return {
			title: '忘记密码'
		};
	};

	componentDidMount() {

	}

	navigateTo = (routeName) => {
		this.props.navigation.navigate(routeName)
	}

	backTo = () => {
		this.props.navigation.goBack();
	}

	getCode = () => {

	}

	render() {
		const { state } = this.props.navigation;
		return (
			<View style={styles.container}>
				<List style={{ alignSelf: 'stretch', marginTop: 64 }}>
					<InputItem placeholder='请输入手机号' clear>手机号</InputItem>
					<InputItem type='number' placeholder='请输入验证码' clear extra='获取验证码' onExtraClick={this.getCode}>验证码</InputItem>
					<InputItem placeholder='请输入新密码' clear>新密码</InputItem>
				</List>
				<View style={styles.buttonContainer}>
					<Button type="primary" onClick={this.backTo}>提交</Button>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "column",
		paddingTop: 64,
		backgroundColor: '#f4f3fd',
	},
	buttonContainer: {
		position: 'absolute',
		bottom: 64,
		left: 0,
		right: 0,
		flex: 1,
		flexDirection: "column",
		alignSelf: 'stretch',
		paddingHorizontal: Spacing.middle,
	},
});