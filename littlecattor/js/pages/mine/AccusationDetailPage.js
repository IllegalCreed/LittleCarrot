/**
 * @providesModule AccusationDetailPage
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import {
  List,
  Button,
  InputItem,
  TextareaItem,
  ImagePicker,
} from 'antd-mobile';
const Item = List.Item;
const Brief = Item.Brief;

import EToast, { DURATION } from 'react-native-easy-toast';
import { dateFormat } from 'dateHelper';

import { NavigationActions } from 'react-navigation';
import { Spacing } from 'AntDesignConfig';
import ScreenConfig from 'ScreenConfig';

import AliyunOSS from 'react-native-aliyun-oss';

import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import Actions from 'Actions';
import {
  getAccusationDetailState,
  getAccusationDetailErrorObj,
  getAccusationDetail
} from 'Selectors';
import {
  requestState
} from 'ReducerCommon';

export class AccusationDetailPage extends Component {
  static navigationOptions = ({ navigation }) => {
    const { state, setParams } = navigation;
    return {
      title: '举报详情'
    };
  };

  constructor(props) {
    super(props)
    var { accusation_id } = this.props.navigation.state.params;

    this.state = {
      imageData: [],
    };
    this.data = {
      reportId: accusation_id
    }

    this.props.dispatch(Actions.getAccusationDetail(this.data.reportId));
  }

  componentDidMount() {

  }

  componentWillReceiveProps(nextProps) {
  }

  navigateTo = (routeName) => {
    this.props.navigation.navigate(routeName)
  }

  render() {
    const { state } = this.props.navigation;
    return (
      <View style={styles.container}>
        <List>
          <Item extra={this.props.accusationDetail.report_category_name}>举报类型</Item>
          <Item extra={this.props.accusationDetail.report_state == -1 ? '未通过' : this.props.accusationDetail.report_state == 0 ? '审核中' : '通过'}>举报状态</Item>
          <Item extra={dateFormat(new Date(this.props.accusationDetail.report_create_time), 'yyyy-MM-dd')}>举报时间</Item>
        </List>
        <Text style={{ marginLeft: 15, fontSize: 17, marginVertical: 15 }}>证据截图</Text>
        <View style={{ marginLeft: 15 }}>
          <ImagePicker
            files={this.props.accusationDetail.report_img_url_arr}
            onImageClick={(index, fs) => console.log(index, fs)}
            selectable={false}
          />
        </View>
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
    position: 'absolute',
    bottom: 64,
    left: 0,
    right: 0,
    flex: 1,
    flexDirection: "column",
    alignSelf: 'stretch',
    paddingHorizontal: Spacing.middle,
  },
});

const CircularAccusationPageSelector = createSelector(
  [
    getAccusationDetailState,
    getAccusationDetailErrorObj,
    getAccusationDetail
  ], (
    accusationDetailState,
    accusationDetailError,
    accusationDetail
  ) => {
    console.log(accusationDetail)
    if (accusationDetail.report_img_url_arr && typeof (accusationDetail.report_img_url_arr) == 'string') {
      accusationDetail.report_img_url_arr = JSON.parse(accusationDetail.report_img_url_arr)
      if (accusationDetail.report_img_url_arr.length > 0) {
        accusationDetail.report_img_url_arr = accusationDetail.report_img_url_arr.map(item => {
          return {
            url: item + '?x-oss-process=style/400',
            id: Math.floor(Math.random() * (10001)),
          }
        })
      }
    }
    return {
      accusationDetailState,
      accusationDetailErrorMsg: accusationDetailError ? accusationDetailError.msg : '',
      accusationDetail,
    };
  });

export default connect(CircularAccusationPageSelector)(AccusationDetailPage);