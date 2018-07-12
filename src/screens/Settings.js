/* React imports */
import React, { Component } from 'react';
import { Alert, Platform, Text, View, StyleSheet, Button } from 'react-native';
import ListViewComponent from './components/ListViewComponent';
import {
	Icon,
	Container,
	Content,
	Header,
	Left,
	Body,
	Right,
  } from "native-base";

class Settings extends Component {
	_onPressButton() {
		Alert.alert('Would you like to sign out?')
	}	
	render() {
		return [
			<ListViewComponent/>,
			<View style={ styles.bottomView} >
				<Button
            		onPress={this._onPressButton}
            		title="Sign Out"
          		/>
			</View>
		]
	}
}

export default Settings;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	bottomView:{
		flex: 1,
		width: '100%', 
		height: 50, 
		backgroundColor: '#FF9800', 
		justifyContent: 'center', 
		alignItems: 'center',
		position: 'absolute',
		bottom: 0
	},
});