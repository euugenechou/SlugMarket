/* React imports */
import React, { Component } from 'react';
import { StyleSheet, ImageBackground } from 'react-native';

/* Local imports */
import Login from './login/Login';

export default class Splash extends Component {
	constructor(props) {
		super(props);
		this.state = {
			timePassed: false,
		};
		setTimeout(() => this.setState({ timePassed: true }), 1200);
	}

	render() {
		if (!this.state.timePassed) {
			return <ImageBackground source={require('../assets/SplashScreeniOS.png')} style={styles.container} />;
		} else {
			return <Login />;
		}
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'skyblue',
		alignItems: 'center',
		justifyContent: 'center',
	},
	title: {
		fontWeight: 'bold',
		fontSize: 18,
		color: 'white',
	},
});
