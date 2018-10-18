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
  TextareaItem,
  ImagePicker,
} from 'antd-mobile-rn';
const Item = List.Item;
const Brief = Item.Brief;

import { dateFormat } from '../../common/dateHelper';

import { NavigationActions,StackActions } from 'react-navigation';
import { Spacing } from '../../configs/AntDesignConfig';
import ScreenConfig from '../../configs/ScreenConfig';

import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import Actions from '../../actions/index';
import {
  requestState
} from '../../reducers/common';

export class AboutPage extends Component {
  static navigationOptions = ({ navigation }) => {
    const { state, setParams } = navigation;
    return {
      title: '关于平台',
      headerStyle: {
        backgroundColor: '#fff',
      },
      headerTintColor: '#ff4077',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    };
  };

  constructor(props) {
    super(props)
  }

  componentDidMount() {

  }

  componentWillReceiveProps(nextProps) {
  }

  navigateTo = (routeName) => {
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
    const { state } = this.props.navigation;
    return (
      <View style={styles.container}>
        <List>
          <Item extra="1.0.0">版本号</Item>
          <Item onClick={this.navigateTo.bind(this, 'Login')}>退出登录</Item>
        </List>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    paddingTop: 12,
    backgroundColor: '#f4f3fd',
  },
});

const AboutPageSelector = createSelector(
  [
  ], (
  ) => {
    return {
    };
  });

export default connect(AboutPageSelector)(AboutPage);