/**
 * @providesModule CircularAccusationResultPage
 */

import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	View
} from 'react-native';

import { NavigationActions } from 'react-navigation'
import { Button } from 'antd-mobile';

export default class CircularAccusationResultPage extends Component {
	static navigationOptions = ({ navigation }) => {
		const { state, setParams } = navigation;
		return {
			title: '举报成功'
		};
	};

	componentDidMount() {

	}

	backTo = () => {
		let { CircularDetailPageKey } = this.props.navigation.state.params;
		this.props.navigation.goBack(CircularDetailPageKey);
	}

	render() {
		const { state } = this.props.navigation;
		return (
			<View style={styles.container}>
				<Button type="primary" onClick={this.backTo}>返回首页</Button>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		padding: 20,
	},
});