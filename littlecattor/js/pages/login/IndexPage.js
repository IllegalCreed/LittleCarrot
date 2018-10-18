/**
 * @providesModule IndexPage
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  TouchableOpacity
} from 'react-native';
import {
  Button,
} from 'antd-mobile-rn';

import { NavigationActions,StackActions } from 'react-navigation';
import { Spacing, Colors } from '../../configs/AntDesignConfig';
import LinearGradient from 'react-native-linear-gradient';

import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import {
  getIsLogin,
} from '../../configs/Selectors';

import Actions from '../../actions/index';
import {
  requestState
} from '../../reducers/common';

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
    this.navigateTo('Login');
  }

  render() {
    const { state } = this.props.navigation;
    return (
      <ImageBackground source={require('./img/background.png')} style={styles.container}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={this.login} style={styles.buttonOuter}>
            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#fe865f', '#fc57b5']} style={styles.buttonInner}>
              <Text style={styles.buttonText}>登录</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.navigateTo.bind(this, 'Register')} style={styles.buttonOuter}>
            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['rgba(255, 255, 255, 0.6)', 'rgba(255, 255, 255, 0.6)']} style={styles.buttonInnerWhite}>
              <Text style={styles.buttonTextWhite}>注册</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    flex: 1,
    flexDirection: "column",
    alignItems: "stretch",
    justifyContent: "flex-end",
  },
  buttonContainer: {
    marginBottom: 50,
    display: "flex",
    flexDirection: "row",
    paddingHorizontal: Spacing.middle,
  },
  buttonOuter: {
    display: "flex",
    flex: 1,
    height: 55,
    flexDirection: "column",
    alignItems: "center",
  },
  buttonInner: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: 150,
    height: 55,
    borderRadius: 28
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  buttonInnerWhite: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: 150,
    height: 55,
    borderColor: "white",
    borderWidth: 2,
    borderStyle: "solid",
    borderRadius: 28
  },
  buttonTextWhite: {
    color: "#fe4176",
    fontSize: 16,
  }
});

const IndexPageSelector = createSelector(
  [
    getIsLogin,
  ],
  (
    isLogin,
  ) => {
    return {
      isLogin,
    };
  });

export default connect(IndexPageSelector)(LoginPage);