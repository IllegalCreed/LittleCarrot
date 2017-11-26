/**
 * @providesModule ExposureDetailPage
 */

import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	View
} from 'react-native';

import { NavigationActions } from 'react-navigation'
import { Button } from 'antd-mobile';

export default class ExposureDetailPage extends Component {
	static navigationOptions = ({ navigation }) => {
		const { state, setParams } = navigation;
		return {
			title: '曝光详情'
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
				<Button type="primary">告诉朋友</Button>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		padding: 20,
	},
});