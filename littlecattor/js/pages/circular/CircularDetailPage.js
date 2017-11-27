/**
 * @providesModule CircularDetailPage
 */

import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	View,
	ScrollView
} from 'react-native';
import {
	List,
	Button,
	InputItem,
	TextareaItem,
} from 'antd-mobile';
const Item = List.Item;
const Brief = Item.Brief;

import { NavigationActions } from 'react-navigation';
import { Spacing } from 'AntDesignConfig';

export default class CircularDetailPage extends Component {
	static navigationOptions = ({ navigation }) => {
		const { state, setParams } = navigation;
		return {
			title: '通告详情'
		};
	};

	componentDidMount() {

	}

	navigateTo = (routeName) => {
		this.props.navigation.navigate(routeName, { CircularDetailPageKey: this.props.navigation.state.key })
	}

	render() {
		const { state } = this.props.navigation;
		return (
			<ScrollView style={styles.container}>
				<List>
					<Item multipleLine onClick={() => { }}>
						标题 <Brief>这是一个标题</Brief>
					</Item>
					<Item extra={'标签'}>标签</Item>
					<Item extra={'1000元'}>价格</Item>
					<Item extra={'苏妈妈'}>发布人</Item>
					<Item extra={'2000-01-01'}>发布时间</Item>
					<Item extra={'wx123123123'}>微信</Item>
					<Item wrap>详细信息<Brief>详细信息详细信息详细信息详细信息详细信息详细信息详细信息详细信息详细信息详细信息详细信息详细信息详细信息详细信息详细信息详细信息详细信息详细信息详细信息详细信息</Brief></Item>
				</List>
				<View style={styles.buttonContainer}>
					<Button type="primary" onClick={this.navigateTo.bind(this, 'CircularAccusation')}>举报</Button>
					<Button style={{ marginTop: Spacing.small }} type="ghost">分享</Button>
				</View>
			</ScrollView>
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
		flex: 1,
		flexDirection: "column",
		alignSelf: 'stretch',
		paddingHorizontal: Spacing.middle,
		marginTop: 64,
	},
});