import React, { Component } from 'react';
import { View, Text, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import { styles } from '../styles';

class Profile extends Component {
	render() {
		return (
			<SafeAreaView style={{ flex: 1 }}>
				<View style={{ flex: 1, backgroundColor: 'white', paddingTop: 20 }}>
					<Text style={styles.sectionTitle}>Profile Page</Text>
				</View>
			</SafeAreaView>
		);
	}
}

const dummyProfile = {
	name: 'Eugene Chou',
	phoneNumber: '1800-i-hate-this',
	email: 'whatthefuck@fuckthis.com',
};

export default Profile;
