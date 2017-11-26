/**
 * @providesModule UserInfoPage
 */

import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	View
} from 'react-native';

import { NavigationActions } from 'react-navigation'
import { Button } from 'antd-mobile';

export default class UserInfoPage extends Component {
	static navigationOptions = ({ navigation }) => {
		const { state, setParams } = navigation;
		return {
			title: '修改信息'
		};
	};

	componentDidMount() {

	}

	save = () => {
		var { saveAction } = this.props.navigation.state.params;
		if (saveAction == 'Home') {
			this.props.navigation.navigate(saveAction)
		}else{
			this.props.navigation.goBack();
		}
	}

	render() {
		return (
			<View style={styles.container}>
				<Button type="primary" onClick={this.save}>保存</Button>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		padding: 20,
	},
});