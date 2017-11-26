/**
 * @providesModule CircularPublishPage
 */

import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	View
} from 'react-native';

import { NavigationActions } from 'react-navigation'
import { Button } from 'antd-mobile';

export default class CircularPublishPage extends Component {
	static navigationOptions = ({ navigation }) => {
		const { state, setParams } = navigation;
		return {
			title: '通告发布'
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

	render() {
		const { state } = this.props.navigation;
		return (
			<View style={styles.container}>
				<Button type="primary" onClick={this.backTo}>发布</Button>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		padding: 20,
	},
});