/* React imports */
import React, { Component } from 'react';
import { Alert, Platform, Text, View, StyleSheet, Button, SafeAreaView, Image } from 'react-native';
import LoginStack from './login/LoginStack'
import SettingsList from 'react-native-settings-list';
import {API, Auth} from "aws-amplify"
import UserListings from "./components/Profile/UserListings";


export default class Settings extends Component {
	static navigationOptions = ({ navigation }) => ({
		header: null
	})

	constructor(props){
		super(props);
		this.onValueChange = this.onValueChange.bind(this);
		this.state = {switchValue: false};
		this.state = {
			activeIndex: 0,
			postsToRender: [],
			userName: "",
			userAttributes: {},
			refreshing: false,
			switchValue: false,
		  };
	  }

	getUserInfo() {
		Auth.currentUserInfo()
		  .then(res => {
			this.setState({ userAttributes: res.attributes });
			this.setState({ userName: res.username });
			console.log(res);
		  })
		  .catch(err => console.log(err));
	}
	
	componentWillMount() {
	this.startHeaderHeight = 60;
	this.getUserInfo();
	console.log(this.state.postsToRender);
	}
	
	 _onPressButton() {
	 	() => this.props.navigation.navigate("SignInScreen");
	// 	// Auth.signOut()
	// 	// 	.then(() => {
				
	// 	// 	})
	// 	// 	.catch(err => console.log(err));
	}

	onValueChange(value){
		this.setState({switchValue: value});
	  }

	render() {
		return (
		<View style = {{backgroundColor:'white',flex:1}}>
			<View style = {{flex:1, marginTop:25}}>
				<SettingsList>
					<SettingsList.Header headerText='Settings' headerStyle={{color:'teal', fontWeight: 'bold', fontSize: 24}}/>
					{/* <SettingsList.Item
						icon = {
							<View style = {{height:100, marginLeft:10, alignSelf:'center'}}>
								<Image style = {{alignSelf:'center', height:100, width:100}} source={require("../assets/darrell.png")}/>
							</View>
						}
						itemWidth = {50}
						hasNavArrow ={ false}
						fontSize = {50}
						title = {this.state.userName}
					/> */}
					<SettingsList.Header headerText = 'Location' headerStyle={{color:'white', marginTop:50}}/>
					<SettingsList.Item	
						title = 'Edit location'
						//hasNavArrow = {true}
						arrowStyle = {{tintColor:'teal'}}
						//onPress = {() => {Alert.alert('Change location')}}/>
						/>
					<SettingsList.Header headerText = 'Authors' headerStyle={{color:'white', marginTop:50}}/>
						<SettingsList.Item
								title='Authors'
								hasNavArrow={true}
								arrowStyle={{tintColor:'blue'}}
								onPress={() =>
									this.props.navigation.navigate("AuthorsScreen")
								}
							/> 
					</SettingsList>
				<View>
					<Button
						raised
						color = "teal"
						backgroundColor = "white"
						borderRadius = {2}
						title = "Sign Out"
						fontWeight = "bold"
						onPress={() =>
							this.props.navigation.navigate("SignInScreen")
						}
						containerViewStyle={{ width: 150, paddingTop: 10 }}
					/>
				</View>
			</View>
		</View>
    );
  }
}

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
	settings:{
		flex: 1,
		fontSize: 30, 
		justifyContent: 'flex-start',
	  },
	  row: {
		flexDirection: "column",
		justifyContent: "center",
		padding: 10,
		backgroundColor: "#f6f6f6",
		marginBottom: 8
	  },
	  text: {
		flex: 1
	  }
});