/**
 * @providesModule ExposureSearchPage
 */


import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList
} from 'react-native';
import {
  Button,
  SearchBar,
} from 'antd-mobile';

import { dateFormat } from 'dateHelper';

import { NavigationActions } from 'react-navigation';
import { Spacing } from 'AntDesignConfig';
import ScreenConfig from 'ScreenConfig';

import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import {
  getSearchWechatState,
  getSearchWechatErrorObj,
  getWechatList,
} from 'Selectors';

import Actions from 'Actions';
import {
  requestState
} from 'ReducerCommon';


export class ExposureSearchPage extends Component {
  static navigationOptions = ({ navigation }) => {
    const { state, setParams } = navigation;
    return {
      title: '微信查询',
    };
  };

  constructor(props) {
    super(props)
    this.state = {
      wx: '',
      showSearchButton: true,
    }
  }

  componentDidMount() {
  }

  navigateTo = (routeName) => {
    this.props.navigation.navigate(routeName)
  }

  submit = (wx) => {
    this.props.dispatch(Actions.searchWechat(wx));
    this.setState({
      showSearchButton: false
    })
  }

  search = () => {
    this.submit(this.state.wx)
  }

  render() {
    const { state } = this.props.navigation;
    return (
      <View style={styles.container}>
        <SearchBar
          placeholder="输入微信号"
          maxLength={20}
          onSubmit={this.submit}
          onChange={(wx) => this.setState({
            showSearchButton: true,
            wx
          })}
          onCancel={(wx) => this.setState({
            showSearchButton: true,
          })}
          onClear={(wx) => this.setState({
            showSearchButton: true,
          })} />
        {
          this.state.showSearchButton
            ? <Button type="primary" onClick={this.search} style={{ margin: 20 }}>搜索</Button>
            : this.props.wechatList.length > 0
              ? <FlatList
                data={this.props.wechatList}
                keyExtractor={(item, index) => {
                  return index.toString();
                }}
                renderItem={({ item, index }) =>
                  <View style={styles.item}>
                    <Text style={{ fontSize: 16 }}>{item.wx}</Text>
                  </View>
                }
              />
              : <Text style={{ alignSelf: "center", fontSize: 18, marginTop: 50 }}>无结果</Text>
        }
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
  item: {
    borderColor: '#e9e9e9',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    padding: 15,
    backgroundColor: 'white',
    marginTop: 10,
  }
});

const ExposureSearchPageSelector = createSelector(
  [
    getSearchWechatState,
    getSearchWechatErrorObj,
    getWechatList,
  ], (
    searchWechatState,
    searchWechatError,
    wechatList,
  ) => {
    console.log(wechatList)
    return {
      searchWechatState,
      searchWechatErrorMsg: searchWechatError ? searchWechatError.msg : '',
      wechatList,
    };
  });

export default connect(ExposureSearchPageSelector)(ExposureSearchPage);