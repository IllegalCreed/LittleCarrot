/**
 * @providesModule ExposureCircularPage
 */


import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
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
  getFakeCircularListState,
  getFakeCircularListErrorObj,
  getFakeCircularList,
  getCircularTagListState,
  getCircularTagListErrorObj,
  getTagList,
} from '../../configs/Selectors';

import Actions from '../../actions/index';
import {
  requestState
} from '../../reducers/common';

export class ExposureCircularPage extends Component {
  static navigationOptions = ({ navigation }) => {
    const { state, setParams } = navigation;
    return {
      title: '假通告'
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

  componentDidMount() {
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.circularListState !== nextProps.circularListState) {
      switch (nextProps.circularListState) {
        case requestState.FAIL:
          nextProps.dispatch(Actions.resetGetFakeCircularListState());
          break;
        case requestState.LOADING:
          break;
        case requestState.SUCCESS:
          nextProps.dispatch(Actions.resetGetFakeCircularListState());
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
      this.props.dispatch(Actions.getFakeCircularList(this.data.page_index, this.data.page_size));
    }
  }

  refreshDatas = () => {
    this.data.lockMore = false;
    this.data.page_index = 0;
    this.props.dispatch(Actions.getFakeCircularList(this.data.page_index, this.data.page_size));
  }

  navigateTo = (routeName, params) => {
    this.props.navigation.navigate(routeName, params)
  }

  renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={styles.circularItem}
        onPress={this.navigateTo.bind(this, 'CircularDetail', { circular_id: item.notice_id })}>
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          flex: 1,
          justifyContent: 'space-between'
        }}>
          <View style={styles.tag}>
            <Text style={styles.tagText}>{this.getTagNameById(item.tag_id)}</Text>
          </View>
          <Text style={styles.date}>{dateFormat(new Date(item.create_time), 'yyyy-MM-dd')}</Text>
        </View>
        <Text style={styles.circularTitle}>{item.title}</Text>
        <View style={{
          flexDirection: 'row',
          marginTop: 30,
          flex: 1,
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
            <View style={styles.userHeader}>
              <Image source={{ uri: item.avatar_url ? item.avatar_url + '?x-oss-process=style/400' : '' }} style={styles.avatar} />
            </View>
            <Text style={styles.publisher}>{item.nickname}</Text>
          </View>
          {item.category_name_arr ?
            <View style={styles.fakeTag}>
              <Text style={styles.fakeTagText}>{item.category_name_arr[0]}</Text>
            </View> : null
          }
        </View>
      </TouchableOpacity>
    )
  }

  render() {
    const { state } = this.props.navigation;
    return (
      <View style={styles.container}>
        <FlatList
          data={this.props.circularList}
          keyExtractor={(item, index) => {
            return index.toString();
          }}
          renderItem={this.renderItem}
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
    backgroundColor: '#f5f5f5',
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
    borderRadius: 2,
    paddingHorizontal: 15,
    paddingTop: 15,
    paddingBottom: 10,
    backgroundColor: 'white',
    marginHorizontal: 5,
    marginTop: 5,
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
  fakeTag: {
    borderColor: "#f759ab",
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
    paddingVertical: 2,
    alignSelf: 'flex-start',
    borderRadius: 2,
  },
  fakeTagText: {
    fontSize: 14,
    color: '#f759ab',
  },
  date: {
    fontSize: 12,
    color: '#bfbfbf',
  },
  publisher: {
    marginLeft: 5,
    fontSize: 12,
    color: '#bfbfbf',
  },
  price: {
    fontSize: 16,
    color: '#f04134'
  },
  userHeader: {
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 40,
    width: 20,
    height: 20,
  },
  avatar: {
    width: 20,
    height: 20
  }
});


const ExposureCircularPageSelector = createSelector(
  [
    getFakeCircularListState,
    getFakeCircularListErrorObj,
    getFakeCircularList,
    getCircularTagListState,
    getCircularTagListErrorObj,
    getTagList,
  ], (
    circularListState,
    circularListError,
    circularList,
    circularTagListState,
    circularTagListError,
    tagList,
  ) => {
    // console.log(circularList)
    return {
      circularListState,
      circularListErrorMsg: circularListError ? circularListError.msg : '',
      circularList,
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

export default connect(ExposureCircularPageSelector)(ExposureCircularPage);