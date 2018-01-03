/**
 * @providesModule MinePage
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView
} from 'react-native';
import {
  List,
  Button,
} from 'antd-mobile';
const Item = List.Item;
const Brief = Item.Brief;

import Toast, { DURATION } from 'react-native-easy-toast';
import { dateFormat } from 'dateHelper';

import { NavigationActions } from 'react-navigation';
import { Spacing } from 'AntDesignConfig';
import ScreenConfig from 'ScreenConfig';

import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import {
  getUserInfoState,
  getUserInfoErrorObj,
  getUserInfo,
} from 'Selectors';

import Actions from 'Actions';
import {
  requestState
} from 'ReducerCommon';

export class MinePage extends Component {
  static navigationOptions = ({ navigation }) => {
    const { state, setParams } = navigation;
    return {
      title: '我的',
      tabBarIcon: ({ tintColor }) => (
        <Image
          source={require('../../routers/img/account.png')}
          style={{ tintColor: tintColor, width: 26, height: 26 }}
        />
      ),
    };
  };

  constructor(props) {
    super(props)
    this.state = {
    }
    this.props.dispatch(Actions.getUserInfo());
  }

  componentDidMount() {

  }

  navigateTo = (routeName, params) => {
    if (routeName == 'Login') {
      this.props.dispatch(Actions.logout());
      const resetAction = NavigationActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({ routeName })
        ]
      })
      this.props.navigation.dispatch(resetAction);
    } else {
      this.props.navigation.navigate(routeName, params)
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView ref={scrollView => this.scrollView = scrollView}>
          <View style={styles.headerContainer}>
            <View style={styles.userHeader}>
              <Image source={{ url: this.props.userInfo.avatar_url ? this.props.userInfo.avatar_url + '?x-oss-process=style/400' : '' }} style={styles.avatar} />
            </View>
            <Text style={{ marginTop: Spacing.small, color: 'white', fontSize: 18, fontWeight: 'bold' }}>{this.props.userInfo.nickname}</Text>
          </View>

          <List>
            <Item onClick={this.navigateTo.bind(this, 'UserInfo', { saveAction: 'Back' })} arrow='horizontal'>个人信息</Item>
            <Item onClick={this.navigateTo.bind(this, 'MyCircular')} arrow='horizontal'>我发布的通告</Item>
            <Item onClick={this.navigateTo.bind(this, 'MyAccusation')} arrow='horizontal'>我的举报</Item>
            <Item onClick={this.navigateTo.bind(this, 'MyExposure')} arrow='horizontal'>我的曝光</Item>
            <Item extra={'2333'}>我的萝卜</Item>
            <Item onClick={this.navigateTo.bind(this, 'About')} arrow='horizontal'>关于平台</Item>
          </List>

          <View style={styles.buttonContainer}>
            <Button type="ghost" onClick={this.navigateTo.bind(this, 'Login')}>退出登录</Button>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: '#f4f3fd',
  },
  buttonContainer: {
    marginTop: 50,
    marginBottom: 30,
    flex: 1,
    flexDirection: "column",
    alignSelf: 'stretch',
    paddingHorizontal: Spacing.middle,
  },
  headerContainer: {
    backgroundColor: '#f5317f',
    height: 200,
    flexDirection: "column",
    alignItems: 'center',
    paddingTop: 60,
  },
  userHeader: {
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 40,
    width: 80,
    height: 80,
  },
  avatar: {
    width: 80,
    height: 80
  }
});


const MinePageSelector = createSelector(
  [
    getUserInfoState,
    getUserInfoErrorObj,
    getUserInfo,
  ], (
    getUserInfoState,
    getUserInfoError,
    userInfo,
  ) => {
    return {
      getUserInfoState,
      getUserInfoError: getUserInfoError ? getUserInfoError.msg : '',
      userInfo,
    };
  });

export default connect(MinePageSelector)(MinePage);