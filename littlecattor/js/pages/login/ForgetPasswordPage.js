/**
 * @providesModule ForgetPasswordPage
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
  Toast
} from 'antd-mobile-rn';

import { NavigationActions,StackActions } from 'react-navigation';
import { Spacing } from '../../configs/AntDesignConfig';

import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import Actions from '../../actions/index';
import {
  getResetPwdState,
  getResetPwdErrorObj,
} from '../../configs/Selectors';
import {
  requestState
} from '../../reducers/common';

export class ForgetPasswordPage extends Component {
  static navigationOptions = ({ navigation }) => {
    const { state, setParams } = navigation;
    return {
      title: '忘记密码',
      headerStyle: {
        backgroundColor: '#fe4176',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    };
  };

  constructor(props) {
    super(props)
    this.state = {
      submitButtonDisabled: false,
      phone: '',
      sms: '',
      pwd: '',
      smsExtra: '获取验证码',
    }
    this.timerCount = 60;
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.resetPwdState !== nextProps.resetPwdState) {
      switch (nextProps.resetPwdState) {
        case requestState.FAIL:
          // 重置失败
          if (!nextProps.resetPwdErrorMsg) {
            Toast.info('重置失败', 2);
          } else {
            Toast.info('重置失败，错误：' + nextProps.resetPwdErrorMsg, 2);
          }
          nextProps.dispatch(Actions.resetResetPwdState());
          break;
        case requestState.LOADING:
          // 重置中
          break;
        case requestState.SUCCESS:
          // 重置成功
          this.backTo();
          nextProps.dispatch(Actions.resetResetPwdState());
          break;
        case requestState.IDLE:
          this.setState({
            submitButtonDisabled: false
          })
          break;
        default:
          break;
      }
    }
  }

  componentDidMount() {

  }

  navigateTo = (routeName) => {
    this.props.navigation.navigate(routeName)
  }

  backTo = () => {
    this.props.navigation.goBack();
  }

  submit = () => {
    this.setState({
      submitButtonDisabled: true
    })
    let phone = this.state.phone.replace(/\s+/g, "");
    this.props.dispatch(Actions.resetPwd(phone, this.state.sms, this.state.pwd));
  }

  getCode = () => {
    if (this.timerCount == 60) {
      this.smsTimer = setInterval(() => {
        this.setState({
          smsExtra: "已发送(" + this.timerCount + ")"
        })
        this.timerCount--;
        if (this.timerCount <= 0) {
          clearInterval(this.smsTimer);
          this.timerCount = 60;
          this.setState({
            smsExtra: '获取验证码'
          })
        }
      }, 1000)
      let phone = this.state.phone.replace(/\s+/g, "");
      this.props.dispatch(Actions.sendSMS(phone));
    } else {
      return;
    }
  }

  render() {
    const { state } = this.props.navigation;
    return (
      <View style={styles.container}>
        <List style={{ alignSelf: 'stretch', marginTop: 32 }}>
          <InputItem
            type="phone"
            placeholder='请输入手机号'
            // value={this.state.phone}
            onChange={(val) => {
              this.setState({
                phone: val
              })
            }}
            clear>手机号</InputItem>
          <InputItem
            type='number'
            placeholder='请输入验证码'
            clear extra={this.state.smsExtra}
            onExtraClick={this.getCode}
            // value={this.state.sms}
            onChange={(val) => {
              this.setState({
                sms: val
              })
            }}>验证码</InputItem>
          <InputItem
            placeholder='请输入新密码'
            // value={this.state.pwd}
            onChange={(val) => {
              this.setState({
                pwd: val
              })
            }}
            clear>新密码</InputItem>
        </List>
        <View style={styles.buttonContainer}>
          <Button
            disabled={this.state.submitButtonDisabled}
            type="primary"
            onClick={this.submit}
          >提交
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
    paddingTop: 0,
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
});

const ForgetPasswordPageSelector = createSelector(
  [
    getResetPwdState,
    getResetPwdErrorObj,
  ],
  (resetPwdState, resetPwdError) => {
    return {
      resetPwdState,
      resetPwdErrorMsg: resetPwdError ? resetPwdError.msg : '',
    };
  });

export default connect(ForgetPasswordPageSelector)(ForgetPasswordPage);