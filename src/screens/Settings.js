/* React imports */
import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import ListViewComponent from './components/ListViewComponent';

class Settings extends Component {
	render() {
		return <ListViewComponent/>;
	}
}

export default Settings;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
});