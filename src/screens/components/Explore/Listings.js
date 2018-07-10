/* React imports */
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

class Listings extends Component {
	render() {
		return (
			<View
				style={{
					flexDirection: 'row',
					width: this.props.width - 40,
					height: this.props.width / 2 - 80,
					borderWidth: 0.5,
					borderColor: '#dddddd',
					marginBottom: 20,
				}}
			>
				<View style={{ flex: 2 }}>
					<Image
						style={{ flex: 2, width: null, height: null, resizeMode: 'cover' }}
						source={require('../../../assets/textbooks.jpg')}
					/>
				</View>
				<View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-evenly' }}>
					<Text style={{ alignItems: 'center', fontSize: 18, fontWeight: 'bold' }}>{this.props.name}</Text>
					<Text style={{ alignItems: 'center', fontSize: 18 }}>${this.props.price}</Text>
					<Text style={{ alignItems: 'center', fontSize: 16 }}>{this.props.description}</Text>
				</View>
			</View>
		);
	}
}

export default Listings;

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		justifyContent: 'center',
	},
});
