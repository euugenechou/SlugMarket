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
  Right,
  Button
} from "native-base";

import { API, Auth } from "aws-amplify";
import EntypoIcon from "react-native-vector-icons/Entypo";

import UserListings from "./components/Profile/UserListings";

class Profile extends Component {
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
              name: post.itemName,
              price: post.price,
              seller: post.seller,
              description: post.description
            })
          }
          key={post.timeAdded}
        >
          <UserListings
            width={width}
            name={post.itemName}
            price={post.price}
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
        return (
          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            {this.renderSectionOne()}
          </View>
        );
      case 1:
        return (
          <View>
            <Text>Chat messages will appear here</Text>
          </View>
        );
      case 2:
        return (
          <View>
            <Text> Favorited items will appear here</Text>
          </View>
        );
    }
  };

  render() {
    return (
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh}
          />
        }
      >
        <Container style={{ flex: 1, backgroundColor: "white" }}>
          <Content>
            <View>
              <Body style={{ paddingTop: 30, paddingRight: 10 }}>
                <Text style={field.text}>{this.state.userName}</Text>
              </Body>
              <View>
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    paddingLeft: 10,
                    paddingTop: 5
                  }}
                >
                  <Image
                    source={require("../assets/darrell.png")}
                    style={{ width: 200, height: 200, borderRadius: 35.5}}
                  />
                </View>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Button
                  bordered
                  dark
                  onPress={() => this.props.navigation.navigate("EditProfile")}
                  style={{
                    flex: 1,
                    marginLeft: 50,
                    marginRight: 50,
                    justifyContent: "center",
                    height: 30
                  }}
                >
                  <Text> Edit Profile </Text>
                  color="teal"
                </Button>
              </View>
              <View
                style={{
                  flexDirection: "column",
                  flex: 3,
                  paddingVertical: 15,
                  paddingLeft: 80,
                  alignItems: "flex-start"
                }}
              >
                <View>
                  <Text>
                    <B>Name:</B> {this.state.userName}
                  </Text>
                  <Text>
                    <B>Phone Number:</B>{" "}
                    {this.state.userAttributes.phone_number}
                  </Text>
                  <Text>
                    <B>Email:</B> {this.state.userAttributes.email}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-around",
                  borderTopWidth: 1,
                  borderBottomWidth: 1,
                  borderTopColor: "#dddddd",
                  borderBottomColor: "#dddddd"
                }}
              >
                <Button
                  transparent
                  onPress={() => this.segmentClicked(0)}
                  active={this.state.activeIndex == 0}
                >
                  <Icon
                    name="ios-apps-outline"
                    style={[
                      this.state.activeIndex == 0 ? {} : { color: "grey" }
                    ]}
                  />
                </Button>

                <Button
                  transparent
                  onPress={() => this.segmentClicked(1)}
                  active={this.state.activeIndex == 1}
                >
                  <Icon
                    name="ios-chatbubbles-outline"
                    style={[
                      this.state.activeIndex == 1 ? {} : { color: "grey" }
                    ]}
                  />
                </Button>

                <Button
                  transparent
                  onPress={() => this.segmentClicked(2)}
                  active={this.state.activeIndex == 2}
                >
                  <Icon
                    name="ios-bookmark-outline"
                    style={[
                      this.state.activeIndex == 2 ? {} : { color: "grey" }
                    ]}
                  />
                </Button>
              </View>
              {this.renderSection()}
            </View>
          </Content>
        </Container>
      </ScrollView>
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
    fontSize: 18
  }
});

export default Profile;
