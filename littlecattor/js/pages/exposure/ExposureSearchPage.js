/**
 * @providesModule ExposureSearchPage
 */

import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	View
} from 'react-native';
import {
	Button,
	SearchBar,
} from 'antd-mobile';

import { NavigationActions } from 'react-navigation';


export default class ExposureSearchPage extends Component {
	static navigationOptions = ({ navigation }) => {
		const { state, setParams } = navigation;
		return {
			title: '微信查询'
		};
	};

	componentDidMount() {

	}

	navigateTo = (routeName) => {
		this.props.navigation.navigate(routeName)
	}

	render() {
		const { state } = this.props.navigation;
		return (
			<View style={styles.container}>
				<SearchBar placeholder="输入微信号" maxLength={20} />
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "column",
		backgroundColor: '#f4f3fd',
	},
});