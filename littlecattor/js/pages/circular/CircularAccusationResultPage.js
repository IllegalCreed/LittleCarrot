/**
 * @providesModule CircularAccusationResultPage
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

export default class CircularAccusationResultPage extends Component {
	static navigationOptions = ({ navigation }) => {
		const { state, setParams } = navigation;
		return {
			title: '举报成功'
		};
	};

	componentDidMount() {

	}

	backTo = () => {
		let { CircularDetailPageKey } = this.props.navigation.state.params;
		this.props.navigation.goBack(CircularDetailPageKey);
	}

	render() {
		const { state } = this.props.navigation;
		return (
			<View style={styles.container}>
				<Result
					img={<Icon type="check-circle" color='#1F90E6' size='lg' />}
					title="举报已提交"
					message="我们已经收到您的举报信息，会尽快处理核实，您可以在 我的->我的举报 中查看进度。如果核实无误,系统将赠送给您一个小萝卜，并将此通告的发布人封号，通告微信进入失信库，通告内容将进入假通告名单！"
				/>
				<View style={styles.buttonContainer}>
					<Button type="primary" onClick={this.backTo}>返回首页</Button>
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