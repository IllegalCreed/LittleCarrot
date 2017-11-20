/**
 * @providesModule CircularDetailPage
 */

import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	View,
	Button
} from 'react-native';
import { NavigationActions } from 'react-navigation'

export default class CircularDetailPage extends Component<{}> {
	componentDidMount() {

	}

	render() {
		const { state } = this.props.navigation;
		return (
			<View>
				<Text>{state.routeName}</Text>
			</View>
		)
	}
}