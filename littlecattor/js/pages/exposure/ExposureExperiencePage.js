/**
 * @providesModule ExposureExperiencePage
 */


import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity
} from 'react-native';
import {
  Button,
  Carousel,
  Tag,
} from 'antd-mobile-rn';

import { dateFormat } from '../../common/dateHelper';

import { NavigationActions } from 'react-navigation';
import { Spacing } from '../../configs/AntDesignConfig';
import ScreenConfig from '../../configs/ScreenConfig';

import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import {
  getExposureListState,
  getExposureListErrorObj,
  getExposureList,
} from '../../configs/Selectors';

import Actions from '../../actions/index';
import {
  requestState
} from '../../reducers/common';

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
        <Text style={styles.circularTitle}>{item.title}</Text>
        <Text style={styles.circularContent}>{item.content}</Text>
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
          onEndReached={this.loadMoreDatas}
          onEndReachedThreshold={0}
          onRefresh={this.refreshDatas}
          refreshing={this.state.refreshing}
        />
        <TouchableOpacity style={styles.publishCircular} onPress={this.navigateTo.bind(this, 'ExposurePublish')}>
          <Image source={require('./img/add.png')} style={styles.addicon}></Image>
        </TouchableOpacity>
        {/* <Button style={styles.publishCircular} type="primary" onClick={this.navigateTo.bind(this, 'ExposurePublish')}>我要曝光</Button> */}
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
    bottom: 20,
    right: 10,
    shadowColor: '#fe86f5',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  circularTitle: {
    fontFamily: 'PingFang SC',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  circularContent: {
    fontFamily: 'PingFang SC',
    fontSize: 14,
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
  addicon: {
    width: 60,
    height: 75,
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
    // console.log(exposureList)
    return {
      exposureListState,
      exposureListErrorMsg: exposureListError ? exposureListError.msg : '',
      exposureList,
    };
  });

export default connect(ExposureExperiencePageSelector)(ExposureExperiencePage);