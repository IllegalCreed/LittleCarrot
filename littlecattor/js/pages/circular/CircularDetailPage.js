/**
 * @providesModule CircularDetailPage
 */

import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	View
} from 'react-native';

import { NavigationActions } from 'react-navigation'
import { Button } from 'antd-mobile';

export default class CircularDetailPage extends Component {
	static navigationOptions = ({ navigation }) => {
		const { state, setParams } = navigation;
		return {
			title: '通告详情'
		};
	};

	componentDidMount() {

	}

	navigateTo = (routeName) => {
		this.props.navigation.navigate(routeName, { CircularDetailPageKey: this.props.navigation.state.key })
	}

	render() {
		const { state } = this.props.navigation;
		return (
			<View style={styles.container}>
				<Button type="primary" onClick={this.navigateTo.bind(this, 'CircularAccusation')}>举报</Button>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		padding: 20,
	},
});