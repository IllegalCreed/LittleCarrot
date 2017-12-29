/**
 * @providesModule UserInfoPage
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Keyboard
} from 'react-native';
import {
  List,
  Button,
  InputItem,
  Checkbox,
  Picker,
  TextareaItem,
  Toast,
} from 'antd-mobile';

import EToast, { DURATION } from 'react-native-easy-toast';
import { dateFormat } from 'dateHelper';

import { NavigationActions } from 'react-navigation';
import { Spacing } from 'AntDesignConfig';
import ScreenConfig from 'ScreenConfig';

import AliyunOSS from 'react-native-aliyun-oss';
import ImagePicker from 'react-native-image-picker';

import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import {
  getUserInfoState,
  getUserInfoErrorObj,
  getUserInfo,
  getUpdateUserInfoState,
  getUpdateUserInfoErrorObj,
} from 'Selectors';

import Actions from 'Actions';
import {
  requestState
} from 'ReducerCommon';

const options = {
  title: '选择头像',
  takePhotoButtonTitle: '拍照',
  chooseFromLibraryButtonTitle: '从相册选择',
  mediaType: 'photo',
  allowsEditing: true,
};

export class UserInfoPage extends Component {
  static navigationOptions = ({ navigation }) => {
    const { state, setParams } = navigation;
    return {
      title: '修改信息'
    };
  };

  constructor(props) {
    super(props)
    this.state = {
      saveButtonDisabled: false,
      nickName: '',
      height: '',
      weight: '',
      shoeSize: '',
      description: '',
      sexSource: [
        {
          label: '男',
          value: '0'
        },
        {
          label: '女',
          value: '1'
        }
      ],
      sex: ['0'],
      BWHSource: [
        [
          {
            label: '80',
            value: '80'
          }
        ],
        [
          {
            label: '60',
            value: '60'
          }
        ],
        [
          {
            label: '90',
            value: '90'
          }
        ]
      ],
      BWH: ['80', '60', '90'],
      avatarSource: null,
      keyboardAvoidingHeight: 0,
    }

    this.props.dispatch(Actions.getUserInfo());
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.getUserInfoState !== nextProps.getUserInfoState) {
      switch (nextProps.getUserInfoState) {
        case requestState.FAIL:
          nextProps.dispatch(Actions.resetGetUserInfoState());
          break;
        case requestState.LOADING:
          break;
        case requestState.SUCCESS:
          nextProps.dispatch(Actions.resetGetUserInfoState());
          this.setState({
            nickName: nextProps.userInfo.nickname,
            height: nextProps.userInfo.height,
            weight: nextProps.userInfo.weight,
            shoeSize: nextProps.userInfo.shoe_size,
            description: nextProps.userInfo.description,
            sex: [nextProps.userInfo.sex.toString()],
            BWH: [nextProps.userInfo.bust.toString(), nextProps.userInfo.waist.toString(), nextProps.userInfo.hips.toString()],
            avatarSource: { url: nextProps.userInfo.avatar_url + '?x-oss-process=style/400' },
          })
          break;
        case requestState.IDLE:
          break;
        default:
          break;
      }
    }
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

  componentDidMount() {
    let BWH = []
    for (let i = 50; i <= 100; i++) {
      BWH.push({
        label: i.toString(),
        value: i.toString()
      })
    }
    let BWHSource = [BWH, BWH, BWH];
    this.setState({
      BWHSource
    });
  }

  save = () => {
    var { saveAction } = this.props.navigation.state.params;
    if (saveAction == 'Home') {
      this.props.navigation.navigate(saveAction)
    } else {
      this.props.navigation.goBack();
    }
  }

  selectHeader = () => {
    ImagePicker.showImagePicker(options, (response) => {
      Toast.loading('上传中', 10, () => {
      }, true);
      this.setState({
        saveButtonDisabled: true
      })
      if (response.didCancel) {
        Toast.hide();
        this.setState({
          saveButtonDisabled: false
        })
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
        Toast.hide();
        this.setState({
          saveButtonDisabled: false
        })
      }
      else {
        let path = response.uri.replace('file://', '');
        let fileName = "avatar/" + guid() + ".png";
        AliyunOSS.asyncUpload('radish', fileName, path).then(() => {
          this.setState({
            avatarSource: { url: 'https://radish.oss-cn-beijing.aliyuncs.com/' + fileName + '?x-oss-process=style/400' }
          })
          Toast.hide();
          this.setState({
            saveButtonDisabled: false
          })
        });
      }
    });
  }

  render() {
    const { state } = this.props.navigation;
    return (
      <View style={styles.container}>
        <ScrollView ref={scrollView => this.scrollView = scrollView}>
          <List>
            <List.Item arrow='horizontal' onClick={this.selectHeader} extra={
              <View style={styles.userHeader}>
                <Image source={this.state.avatarSource} style={styles.avatar} />
              </View>
            }>头像</List.Item>
            <InputItem
              placeholder='请输入昵称'
              value={this.state.nickName}
              onChange={(val) => {
                this.setState({
                  nickName: val
                })
              }}>昵称</InputItem>
            <Picker
              data={this.state.sexSource}
              cols={1}
              value={this.state.sex}
              onOk={(value) => {
                this.setState({ sex: value })
              }}>
              <List.Item arrow='horizontal'>性别</List.Item>
            </Picker>
            <InputItem
              type='number'
              placeholder='请输入身高'
              value={this.state.height}
              onChange={(val) => {
                this.setState({
                  height: val
                })
              }}>身高</InputItem>
            <InputItem
              type='number'
              placeholder='请输入体重'
              value={this.state.weight}
              onChange={(val) => {
                this.setState({
                  weight: val
                })
              }}>体重</InputItem>
            <Picker
              data={this.state.BWHSource}
              cascade={false}
              value={this.state.BWH}
              onOk={(values) => {
                this.setState({ BWH: values })
              }}>
              <List.Item arrow='horizontal'>三围</List.Item>
            </Picker>
            <InputItem
              type='number'
              placeholder='请输入鞋码'
              value={this.state.shoeSize}
              onChange={(val) => {
                this.setState({
                  shoeSize: val
                })
              }}>鞋码</InputItem>
            <TextareaItem
              title='简介'
              rows={5}
              placeholder='请输入简介'
              count={80}
              onFocus={() => {
                if (Platform.OS === 'ios') {
                  setTimeout(() => { this.scrollView.scrollToEnd({ animated: true }) }, 800)
                }
              }}
              value={this.state.description}
              onChange={(val) => {
                this.setState({
                  description: val
                })
              }}
            />
          </List>
          <View style={styles.buttonContainer}>
            <Button type="primary" disabled={this.state.saveButtonDisabled} onClick={this.save}>保存</Button>
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
  userHeader: {
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#7265e6',
    borderRadius: 15,
    width: 30,
    height: 30,
  },
  avatar: {
    width: 30,
    height: 30
  }
});

const UserInfoPageSelector = createSelector(
  [
    getUserInfoState,
    getUserInfoErrorObj,
    getUserInfo,
    getUpdateUserInfoState,
    getUpdateUserInfoErrorObj,
  ], (
    getUserInfoState,
    getUserInfoError,
    userInfo,
    updateUserInfoState,
    updateUserInfoError,
  ) => {
    return {
      getUserInfoState,
      getUserInfoError: getUserInfoError ? getUserInfoError.msg : '',
      userInfo,
      updateUserInfoState,
      updateUserInfoError: updateUserInfoError ? updateUserInfoError.msg : '',
    };
  });

export default connect(UserInfoPageSelector)(UserInfoPage);