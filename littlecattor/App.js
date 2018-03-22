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

export default class App extends Component {
  componentDidMount() {
    wechat.registerApp('1106786282')
    AliyunOSS.initWithPlainTextAccessKey("LTAIaEPbGDOUJ4dr", "0EfCU4cafQJQTQPWj6vdZQIxCiEqpF", "https://oss-cn-beijing.aliyuncs.com");
  }

  render() {
    return (
      <Provider store={global.reduxStore}>
        <PersistGate persistor={global.persistor}>
          <RootNavigator/>
        </PersistGate>
      </Provider>
    );
  }
}
