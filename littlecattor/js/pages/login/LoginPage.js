/**
 * @providesModule LoginPage
 */


import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Keyboard,
  TouchableOpacity,
  TouchableWithoutFeedback
} from 'react-native';
import {
  List,
  Button,
  InputItem,
  Toast,
} from 'antd-mobile-rn';

import { NavigationActions,StackActions } from 'react-navigation';
import { Spacing, Colors } from '../../configs/AntDesignConfig';

import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import {
  getIsLogin,
  getLoginState,
  getLoginErrorMsg
} from '../../configs/Selectors';

import Actions from '../../actions/index';
import {
  requestState
} from '../../reducers/common';

class LoginPage extends Component {
  static navigationOptions = ({ navigation }) => {
    const { state, setParams, navigate } = navigation;
    return {
      title: '登录',
      headerStyle: {
        backgroundColor: '#fe4176',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      headerRight: (
        <Text onPress={() => navigate('ForgetPassword')} style={styles.headerRightText}>忘记密码</Text>
      ),
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
      const resetAction = StackActions.reset({
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
      <TouchableWithoutFeedback onPress={() => {
        Keyboard.dismiss();
      }}>
        <View style={styles.container}>
          <View style={styles.logoContainer}>
            <Image source={require('./img/logoNew.png')} style={styles.logo}></Image>
          </View>
          <View style={styles.bottomContainer}>
            <View style={styles.loginContainer}>
              <TextInput
                style={{ height: 40, padding: 0, }}
                placeholder='手机号'
                underlineColorAndroid="transparent"
                onChangeText={(text) => this.setState({ phone: text })}
                value={this.state.phone}
              />
              <View style={styles.line}></View>
              <TextInput
                style={{ height: 40, padding: 0 }}
                underlineColorAndroid="transparent"
                placeholder='密码'
                onChangeText={(text) => this.setState({ pwd: text })}
                value={this.state.pwd}
              />
            </View>
            <TouchableOpacity onPress={this.login}>
              <Image source={require('./img/ok.png')} style={styles.ok}></Image>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "white",
  },
  headerRightText: {
    color: "#fff",
    marginRight: 20,
  },
  logoContainer: {
    marginTop: 10,
    marginBottom: 10,
    height: 150,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 26,
    height: 53
  },
  bottomContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between"
  },
  loginContainer: {
    flexDirection: "column",
    alignItems: "center",
  },
  line: {
    marginTop: 5,
    marginBottom: 5,
    width: 300,
    height: 1,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#fe4176",
    borderStyle: "solid"
  },
  ok: {
    width: 41,
    height: 41,
    marginBottom: 50
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