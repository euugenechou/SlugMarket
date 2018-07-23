// React imports 
import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableHighlight,
  RefreshControl,
  ScrollView,
  Dimensions,
  SafeAreaView,
  Button
} from "react-native";

import Listings from "../Explore/Listings";
import { API } from "aws-amplify";

const { height, width } = Dimensions.get("window");

class ItemCategory extends Component {
  state = {
    postsToRender: [],
    category: this.props.navigation.getParam("category"),
    refreshing: false
  };

  static navigationOptions = () => ({
    headerTintColor: "teal",
    headerStyle: {
      height: 40,
      backgroundColor: "white",
      shadowColor: "transparent",
      borderBottomWidth: 0,
    }
  });

  componentWillMount() {
    this.getPostsByCategory();
    console.log(this.state.postsToRender);
  }

  _onRefresh = () => {
    this.setState({ refreshing: true });
    this.getPostsByCategory();
    this.setState({ refreshing: false });
  };

  getPostsByCategory() {
    const path = "/itemPostings/allPosts";
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
        const sorted = response.data.sort((a, b) => {
          return new Date(b.timeAdded) - new Date(a.timeAdded);
        });
        this.setState({
          postsToRender: sorted.filter(post => {
            return (!post.isSold && 
            !post.isRemoved &&
            post.category === this.props.navigation.getParam("category"));
          })
        });
      })
      .catch(error => console.log(error.response));
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1, backgroundColor: "white" }}>
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
            <View style={{ marginTop: 20 }}>
              <Text style={styles.titleText}>
                Recently Added To {this.props.navigation.getParam("category")}
              </Text>
              <View
                style={styles.listings}
              >
                {this.state.postsToRender.map(post => {
                  return (
                    <TouchableHighlight
                      onPress = { () =>
                        this.props.navigation.navigate("ListingInfo", {
                          name: post.itemName,
                          price: post.price,
                          seller: post.seller,
                          category: post.category,
                          description: post.description
                        })
                      }
                      underlayColor="white"
                      key = {post.timeAdded}
                    >
                      <Listings
                        width = { width }
                        name = { post.itemName }
                        price = { post.price }
                        seller = { post.seller }
                        category = { post.category }
                      />
                    </TouchableHighlight>
                  );
                })}
              </View>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}

export default ItemCategory;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center"
  },
  listings: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginBottom: 20,
    flexDirection: "column",
    flexWrap: "wrap",
    justifyContent: "space-evenly"
  },
  titleText: {
    fontSize: 22,
    fontWeight: "700",
    paddingHorizontal: 20
  }
});
