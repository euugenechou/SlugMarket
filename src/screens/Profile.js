// React imports
import React, { Component } from "react";
import {
  StyleSheet,
  SafeAreaView,
  Image,
  Text,
  View,
  Dimensions,
  ScrollView,
  TouchableHighlight,
  RefreshControl
} from "react-native";
import { Button } from "react-native-elements";
// AWS imports
import { API, Auth } from "aws-amplify";
// Local imports
import UserListings from "./components/Profile/UserListings";

const { height, width } = Dimensions.get("window");

export default class Profile extends Component {
  static navigationOptions = ({ navigation }) => ({
    header: null
  });

  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
      postsToRender: [],
      soldPostsToRender: [],
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
    this.getUserSoldPosts();
    this.getUserInfo();
  }

  // For getting user posts
  getUserPosts() {
    const path = "/itemPostings/userPosts";
    const apiName = "itemPostingsCRUD";
    const headers = {
      headers: {},
      response: true
    };
    API.get(apiName, path, headers)
      .then(response => {
        response.data.sort((a, b) => {
          return new Date(b.timeAdded) - new Date(a.timeAdded);
        });
        this.setState({
          postsToRender: response.data.filter(post => {
            return !post.isSold && !post.isRemoved;
          })
        });
      })
      .catch(() => Alert.alert("error getting user posts"));
  }

  // For getting user sold posts
  getUserSoldPosts() {
    const path = "/itemPostings/userPosts";
    const apiName = "itemPostingsCRUD";
    const headers = {
      headers: {},
      response: true
    };
    API.get(apiName, path, headers)
      .then(response => {
        response.data.sort((a, b) => {
          return new Date(b.timeAdded) - new Date(a.timeAdded);
        });
        this.setState({
          soldPostsToRender: response.data.filter(post => {
            return post.isSold && !post.isRemoved;
          })
        });
      })
      .catch(() => Alert.alert("error getting user sold posts"));
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
        this.setState({ userName: res.attributes.name });
      })
      .catch(() => Alert.alert("error getting user info"));
  }

  _onRefresh = () => {
    this.setState({ refreshing: true });
    this.getUserPosts();
    this.getUserSoldPosts();
    this.setState({ refreshing: false });
  };

  renderUserListings = () => {
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
              timeAdded: post.timeAdded,
              isSold: post.isSold,
              isRemoved: post.isRemoved
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
  };

  renderUserSoldListings = () => {
    return this.state.soldPostsToRender.map(post => {
      return (
        <TouchableHighlight
          onPress={() =>
            this.props.navigation.navigate("SoldListingInfoScreen", {
              itemName: post.itemName,
              price: post.price,
              seller: post.seller,
              category: post.category,
              description: post.description,
              timeAdded: post.timeAdded,
              isSold: post.isSold,
              isRemoved: post.isRemoved
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
  };

  render() {
    return (
      <SafeAreaView style={{ backgroundColor: "white", flex: 1 }}>
        <ScrollView
          style={{ marginTop: 20 }}
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
            <View style={styles.outerContainer}>
              <Image
                source={require("../assets/Slug.png")}
                style={styles.image}
              />
              <View style={styles.columnContainer}>
                <View style={styles.innerContainer}>
                  <Text style={styles.titleText}>{this.state.userName} </Text>
                  <Text style={styles.text}>
                    {this.state.userAttributes.email}
                  </Text>
                  <Text style={styles.text}>
                    {this.state.userAttributes.phone_number}
                  </Text>
                  <Button
                    color="white"
                    backgroundColor="teal"
                    borderRadius={5}
                    title="Sell Item"
                    fontWeight="bold"
                    onPress={() => this.props.navigation.navigate("AddItem")}
                    containerViewStyle={{ width: 150, paddingTop: 10 }}
                  />
                </View>
              </View>
            </View>
            <Text style={styles.listingText}>Your Listings</Text>
            {this.renderUserListings()}
            <Text style={styles.listingText}>Your Sold Listings</Text>
            {this.renderUserSoldListings()}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  outerContainer: {
    backgroundColor: "white",
    flexDirection: "row-reverse",
    flex: 1
  },
  columnContainer: {
    backgroundColor: "white",
    flexDirection: "column",
    flex: 1,
    paddingTop: 50
  },
  innerContainer: {
    alignItems: "center",
    backgroundColor: "white",
    justifyContent: "flex-start",
    paddingLeft: 20
  },
  image: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 60,
    width: null,
    height: 150,
    resizeMode: "contain",
    borderRadius: 8,
    flex: 1
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
  },
  listingText: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 20,
    marginTop: 20,
    paddingHorizontal: 20
  }
});
