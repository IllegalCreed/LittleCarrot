/**
 * @providesModule RegisterPage
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import {
  List,
  Button,
  InputItem,
  Checkbox,
} from 'antd-mobile';

import { NavigationActions } from 'react-navigation';
import { Spacing } from 'AntDesignConfig';

const AgreeItem = Checkbox.AgreeItem;

export default class RegisterPage extends Component {
  static navigationOptions = ({ navigation }) => {
    const { state, setParams } = navigation;
    return {
      title: '注册'
    };
  };

  constructor(props) {
    super(props)
    this.state = {
      isAgree: false,
    }
  }

  componentDidMount() {
  }

  navigateTo = (routeName, params) => {
    this.props.navigation.navigate(routeName, params)
  }

  render() {
    const { state } = this.props.navigation;
    return (
      <View style={styles.container}>
        <List style={{ alignSelf: 'stretch', marginTop: 64 }}>
          <InputItem placeholder='请输入手机号' clear>手机号</InputItem>
          <InputItem
            type='number'
            placeholder='请输入验证码'
            clear
            extra='获取验证码'
            onExtraClick={this.getCode}>
            验证码
					</InputItem>
          <InputItem placeholder='请输入密码' clear>密码</InputItem>
        </List>
        <View style={styles.buttonContainer}>
          <AgreeItem style={{ marginBottom: Spacing.small, }} checked={this.isAgree} onChange={({ target: { checked } }) => {
            this.setState({
              isAgree: checked,
            });
          }}>
            同意<Text style={styles.link}>《XXXX用户协议》</Text>
          </AgreeItem>
          <Button
            disabled={!this.state.isAgree}
            type="primary"
            onClick={this.navigateTo.bind(this, 'UserInfo', { saveAction: 'Home' })}>
            注册
					</Button>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    paddingTop: 64,
    backgroundColor: '#f4f3fd',
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "column",
    alignSelf: 'stretch',
    paddingHorizontal: Spacing.middle,
    marginTop: 128,
  },
  link: {
    color: '#108ee9',
    marginTop: Spacing.middle,
  },
});