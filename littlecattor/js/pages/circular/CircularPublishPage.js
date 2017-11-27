/**
 * @providesModule CircularPublishPage
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
	Picker,
	TextareaItem,
} from 'antd-mobile';

import { NavigationActions } from 'react-navigation';
import { Spacing } from 'AntDesignConfig';

export default class CircularPublishPage extends Component {
	static navigationOptions = ({ navigation }) => {
		const { state, setParams } = navigation;
		return {
			title: '通告发布'
		};
	};

	constructor(props) {
		super(props)
		this.state = {
			tagSource: [
				{
					label: '标签1',
					value: '0'
				},
				{
					label: '标签2',
					value: '1'
				}
			],
			tag: ['0'],
		};
	}

	componentDidMount() {

	}

	navigateTo = (routeName) => {
		this.props.navigation.navigate(routeName)
	}

	backTo = () => {
		this.props.navigation.goBack();
	}

	render() {
		const { state } = this.props.navigation;
		return (
			<View style={styles.container}>
				<List>
					<InputItem placeholder='请输入标题'>标题</InputItem>
					<InputItem type='number' placeholder='请输入价格'>价格</InputItem>
					<InputItem placeholder='请输入微信'>微信</InputItem>
					<Picker
						data={this.state.tagSource}
						cols={1}
						value={this.state.tag}
						onOk={(value) => {
							this.setState({ tag: value })
						}}>
						<List.Item arrow='horizontal'>标签</List.Item>
					</Picker>
					<TextareaItem
						title='详情'
						rows={5}
						placeholder='请输入详情'
						count={160}
					/>
				</List>
				<View style={styles.buttonContainer}>
					<Button type="primary" onClick={this.backTo}>发布</Button>
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