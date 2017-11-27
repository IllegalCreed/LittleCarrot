/**
 * @providesModule MinePage
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';

import { NavigationActions } from 'react-navigation'
import { Button } from 'antd-mobile';

export default class MinePage extends Component {
  static navigationOptions = ({ navigation }) => {
		const { state, setParams } = navigation;
		return {
      title: '我的',
      tabBarIcon: ({ tintColor }) => (
				<Image
					source={require('../../routers/img/account.png')}
					style={{ tintColor: tintColor, width: 26, height: 26 }}
				/>
			),
		};
  };

  componentDidMount() {

  }

  navigateTo = (routeName, params) => {
    this.props.navigation.navigate(routeName, params)
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>我的页面</Text>
        <Button type="primary" onClick={this.navigateTo.bind(this, 'UserInfo', { saveAction: 'Back' })}>修改信息</Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});