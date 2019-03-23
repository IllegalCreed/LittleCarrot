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
  NoticeBar,
} from 'antd-mobile-rn';

import { dateFormat } from '../../common/dateHelper';

import { NavigationActions } from 'react-navigation';
import { Spacing } from '../../configs/AntDesignConfig';
import ScreenConfig from '../../configs/ScreenConfig';

import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import {
  getCircularListState,
  getCircularListErrorObj,
  getCircularList,
  getCircularTagListState,
  getCircularTagListErrorObj,
  getTagList,
  getBannerList
} from '../../configs/Selectors';

import Actions from '../../actions/index';
import {
  requestState
} from '../../reducers/common';

class CircularPage extends Component {
  static navigationOptions = ({ navigation }) => {
    const { state, setParams } = navigation;
    return {
      title: '通告',
      tabBarIcon: ({ tintColor }) => (
        <Image
          source={require('../../routers/img/form.png')}
          style={{ tintColor: tintColor, width: 22, height: 25 }}
        />
      ),
    };
  };

  constructor(props) {
    super(props)
    this.state = {
      // carouselData: ['AiyWuByWklrrUDlFignR', 'TekJlZRVCjLFexlOCuWn', 'IJOtIlfsYdTyaDTRVrLI'],
      refreshing: false,
    }

    this.data = {
      lockMore: false,
      page_index: 0,
      page_size: 3,
    }

    this.props.dispatch(Actions.getCircularTagList());
    this.props.dispatch(Actions.getBanner());
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
          marginTop: 12,
          flex: 1,
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
            <Image source={require('./img/time.png')} style={styles.timeicon}></Image>
            <Text style={styles.timeRange}>{dateFormat(new Date(item.start_time), 'MM/dd') + '-' + dateFormat(new Date(item.end_time), 'MM/dd')}</Text>
          </View>
          <Text style={styles.price}>￥{item.price}</Text>
        </View>
        <View style={{
          flexDirection: 'row',
          marginTop: 20,
          flex: 1,
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
            <View style={styles.userHeader}>
              {item.avatar_url ?
                <Image source={{ uri: item.avatar_url ? item.avatar_url + '?x-oss-process=style/400' : '' }} style={styles.avatar} /> : null
              }
            </View>
            <Text style={styles.publisher}>{item.nickname}</Text>
          </View>
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
            <Image source={require('./img/hot.png')} style={styles.hoticon}></Image>
            <Text style={styles.hotText}>{item.read_count}</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  render() {
    const { state } = this.props.navigation;
    return (
      <View style={styles.container}>
        <FlatList
          ListHeaderComponent={
            <View>
              <Carousel
                autoplay={true}
                infinite
                selectedIndex={1}
              >
                {this.props.bannerList.map(data => (
                  <Image key={data.img_url}
                    style={{ height: ScreenConfig.window.width * 9 / 16, width: ScreenConfig.window.width }}
                    source={{ uri: "https://radish.oss-cn-beijing.aliyuncs.com/" + data.img_url }}
                  />
                ))}
              </Carousel>
              <NoticeBar style={{ marginTop: 5 }} marqueeProps={{ loop: true, leading: 500, trailing: 800, }}>
                承接活动前注意事项：正规活动不会收费，正规活动价格不会高的离谱，正规活动不会有潜规则！更有甚者谎称绿色饭局，商务伴游，贴身保姆等卖淫嫖娼的违法行为拉大家下水！一旦发现直接举报，严惩不贷！
            </NoticeBar>
            </View>
          }
          data={this.props.circularList}
          keyExtractor={(item, index) => {
            return index.toString();
          }}
          renderItem={this.renderItem}
          onEndReached={this.loadMoreDatas}
          onEndReachedThreshold={10}
          onRefresh={this.refreshDatas}
          refreshing={this.state.refreshing}
        />
        <TouchableOpacity style={styles.publishCircular} onPress={this.navigateTo.bind(this, 'CircularPublish')}>
          <Image source={require('./img/add.png')} style={styles.addicon}></Image>
        </TouchableOpacity>
        {/* <Button  type="primary" onClick={this.navigateTo.bind(this, 'CircularPublish')}>发布通告</Button> */}
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
    bottom: 20,
    right: 10,
    shadowColor: '#fe86f5',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  circularItem: {
    borderRadius: 2,
    paddingHorizontal: 15,
    paddingTop: 15,
    paddingBottom: 5,
    backgroundColor: 'white',
    marginTop: 5,
  },
  circularTitle: {
    fontFamily: 'PingFang SC',
    fontSize: 16,
    marginTop: 12,
  },
  tag: {
    backgroundColor: '#ff4076',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 3,
    alignSelf: 'flex-start',
    borderRadius: 2,
  },
  tagText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  timeicon: {
    width: 18,
    height: 18
  },
  hoticon: {
    width: 10,
    height: 10
  },
  addicon: {
    width: 60,
    height: 75,
  },
  timeRange: {
    fontSize: 16,
    fontWeight: '100',
    marginLeft: 10
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
    fontSize: 20,
    marginRight: 100,
    color: '#e63926'
  },
  hotText: {
    fontSize: 12,
    marginLeft: 8,
    color: '#bfbfbf',
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

const CircularPageSelector = createSelector(
  [
    getCircularListState,
    getCircularListErrorObj,
    getCircularList,
    getCircularTagListState,
    getCircularTagListErrorObj,
    getTagList,
    getBannerList,
  ], (
    circularListState,
    circularListError,
    circularList,
    circularTagListState,
    circularTagListError,
    tagList,
    bannerList
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
      bannerList,
    };
  });

export default connect(CircularPageSelector)(CircularPage);