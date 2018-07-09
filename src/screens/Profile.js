import React, { Component } from 'react';
import { View, Text, StyleSheet, SafeAreaView, StatusBar, Image } from 'react-native';
import { Icon, Container, Content, Header, Left, Body, Right, Button } from 'native-base';
import EntypoIcon from 'react-native-vector-icons/Entypo';

const dummyProfile = {
	name: 'John Doe',
	phoneNumber: '1800-123-4567',
	email: 'johndoe@gmail.com',
	pickup_address: '1156 High Street',
};

class Profile extends Component {
	render() {
		return (
			<Container style={{ flex: 1, backgroundColor: 'white' }}>
				<Header>
					<Left>
						<Icon name="md-person-add" style={{ paddingLeft: 10 }} />
					</Left>
					<Body>
						<Text style={field.text}>{dummyProfile.name}</Text>
					</Body>
					<Right>
						<EntypoIcon name="back-in-time" style={{ paddingRight: 10, fontSize: 28 }} />
					</Right>
				</Header>
				<Content>
					<View>
						<View>
							<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
								<Image
									source={require('../assets/darrell.png')}
									style={{ width: 200, height: 200, borderRadius: 37.5 }}
								/>
							</View>
						</View>
						<View style={{ flexDirection: 'row' }}>
							<Button
								bordered
								dark
								style={{
									flex: 2,
									marginLeft: 50,
									marginRight: 50,
									justifyContent: 'center',
									height: 30,
								}}
							>
								<Text>Edit Profile</Text>
							</Button>
						</View>
						<View
							style={{
								flexDirection: 'column',
								flex: 3,
								paddingVertical: 10,
								paddingLeft: 10,
								alignItems: 'left',
							}}
						>
							<View>
								<Text>
									<B>Name:</B> {dummyProfile.name}
								</Text>
								<Text>
									<B>Phone Number:</B> {dummyProfile.phoneNumber}
								</Text>
								<Text>
									<B>Email:</B> {dummyProfile.email}
								</Text>
								<Text>
									<B>Pickup Address:</B> {dummyProfile.pickup_address}
								</Text>
							</View>
						</View>
					</View>
				</Content>
			</Container>
			// <SafeAreaView style={{ flex: 1 }}>
			// 	<Text style={{ flex: 0, backgroundColor: 'white', paddingTop: 20 }}>
			// 		<Text style={styles.sectionTitle}> Profile Page</Text>
			// 	</Text>
			// </SafeAreaView>
		);
	}
}

const B = props => <Text style={{ fontWeight: 'bold' }}>{props.children}</Text>;

const field = StyleSheet.create({
	row: {
		flexDirection: 'row',
		justifyContent: 'center',
		backgroundColor: '#f6f6f6',
		marginBottom: 8,
	},
	text: {
		fontSize: 18,
	},
});

export default Profile;
