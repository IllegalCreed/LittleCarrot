/**
 * @providesModule LoginPage
 */

import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	View
} from 'react-native';

import { NavigationActions } from 'react-navigation'
import { Button } from 'antd-mobile';

export default class LoginPage extends Component<{}> {
	componentDidMount() {

	}

	gotoHomePage = () => {
		const resetAction = NavigationActions.reset({
			index: 0,
			actions: [
				NavigationActions.navigate({ routeName: 'Home' })
			]
		})
		this.props.navigation.dispatch(resetAction);
		// this.props.navigation.navigate('Home')
	}

	render() {
		return (
			<View style={styles.container}>
				<Text>LoginPage</Text>
				<Button type="primary" onClick={this.gotoHomePage}>goto HomePage</Button>
			</View>
		);
	}
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});