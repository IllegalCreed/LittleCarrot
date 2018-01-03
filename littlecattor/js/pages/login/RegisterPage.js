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

import Toast, { DURATION } from 'react-native-easy-toast'

import { NavigationActions } from 'react-navigation';
import { Spacing } from 'AntDesignConfig';

import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import Actions from 'Actions';
import {
  getRegisterState,
  getRegisterErrorObj,
} from 'Selectors';
import {
  requestState
} from 'ReducerCommon';

const AgreeItem = Checkbox.AgreeItem;

export class RegisterPage extends Component {
  static navigationOptions = ({ navigation }) => {
    const { state, setParams } = navigation;
    return {
      title: '注册'
    };
  };

  constructor(props) {
    super(props)
    this.state = {
      registerButtonDisabled: false,
      isAgree: false,
      phone: '',
      sms: '',
      pwd: '',
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.registerState !== nextProps.registerState) {
      switch (nextProps.registerState) {
        case requestState.FAIL:
          // 注册失败
          if (!nextProps.registerErrorMsg) {
            this.registerToast.show('注册失败');
          } else {
            this.registerToast.show('注册失败，错误：' + nextProps.registerErrorMsg);
          }
          nextProps.dispatch(Actions.resetRegisterState());
          break;
        case requestState.LOADING:
          // 注册中
          break;
        case requestState.SUCCESS:
          // 注册成功
          this.navigateTo('UserInfo', { saveAction: 'Home' })
          nextProps.dispatch(Actions.resetRegisterState());
          break;
        case requestState.IDLE:
          this.setState({
            registerButtonDisabled: false
          })
          break;
        default:
          break;
      }
    }
  }

  componentDidMount() {
  }

  register = () => {
    this.setState({
      registerButtonDisabled: true
    })
    let phone = this.state.phone.replace(/\s+/g, "");
    this.props.dispatch(Actions.register(phone, this.state.sms, this.state.pwd));
  }

  getCode = () => {
    let phone = this.state.phone.replace(/\s+/g, "");
    this.props.dispatch(Actions.sendSMS(phone));
  }

  navigateTo = (routeName, params) => {
    this.props.navigation.navigate(routeName, params)
  }

  render() {
    const { state } = this.props.navigation;
    return (
      <View style={styles.container}>
        <List style={{ alignSelf: 'stretch', marginTop: 64 }}>
          <InputItem
            type="phone"
            placeholder='请输入手机号'
            value={this.state.phone}
            onChange={(val) => {
              this.setState({
                phone: val
              })
            }}
            clear>手机号</InputItem>
          <InputItem
            type='number'
            placeholder='请输入验证码'
            clear
            extra='获取验证码'
            onExtraClick={this.getCode}
            value={this.state.sms}
            onChange={(val) => {
              this.setState({
                sms: val
              })
            }}>
            验证码
					</InputItem>
          <InputItem
            placeholder='请输入密码'
            value={this.state.pwd}
            onChange={(val) => {
              this.setState({
                pwd: val
              })
            }}
            clear>密码</InputItem>
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
            disabled={!this.state.isAgree || this.state.registerButtonDisabled}
            type="primary"
            onClick={this.register}>
            注册
					</Button>
        </View>
        <Toast ref={registerToast => this.registerToast = registerToast} />
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
    position: 'absolute',
    bottom: 64,
    left: 0,
    right: 0,
    flex: 1,
    flexDirection: "column",
    alignSelf: 'stretch',
    paddingHorizontal: Spacing.middle,
  },
  link: {
    color: '#108ee9',
    marginTop: Spacing.middle,
  },
});

const RegisterPageSelector = createSelector(
  [getRegisterState, getRegisterErrorObj],
  (registerState, registerError) => {
    return {
      registerState,
      registerErrorMsg: registerError ? registerError.msg : '',
    };
  });

export default connect(RegisterPageSelector)(RegisterPage);