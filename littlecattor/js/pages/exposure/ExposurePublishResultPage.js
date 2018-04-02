/**
 * @providesModule ExposurePublishResultPage
 */


import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	View
} from 'react-native';
import {
	Button,
	Result,
	Icon
} from 'antd-mobile';

import { NavigationActions } from 'react-navigation';
import { Spacing } from 'AntDesignConfig';

export default class ExposurePublishResultPage extends Component {
	static navigationOptions = ({ navigation }) => {
		const { state, setParams } = navigation;
		return {
			title: '曝光成功'
		};
	};

	componentDidMount() {

	}

	backTo = () => {
		let { ExposurePublishPageKey } = this.props.navigation.state.params;
		this.props.navigation.goBack(ExposurePublishPageKey);
	}

	render() {
		const { state } = this.props.navigation;
		return (
			<View style={styles.container}>
				<Result
					img={<Icon type="check-circle" color='#1F90E6' size='lg' />}
					title="发布成功"
					message="感谢您提供的信息！"
				/>
				<View style={styles.buttonContainer}>
					{/* <Button type="primary" >分享给朋友</Button> */}
					<Button style={{ marginTop: Spacing.small }} type="ghost" onClick={this.backTo}>返回首页</Button>
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