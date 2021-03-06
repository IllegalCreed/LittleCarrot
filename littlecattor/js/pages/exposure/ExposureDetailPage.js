/**
 * @providesModule ExposureDetailPage
 */


import React, { Component } from 'react';
import {
  Alert,
  StyleSheet,
  ScrollView,
  Text,
  View,
  Modal,
  Image,
  TouchableWithoutFeedback
} from 'react-native';
import {
  List,
  Toast,
  Button,
  InputItem,
  TextareaItem,
  ImagePicker,
} from 'antd-mobile-rn';
const Item = List.Item;
const Brief = Item.Brief;

import ImageViewer from 'react-native-image-zoom-viewer';
import { dateFormat } from '../../common/dateHelper';

import { NavigationActions } from 'react-navigation';
import { Spacing } from '../../configs/AntDesignConfig';
import ScreenConfig from '../../configs/ScreenConfig';

import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import {
  getExposureDetailState,
  getExposureDetailErrorObj,
  getExposureDetail,
  getSupportExposureState,
  getSupportExposureErrorObj,
} from '../../configs/Selectors';

import Actions from '../../actions/index';
import {
  requestState
} from '../../reducers/common';

import * as wechat from 'react-native-wechat';

export class ExposureDetailPage extends Component {
  static navigationOptions = ({ navigation }) => {
    const { state, setParams } = navigation;
    return {
      title: '曝光详情',
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
    var { exposure_id } = this.props.navigation.state.params;

    this.state = {
      modalVisible: false,
      currentImageIndex: 0,
    };

    this.data = {
      exposureId: exposure_id
    }
    this.props.dispatch(Actions.getExposureDetail(this.data.exposureId));
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.supportExposureState !== nextProps.supportExposureState) {
      switch (nextProps.supportExposureState) {
        case requestState.FAIL:
          nextProps.dispatch(Actions.resetSupportExposureState());
          break;
        case requestState.LOADING:
          break;
        case requestState.SUCCESS:
          nextProps.dispatch(Actions.resetSupportExposureState());
          this.props.dispatch(Actions.getExposureDetail(this.data.exposureId));
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

  navigateTo = (routeName) => {
    this.props.navigation.navigate(routeName)
  }

  support = (isSupport) => {
    this.props.dispatch(Actions.supportExposure(this.data.exposureId, isSupport))
  }

  showImage = (index, fs) => {
    this.setState({
      modalVisible: true,
      currentImageIndex: index
    })
  }

  share = () => {
    wechat.isWXAppInstalled()
      .then((isInstalled) => {
        if (isInstalled) {
          wechat.shareToSession({
            title: '小萝卜',
            type: 'news',
            description: '我在小萝卜APP上曝光了一个骗子，大家一起来看看吧！',
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
          <List>
            <Item extra={this.props.exposureDetail.title}>标题</Item>
            <Item extra={this.props.exposureDetail.tag}>标签</Item>
            <Item extra={this.props.exposureDetail.wx}>微信</Item>
            <Item wrap>详细信息<Brief>{this.props.exposureDetail.content}</Brief></Item>
          </List>
          <Text style={{ marginLeft: 15, fontSize: 17, marginVertical: 15 }}>证据截图</Text>
          <View style={{ marginLeft: 15 }}>
            <ImagePicker
              files={this.props.exposureDetail.img_url_arr}
              onImageClick={this.showImage}
              selectable={false}
            />
          </View>
          {/* <View style={{ flexDirection: "row", marginTop: Spacing.middle, height: 80 }}>
            <View style={{ flexDirection: "row", flex: 1, backgroundColor: "#52c41a" }}>

            </View>
            <View style={{ flexDirection: "row", flex: 1, backgroundColor: "#f5222d" }}>
            
            </View>
          </View> */}
          <View style={{ flexDirection: "row", marginTop: 50, paddingHorizontal: Spacing.middle, }}>
            <View style={{ flex: 1, marginHorizontal: 40, alignItems: "center" }}>
              <Text style={{ color: "#52c41a" }}>{this.props.exposureDetail.support_count}</Text>
              {this.props.exposureDetail.my_attitude == -1 ?
                <Button
                  size='small'
                  style={{ width: 80, marginTop: 10 }}
                  type={this.props.exposureDetail.my_attitude != 1 ? 'primary' : 'warning'}
                  disabled={this.props.exposureDetail.my_attitude != -1}
                  onClick={this.support.bind(this, 1)}
                >支持</Button> : <Text style={{ color: "#52c41a", marginTop: 10 }}>支持</Text>
              }
            </View>
            <View style={{ flex: 1, marginHorizontal: 40, alignItems: "center" }}>
              <Text style={{ color: "#f5222d" }}>{this.props.exposureDetail.opposition_count}</Text>
              {this.props.exposureDetail.my_attitude == -1 ?
                <Button
                  size='small'
                  style={{ width: 80, marginTop: 10 }}
                  type={this.props.exposureDetail.my_attitude != 0 ? 'ghost' : 'warning'}
                  disabled={this.props.exposureDetail.my_attitude != -1}
                  onClick={this.support.bind(this, 0)}
                >反对</Button> : <Text style={{ color: "#f5222d", marginTop: 10 }}>反对</Text>
              }
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <Button type="primary" onClick={this.share}>告诉朋友</Button>
          </View>

          <Modal
            animationType="fade"
            transparent={true}
            visible={this.state.modalVisible}
            onRequestClose={() => {
            }}>
            <ImageViewer index={this.state.currentImageIndex} imageUrls={this.props.exposureDetail.img_url_arr}
              onClick={() => {
                this.setState({
                  modalVisible: false
                })
              }}
            />
          </Modal>
        </ScrollView>
      </View >
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
    marginTop: 80,
    marginBottom: 30,
    flex: 1,
    flexDirection: "column",
    alignSelf: 'stretch',
    paddingHorizontal: Spacing.middle,
  },
  modalContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#000000',
  },
});

const ExposureDetailPageSelector = createSelector(
  [
    getExposureDetailState,
    getExposureDetailErrorObj,
    getExposureDetail,
    getSupportExposureState,
    getSupportExposureErrorObj,
  ], (
    exposureDetailState,
    exposureDetailError,
    exposureDetail,
    supportExposureState,
    supportExposureError
  ) => {
    // console.log(exposureDetail)
    if (exposureDetail.img_url_arr && typeof (exposureDetail.img_url_arr) == 'string') {
      exposureDetail.img_url_arr = JSON.parse(exposureDetail.img_url_arr)
      if (exposureDetail.img_url_arr.length > 0) {
        exposureDetail.img_url_arr = exposureDetail.img_url_arr.map(item => {
          return {
            url: item,
            id: Math.floor(Math.random() * (10001)),
          }
        })
      }
    }
    return {
      exposureDetailState,
      exposureDetailErrorMsg: exposureDetailError ? exposureDetailError.msg : '',
      exposureDetail,
      supportExposureState,
      supportExposureErrorMsg: supportExposureError ? supportExposureError.msg : '',
    };
  });

export default connect(ExposureDetailPageSelector)(ExposureDetailPage);