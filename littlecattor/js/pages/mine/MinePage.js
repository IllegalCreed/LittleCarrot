/**
 * @providesModule MinePage
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
} from 'antd-mobile';
const Item = List.Item;
const Brief = Item.Brief;

import { NavigationActions } from 'react-navigation';
import { Spacing } from 'AntDesignConfig';

export default class MinePage extends Component {
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
      avatarSource: {
        url: 'https://zos.alipayobjects.com/rmsportal/PZUUCKTRIHWiZSY.jpeg'
      },
    }
  }

  componentDidMount() {

  }

  navigateTo = (routeName, params) => {
    if (routeName == 'Login') {
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
        <View style={styles.headerContainer}>
          <View style={styles.userHeader}>
            <Image source={this.state.avatarSource} style={styles.avatar} />
          </View>
          <Text style={{ marginTop: Spacing.small, color: 'white', fontSize: 18, fontWeight: 'bold' }}>小萝卜</Text>
        </View>

        <List>
          <Item onClick={this.navigateTo.bind(this, 'UserInfo', { saveAction: 'Back' })} arrow='horizontal'>个人信息</Item>
          <Item arrow='horizontal'>我的通告</Item>
          <Item arrow='horizontal'>我的举报</Item>
          <Item arrow='horizontal'>我的曝光</Item>
          <Item extra={'2333'}>我的萝卜</Item>
          <Item arrow='horizontal'>关于平台</Item>
        </List>

        <View style={styles.buttonContainer}>
          <Button type="ghost" onClick={this.navigateTo.bind(this, 'Login')}>退出登录</Button>
        </View>
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
    position: 'absolute',
    bottom: 64,
    left: 0,
    right: 0,
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