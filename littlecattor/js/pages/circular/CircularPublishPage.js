/**
 * @providesModule CircularPublishPage
 */


import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Keyboard
} from 'react-native';
import {
  List,
  Button,
  InputItem,
  Picker,
  TextareaItem,
  Toast,
  DatePicker
} from 'antd-mobile-rn';

import { NavigationActions } from 'react-navigation';
import { Spacing } from '../../configs/AntDesignConfig';
import ScreenConfig from '../../configs/ScreenConfig';

import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import {
  getCircularTagListState,
  getCircularTagListErrorObj,
  getTagList,
  getPublishCircularState,
  getPublishCircularErrorObj,
} from '../../configs/Selectors';

import Actions from '../../actions/index';
import {
  requestState
} from '../../reducers/common';

class CircularPublishPage extends Component {
  static navigationOptions = ({ navigation }) => {
    const { state, setParams } = navigation;
    return {
      title: '通告发布',
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
      publishButtonDisabled: false,
      tag: ['1'],
      title: '',
      price: '',
      start_time:new Date(),
      end_time:new Date(),
      wechat: '',
      detail: '',
      keyboardAvoidingHeight: 0,
    };

    this.props.dispatch(Actions.getCircularTagList());
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.publishCircularState !== nextProps.publishCircularState) {
      switch (nextProps.publishCircularState) {
        case requestState.FAIL:
          if (!nextProps.publishCircularErrorMsg) {
            Toast.info('发布失败',2);
          } else {
            Toast.info('发布失败，错误：' + nextProps.publishCircularErrorMsg,2);
          }
          nextProps.dispatch(Actions.resetPublishCircularState());
          break;
        case requestState.LOADING:
          break;
        case requestState.SUCCESS:
          this.backTo();
          nextProps.dispatch(Actions.resetPublishCircularState());
          break;
        case requestState.IDLE:
          this.setState({
            publishButtonDisabled: false
          })
          break;
        default:
          break;
      }
    }
  }

  componentDidMount() {

  }

  componentWillMount() {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  _keyboardDidShow = () => {
    if (Platform.OS === 'ios') {
      this.setState({
        keyboardAvoidingHeight: 300,
      })
    } else {
      this.setState({
        keyboardAvoidingHeight: 30,
      })
    }
  }

  _keyboardDidHide = () => {
    this.setState({
      keyboardAvoidingHeight: 0,
    })
  }

  navigateTo = (routeName) => {
    this.props.navigation.navigate(routeName)
  }

  backTo = () => {
    this.props.navigation.goBack();
  }

  publish = () => {
    this.setState({
      publishButtonDisabled: true
    })
    this.props.dispatch(Actions.publishCircular(this.state.price, this.state.detail, this.state.tag[0], this.state.wechat,this.state.start_time,this.state.end_time));
  }

  render() {
    const { state } = this.props.navigation;
    return (
      <View style={styles.container}>
        <ScrollView ref={scrollView => this.scrollView = scrollView}>
          <List>
            {/* <InputItem
            placeholder='请输入标题'
            value={this.state.title}
            onChange={(val) => {
              this.setState({
                title: val
              })
            }}>标题</InputItem> */}
            <InputItem
              type='number'
              placeholder='请输入价格'
              // value={this.state.price}
              onChange={(val) => {
                this.setState({
                  price: val
                })
              }}>价格</InputItem>
            <InputItem
              placeholder='请输入微信'
              // value={this.state.wechat}
              onChange={(val) => {
                this.setState({
                  wechat: val
                })
              }}>微信</InputItem>
            <Picker
              data={this.props.tagList}
              cols={1}
              value={this.state.tag}
              onOk={(value) => {
                this.setState({ tag: value })
              }}>
              <List.Item arrow='horizontal'>标签</List.Item>
            </Picker>
            <DatePicker
              mode="date"
              title="开始日期"
              extra="请选择"
              value={this.state.start_time}
              onChange={date => this.setState({ start_time: date })}
            >
              <List.Item arrow="horizontal">开始日期</List.Item>
            </DatePicker>
            <DatePicker
              mode="date"
              title="结束日期"
              extra="请选择"
              value={this.state.end_time}
              onChange={date => this.setState({ end_time: date })}
            >
              <List.Item arrow="horizontal">结束日期</List.Item>
            </DatePicker>
            <TextareaItem
              title='详情'
              rows={8}
              placeholder='请输入详情'
              count={300}
              // value={this.state.detail}
              onChange={(val) => {
                this.setState({
                  detail: val
                })
              }}
            />
          </List>
          <View style={styles.buttonContainer}>
            <Button type="primary" disabled={this.state.publishButtonDisabled} onClick={this.publish}>发布</Button>
            <Text style={styles.waringText}>我承诺发布信息均为真实合法信息</Text>
          </View>
          <View style={{ height: this.state.keyboardAvoidingHeight }}>
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
  waringText:{
    alignSelf:'center',
    marginTop:10
  }
});

const CircularPublishPageSelector = createSelector(
  [
    getCircularTagListState,
    getCircularTagListErrorObj,
    getTagList,
    getPublishCircularState,
    getPublishCircularErrorObj
  ],
  (
    circularTagListState,
    circularTagListError,
    tagList,
    publishCircularState,
    publishCircularError
  ) => {
    return {
      circularTagListState,
      circularTagListErrorMsg: circularTagListError ? circularTagListError.msg : '',
      tagList: tagList.map((tag) => {
        return {
          label: tag.name,
          value: tag.tag_id.toString(),
        }
      }),
      publishCircularState,
      publishCircularErrorMsg: publishCircularError ? publishCircularError.msg : '',
    };
  });

export default connect(CircularPublishPageSelector)(CircularPublishPage);