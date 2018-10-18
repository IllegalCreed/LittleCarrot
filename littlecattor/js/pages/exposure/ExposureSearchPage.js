/**
 * @providesModule ExposureSearchPage
 */


import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList
} from 'react-native';
import {
  Button,
  SearchBar,
} from 'antd-mobile-rn';

import { dateFormat } from '../../common/dateHelper';

import { NavigationActions } from 'react-navigation';
import { Spacing } from '../../configs/AntDesignConfig';
import ScreenConfig from '../../configs/ScreenConfig';

import LinearGradient from 'react-native-linear-gradient';

import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import {
  getSearchWechatState,
  getSearchWechatErrorObj,
  getFakeWechat,
} from '../../configs/Selectors';

import Actions from '../../actions/index';
import {
  requestState
} from '../../reducers/common';


export class ExposureSearchPage extends Component {
  static navigationOptions = ({ navigation }) => {
    const { state, setParams } = navigation;
    return {
      title: '微信查询',
    };
  };

  constructor(props) {
    super(props)
    this.state = {
      wx: '',
      showSearchButton: true,
    }
  }

  componentDidMount() {
  }

  navigateTo = (routeName) => {
    this.props.navigation.navigate(routeName)
  }

  submit = (wx) => {
    this.props.dispatch(Actions.searchWechat(wx));
    this.setState({
      showSearchButton: false
    })
  }

  search = () => {
    this.submit(this.state.wx)
  }

  render() {
    const { state } = this.props.navigation;
    return (
      <View style={styles.container}>

        <TextInput
          style={{ height: 40, padding: 0, marginTop: 50 }}
          placeholder='微信号'
          underlineColorAndroid="transparent"
          onChangeText={(text) => this.setState({ wx: text, showSearchButton: true, })}
          value={this.state.wx}
        />
        <View style={styles.line}></View>

        <TouchableOpacity onPress={this.search} style={styles.buttonOuter}>
          <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#fe865f', '#fc57b5']} style={styles.buttonInner}>
            <Text style={styles.buttonText}>搜索</Text>
          </LinearGradient>
        </TouchableOpacity>

        {
          this.state.showSearchButton
            ? <View>
              <Text style={styles.tip}>{`未知领队、模特艺人等联系人信用指数时，可在搜索栏中输入其“微信号码”，即可获取相应的匹配信息。
曝光墙筛选不正规、虚假的通告、领队、模特艺人等，为你的舞台亮起一盏明灯，维护你的安全。
`}</Text>
            </View>
            : this.props.fakeWechat.is_exist
              ? <View>
                <Text style={[styles.tip, { color: "#fa541c" }]}>该用户已被多次曝光举报，请谨慎处理！</Text>
                <Text style={styles.tip}>如遇欺诈行为，请及时在曝光墙中曝光，让更多的小萝卜避免上当受骗！</Text>
              </View>
              : <View>
                <Text style={[styles.tip, { color: "#7cb305" }]}>该用户尚未被举报！</Text>
                <Text style={styles.tip}>如遇欺诈行为，请及时在曝光墙中曝光，让更多的小萝卜避免上当受骗！</Text>
              </View>
        }

        {/* <SearchBar
          placeholder="输入微信号"
          maxLength={20}
          onSubmit={this.submit}
          onChange={(wx) => this.setState({
            showSearchButton: true,
            wx
          })}
          onCancel={(wx) => this.setState({
            showSearchButton: true,
          })}
          onClear={(wx) => this.setState({
            showSearchButton: true,
          })} /> */}

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: '#fff',
    alignItems: 'center'
  },
  item: {
    borderColor: '#e9e9e9',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    padding: 15,
    backgroundColor: 'white',
    marginTop: 10,
  },
  tip: {
    alignSelf: "center",
    fontSize: 14,
    marginTop: 40,
    marginHorizontal: 20,
    color: "#595959",
  },
  line: {
    marginBottom: 5,
    width: 300,
    height: 1,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#fe4176",
    borderStyle: "solid"
  },
  buttonOuter: {
    display: "flex",
    height: 40,
    marginTop: 30,
    flexDirection: "column",
    alignItems: "center",
  },
  buttonInner: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: 250,
    height: 40,
    borderRadius: 20
  },
  buttonText: {
    color: "white",
    fontSize: 14,
  },
});

const ExposureSearchPageSelector = createSelector(
  [
    getSearchWechatState,
    getSearchWechatErrorObj,
    getFakeWechat,
  ], (
    searchWechatState,
    searchWechatError,
    fakeWechat,
  ) => {
    return {
      searchWechatState,
      searchWechatErrorMsg: searchWechatError ? searchWechatError.msg : '',
      fakeWechat,
    };
  });

export default connect(ExposureSearchPageSelector)(ExposureSearchPage);