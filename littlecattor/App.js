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

import { PersistGate } from 'redux-persist/lib/integration/react';
import AliyunOSS from 'react-native-aliyun-oss';
import * as wechat from 'react-native-wechat';

import Actions from 'Actions';

export default class App extends Component {
  componentDidMount() {
    wechat.registerApp('1106786282')
    AliyunOSS.initWithPlainTextAccessKey("LTAIaEPbGDOUJ4dr", "0EfCU4cafQJQTQPWj6vdZQIxCiEqpF", "https://oss-cn-beijing.aliyuncs.com");
  }

  getCurrentRouteName = (navigationState) => {
    if (!navigationState) {
      return null;
    }
    const route = navigationState.routes[navigationState.index];
    if (route.routes) {
      return this.getCurrentRouteName(route);
    }
    return route.routeName;
  }

  render() {
    return (
      <Provider store={global.reduxStore}>
        <PersistGate persistor={global.persistor}>
          <RootNavigator onNavigationStateChange={(prevState, currentState) => {
            const currentScreen = this.getCurrentRouteName(currentState);
            const prevScreen = this.getCurrentRouteName(prevState);

            if (prevScreen !== currentScreen) {
              global.reduxStore.dispatch(Actions.updatePVCount(currentScreen));
            }
          }} />
        </PersistGate>
      </Provider>
    );
  }
}
