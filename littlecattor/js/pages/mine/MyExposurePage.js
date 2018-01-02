/**
 * @providesModule MyExposurePage
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
  getMyExposureListState,
  getMyExposureListErrorObj,
  getMyExposureList,
} from 'Selectors';

import Actions from 'Actions';
import {
  requestState
} from 'ReducerCommon';

export class MyExposurePage extends Component {
  static navigationOptions = ({ navigation }) => {
    const { state, setParams } = navigation;
    return {
      title: '我的曝光'
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
      page_size: 3,
    }

    this.refreshDatas();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.myExposureListState !== nextProps.myExposureListState) {
      switch (nextProps.myExposureListState) {
        case requestState.FAIL:
          nextProps.dispatch(Actions.resetGetMyExposureListState());
          break;
        case requestState.LOADING:
          break;
        case requestState.SUCCESS:
          nextProps.dispatch(Actions.resetGetMyExposureListState());
          this.data.lockMore = false;
          break;
        case requestState.IDLE:
          break;
        default:
          break;
      }
    }
  }

  componentDidMount() {
  }

  loadMoreDatas = () => {
    if (!this.data.lockMore) {
      this.data.lockMore = true;
      this.data.page_index++;
      this.props.dispatch(Actions.getMyExposureList(this.data.page_index, this.data.page_size));
    }
  }

  refreshDatas = () => {
    this.data.lockMore = false;
    this.data.page_index = 0;
    this.props.dispatch(Actions.getMyExposureList(this.data.page_index, this.data.page_size));
  }

  navigateTo = (routeName, params) => {
    this.props.navigation.navigate(routeName, params)
  }

  render() {
    const { state } = this.props.navigation;
    return (
      <View style={styles.container}>
        <FlatList
          data={this.props.myExposureList}
          keyExtractor={(item, index) => {
            return index;
          }}
          renderItem={({ item, index }) =>
            <TouchableOpacity
              style={styles.circularItem}
              onPress={this.navigateTo.bind(this, 'ExposureDetail', { exposure_id: item.exposure_id })}>
              <View style={{
                paddingHorizontal: 15,
                flexDirection: 'row',
                flex: 1,
                justifyContent: 'space-between'
              }}>
                <Text style={styles.circularTitle}>标题：{item.title}</Text>
                <View style={styles.tag}>
                  <Text style={styles.tagText}>{item.tag}</Text>
                </View>
              </View>
              <View style={{
                marginLeft: 15,
                marginVertical: 10,
                height: 1,
                alignItems: 'stretch',
                backgroundColor: '#e9e9e9',
              }} />
              <Text numberOfLines={3} style={{ paddingHorizontal: 15 }}>{item.content}</Text>
            </TouchableOpacity>
          }
          onEndReached={this.loadMoreDatas}
          onEndReachedThreshold={0}
          onRefresh={this.refreshDatas}
          refreshing={this.state.refreshing}
        />
        <Button style={styles.publishCircular} type="primary" onClick={this.navigateTo.bind(this, 'ExposurePublish')}>我要曝光</Button>
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
  circularTitle: {
    fontSize: 18,
  },
  circularItem: {
    borderColor: '#e9e9e9',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    paddingVertical: 15,
    backgroundColor: 'white',
    marginTop: 10,
  },
  publishCircular: {
    position: 'absolute',
    bottom: 30,
    right: 0,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    opacity: 0.8,
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
  }
});


const MyExposurePageSelector = createSelector(
  [
    getMyExposureListState,
    getMyExposureListErrorObj,
    getMyExposureList,
  ], (
    myExposureListState,
    myExposureListError,
    myExposureList,
  ) => {
    return {
      myExposureListState,
      myExposureListErrorMsg: myExposureListError ? myExposureListError.msg : '',
      myExposureList,
    };
  });

export default connect(MyExposurePageSelector)(MyExposurePage);