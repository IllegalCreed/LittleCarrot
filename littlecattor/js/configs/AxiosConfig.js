/**
 * @providesModule AxiosConfig
 */

import axios from 'axios';
import API from 'APIConfig';

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
        global.reduxStore.dispatch(ACTIONS.logout());
      }
      if (!this.isToastExist) {
        this.currentToast = Toast.show('请先登录', {
          duration: 2555,
          position: Toast.positions.CENTER,
          onHidden: () => {
            this.isToastExist = false;
          }
        });
        this.isToastExist = true;
      }
    }
    return data;
  }],
});