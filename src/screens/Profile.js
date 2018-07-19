import React, { Component } from "react";
import {
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Image,
  Text,
  View,
  Dimensions,
  ScrollView,
  TouchableHighlight,
  RefreshControl
} from "react-native";
import {
  Icon,
  Container,
  Content,
  Header,
  Left,
  Body,
  Right
} from "native-base";

import { Button } from "react-native-elements";
import { API, Auth } from "aws-amplify";
import EntypoIcon from "react-native-vector-icons/Entypo";

import UserListings from "./components/Profile/UserListings";

class Profile extends Component {
  static navigationOptions = ({ navigation }) => ({
    header: null
  });

  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
      postsToRender: [],
      userName: "",
      userAttributes: {},
      refreshing: false
    };
  }

  static navigationOtions = {
    tabBarIcon: ({ tintColor }) => (
      <Icon name="person" style={{ color: tintColor }} />
    )
  };

  componentWillMount() {
    this.startHeaderHeight = 60;
    this.getUserPosts();
    this.getUserInfo();
    console.log(this.state.postsToRender);
  }

  // for getting user posts
  getUserPosts() {
    const path = "/itemPostings/userPosts";
    const apiName = "itemPostingsCRUD";
    const headers = {
      headers: {},
      response: true,
      queryStringParameters: {
        order: "timeAdded"
      }
    };
    API.get(apiName, path, headers)
      .then(response => {
        console.log(response);
        this.setState({ postsToRender: response.data });
      })
      .catch(error => console.log(error.response));
  }

  segmentClicked = index => {
    this.setState({
      activeIndex: index
    });
  };

  getUserInfo() {
    Auth.currentUserInfo()
      .then(res => {
        this.setState({ userAttributes: res.attributes });
        this.setState({ userName: res.username });
        console.log(res);
      })
      .catch(err => console.log(err));
  }

  _onRefresh = () => {
    this.setState({ refreshing: true });
    this.getUserPosts();
    this.setState({ refreshing: false });
  };

  /*
  Render images so that they fit correctly and uniformly
  */
  renderSectionOne = () => {
    return this.state.postsToRender.map(post => {
      return (
        <TouchableHighlight
          onPress={() =>
            this.props.navigation.navigate("UserListingInfoScreen", {
              itemName: post.itemName,
              price: post.price,
              seller: post.seller,
              category: post.category,
              description: post.description,
              timeAdded: post.timeAdded
            })
          }
          underlayColor="white"
          key={post.timeAdded}
        >
          <UserListings
            width={width}
            name={post.itemName}
            price={post.price}
            category={post.category}
            seller={post.seller}
          />
        </TouchableHighlight>
      );
    });

    // return images.map((image, index) => {
    //   return (
    //     <View
    //       key={index}
    //       style={[
    //         { width: width / 3 },
    //         { height: height / 6 },
    //         { marginBottom: 2 },
    //         index % 3 !== 0 ? { paddingLeft: 2 } : { paddingLeft: 0 }
    //       ]}
    //     >
    //       <Image
    //         style={{ flex: 1, width: undefined, height: undefined }}
    //         source={image}
    //       />
    //     </View>
    //   );
    // });
  };

  /*
  Determine which section to render
  */
  renderSection = () => {
    switch (this.state.activeIndex) {
      case 0:
        return this.renderSectionOne();
      case 1:
        return (
          <View>
            <Text> Favorited items will appear here</Text>
          </View>
        );
    }
  };

  render() {
    return (
      <SafeAreaView style={{ backgroundColor: "white" }}>
        <ScrollView
          scrollEventThrottle={16}
          contentContainerStyle={{ backgroundColor: "white" }}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
            />
          }
          showsVerticalScrollIndicator={false}
        >
          <View style={{ backgroundColor: "white" }}>
            {/* <ScrollView
          scrollEventThrottle={16}
          style={{ backgroundColor: "white" }}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
            />
          }
          showsVerticalScrollIndicator={false}
        > */}
            <View
              style={{
                backgroundColor: "white",
                flexDirection: "row-reverse",
                flex: 1
              }}
            >
              <Image
                source={require("../assets/darrell.png")}
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 70,
                  width: null,
                  height: 150,
                  resizeMode: "contain",
                  borderRadius: 8,
                  flex: 1
                }}
              />
              <View
                style={{
                  backgroundColor: "white",
                  flexDirection: "column",
                  flex: 1,
                  paddingTop: 60
                }}
              >
                <View
                  style={{
                    alignItems: "center",
                    backgroundColor: "white",
                    justifyContent: "flex-start",
                    paddingLeft: 20
                  }}
                >
                  <Text style={field.titleText}>{this.state.userName}</Text>
                  <Text style={field.text}>
                    {this.state.userAttributes.email}
                  </Text>
                  <Text style={field.text}>
                    {this.state.userAttributes.phone_number}
                  </Text>
                  <Button
                    raised
                    color="white"
                    backgroundColor="teal"
                    borderRadius={5}
                    title="Edit Profile"
                    fontWeight="bold"
                    onPress={() =>
                      this.props.navigation.navigate("EditProfile")
                    }
                    containerViewStyle={{ width: 150, paddingTop: 10 }}
                  />
                </View>
              </View>
            </View>
            {/* <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              borderTopWidth: 1,
              borderBottomWidth: 1,
              borderTopColor: "#dddddd",
              borderBottomColor: "#dddddd",
            }}
          >
            <Button
              transparent
              onPress={() => this.segmentClicked(0)}
              active={this.state.activeIndex == 0}
            >
              <Icon
                name="ios-apps-outline"
                style={[this.state.activeIndex == 0 ? {} : { color: "grey" }]}
              />
            </Button>
            <Button
              transparent
              onPress={() => this.segmentClicked(1)}
              active={this.state.activeIndex == 1}
            >
              <Icon
                name="ios-bookmark-outline"
                style={[this.state.activeIndex == 1 ? {} : { color: "grey" }]}
              />
            </Button>
          </View> */}
            <Text
              style={{
                fontSize: 24,
                fontWeight: "700",
                marginBottom: 20,
                marginTop: 20,
                paddingHorizontal: 20
              }}
            >
              My Listings
            </Text>
            {this.renderSection()}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

var { width, height } = Dimensions.get("window");

var images = [
  require("../assets/textbooks.jpg"),
  require("../assets/electronics.jpg"),
  require("../assets/furniture.jpg"),
  require("../assets/icon.png"),
  require("../assets/market_stand.png")
];

const B = props => <Text style={{ fontWeight: "bold" }}>{props.children}</Text>;

const field = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "#f6f6f6",
    marginBottom: 8
  },
  text: {
    paddingTop: 5,
    fontSize: 14,
    fontWeight: "300",
    justifyContent: "center",
    alignItems: "center"
  },
  titleText: {
    fontSize: 36,
    fontWeight: "600",
    justifyContent: "center",
    alignItems: "center"
  }
});

export default Profile;
