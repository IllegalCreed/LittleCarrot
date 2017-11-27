/**
 * @providesModule ExposureExperiencePage
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity
} from 'react-native';
import {
  Button,
  Carousel,
  Tag,
} from 'antd-mobile';

import { NavigationActions } from 'react-navigation';

export default class ExposureExperiencePage extends Component {
  static navigationOptions = ({ navigation }) => {
    const { state, setParams } = navigation;
    return {
      title: '被骗经历'
    };
  };

  constructor(props) {
    super(props)
    this.state = {
      exposureList: []
    }
  }

  componentDidMount() {
    for (let i = 0; i <= 10; i++) {
      this.state.exposureList.push({
        title: '这是一个标题',
        tag: '标签',
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
          data={this.state.exposureList}
          keyExtractor={(item, index) => {
            return index;
          }}
          renderItem={({ item, index }) =>
            <TouchableOpacity
              style={styles.circularItem}
              onPress={this.navigateTo.bind(this, 'ExposureDetail')}>
              <View style={{
                paddingHorizontal: 15,
                flexDirection: 'row',
                flex: 1,
                justifyContent: 'space-between'
              }}>
                <Text style={styles.circularTitle}>标题：{item.title}</Text>
                <Tag small>{item.tag}</Tag>
              </View>
            </TouchableOpacity>
          }
        />
        <Button style={styles.publishCircular} type="primary" onClick={this.navigateTo.bind(this, 'ExposurePublish')}>我要曝光</Button>
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
  circularTitle: {
    fontSize: 18,
  },
  circularItem: {
    borderColor: '#e9e9e9',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    paddingVertical: 15,
    backgroundColor: 'white',
    marginTop: 10,
  },
  publishCircular: {
    position: 'absolute',
    bottom: 30,
    right: 0,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    opacity: 0.8,
  },
});