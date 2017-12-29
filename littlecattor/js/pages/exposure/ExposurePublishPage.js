/**
 * @providesModule ExposurePublishPage
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Keyboard,
  Platform,
  ScrollView,
} from 'react-native';
import {
  List,
  Button,
  Picker,
  InputItem,
  TextareaItem,
  ImagePicker,
  Toast,
} from 'antd-mobile';

import EToast, { DURATION } from 'react-native-easy-toast'

import { NavigationActions } from 'react-navigation';
import { Spacing } from 'AntDesignConfig';
import ScreenConfig from 'ScreenConfig';

import AliyunOSS from 'react-native-aliyun-oss';
import ImagePicker2 from 'react-native-image-picker';

import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import Actions from 'Actions';
import {
  getPublishExposureState,
  getPublishExposureErrorObj,
} from 'Selectors';
import {
  requestState
} from 'ReducerCommon';

var options = {
  title: '选择照片',
  cancelButtonTitle: "取消",
  takePhotoButtonTitle: "拍照上传",
  chooseFromLibraryButtonTitle: "从相册选择",
  storageOptions: {
    skipBackup: true,
    path: 'images'
  },
};

function guid() {
  function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  }
  return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}

export class ExposurePublishPage extends Component {
  static navigationOptions = ({ navigation }) => {
    const { state, setParams } = navigation;
    return {
      title: '发布经历'
    };
  };

  constructor(props) {
    super(props)
    this.state = {
      title: '',
      tag: '',
      wechat: '',
      detail: '',
      imageData: [],
    };
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

  componentWillReceiveProps(nextProps) {
    if (this.props.publishExposureState !== nextProps.publishExposureState) {
      switch (nextProps.publishExposureState) {
        case requestState.FAIL:
          if (!nextProps.publishExposureErrorMsg) {
            this.publishToast.show('发布失败');
          } else {
            console.log(nextProps.publishExposureErrorMsg)
            this.publishToast.show('发布失败，错误：' + nextProps.publishExposureErrorMsg);
          }
          nextProps.dispatch(Actions.resetPublishExposureState());
          break;
        case requestState.LOADING:
          break;
        case requestState.SUCCESS:
          nextProps.dispatch(Actions.resetPublishExposureState());
          this.navigateTo('ExposurePublishResult')
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

  onChange = (files, type, index) => {
    this.setState({
      imageData: files,
    });
  }

  onAddImageClick = () => {
    ImagePicker2.showImagePicker(options, (response) => {
      Toast.loading('上传中', 10, () => {
      }, true);
      this.setState({
        publishButtonDisabled: true
      })
      if (response.didCancel) {
        Toast.hide();
        this.setState({
          publishButtonDisabled: false
        })
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
        Toast.hide();
        this.setState({
          publishButtonDisabled: false
        })
      }
      else {
        let path = response.uri.replace('file://', '');
        let fileName = "exposure/" + guid() + ".png";
        AliyunOSS.asyncUpload('radish', fileName, path).then(() => {
          this.setState({
            imageData: this.state.imageData.concat([{
              url: 'https://radish.oss-cn-beijing.aliyuncs.com/' + fileName,
              id: Math.floor(Math.random() * (10001)),
            }]),
          });
          Toast.hide();
          this.setState({
            publishButtonDisabled: false
          })
        });
      }
    });
  }

  submit = () => {
    this.setState({
      publishButtonDisabled: true
    })
    let img_url_arr = this.state.imageData.map(file => {
      return file.url;
    })
    this.props.dispatch(Actions.publishExposure(this.state.title, img_url_arr, this.state.detail, this.state.wechat, this.state.tag));
  }

  backTo = () => {
    this.props.navigation.goBack();
  }

  navigateTo = (routeName) => {
    this.props.navigation.navigate(routeName, { ExposurePublishPageKey: this.props.navigation.state.key })
  }

  render() {
    const { state } = this.props.navigation;
    return (
      <View style={styles.container}>
        <ScrollView ref={scrollView => this.scrollView = scrollView}>
          <List>
            <InputItem
              placeholder='请输入标题'
              value={this.state.title}
              onChange={(val) => {
                this.setState({
                  title: val
                })
              }}>标题</InputItem>
            {/* <Picker
            data={this.state.typeSource}
            cols={1}
            value={this.state.type}
            onOk={(value) => {
              this.setState({ type: value })
            }}>
            <List.Item arrow='horizontal'>标签</List.Item>
          </Picker> */}
            <InputItem
              placeholder='请输入标签'
              value={this.state.tag}
              onChange={(val) => {
                this.setState({
                  tag: val
                })
              }}>标签</InputItem>
            <InputItem
              placeholder='请输入微信'
              value={this.state.wechat}
              onChange={(val) => {
                this.setState({
                  wechat: val
                })
              }}>微信</InputItem>
            <TextareaItem
              title='详情'
              rows={5}
              placeholder='请输入详情'
              count={160}
              value={this.state.detail}
              onChange={(val) => {
                this.setState({
                  detail: val
                })
              }}
            />
          </List>
          <Text style={{ marginLeft: 15, fontSize: 17, marginVertical: 15 }}>证据截图</Text>
          <View style={{ marginLeft: 15 }}>
            <ImagePicker
              files={this.state.imageData}
              onChange={this.onChange}
              onAddImageClick={this.onAddImageClick}
              onImageClick={(index, fs) => console.log(index, fs)}
              selectable={this.state.imageData.length < 8}
            />
          </View>
          <EToast ref={publishToast => this.publishToast = publishToast} />
          <View style={styles.buttonContainer}>
            <Button type="primary" disabled={this.state.publishButtonDisabled} onClick={this.submit}>曝光</Button>
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
    flex: 1,
    flexDirection: "column",
    alignSelf: 'stretch',
    paddingHorizontal: Spacing.middle,
  },
});

const ExposurePublishPageSelector = createSelector(
  [
    getPublishExposureState,
    getPublishExposureErrorObj,
  ], (
    publishExposureState,
    publishExposureError,
  ) => {
    return {
      publishExposureState,
      publishExposureErrorMsg: publishExposureError ? publishExposureError.msg : '',
    };
  });

export default connect(ExposurePublishPageSelector)(ExposurePublishPage);