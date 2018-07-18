/* React imports */
import React, { Component } from 'react';
import { Alert, Platform, Text, View, StyleSheet, Button, SafeAreaView } from 'react-native';
import ListViewComponent from './components/ListViewComponent';
import {
	Icon,
	Container,
	Content,
	Header,
	Left,
	Body,
	Title,
	Right,
	} from "native-base";
import LoginStack from './login/LoginStack'
import {Auth} from "aws-amplify"

class Settings extends Component {
	static navigationOptions = ({ navigation }) => ({
		header: null
	})
	
	_onPressButton() {
		() => this.props.navigation.navigate("SignInScreen");
		// Auth.signOut()
		// 	.then(() => {
				
		// 	})
		// 	.catch(err => console.log(err));
	}	
	render() {
		return [
			<ListViewComponent/>,
			<View style={styles.bottomView}>
				<Button
					onPress={() => {return <LoginStack />}}
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