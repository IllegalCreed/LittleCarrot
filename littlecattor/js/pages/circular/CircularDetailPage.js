/**
 * @providesModule CircularDetailPage
 */


import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Clipboard,
  Image,
  TouchableOpacity
} from 'react-native';
import {
  List,
  Button,
  InputItem,
  TextareaItem,
  Toast,
  NoticeBar,
} from 'antd-mobile-rn';
const Item = List.Item;
const Brief = Item.Brief;

import { dateFormat } from '../../common/dateHelper';

import { NavigationActions } from 'react-navigation';
import { Spacing } from '../../configs/AntDesignConfig';
import ScreenConfig from '../../configs/ScreenConfig';
import LinearGradient from 'react-native-linear-gradient';

import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import {
  getCircularDetailState,
  getCircularDetailErrorObj,
  getCircularDetail,
  getTagList,
} from '../../configs/Selectors';

import Actions from '../../actions/index';
import {
  requestState
} from '../../reducers/common';

import * as wechat from 'react-native-wechat';

class CircularDetailPage extends Component {
  static navigationOptions = ({ navigation }) => {
    const { state, setParams } = navigation;
    return {
      title: '通告详情',
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
    var { circular_id } = this.props.navigation.state.params;

    this.state = {
    }

    this.data = {
      circularId: circular_id
    }
    this.props.dispatch(Actions.getCircularDetail(this.data.circularId));
  }


  componentDidMount() {

  }

  navigateTo = (routeName) => {
    this.props.navigation.navigate(routeName, { CircularDetailPageKey: this.props.navigation.state.key, circular_id: this.data.circularId })
  }

  getTagNameById = (id) => {
    if (id) {
      return this.props.tagList.find((tag) => {
        return id == tag.id
      }).name
    } else {
      '未知'
    }
  }

  copyWX = () => {
    Clipboard.setString(this.props.circularDetail.wx);
    Toast.info('已复制', 2);
  }

  share = () => {
    wechat.isWXAppInstalled()
      .then((isInstalled) => {
        if (isInstalled) {
          wechat.shareToSession({
            title: '小萝卜',
            type: 'news',
            description: '我在小萝卜APP上找到了一个不错的通告，大家一起来看看吧！',
            webpageUrl: 'http://a.app.qq.com/o/simple.jsp?pkgname=com.littlecattor'
          });
        } else {
          Toast.info('没有安装微信软件，请您安装微信之后再试', 2);
        }
      });
  }

  render() {
    const { state } = this.props.navigation;
    return (
      <View style={styles.container}>
        <ScrollView ref={scrollView => this.scrollView = scrollView}>
          <NoticeBar style={{ marginTop: 5 }} marqueeProps={{ loop: true, leading: 500, trailing: 800, }}>
            承接活动前注意事项：正规活动不会收费，正规活动价格不会高的离谱，正规活动不会有潜规则！更有甚者谎称绿色饭局，商务伴游，贴身保姆等卖淫嫖娼的违法行为拉大家下水！一旦发现直接举报，严惩不贷！
          </NoticeBar>

          <View style={styles.detailContent}>
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <View style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
                <Text style={styles.circularTitle}>{this.props.circularDetail.title}</Text>
                <View style={styles.tag}>
                  <Text style={styles.tagText}>{this.getTagNameById(this.props.circularDetail.tag_id)}</Text>
                </View>
              </View>
              <Text style={styles.date}>{dateFormat(new Date(this.props.circularDetail.create_time), 'yyyy-MM-dd')}</Text>
            </View>
            <View style={{
              flexDirection: 'row',
              marginTop: 20,
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
              <View style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
                <Image source={require('./img/time.png')} style={styles.timeicon}></Image>
                <Text style={styles.timeRange}>{dateFormat(new Date(this.props.circularDetail.start_time), 'MM/dd') + '-' + dateFormat(new Date(this.props.circularDetail.end_time), 'MM/dd')}</Text>
              </View>
              <Text style={styles.price}>￥{this.props.circularDetail.price}</Text>
            </View>
            <View style={{
              flexDirection: 'row',
              marginTop: 20,
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
              <View style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
                <View style={styles.userHeader}>
                  {this.props.circularDetail.avatar_url ?
                    <Image source={{ uri: this.props.circularDetail.avatar_url ? this.props.circularDetail.avatar_url + '?x-oss-process=style/400' : '' }} style={styles.avatar} />
                    : null}
                </View>
                <Text style={styles.publisher}>{this.props.circularDetail.nickname}</Text>
              </View>
              {/* <View style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
                <Image source={require('./img/hot.png')} style={styles.hoticon}></Image>
                <Text style={styles.hotText}>1890</Text>
              </View> */}
            </View>
            <View style={{
              flexDirection: 'row',
              marginTop: 20,
              alignItems: 'center',
            }}>
              <Text style={{ fontSize: 14 }}>微信：{this.props.circularDetail.wx}</Text>
              <TouchableOpacity onPress={this.copyWX}>
                <Image source={require('./img/wx.png')} style={styles.wxicon} />
              </TouchableOpacity>
            </View>
            <View style={{ height: 1, borderColor: '#e5e5e5', borderTopWidth: 1, alignSelf: 'stretch', marginHorizontal: -5, marginVertical: 20 }}></View>
            <Text style={{ fontSize: 16 }}>详情</Text>
            <Text style={{ fontSize: 14, marginTop: 10 }}>{this.props.circularDetail.content}</Text>
          </View>
          {/* <List style={{ marginTop: 5 }}>
            <Item multipleLine>
              标题 <Brief>{this.props.circularDetail.title}</Brief>
            </Item>
            <Item extra={this.getTagNameById(this.props.circularDetail.tag_id)}>标签</Item>
            <Item extra={this.props.circularDetail.price + '元'}>价格</Item>
            <Item extra={this.props.circularDetail.nickname}>发布人</Item>
            <Item extra={dateFormat(new Date(this.props.circularDetail.create_time), 'yyyy-MM-dd')}>发布时间</Item>
            <Item extra={this.props.circularDetail.wx} onClick={this.copyWX}>微信</Item>
            <Item wrap>详细信息<Brief>{this.props.circularDetail.content}</Brief></Item>
          </List> */}
        </ScrollView>
        <View style={styles.buttonContainer}>
          {
            this.props.circularDetail.is_report || this.props.circularDetail.state == -1 ?
              null :
              <TouchableOpacity onPress={this.navigateTo.bind(this, 'CircularAccusation')}>
                <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#fe865f', '#fc57b5']} style={styles.accusationButton}>
                  <Text style={{ color: '#fff', fontSize: 16 }}>举报</Text>
                </LinearGradient>
              </TouchableOpacity>
            // <Button
            //   type="primary"
            //   onClick={this.navigateTo.bind(this, 'CircularAccusation')}>
            //   举报
            // </Button>
          }
          <TouchableOpacity onPress={this.share}>
            <View style={styles.shareButton}>
              <Text style={{ color: '#ff4077', fontSize: 16 }}>分享</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: '#f2f2f2',
  },
  detailContent: {
    marginTop: 5,
    paddingHorizontal: 15,
    paddingVertical: 20,
    paddingBottom: 50,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#fff'
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 50,
    width: '100%',
    display: 'flex',
    flexDirection: "row",
    justifyContent: 'center',
    alignItems: 'center',
  },
  shareButton: {
    marginLeft: 30,
    width: 60,
    height: 60,
    display: 'flex',
    flexDirection: "column",
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#ff4077',
  },
  accusationButton: {
    width: 60,
    height: 60,
    display: 'flex',
    flexDirection: "column",
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
  },
  circularTitle: {
    fontFamily: 'PingFang SC',
    fontSize: 16,
  },
  tag: {
    marginLeft: 10,
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
  wxicon: {
    width: 30,
    height: 30,
    marginLeft: 10
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


const CircularDetailPageSelector = createSelector(
  [
    getCircularDetailState,
    getCircularDetailErrorObj,
    getCircularDetail,
    getTagList
  ], (
    circularDetailState,
    circularDetailError,
    circularDetail,
    tagList,
  ) => {
    return {
      circularDetailState,
      circularDetailErrorMsg: circularDetailError ? circularDetailError.msg : '',
      circularDetail,
      tagList: tagList.map((tag) => {
        return {
          name: tag.name,
          id: tag.tag_id,
        }
      }),
    };
  });

export default connect(CircularDetailPageSelector)(CircularDetailPage);