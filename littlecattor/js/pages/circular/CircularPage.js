/**
 * @providesModule CircularPage
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import {
  Button
} from 'antd-mobile';

import { NavigationActions } from 'react-navigation';

import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { getHello } from 'Selectors';
import Actions from 'Actions';

class CircularPage extends Component {
  static navigationOptions = ({ navigation }) => {
		const { state, setParams } = navigation;
		return {
			title: '通告'
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
        <Text>通告页</Text>
        <Button type="primary" onClick={this.navigateTo.bind(this, 'CircularDetail')}>通告详情</Button>
        <Button type="primary" onClick={this.navigateTo.bind(this, 'CircularPublish')}>发布通告</Button>

        <Text>{this.props.hello}</Text>
        <Button onClick={() => {
          this.props.dispatch(Actions.helloAction());
        }}>set hello</Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
	container: {
		padding: 20,
	},
});

const CircularPageSelector = createSelector([getHello], (hello) => {
  return {
    hello
  };
});

export default connect(CircularPageSelector)(CircularPage);