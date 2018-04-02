/**
 * @providesModule ExposureExperiencePage
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
  Carousel,
  Tag,
} from 'antd-mobile';

import { dateFormat } from 'dateHelper';

import { NavigationActions } from 'react-navigation';
import { Spacing } from 'AntDesignConfig';
import ScreenConfig from 'ScreenConfig';

import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import {
  getExposureListState,
  getExposureListErrorObj,
  getExposureList,
} from 'Selectors';

import Actions from 'Actions';
import {
  requestState
} from 'ReducerCommon';

export class ExposureExperiencePage extends Component {
  static navigationOptions = ({ navigation }) => {
    const { state, setParams } = navigation;
    return {
      title: '曝光墙'
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
    if (this.props.exposureListState !== nextProps.exposureListState) {
      switch (nextProps.exposureListState) {
        case requestState.FAIL:
          nextProps.dispatch(Actions.resetGetExposureListState());
          break;
        case requestState.LOADING:
          break;
        case requestState.SUCCESS:
          nextProps.dispatch(Actions.resetGetExposureListState());
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
      this.props.dispatch(Actions.getExposureList(this.data.page_index, this.data.page_size));
    }
  }

  refreshDatas = () => {
    this.data.lockMore = false;
    this.data.page_index = 0;
    this.props.dispatch(Actions.getExposureList(this.data.page_index, this.data.page_size));
  }

  navigateTo = (routeName, params) => {
    this.props.navigation.navigate(routeName, params)
  }

  renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={styles.circularItem}
        onPress={this.navigateTo.bind(this, 'ExposureDetail', { exposure_id: item.exposure_id })}>
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          flex: 1,
          justifyContent: 'space-between'
        }}>
          <View style={styles.tag}>
            <Text style={styles.tagText}>{item.tag}</Text>
          </View>
          <Text style={styles.date}>{dateFormat(new Date(item.create_time), 'yyyy-MM-dd')}</Text>
        </View>
        <Text style={styles.circularTitle}>{item.content}</Text>
      </TouchableOpacity>
    )
  }

  render() {
    const { state } = this.props.navigation;
    return (
      <View style={styles.container}>
        <FlatList
          data={this.props.exposureList}
          keyExtractor={(item, index) => {
            return index.toString();
          }}
          renderItem={this.renderItem}
          // renderItem={({ item, index }) =>
          //   <TouchableOpacity
          //     style={styles.circularItem}
          //     onPress={this.navigateTo.bind(this, 'ExposureDetail', { exposure_id: item.exposure_id })}>
          //     <View style={{
          //       paddingHorizontal: 15,
          //       flexDirection: 'row',
          //       flex: 1,
          //       justifyContent: 'space-between'
          //     }}>
          //       <Text style={styles.circularTitle}>标题：{item.title}</Text>
          //       <View style={styles.tag}>
          //         <Text style={styles.tagText}>{item.tag}</Text>
          //       </View>
          //     </View>
          //     <View style={{
          //       marginLeft: 15,
          //       marginVertical: 10,
          //       height: 1,
          //       alignItems: 'stretch',
          //       backgroundColor: '#e9e9e9',
          //     }} />
          //     <Text numberOfLines={3} style={{ paddingHorizontal: 15 }}>{item.content}</Text>
          //   </TouchableOpacity>
          // }
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
    backgroundColor: '#f5f5f5',
  },
  circularItem: {
    borderRadius: 2,
    paddingHorizontal: 15,
    paddingVertical: 15,
    backgroundColor: 'white',
    marginHorizontal: 5,
    marginTop: 5,
  },
  publishCircular: {
    position: 'absolute',
    bottom: 30,
    right: 0,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    opacity: 0.8,
  },
  circularTitle: {
    fontFamily: 'PingFang SC',
    fontSize: 16,
    marginTop: 10,
  },
  tag: {
    backgroundColor: '#f759ab',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
    paddingVertical: 2,
    alignSelf: 'flex-start',
    borderRadius: 2,
  },
  tagText: {
    fontSize: 14,
    color: '#fff',
  },
  date: {
    fontSize: 12,
    color: '#bfbfbf',
  },
});


const ExposureExperiencePageSelector = createSelector(
  [
    getExposureListState,
    getExposureListErrorObj,
    getExposureList,
  ], (
    exposureListState,
    exposureListError,
    exposureList,
  ) => {
    return {
      exposureListState,
      exposureListErrorMsg: exposureListError ? exposureListError.msg : '',
      exposureList,
    };
  });

export default connect(ExposureExperiencePageSelector)(ExposureExperiencePage);