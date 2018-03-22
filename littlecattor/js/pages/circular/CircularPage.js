/**
 * @providesModule CircularPage
 */


import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {
  Button,
  Carousel,
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
  getCircularListState,
  getCircularListErrorObj,
  getCircularList,
  getCircularTagListState,
  getCircularTagListErrorObj,
  getTagList,
} from 'Selectors';

import Actions from 'Actions';
import {
  requestState
} from 'ReducerCommon';

class CircularPage extends Component {
  static navigationOptions = ({ navigation }) => {
    const { state, setParams } = navigation;
    return {
      title: '通告',
      tabBarIcon: ({ tintColor }) => (
        <Image
          source={require('../../routers/img/form.png')}
          style={{ tintColor: tintColor, width: 26, height: 26 }}
        />
      ),
    };
  };

  constructor(props) {
    super(props)
    this.state = {
      carouselData: ['AiyWuByWklrrUDlFignR', 'TekJlZRVCjLFexlOCuWn', 'IJOtIlfsYdTyaDTRVrLI'],
      refreshing: false,
    }

    this.data = {
      lockMore: false,
      page_index: 0,
      page_size: 3,
    }

    this.props.dispatch(Actions.getCircularTagList());
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.circularTagListState !== nextProps.circularTagListState) {
      switch (nextProps.circularTagListState) {
        case requestState.FAIL:
          nextProps.dispatch(Actions.resetGetCircularTagListState());
          break;
        case requestState.LOADING:
          break;
        case requestState.SUCCESS:
          nextProps.dispatch(Actions.resetGetCircularTagListState());
          this.refreshDatas();
          break;
        case requestState.IDLE:
          break;
        default:
          break;
      }
    }

    if (this.props.circularListState !== nextProps.circularListState) {
      switch (nextProps.circularListState) {
        case requestState.FAIL:
          nextProps.dispatch(Actions.resetGetCircularListState());
          break;
        case requestState.LOADING:
          break;
        case requestState.SUCCESS:
          nextProps.dispatch(Actions.resetGetCircularListState());
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

  navigateTo = (routeName, params) => {
    this.props.navigation.navigate(routeName, params)
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
      this.props.dispatch(Actions.getCircularList(this.data.page_index, this.data.page_size));
    }
  }

  refreshDatas = () => {
    this.data.lockMore = false;
    this.data.page_index = 0;
    this.props.dispatch(Actions.getCircularList(this.data.page_index, this.data.page_size));
  }

  render() {
    const { state } = this.props.navigation;
    return (
      <View style={styles.container}>
        <FlatList
          ListHeaderComponent={
            <Carousel
              autoplay={true}
              infinite
              selectedIndex={1}
            >
              {this.state.carouselData.map(data => (
                <Image key={data}
                  style={{ height: ScreenConfig.window.width * 9 / 16, width: ScreenConfig.window.width }}
                  source={{ uri: `https://zos.alipayobjects.com/rmsportal/${data}.png` }}
                />
              ))}
            </Carousel>
          }
          data={this.props.circularList}
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
                <Text>发布人：{item.create_user_nickname}</Text>
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
          onEndReachedThreshold={10}
          onRefresh={this.refreshDatas}
          refreshing={this.state.refreshing}
        />
        <Button style={styles.publishCircular} type="primary" onClick={this.navigateTo.bind(this, 'CircularPublish')}>发布通告</Button>
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
  }
});

const CircularPageSelector = createSelector(
  [
    getCircularListState,
    getCircularListErrorObj,
    getCircularList,
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

export default connect(CircularPageSelector)(CircularPage);