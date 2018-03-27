/**
 * @providesModule CircularDetailPage
 */


import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Clipboard
} from 'react-native';
import {
  List,
  Button,
  InputItem,
  TextareaItem,
  Toast
} from 'antd-mobile';
const Item = List.Item;
const Brief = Item.Brief;

import { dateFormat } from 'dateHelper';

import { NavigationActions } from 'react-navigation';
import { Spacing } from 'AntDesignConfig';
import ScreenConfig from 'ScreenConfig';

import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import {
  getCircularDetailState,
  getCircularDetailErrorObj,
  getCircularDetail,
  getTagList,
} from 'Selectors';

import Actions from 'Actions';
import {
  requestState
} from 'ReducerCommon';

import * as wechat from 'react-native-wechat';

class CircularDetailPage extends Component {
  static navigationOptions = ({ navigation }) => {
    const { state, setParams } = navigation;
    return {
      title: '通告详情'
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
            type: 'text',
            description: '我再小萝卜APP上找到了一个不错的通告，大家一起来看看吧！'
          });
        } else {
          toastShort('没有安装微信软件，请您安装微信之后再试');
        }
      });
  }

  render() {
    const { state } = this.props.navigation;
    return (
      <View style={styles.container}>
        <ScrollView ref={scrollView => this.scrollView = scrollView}>
          <List>
            <Item multipleLine>
              标题 <Brief>{this.props.circularDetail.title}</Brief>
            </Item>
            <Item extra={this.getTagNameById(this.props.circularDetail.tag_id)}>标签</Item>
            <Item extra={this.props.circularDetail.price + '元'}>价格</Item>
            <Item extra={this.props.circularDetail.nickname}>发布人</Item>
            <Item extra={dateFormat(new Date(this.props.circularDetail.create_time), 'yyyy-MM-dd')}>发布时间</Item>
            <Item extra={this.props.circularDetail.wx} onClick={this.copyWX}>微信</Item>
            <Item wrap>详细信息<Brief>{this.props.circularDetail.content}</Brief></Item>
          </List>
          <View style={styles.buttonContainer}>
            {
              this.props.circularDetail.is_report || this.props.circularDetail.state == -1 ?
                null :
                <Button
                  type="primary"
                  onClick={this.navigateTo.bind(this, 'CircularAccusation')}>
                  举报
              </Button>
            }
            <Button style={{ marginTop: Spacing.small }} type="ghost" onClick={this.share}>分享</Button>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    paddingTop: 12,
    backgroundColor: '#f4f3fd',
  },
  buttonContainer: {
    marginTop: 50,
    marginBottom: 30,
    flex: 1,
    flexDirection: "column",
    alignSelf: 'stretch',
    paddingHorizontal: Spacing.middle,
  },
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