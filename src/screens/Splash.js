// React imports
import React, { Component } from 'react';
import { StyleSheet, ImageBackground } from 'react-native';

export default class Splash extends Component {	
	render() {
		return <ImageBackground source={require('../assets/SplashScreeniOS.png')} style={styles.container} />;
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	title: {
		fontWeight: 'bold',
		fontSize: 18,
		color: 'white',
	},
});
