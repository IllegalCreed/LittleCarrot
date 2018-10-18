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
} from 'antd-mobile-rn';

import { dateFormat } from '../../common/dateHelper';

import { NavigationActions } from 'react-navigation';
import { Spacing } from '../../configs/AntDesignConfig';
import ScreenConfig from '../../configs/ScreenConfig';

import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import {
  getMyCircularListState,
  getMyCircularListErrorObj,
  getMyCircularList,
  getCircularTagListState,
  getCircularTagListErrorObj,
  getTagList,
} from '../../configs/Selectors';

import Actions from '../../actions/index';
import {
  requestState
} from '../../reducers/common';

export class MyCircularPage extends Component {
  static navigationOptions = ({ navigation }) => {
    const { state, setParams } = navigation;
    return {
      title: '我的通告',
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
    if (this.props.myCircularListState !== nextProps.myCircularListState) {
      switch (nextProps.myCircularListState) {
        case requestState.FAIL:
          nextProps.dispatch(Actions.resetGetMyCircularListState());
          break;
        case requestState.LOADING:
          break;
        case requestState.SUCCESS:
          nextProps.dispatch(Actions.resetGetMyCircularListState());
          this.data.lockMore = false;
          break;
        case requestState.IDLE:
          break;
        default:
          break;
      }
    }
  }

  getTagNameById = (id) => {
    return this.props.tagList.find((tag) => {
      return id == tag.id
    }).name
  }

  loadMoreDatas = () => {
    if (!this.data.lockMore) {
      this.data.lockMore = true;
      this.data.page_index++;
      this.props.dispatch(Actions.getMyCircularList(this.data.page_index, this.data.page_size));
    }
  }

  refreshDatas = () => {
    this.data.lockMore = false;
    this.data.page_index = 0;
    this.props.dispatch(Actions.getMyCircularList(this.data.page_index, this.data.page_size));
  }

  navigateTo = (routeName, params) => {
    this.props.navigation.navigate(routeName, params)
  }

  render() {
    const { state } = this.props.navigation;
    return (
      <View style={styles.container}>
        <FlatList
          data={this.props.myCircularList}
          keyExtractor={(item, index) => {
            return index.toString();
          }}
          renderItem={({ item, index }) =>
            <TouchableOpacity
              style={styles.circularItem}
              onPress={this.navigateTo.bind(this, 'CircularDetail', { circular_id: item.notice_id })}>
              <View style={{
                paddingHorizontal: 15,
                flexDirection: 'row',
                flex: 1,
                justifyContent: 'space-between'
              }}>
                <Text style={styles.circularTitle}>标题：{item.title}</Text>
                <View style={styles.tag}>
                  <Text style={styles.tagText}>{this.getTagNameById(item.tag_id)}</Text>
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
                <Text>发布人：{item.nickname}</Text>
                <Text>发布时间：{dateFormat(new Date(item.create_time), 'yyyy-MM-dd')}</Text>
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
                <Text style={{ fontSize: 20, color: '#f04134' }}>{item.price}元</Text>
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


const MyCircularPageSelector = createSelector(
  [
    getMyCircularListState,
    getMyCircularListErrorObj,
    getMyCircularList,
    getCircularTagListState,
    getCircularTagListErrorObj,
    getTagList,
  ], (
    myCircularListState,
    myCircularListError,
    myCircularList,
    circularTagListState,
    circularTagListError,
    tagList,
  ) => {
    return {
      myCircularListState,
      myCircularListErrorMsg: myCircularListError ? myCircularListError.msg : '',
      myCircularList,
      circularTagListState,
      circularTagListErrorMsg: circularTagListError ? circularTagListError.msg : '',
      tagList: tagList.map((tag) => {
        return {
          name: tag.name,
          id: tag.tag_id,
        }
      }),
    };
  });

export default connect(MyCircularPageSelector)(MyCircularPage);