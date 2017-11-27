/**
 * @providesModule CircularPage
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {
  Button,
  Carousel,
  Tag,
} from 'antd-mobile';

import { NavigationActions } from 'react-navigation';
import ScreenConfig from 'ScreenConfig';

import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { getHello } from 'Selectors';
import Actions from 'Actions';

class CircularPage extends Component {
  static navigationOptions = ({ navigation }) => {
    const { state, setParams } = navigation;
    return {
      title: '通告',
      tabBarIcon: ({ tintColor }) => (
        <Image
          source={require('../../routers/img/form.png')}
          style={{ tintColor: tintColor, width: 26, height: 26 }}
        />
      ),
    };
  };

  constructor(props) {
    super(props)
    this.state = {
      carouselData: ['AiyWuByWklrrUDlFignR', 'TekJlZRVCjLFexlOCuWn', 'IJOtIlfsYdTyaDTRVrLI'],
      circularList: []
    }
  }

  componentDidMount() {
    for (let i = 0; i <= 10; i++) {
      this.state.circularList.push({
        title: '这是一个标题',
        tag: '标签',
        price: '1000',
        publisher: '发布人',
        createTime: '2000-01-01'
      })
    }
  }

  navigateTo = (routeName) => {
    this.props.navigation.navigate(routeName)
  }

  render() {
    const { state } = this.props.navigation;
    return (
      <View style={styles.container}>
        <FlatList
          ListHeaderComponent={
            <Carousel
              autoplay={true}
              infinite
              selectedIndex={1}
            >
              {this.state.carouselData.map(data => (
                <Image key={data}
                  style={{ height: ScreenConfig.window.width * 9 / 16, width: ScreenConfig.window.width }}
                  source={{ uri: `https://zos.alipayobjects.com/rmsportal/${data}.png` }}
                />
              ))}
            </Carousel>
          }
          data={this.state.circularList}
          keyExtractor={(item, index) => {
            return index;
          }}
          renderItem={({ item, index }) =>
            <TouchableOpacity
              style={styles.circularItem}
              onPress={this.navigateTo.bind(this, 'CircularDetail')}>
              <View style={{
                paddingHorizontal: 15,
                flexDirection: 'row',
                flex: 1,
                justifyContent: 'space-between'
              }}>
                <Text style={styles.circularTitle}>标题：{item.title}</Text>
                <Tag small>{item.tag}</Tag>
              </View>
              <View style={{
                marginLeft: 15,
                marginVertical: 10,
                height: 1,
                alignItems: 'stretch',
                backgroundColor: '#e9e9e9',
              }} />
              <View style={{
                paddingHorizontal: 15,
                flexDirection: 'row',
                flex: 1,
                justifyContent: 'space-between'
              }}>
                <Text>发布人：{item.publisher}</Text>
                <Text>发布时间：{item.createTime}</Text>
              </View>
              <View style={{
                marginLeft: 15,
                marginVertical: 10,
                height: 1,
                alignItems: 'stretch',
                backgroundColor: '#e9e9e9',
              }} />
              <View style={{
                paddingHorizontal: 15,
                flexDirection: 'row',
                flex: 1,
                justifyContent: 'flex-end'
              }}>
                <Text style={{ fontSize: 20, color: '#f04134' }}>{item.price}元</Text>
              </View>
            </TouchableOpacity>
          }
        />
        <Button style={styles.publishCircular} type="primary" onClick={this.navigateTo.bind(this, 'CircularPublish')}>发布通告</Button>

        {/* <Text>{this.props.hello}</Text>
        <Button onClick={() => {
          this.props.dispatch(Actions.helloAction());
        }}>set hello</Button> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: '#f4f3fd',
  },
  publishCircular: {
    position: 'absolute',
    bottom: 30,
    right: 0,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    opacity: 0.8,
  },
  circularItem: {
    borderColor: '#e9e9e9',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    paddingVertical: 15,
    backgroundColor: 'white',
    marginTop: 10,
  },
  circularTitle: {
    fontSize: 18,
  },
});

const CircularPageSelector = createSelector([getHello], (hello) => {
  return {
    hello
  };
});

export default connect(CircularPageSelector)(CircularPage);