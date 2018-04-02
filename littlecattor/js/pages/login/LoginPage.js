/**
 * @providesModule LoginPage
 */


import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';
import {
  List,
  Button,
  InputItem,
  Toast,
} from 'antd-mobile';

import { NavigationActions } from 'react-navigation';
import { Spacing, Colors } from 'AntDesignConfig';

import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import {
  getIsLogin,
  getLoginState,
  getLoginErrorMsg
} from 'Selectors';

import Actions from 'Actions';
import {
  requestState
} from 'ReducerCommon';

class LoginPage extends Component {
  static navigationOptions = ({ navigation }) => {
    const { state, setParams } = navigation;
    return {
      header: null
    };
  };

  constructor(props) {
    super(props)
    this.state = {
      loginButtonDisabled: false,
      phone: '',
      pwd: '',
    }
  }

  componentDidMount() {
    if (this.props.isLogin) {
      this.navigateTo('Home');
    }
    if (this.props.navigation) {
      global.rootNavigator = this.props.navigation;
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.loginState !== nextProps.loginState) {
      switch (nextProps.loginState) {
        case requestState.FAIL:
          // 登录失败
          if (!nextProps.loginErrorMsg) {
            Toast.info('登录失败', 2);
          } else {
            Toast.info('登录失败，错误：' + nextProps.loginErrorMsg, 2);
          }
          nextProps.dispatch(Actions.resetLoginState());
          break;
        case requestState.LOADING:
          // 登录中
          break;
        case requestState.SUCCESS:
          // 登录成功
          nextProps.dispatch(Actions.resetLoginState());
          this.navigateTo('Home');
          break;
        case requestState.IDLE:
          this.setState({
            loginButtonDisabled: false
          })
          break;
        default:
          break;
      }
    }
  }

  navigateTo = (routeName) => {
    if (routeName == 'Home') {
      const resetAction = NavigationActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({ routeName })
        ]
      })
      this.props.navigation.dispatch(resetAction);
    } else {
      this.props.navigation.navigate(routeName)
    }
  }

  login = () => {
    this.setState({
      loginButtonDisabled: true
    })
    let phone = this.state.phone.replace(/\s+/g, "");
    this.props.dispatch(Actions.login(phone, this.state.pwd));
  }

  render() {
    const { state } = this.props.navigation;
    return (
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          {/* <Text style={styles.logo}>LOGO</Text> */}
          <Image source={require('./img/logo.png')} style={styles.logo}></Image>
          <Text style={styles.logoText}>小萝卜</Text>
        </View>
        <View style={styles.bottomContainer}>
          <List>
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
              type='password'
              placeholder='请输入密码'
              value={this.state.pwd}
              onChange={(val) => {
                this.setState({
                  pwd: val
                })
              }}
              clear>密码</InputItem>
          </List>
          <Text onPress={this.navigateTo.bind(this, 'ForgetPassword')} style={styles.link}>忘记密码</Text>

          <View style={styles.buttonContainer}>
            <Button type="primary" disabled={this.state.loginButtonDisabled} onClick={this.login}>登录</Button>
            <Button style={{ marginTop: Spacing.small }} type="ghost" onClick={this.navigateTo.bind(this, 'Register')}>注册</Button>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: Colors.Grey.t3,
  },
  logoContainer: {
    flex: 2,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 100,
    height: 100
  },
  logoText: {
    marginTop: 15,
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.Magenta.t6,
  },
  bottomContainer: {
    flex: 3,
    flexDirection: "column",
  },
  link: {
    color: Colors.Magenta.t6,
    marginTop: Spacing.middle,
    marginRight: Spacing.middle,
    alignSelf: 'flex-end',
  },
  buttonContainer: {
    marginTop: 100,
    marginBottom: Spacing.large,
    flex: 1,
    flexDirection: "column",
    alignSelf: 'stretch',
    paddingHorizontal: Spacing.middle,
  },
});

const LoginPageSelector = createSelector(
  [
    getIsLogin,
    getLoginState,
    getLoginErrorMsg
  ],
  (
    isLogin,
    loginState,
    loginError
  ) => {
    return {
      isLogin,
      loginState,
      loginErrorMsg: loginError ? loginError.msg : '',
    };
  });

export default connect(LoginPageSelector)(LoginPage);