/**
 * @providesModule ExposureExperiencePage
 */

import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	View
} from 'react-native';

import { NavigationActions } from 'react-navigation'
import { Button } from 'antd-mobile';

export default class ExposureExperiencePage extends Component {
	static navigationOptions = ({ navigation }) => {
		const { state, setParams } = navigation;
		return {
			title: '被骗经历'
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
				<Button type="primary" onClick={this.navigateTo.bind(this, 'ExposureDetail')}>曝光详情</Button>
				<Button type="primary" onClick={this.navigateTo.bind(this, 'ExposurePublish')}>我要曝光</Button>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		padding: 20,
	},
});