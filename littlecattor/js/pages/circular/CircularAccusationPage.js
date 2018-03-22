/**
 * @providesModule CircularAccusationPage
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
  Picker,
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
  getAddAccusationState,
  getAddAccusationErrorObj,
  getAccusationTypes
} from 'Selectors';
import {
  requestState
} from 'ReducerCommon';

var options = {
  title: '选择照片',
  cancelButtonTitle: "取消",
  takePhotoButtonTitle: "拍照上传",
  chooseFromLibraryButtonTitle: "从相册选择",
  mediaType: 'photo',
  allowsEditing: true,
};

function guid() {
  function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  }
  return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}

export class CircularAccusationPage extends Component {
  static navigationOptions = ({ navigation }) => {
    const { state, setParams } = navigation;
    return {
      title: '举报通告'
    };
  };

  constructor(props) {
    super(props)
    var { circular_id } = this.props.navigation.state.params;

    this.state = {
      publishButtonDisabled: false,
      currentType: ['1'],
      imageData: [],
    };
    this.data = {
      circularId: circular_id
    }

    this.props.dispatch(Actions.getAccusationTypeList());
  }

  componentDidMount() {

  }

  componentWillReceiveProps(nextProps) {
    if (this.props.addAccusationState !== nextProps.addAccusationState) {
      switch (nextProps.addAccusationState) {
        case requestState.FAIL:
          if (!nextProps.addAccusationErrorMsg) {
            this.publishToast.show('发布失败');
          } else {
            this.publishToast.show('发布失败，错误：' + nextProps.addAccusationErrorMsg);
          }
          nextProps.dispatch(Actions.resetAddAccusationState());
          break;
        case requestState.LOADING:
          break;
        case requestState.SUCCESS:
          nextProps.dispatch(Actions.resetAddAccusationState());
          this.navigateTo('CircularAccusationResult')
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
        let fileName = "report/" + guid() + ".png";
        AliyunOSS.asyncUpload('radish', fileName, path).then(() => {
          this.setState({
            imageData: this.state.imageData.concat([{
              url: 'https://radish.oss-cn-beijing.aliyuncs.com/' + fileName + '?x-oss-process=style/400',
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

  navigateTo = (routeName) => {
    let { CircularDetailPageKey } = this.props.navigation.state.params;
    this.props.navigation.navigate(routeName, { CircularDetailPageKey })
  }

  submit = () => {
    this.setState({
      publishButtonDisabled: true
    })
    let img_url_arr = this.state.imageData.map(file => {
      return file.url;
    })
    this.props.dispatch(Actions.addAccusation(this.data.circularId, this.state.currentType[0], img_url_arr));
  }

  render() {
    const { state } = this.props.navigation;
    return (
      <View style={styles.container}>
        <List>
          <Picker
            data={this.props.accusationTypes}
            cols={1}
            value={this.state.currentType}
            onOk={(value) => {
              this.setState({ currentType: value })
            }}>
            <List.Item arrow='horizontal'>举报类型</List.Item>
          </Picker>
        </List>
        <Text style={{ marginLeft: 15, fontSize: 17, marginVertical: 15 }}>证据截图</Text>
        <View style={{ marginLeft: 15 }}>
          <ImagePicker
            onChange={this.onChange}
            files={this.state.imageData}
            onAddImageClick={this.onAddImageClick}
            onImageClick={(index, fs) => console.log(index, fs)}
            selectable={this.state.imageData.length < 12}
          />
        </View>
        <EToast ref={publishToast => this.publishToast = publishToast} />
        <View style={styles.buttonContainer}>
          <Button type="primary" disabled={this.state.publishButtonDisabled} onClick={this.submit}>提交</Button>
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
    getAddAccusationState,
    getAddAccusationErrorObj,
    getAccusationTypes
  ], (
    addAccusationState,
    addAccusationError,
    accusationTypes
  ) => {
    return {
      addAccusationState,
      addAccusationErrorMsg: addAccusationError ? addAccusationError.msg : '',
      accusationTypes: accusationTypes.map((type) => {
        return {
          label: type.name,
          value: type.category_id.toString(),
        }
      }),
    };
  });

export default connect(CircularAccusationPageSelector)(CircularAccusationPage);