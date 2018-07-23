// React imports
import React, { Component } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  Platform,
  StatusBar,
  ScrollView,
  Dimensions,
  RefreshControl,
  TouchableHighlight,
  StyleSheet
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { Button } from "react-native-elements";
// AWS imports
import { API, Auth } from "aws-amplify";
// Local imports
import Category from "./components/Explore/Category";
import Listings from "./components/Explore/Listings";

const { height, width } = Dimensions.get("window");

export default class Explore extends Component {
  state = {
    postsToRender: [],
    userName: "",
    refreshing: false
  };

  static navigationOptions = ({ navigation }) => ({
    header: null,
    gesturesEnabled: false
  });

  componentWillMount() {
    this.startHeaderHeight = 90;
    if (Platform.OS == "android") {
      this.startHeaderHeight = 100 + StatusBar.currentHeight;
    }
    this.getRecentPosts();
    this.getUserInfo();
    console.log(this.state.postsToRender);
  }

  _onRefresh = () => {
    this.setState({ refreshing: true });
    this.getRecentPosts();
    this.getUserInfo();
    this.setState({ refreshing: false });
  };

  /**
   * Gets items which were posted at most one day ago
   */
  getRecentPosts() {
    const path = "/itemPostings/allPosts";
    const apiName = "itemPostingsCRUD";
    const headers = {
      headers: {},
      response: true
    };
    API.get(apiName, path, headers)
      .then(response => {
        console.log(response);
        const sorted = response.data.sort((a, b) => {
          return new Date(b.timeAdded) - new Date(a.timeAdded);
        });
        this.setState({
          postsToRender: sorted.filter(post => {
            return !post.isSold && !post.isRemoved;
          })
        });
      })
      .catch(error => console.log(error.response));
  }

  getUserInfo() {
    Auth.currentUserInfo()
      .then(res => {
        this.setState({ userAttributes: res.attributes });
        this.setState({ userName: res.attributes.name });
        console.log(res);
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
        <ScrollView
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
            />
          }
        >
          <View style={{ flex: 1, backgroundColor: "white", paddingTop: 40 }}>
            <Text style={styles.nameText}>Hi {this.state.userName}! </Text>
            <Text style={styles.sectionTitle}>Browse Items By Category</Text>
            <View style={styles.sideScroll}>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              >
                <TouchableHighlight
                  onPress={() =>
                    this.props.navigation.navigate("ViewCategory", {
                      category: "Textbooks"
                    })
                  }
                  underlayColor="white"
                >
                  <Category
                    imageUri={require("../assets/textbooks.jpg")}
                    name="Textbooks"
                  />
                </TouchableHighlight>
                <TouchableHighlight
                  onPress={() =>
                    this.props.navigation.navigate("ViewCategory", {
                      category: "Furniture"
                    })
                  }
                  underlayColor="white"
                >
                  <Category
                    imageUri={require("../assets/furniture.jpg")}
                    name="Furniture"
                  />
                </TouchableHighlight>
                <TouchableHighlight
                  onPress={() =>
                    this.props.navigation.navigate("ViewCategory", {
                      category: "Electronics"
                    })
                  }
                  underlayColor="white"
                >
                  <Category
                    imageUri={require("../assets/electronics.jpg")}
                    name="Electronics"
                  />
                </TouchableHighlight>
              </ScrollView>
            </View>
            <View style={{ marginTop: 20 }}>
              <Text style={styles.text}>Recently Added Items</Text>
              <View style={styles.listingsView}>
                {this.state.postsToRender.map(post => {
                  return (
                    <TouchableHighlight
                      onPress={() => {
                        console.log(post);
                        this.props.navigation.navigate("ListingInfo", {
                          userId: post.userId,
                          timeAdded: post.timeAdded,
                          name: post.itemName,
                          price: post.price,
                          seller: post.seller,
                          category: post.category,
                          description: post.description,
                          phoneNumber: post.phoneNumber,
                          email: post.email
                        });
                      }}
                      underlayColor="white"
                      key={post.timeAdded}
                    >
                      <Listings
                        width={width}
                        name={post.itemName}
                        price={post.price}
                        seller={post.seller}
                        category={post.category}
                      />
                    </TouchableHighlight>
                  );
                })}
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 24,
    fontWeight: "700",
    paddingHorizontal: 20
  },
  sideScroll: {
    height: 130,
    marginTop: 20
  },
  text: {
    fontSize: 24,
    fontWeight: "700",
    paddingHorizontal: 20
  },
  nameText: {
    fontSize: 32,
    fontWeight: "700",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 30
  },
  listingsView: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginBottom: 20,
    flexDirection: "column",
    flexWrap: "wrap",
    justifyContent: "space-evenly"
  }
});
