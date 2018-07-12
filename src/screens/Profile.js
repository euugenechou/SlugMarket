import React, { Component } from "react";
import {
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Image,
  Text, 
  View,
  Dimensions,
  ScrollView
} from "react-native";
import {
  Icon,
  Container,
  Content,
  Header,
  Left,
  Body,
  Right,
  Button,
} from "native-base";
import EntypoIcon from "react-native-vector-icons/Entypo";

class Profile extends Component {
  static navigationOtions = {
    tabBarIcon: ({tintColor}) => (
      <Icon name = "person" style = {{color:tintColor}} />
    )
  }

  constructor(props){
    super(props)
    this.state = {
      activeIndex: 0
    }
  }

  segmentClicked = (index) => {
    this.setState({
      activeIndex: index
    })
  }

  /*
  Render images so that they fit correctly and uniformly
  */
  renderSectionOne = () => {
    return images.map((image,index)=>{
      return (
        <View key = {index} style = {[{width:(width)/3}, {height:(height)/6}, {marginBottom: 2}, index%3!==0?{paddingLeft:2}: {paddingLeft:0}]}>
          <Image style = {{flex: 1, width: undefined, height: undefined }}
            source = {image}/>
        </View>
      )
    })
  }

  onLearnMore = (user) => {
    this.props.navigation.navigate('Details', { ...user });
  };
  /*
  Determine which section to render
  */
  renderSection = () => {
    switch(this.state.activeIndex){
      case 0:
        return (
          <View
            style = {{flexDirection: 'row', flexWrap: 'wrap'}}>
            {this.renderSectionOne()} 
          </View>
        )
      case 1:
        return (
          <View> 
            <Text>Chat messages will appear here</Text>
          </View>
        )
      case 2:
        return (
          <View> 
            <Text> Favorited items will appear here</Text>
          </View>
        )
    }
  }
  
  render() {
    return (
      <Container style={{ flex: 1, backgroundColor: "white" }}>
        <Header>
          <Left>
            <Button
              transparent
              size = {10}
              onPress={() => this.props.navigation.navigate("Explore")}
              style={{paddingLeft: 10}}
              >
              <Icon
                name="arrow-back"
                style={{ paddingTop: 5, paddingRight: 10,}}/>
            </Button>
          </Left>
          <Body style = {{paddingTop: 10}}>
            <Text style={field.text}>{dummyProfile.name}</Text>
          </Body>
          <Right>
            <Button
            transparent
            onPress={() => this.props.navigation.navigate("Settings")}
            style={{paddingLeft: 10}}
            >
              <Icon
                name="settings"
                style={{ paddingTop: 10, paddingRight: 10 }}/>
            </Button>
          </Right>
        </Header>
        <Content>
          <View>
            <View>
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <Image
                  source={require("../assets/darrell.png")}
                  style={{ width: 200, height: 200, borderRadius: 37.5 }}
                />
              </View>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Button 
                bordered dark
                onPress={() => this.props.navigation.navigate("EditProfile")}
                style={{
                  flex: 2,
                  marginLeft: 50,
                  marginRight: 50,
                  justifyContent: "center",
                  height: 30
                }} >
                <Text> Edit Profile </Text> 
                color="teal"
              </Button>
            </View>
            <View
              style={{
                flexDirection: "column",
                flex: 3,
                paddingVertical: 10,
                paddingLeft: 10,
                alignItems: "flex-start"
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
              <View
                style={{
                  flexDirection: "row", 
                  justifyContent: 'space-around', 
                  borderTopWidth:1, 
                  borderTopColor: '#eae5e5',
                }}
              >
                <Button
                  transparent
                  onPress= {() => this.segmentClicked(0)}
                  active = {this.state.activeIndex == 0}
                >
                  <Icon name = "ios-apps-outline"
                    style = {[this.state.activeIndex == 0? {}: {color: 'grey'}]}/>
                </Button>

                <Button
                  transparent
                  onPress= {() => this.segmentClicked(1)}
                  active = {this.state.activeIndex == 1}
                >
                  <Icon name = "ios-chatbubbles-outline"
                    style = {[this.state.activeIndex == 1? {}: {color: 'grey'}]}/>
                </Button>

                <Button
                  transparent
                  onPress= {() => this.segmentClicked(2)}
                  active = {this.state.activeIndex == 2}
                >
                  <Icon name = "ios-bookmark-outline"
                    style = {[this.state.activeIndex == 2? {}: {color: 'grey'}]}/>
                </Button>
              </View>
            {this.renderSection()}
          </View>
        </Content>
      </Container>
    );
  }
}

const dummyProfile = {
  name: "John Doe",
  phoneNumber: "1800-123-4567",
  email: "johndoe@gmail.com",
  pickup_address: "1156 High Street"
};

var {width, height} = Dimensions.get('window')

var images = [
  require('../assets/textbooks.jpg'),
  require('../assets/electronics.jpg'),
  require('../assets/furniture.jpg'),
  require('../assets/icon.png'),
  require('../assets/market_stand.png')
]

const B = props => <Text style={{ fontWeight: "bold" }}>{props.children}</Text>;

const field = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "#f6f6f6",
    marginBottom: 8
  },
  text: {
    fontSize: 18
  }
});

export default Profile;
