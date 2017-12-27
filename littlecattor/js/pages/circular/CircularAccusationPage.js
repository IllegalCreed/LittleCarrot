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
} from 'antd-mobile';

import { NavigationActions } from 'react-navigation';
import { Spacing } from 'AntDesignConfig';
import AliyunOSS from 'react-native-aliyun-oss';
import ImagePicker2 from 'react-native-image-picker';

var options = {
	title: '选择照片',
	storageOptions: {
		skipBackup: true,
		path: 'images'
	}
};

function guid() {
	function S4() {
		return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
	}
	return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}

export default class CircularAccusationPage extends Component {
	static navigationOptions = ({ navigation }) => {
		const { state, setParams } = navigation;
		return {
			title: '举报通告'
		};
	};

	constructor(props) {
		super(props)
		this.state = {
			typeSource: [
				{
					label: '骗模卡',
					value: '0'
				},
				{
					label: '商务',
					value: '1'
				},
				{
					label: '微商',
					value: '2'
				},
				{
					label: '收费',
					value: '3'
				}
			],
			type: ['0'],
			imageData: [],
		};
	}

	componentDidMount() {

	}

	onChange = (files, type, index) => {
		this.setState({
			imageData: files,
		});
	}

	onAddImageClick = () => {
		ImagePicker2.showImagePicker(options, (response) => {
			if (response.didCancel) {
				console.log('User cancelled image picker');
			}
			else if (response.error) {
				console.log('ImagePicker Error: ', response.error);
			}
			else if (response.customButton) {
				console.log('User tapped custom button: ', response.customButton);
			}
			else {
				let path = response.uri.replace('file://', '');
				let fileName = guid() + ".png";
				AliyunOSS.asyncUpload('radish', fileName, path).then(() => {
					this.setState({
						imageData: this.state.imageData.concat([{
							url: 'https://radish.oss-cn-beijing.aliyuncs.com/' + fileName,
							id: Math.floor(Math.random() * (10001)),
						}]),
					});
				});
			}
		});
	}

	navigateTo = (routeName) => {
		let { CircularDetailPageKey } = this.props.navigation.state.params;
		this.props.navigation.navigate(routeName, { CircularDetailPageKey })
	}

	render() {
		const { state } = this.props.navigation;
		return (
			<View style={styles.container}>
				<List>
					<Picker
						data={this.state.typeSource}
						cols={1}
						value={this.state.type}
						onOk={(value) => {
							this.setState({ type: value })
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
				<View style={styles.buttonContainer}>
					<Button type="primary" onClick={this.navigateTo.bind(this, 'CircularAccusationResult')}>提交</Button>
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