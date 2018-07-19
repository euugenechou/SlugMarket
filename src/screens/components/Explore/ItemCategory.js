/* React imports */
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
    headerTintColor: 'teal',
    headerStyle: {
      height: 40,
      backgroundColor: 'white'
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
    const path = "/itemPostings";
    const apiName = "itemPostingsCRUD";
    const headers = {
      response: true,
      queryStringParameters: {
        ScanIndexForward: false
      }
    };
    API.get(apiName, path, headers)
      .then(response => {
        console.log(response);
        console.log(response.data[0].category);
        console.log(this.state.category);
        let filteredResponse = response.data.filter((post) => {
          return post.category.toLowerCase() == this.state.category.toLowerCase() && post.isSold === false;
        });
        this.setState({
          postsToRender: filteredResponse
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
              <Text
                style={{
                  fontSize: 22,
                  fontWeight: "700",
                  paddingHorizontal: 20
                }}
              >
                Recently Added To {this.props.navigation.getParam("category")}
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
  }
});
