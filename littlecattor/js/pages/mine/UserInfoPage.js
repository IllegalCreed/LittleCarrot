/**
 * @providesModule UserInfoPage
 */

import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	View,
	Image
} from 'react-native';
import {
	List,
	Button,
	InputItem,
	Checkbox,
	Picker,
	TextareaItem,
} from 'antd-mobile';

import { NavigationActions } from 'react-navigation';
import { Spacing } from 'AntDesignConfig';
import ImagePicker from 'react-native-image-picker';

const options = {
	title: '选择头像',
	takePhotoButtonTitle: '拍照',
	chooseFromLibraryButtonTitle: '从相册选择',
	mediaType: 'photo',
	allowsEditing: true,
};

export default class UserInfoPage extends Component {
	static navigationOptions = ({ navigation }) => {
		const { state, setParams } = navigation;
		return {
			title: '修改信息'
		};
	};

	constructor(props) {
		super(props)
		this.state = {
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
		}
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
			console.log('Response = ', response);

			if (response.didCancel) {
				console.log('User cancelled image picker');
			}
			else if (response.error) {
				console.log('ImagePicker Error: ', response.error);
			}
			else {
				// let source = { uri: response.uri };

				// You can also display the image using data:
				let source = { uri: 'data:image/jpeg;base64,' + response.data };

				this.setState({
					avatarSource: source
				});
			}
		});
	}

	render() {
		return (
			<View style={styles.container}>
				<List>
					<List.Item arrow='horizontal' onClick={this.selectHeader} extra={
						<View style={styles.userHeader}>
							<Image source={this.state.avatarSource} style={styles.avatar}/>
						</View>
					}>头像</List.Item>
					<InputItem placeholder='请输入昵称'>昵称</InputItem>
					<Picker
						data={this.state.sexSource}
						cols={1}
						value={this.state.sex}
						onOk={(value) => {
							this.setState({ sex: value })
						}}>
						<List.Item arrow='horizontal'>性别</List.Item>
					</Picker>
					<InputItem type='number' placeholder='请输入身高'>身高</InputItem>
					<InputItem type='number' placeholder='请输入体重'>体重</InputItem>
					<Picker
						data={this.state.BWHSource}
						cascade={false}
						value={this.state.BWH}
						onOk={(values) => {
							this.setState({ BWH: values })
						}}>
						<List.Item arrow='horizontal'>三围</List.Item>
					</Picker>
					<InputItem type='number' placeholder='请输入鞋码'>鞋码</InputItem>
					<TextareaItem
						title='简介'
						rows={5}
						placeholder='请输入简介'
						count={80}
					/>
				</List>
				<View style={styles.buttonContainer}>
					<Button type="primary" onClick={this.save}>保存</Button>
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
		flex: 1,
		flexDirection: "column",
		alignSelf: 'stretch',
		paddingHorizontal: Spacing.middle,
		marginTop: 64,
	},
	userHeader: {
		overflow:'hidden',
		borderWidth: 1,
		borderColor: '#7265e6',
		borderRadius: 15,
		width: 30,
		height: 30,
	},
	avatar:{
		width:30,
		height:30
	}
});