/**
 * @providesModule CircularPage
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { getHello } from 'Selectors';
import Actions from 'Actions';

class CircularPage extends Component<{}> {
  componentDidMount() {

  }

  gotoCircularDetailPage = () => {
    this.props.navigation.navigate('CircularDetailPage')
  }

  render() {
    const { state } = this.props.navigation;
    return (
      <View>
        <Text>{state.routeName}</Text>
        <Button onPress={this.gotoCircularDetailPage}
          title="goto CircularDetailPage"></Button>
        <Text>{this.props.hello}</Text>
        <Button onPress={() => {
          this.props.dispatch(Actions.helloAction());
        }}
          title="set hello"></Button>
      </View>
    );
  }
}

const CircularPageSelector = createSelector([getHello], (hello) => {
  return {
    hello
  };
});

export default connect(CircularPageSelector)(CircularPage);