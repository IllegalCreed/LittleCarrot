/**
 * @providesModule ExposureDetailPage
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
	InputItem,
	TextareaItem,
	ImagePicker,
} from 'antd-mobile';
const Item = List.Item;
const Brief = Item.Brief;

import { NavigationActions } from 'react-navigation';
import { Spacing } from 'AntDesignConfig';

export default class ExposureDetailPage extends Component {
	static navigationOptions = ({ navigation }) => {
		const { state, setParams } = navigation;
		return {
			title: '曝光详情'
		};
	};

	constructor(props) {
		super(props)
		this.state = {
			imageData: [
				{
					url: 'https://zos.alipayobjects.com/rmsportal/PZUUCKTRIHWiZSY.jpeg',
					id: '2121',
				}, {
					url: 'https://zos.alipayobjects.com/rmsportal/hqQWgTXdrlmVVYi.jpeg',
					id: '2122',
				},
				{
					url: 'https://zos.alipayobjects.com/rmsportal/PZUUCKTRIHWiZSY.jpeg',
					id: '2121',
				}, {
					url: 'https://zos.alipayobjects.com/rmsportal/hqQWgTXdrlmVVYi.jpeg',
					id: '2122',
				},
				{
					url: 'https://zos.alipayobjects.com/rmsportal/PZUUCKTRIHWiZSY.jpeg',
					id: '2121',
				}, {
					url: 'https://zos.alipayobjects.com/rmsportal/hqQWgTXdrlmVVYi.jpeg',
					id: '2122',
				},
				{
					url: 'https://zos.alipayobjects.com/rmsportal/PZUUCKTRIHWiZSY.jpeg',
					id: '2121',
				}, {
					url: 'https://zos.alipayobjects.com/rmsportal/hqQWgTXdrlmVVYi.jpeg',
					id: '2122',
				},
			],
		};
	}

	componentDidMount() {

	}

	navigateTo = (routeName) => {
		this.props.navigation.navigate(routeName)
	}

	render() {
		const { state } = this.props.navigation;
		return (
			<View style={styles.container}>
				<List>
					<Item extra={'这是一个标题'}>标题</Item>
					<Item extra={'标签'}>标签</Item>
					<Item extra={'wx123123123'}>微信</Item>
					<Item wrap>详细信息<Brief>详细信息详细信息详细信息详细信息详细信息详细信息详细信息详细信息详细信息详细信息详细信息详细信息详细信息详细信息详细信息详细信息详细信息详细信息详细信息详细信息</Brief></Item>
				</List>
				<Text style={{ marginLeft: 15, fontSize: 17, marginVertical: 15 }}>证据截图</Text>
				<View style={{ marginLeft: 15 }}>
					<ImagePicker
						files={this.state.imageData}
						onImageClick={(index, fs) => console.log(index, fs)}
						selectable={false}
					/>
				</View>
				<View style={{ flexDirection: "row", marginTop: Spacing.middle, paddingHorizontal: Spacing.middle, }}>
					<Button size='small' style={{ flex: 1, marginHorizontal: 40 }} type="primary">支持</Button>
					<Button size='small' style={{ flex: 1, marginHorizontal: 40 }} type="ghost">反对</Button>
				</View>
				<View style={styles.buttonContainer}>
					<Button type="primary">告诉朋友</Button>
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
		bottom: 32,
		left: 0,
		right: 0,
		flex: 1,
		flexDirection: "column",
		alignSelf: 'stretch',
		paddingHorizontal: Spacing.middle,
	},
});