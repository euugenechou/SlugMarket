/* React imports */
import React, { Component } from 'react';
import { StyleSheet, ImageBackground } from 'react-native';

/* Local imports */
import Login from './login/Login';
import { YellowBox } from 'react-native'
YellowBox.ignoreWarnings([
	'Encountered an error loading page',    // WebView uri: result.url and url failing to load - "bloomberg suneq" https://github.com/facebook/react-native/issues/7839#issuecomment-224111608
	'Deprecation warning: moment construction falls back to js Date. This is discouraged and will be removed in upcoming major release. Please refer to http://momentjs.com/guides/#/warnings/js-date/ for more info.',
	'Task orphaned for request ',
	'Remote debugger is in a background tab which may cause apps to perform slowly',
])

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
