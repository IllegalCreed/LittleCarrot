/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  View
} from 'react-native';

import {
  Provider
} from 'react-redux';

import {
  RootNavigator
} from 'Router';

import axiosConfig from 'AxiosConfig';
import reduxConfig from 'ReduxConfig';

import { PersistGate } from 'redux-persist/lib/integration/react'

export default class App extends Component<{}> {
  componentDidMount() {
    console.log('rendered')
  }

  render() {
    return (
      <Provider store={global.reduxStore}>
        <PersistGate persistor={global.persistor}>
          <RootNavigator />
        </PersistGate>
      </Provider>
    );
  }
}
