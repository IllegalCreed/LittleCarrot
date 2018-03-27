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
  Button,
  InputItem,
  TextareaItem,
  ImagePicker,
} from 'antd-mobile';
const Item = List.Item;
const Brief = Item.Brief;

import ImageViewer from 'react-native-image-zoom-viewer';
import { dateFormat } from 'dateHelper';

import { NavigationActions } from 'react-navigation';
import { Spacing } from 'AntDesignConfig';
import ScreenConfig from 'ScreenConfig';

import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import {
  getExposureDetailState,
  getExposureDetailErrorObj,
  getExposureDetail,
  getSupportExposureState,
  getSupportExposureErrorObj,
} from 'Selectors';

import Actions from 'Actions';
import {
  requestState
} from 'ReducerCommon';

export class ExposureDetailPage extends Component {
  static navigationOptions = ({ navigation }) => {
    const { state, setParams } = navigation;
    return {
      title: '曝光详情'
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
    this.props.dispatch(Actions.supportExposure(this.data.exposureId, isSupport));
  }

  showImage = (index, fs) => {
    this.setState({
      modalVisible: true,
      currentImageIndex: index
    })
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
          <View style={{ flexDirection: "row", marginTop: Spacing.middle, paddingHorizontal: Spacing.middle, }}>
            <Button
              size='small'
              style={{ flex: 1, marginHorizontal: 40 }}
              type={this.props.exposureDetail.my_attitude != 1 ? 'primary' : 'warning'}
              disabled={this.props.exposureDetail.my_attitude != -1}
              onClick={this.support.bind(this, 1)}
            >支持</Button>
            <Button
              size='small'
              style={{ flex: 1, marginHorizontal: 40 }}
              type={this.props.exposureDetail.my_attitude != 0 ? 'ghost' : 'warning'}
              disabled={this.props.exposureDetail.my_attitude != -1}
              onClick={this.support.bind(this, 0)}
            >反对</Button>
          </View>
          <View style={styles.buttonContainer}>
            <Button type="primary">告诉朋友</Button>
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