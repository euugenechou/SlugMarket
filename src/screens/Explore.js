/* React imports */
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
  Button,
  RefreshControl,
  TouchableHighlight
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { API } from "aws-amplify";

/* Local imports */
import Category from "./components/Explore/Category";
import Listings from "./components/Explore/Listings";
import { styles } from "../styles";

const { height, width } = Dimensions.get("window");

class Explore extends Component {
  state = {
    postsToRender: [],
    refreshing: false
  };

  static navigationOptions = ({ navigation }) => ({
    header: null
  });

  componentWillMount() {
    this.startHeaderHeight = 90;
    if (Platform.OS == "android") {
      this.startHeaderHeight = 100 + StatusBar.currentHeight;
    }
    this.getRecentPosts();
    console.log(this.state.postsToRender);
  }

  _onRefresh = () => {
    this.setState({ refreshing: true });
    this.getRecentPosts();
    this.setState({ refreshing: false });
  };

  /**
   * Gets items which were posted at most one day ago
   */
  getRecentPosts() {
    const path = "/itemPostings";
    const apiName = "itemPostingsCRUD";
    const headers = {
      headers: {},
      response: true,
      queryStringParameters: {
        ScanIndexForward: false
      }
    };
    API.get(apiName, path, headers)
      .then(response => {
        console.log(response);
        this.setState({
          postsToRender: response.data.sort((a, b) => {
            return new Date(b.timeAdded) - new Date(a.timeAdded);
          })
        });
      })
      .catch(error => console.log(error.response));
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1, backgroundColor: "white" }}>
          <View
            style={{ height: this.startHeaderHeight, backgroundColor: "white" }}
          >
            <View
              style={{
                flexDirection: "row",
                padding: 10,
                backgroundColor: "white",
                marginHorizontal: 20,
                shadowOffset: {width: 0, height: 0},
                shadowColor: "black",
                shadowOpacity: 0.2,
                elevation: 1,
                marginTop: Platform.OS == "android" ? 30 : 30
              }}
            >
              <Icon name="ios-search" size={20} style={{ marginRight: 10 }} />
              <TextInput
                underlineColorAndroid="transparent"
                placeholder="Search"
                placeholderTextColor="grey"
                style={{
                  flex: 1,
                  fontWeight: "700",
                  backgroundColor: "white",
                  borderRadius: 3
                }}
              />
            </View>
          </View>
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
            <View style={{ flex: 1, backgroundColor: "white", paddingTop: 20 }}>
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
              <View>
                <Button
                  style={{
                    flex: 2,
                    justifyContent: "center",
                    paddingTop: 10,
                    fontWeight: "500"
                  }}
                  color="black"
                  onPress={() => this.props.navigation.navigate("AddItem")}
                  title="Have Something To Sell?"
                />
              </View>
              <View style={{ marginTop: 20 }}>
                <Text
                  style={{
                    fontSize: 24,
                    fontWeight: "700",
                    paddingHorizontal: 20
                  }}
                >
                  Recently Added Items
                </Text>
                <View
                  style={{
                    paddingHorizontal: 20,
                    paddingVertical: 20,
                    marginBottom: 20,
                    flexDirection: "column",
                    flexWrap: "wrap",
                    justifyContent: "space-evenly"
                  }}
                >
                  {this.state.postsToRender.map(post => {
                    return (
                      <TouchableHighlight
                        onPress={() =>
                          this.props.navigation.navigate("ListingInfo", {
                            name: post.itemName,
                            price: post.price,
                            seller: post.seller,
                            category: post.category,
                            description: post.description
                          })
                        }
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
        </View>
      </SafeAreaView>
    );
  }
}

export default Explore;
