/* React imports */
import React, { Component } from 'react';
import { 
	View, Text, 
	SafeAreaView, 
	TextInput, Platform, 
	StatusBar, ScrollView, 
  Dimensions, Button,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

/* Local imports */
import Category from './components/Explore/Category';
import Listings from './components/Explore/Listings';
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
								marginTop: Platform.OS == 'android' ? 30 : 18,
							}}
						>
							<Icon name="ios-search" size={20} style={{ marginRight: 10 }} />
							<TextInput
								underlineColorAndroid="transparent"
								placeholder="Search"
								placeholderTextColor="grey"
								style={{ flex: 1, fontWeight: '700', backgroundColor: 'white' }}
							/>
						</View>
					</View>
					<ScrollView scrollEventThrottle={16}>
						<View style={{ flex: 1, backgroundColor: 'white', paddingTop: 20 }}>
							<Text style={styles.sectionTitle}>Browse Items By Category</Text>
							<View style={styles.sideScroll}>
								<ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
									<Category imageUri={require('../assets/textbooks.jpg')} name="Textbooks" />
									<Category imageUri={require('../assets/furniture.jpg')} name="Furniture" />
									<Category imageUri={require('../assets/electronics.jpg')} name="Electronics" />
								</ScrollView>
							</View>
							<View>
								<Button
									style={{
										flex: 2,
										justifyContent: 'center',
									}}
									color='black'
									onPress={ () => this.props.navigation.navigate('AddItem') }
									title="Have Something To Sell?"
								>
								</Button>
							</View>
							<View style={{ marginTop: 20 }}>
								<Text style={{ fontSize: 24, fontWeight: '700', paddingHorizontal: 20 }}>
									Recently Added Items
								</Text>
								<View
									style={{
										paddingHorizontal: 20,
										paddingVertical: 20,
										marginBottom: 20,
										flexDirection: 'column',
										flexWrap: 'wrap',
										justifyContent: 'space-evenly',
									}}
								>
									<Listings width={width} name="sorcerer's stone" price={2} seller="jon" />
									<Listings width={width} name="chamber of secrets" price={4} seller="tim" />
									<Listings width={width} name="prisoner of azkaban" price={6} seller="sabrina" />
									<Listings width={width} name="goblet of fire" price={8} seller="daddy" />
									<Listings width={width} name="order of the phoenix" price={10} seller="mommy" />
								</View>
							</View>
						</View>
					</ScrollView>
				</View>
			</SafeAreaView>
		);
	}
}

export default Explore;