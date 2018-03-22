/**
 * @providesModule MyAccusationPage
 */


import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity
} from 'react-native';
import {
  Button,
  Tag,
} from 'antd-mobile';

import Toast, { DURATION } from 'react-native-easy-toast';
import { dateFormat } from 'dateHelper';

import { NavigationActions } from 'react-navigation';
import { Spacing } from 'AntDesignConfig';
import ScreenConfig from 'ScreenConfig';

import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import {
  getMyAccusationListState,
  getMyAccusationListErrorObj,
  getMyAccusationList
} from 'Selectors';

import Actions from 'Actions';
import {
  requestState
} from 'ReducerCommon';

export class MyAccusationPage extends Component {
  static navigationOptions = ({ navigation }) => {
    const { state, setParams } = navigation;
    return {
      title: '我的举报'
    };
  };

  constructor(props) {
    super(props)
    this.state = {
      refreshing: false,
    }

    this.data = {
      lockMore: false,
      page_index: 0,
      page_size: 5,
    }

    this.refreshDatas();
  }

  componentDidMount() {
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.myAccusationListState !== nextProps.myAccusationListState) {
      switch (nextProps.myAccusationListState) {
        case requestState.FAIL:
          nextProps.dispatch(Actions.resetGetMyAccusationListState());
          break;
        case requestState.LOADING:
          break;
        case requestState.SUCCESS:
          nextProps.dispatch(Actions.resetGetMyAccusationListState());
          this.data.lockMore = false;
          break;
        case requestState.IDLE:
          break;
        default:
          break;
      }
    }
  }

  loadMoreDatas = () => {
    if (!this.data.lockMore) {
      this.data.lockMore = true;
      this.data.page_index++;
      this.props.dispatch(Actions.getMyAccusationList(this.data.page_index, this.data.page_size));
    }
  }

  refreshDatas = () => {
    this.data.lockMore = false;
    this.data.page_index = 0;
    this.props.dispatch(Actions.getMyAccusationList(this.data.page_index, this.data.page_size));
  }

  navigateTo = (routeName, params) => {
    this.props.navigation.navigate(routeName, params)
  }

  render() {
    const { state } = this.props.navigation;
    return (
      <View style={styles.container}>
        <FlatList
          data={this.props.myAccusationList}
          keyExtractor={(item, index) => {
            return index;
          }}
          renderItem={({ item, index }) =>
            <TouchableOpacity
              style={styles.circularItem}
              onPress={this.navigateTo.bind(this, 'AccusationDetail', { accusation_id: item.report_id })}>
              <View style={{
                paddingHorizontal: 15,
                flexDirection: 'row',
                flex: 1,
                justifyContent: 'space-between'
              }}>
                <Text style={styles.circularTitle}>标题：{item.notice_title}</Text>
                <View style={styles.tag}>
                  <Text style={styles.tagText}>{item.report_state == -1 ? '未通过' : item.report_state == 0 ? '审核中' : '通过'}</Text>
                </View>
              </View>
              <View style={{
                marginLeft: 15,
                marginVertical: 10,
                height: 1,
                alignItems: 'stretch',
                backgroundColor: '#e9e9e9',
              }} />
              <View style={{
                paddingHorizontal: 15,
                flexDirection: 'row',
                flex: 1,
                justifyContent: 'space-between'
              }}>
                <Text>发布人：{item.notice_nickname}</Text>
                <Text>发布时间：{dateFormat(new Date(item.notice_create_time), 'yyyy-MM-dd')}</Text>
              </View>
              <View style={{
                marginLeft: 15,
                marginVertical: 10,
                height: 1,
                alignItems: 'stretch',
                backgroundColor: '#e9e9e9',
              }} />
              <View style={{
                paddingHorizontal: 15,
                flexDirection: 'row',
                flex: 1,
                justifyContent: 'flex-end'
              }}>
                <Text>举报时间：{dateFormat(new Date(item.report_create_time), 'yyyy-MM-dd')}</Text>
              </View>
            </TouchableOpacity>
          }
          onEndReached={this.loadMoreDatas}
          onEndReachedThreshold={0}
          onRefresh={this.refreshDatas}
          refreshing={this.state.refreshing}
        />
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
  publishCircular: {
    position: 'absolute',
    bottom: 30,
    right: 0,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    opacity: 0.8,
  },
  circularItem: {
    borderColor: '#e9e9e9',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    paddingVertical: 15,
    backgroundColor: 'white',
    marginTop: 10,
  },
  circularTitle: {
    fontSize: 18,
  },
  tag: {
    paddingHorizontal: 5,
    borderWidth: 1,
    borderColor: '#F5317F',
    borderRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tagText: {
    fontSize: 12,
    color: '#F5317F',
  },
  tagTextBig: {
    fontSize: 18,
    color: '#F5317F',
  }
});


const MyAccusationPageSelector = createSelector(
  [
    getMyAccusationListState,
    getMyAccusationListErrorObj,
    getMyAccusationList
  ], (
    myAccusationListState,
    myAccusationListError,
    myAccusationList,
  ) => {
    return {
      myAccusationListState,
      myAccusationListErrorMsg: myAccusationListError ? myAccusationListError.msg : '',
      myAccusationList,
    };
  });

export default connect(MyAccusationPageSelector)(MyAccusationPage);