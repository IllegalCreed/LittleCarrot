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
} from 'antd-mobile-rn';
const Item = List.Item;
const Brief = Item.Brief;

import { dateFormat } from '../../common/dateHelper';
import LinearGradient from 'react-native-linear-gradient';

import { NavigationActions,StackActions } from 'react-navigation';
import { Spacing } from '../../configs/AntDesignConfig';
import ScreenConfig from '../../configs/ScreenConfig';

import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import {
  getUserInfoState,
  getUserInfoErrorObj,
  getUserInfo,
} from '../../configs/Selectors';

import Actions from '../../actions/index';
import {
  requestState
} from '../../reducers/common';

export class MinePage extends Component {
  static navigationOptions = ({ navigation }) => {
    const { state, setParams } = navigation;
    return {
      title: '我的',
      tabBarIcon: ({ tintColor }) => (
        <Image
          source={require('../../routers/img/account.png')}
          style={{ tintColor: tintColor, width: 22, height: 25 }}
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
      const resetAction = StackActions.reset({
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
            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#ef8c68', '#ea419a']} style={styles.headerBackground}>
              <Text style={styles.description}>{this.props.userInfo.description}</Text>
            </LinearGradient>
            <View style={styles.userHeader}>
              {
                this.props.userInfo.avatar_url
                  ? <Image source={{ uri: this.props.userInfo.avatar_url ? this.props.userInfo.avatar_url + '?x-oss-process=style/400' : '' }} style={styles.avatar} />
                  : null
              }
            </View>
            <Text style={{ marginTop: 60, color: 'black', fontSize: 16,}}>{this.props.userInfo.nickname}</Text>
          </View>

          <List>
            <Item onClick={this.navigateTo.bind(this, 'UserInfo', { saveAction: 'Back' })} arrow='horizontal'>个人信息</Item>
            <Item onClick={this.navigateTo.bind(this, 'MyCircular')} arrow='horizontal'>我发布的通告</Item>
            <Item onClick={this.navigateTo.bind(this, 'MyAccusation')} arrow='horizontal'>我的举报</Item>
            <Item onClick={this.navigateTo.bind(this, 'MyExposure')} arrow='horizontal'>我的曝光</Item>
            <Item extra={this.props.userInfo.asset ? this.props.userInfo.asset.point : '0'}>我的萝卜</Item>
            <Item onClick={this.navigateTo.bind(this, 'About')} arrow='horizontal'>关于平台</Item>
          </List>

          {/* <View style={styles.buttonContainer}>
            <Button type="ghost" onClick={this.navigateTo.bind(this, 'Login')}>退出登录</Button>
          </View> */}
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
  description: {
    fontSize: 18,
    color: '#fff',
  },
  headerContainer: {
    position: 'relative',
    backgroundColor: '#fff',
    height: 300,
    flexDirection: "column",
    alignItems: 'center',
  },
  headerBackground: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: 200,
    alignSelf: 'stretch'
  },
  userHeader: {
    position: 'absolute',
    top: 150,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#ff4076',
    borderRadius: 50,
    width: 100,
    height: 100,
  },
  avatar: {
    width: 100,
    height: 100
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
    // console.log(userInfo)
    return {
      getUserInfoState,
      getUserInfoError: getUserInfoError ? getUserInfoError.msg : '',
      userInfo,
    };
  });

export default connect(MinePageSelector)(MinePage);