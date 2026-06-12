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
} from './js/routers/Routers';

import axiosConfig from './js/configs/AxiosConfig';
import reduxConfig from './js/configs/ReduxConfig';

import { PersistGate } from 'redux-persist/lib/integration/react';
import AliyunOSS from 'react-native-aliyun-oss';
import * as wechat from 'react-native-wechat';

import Actions from './js/actions/index';

export default class App extends Component {
  componentDidMount() {
    wechat.registerApp('wx10c6a48c740dea0e')
    AliyunOSS.initWithPlainTextAccessKey("请去阿里云自己查", "请去阿里云自己查", "https://oss-cn-beijing.aliyuncs.com");
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

