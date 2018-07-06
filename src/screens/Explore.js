import React, { Component } from 'react';
import {
	View,
	Text,
	StyleSheet,
	SafeAreaView,
	TextInput,
	Platform,
	StatusBar,
	ScrollView,
	Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Category from './components/Explore/Category';
import { styles } from '../styles';

const { height, width } = Dimensions.get('window');

class Explore extends Component {
	componentWillMount() {
		this.startHeaderHeight = 80;
		if (Platform.OS == 'android') {
			this.startHeaderHeight = 100 + StatusBar.currentHeight;
		}
	}

	render() {
		return (
			<SafeAreaView style={{ flex: 1 }}>
				<View style={{ flex: 1 }}>
					<View
						style={{
							height: this.startHeaderHeight,
							backgroundColor: 'white',
							borderBottomWidth: 1,
							borderBottomColor: '#dddddd',
						}}
					>
						<View
							style={{
								flexDirection: 'row',
								padding: 10,
								backgroundColor: 'white',
								marginHorizontal: 20,
								shadowOffset: { width: 0, height: 0 },
								shadowColor: 'black',
								shadowOpacity: 0.2,
								elevation: 1,
								marginTop: Platform.OS == 'android' ? 30 : 15,
							}}
						>
							<Icon name="ios-search" size={20} style={{ marginRight: 10 }} />
							<TextInput
								underlineColorAndroid="transparent"
								placeholder="Fuck you Jon"
								placeholderTextColor="grey"
								style={{ flex: 1, fontWeight: '700', backgroundColor: 'white' }}
							/>
						</View>
					</View>
					<ScrollView scrollEventThrottle={16}>
						<View style={{ flex: 1, backgroundColor: 'white', paddingTop: 20 }}>
							<Text style={styles.sectionTitle}>Recently Added Items</Text>

							<View style={styles.sideScroll}>
								<ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
									<Category imageUri={require('../assets/textbooks.jpg')} name="Textbooks" />
									<Category imageUri={require('../assets/furniture.jpg')} name="Furniture" />
									<Category imageUri={require('../assets/electronics.jpg')} name="Electronics" />
								</ScrollView>
							</View>
						</View>
					</ScrollView>
				</View>
			</SafeAreaView>
		);
	}
}
export default Explore;
