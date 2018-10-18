import axios from 'axios';
import API from './APIConfig';
import { NavigationActions,StackActions } from 'react-navigation';
import Actions from '../actions/index';

global.axiosClient = axios.create({
  baseURL: API.rootPath,
  withCredentials: true,
  responseType: 'json',
  timeout: 5000,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  transformRequest: [function (data) {
    if (data) {
      data.token = global.reduxStore.getState().user.token;
    } else {
      data = {
        token: global.reduxStore.getState().user.token
      }
    }
    return JSON.stringify(data);
  }],
  transformResponse: [function (data) {
    // token问题
    if (data.res_code <= -900) {
      if (global.reduxStore) {
        global.reduxStore.dispatch(Actions.logout());
        if (global.rootNavigator) {
          const resetAction = StackActions.reset({
            index: 0,
            actions: [
              NavigationActions.navigate({ routeName: "Login" })
            ]
          })
          global.rootNavigator.dispatch(resetAction);
        }
      }
    }
    return data;
  }],
});