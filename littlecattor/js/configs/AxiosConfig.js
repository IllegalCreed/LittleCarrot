/**
 * @providesModule AxiosConfig
 */

import axios from 'axios';

global.axiosClient = axios.create({
  baseURL: 'https://api2.laoshi123.com/api/',
  withCredentials: true,
  responseType: 'json',
  timeout: 5000,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  transformRequest: [function (data) {
    return JSON.stringify(data);
  }],
  transformResponse: [function (data) {
    return data;
  }],
});