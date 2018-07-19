import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableHighlight,
  Image,
  Dimensions
} from "react-native";
import { API } from "aws-amplify";

import UserListings from "../Profile/UserListings";

export default class SellerDetails extends React.Component {
  state = {
    postsToRender: []
  };

  componentWillMount() {
    this.getPostsToRender();
  }

  getPostsToRender() {
    const path = "/itemPostings";
    const apiName = "itemPostingsCRUD";
    const params = {
      headers: {},
      response: true
    };

    API.get(apiName, path, params)
    .then(response => {this.setState({
        postsToRender: response.data.filter(post => {
          console.log(post.seller);
          console.log(this.props.navigation.getParam("seller"));
          return post.seller === this.props.navigation.getParam("seller");
        })
      });
    })
    .catch(err => console.log(err));
  }

  renderSection = () => {
    return this.state.postsToRender.map(post => {
      return (
        <TouchableHighlight
          onPress={() =>
            this.props.navigation.navigate("ListingInfo", {
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
  };

  render() {
    return (
      <SafeAreaView style={{ backgroundColor: "white", flex: 1 }}>
        <ScrollView
          scrollEventThrottle={16}
          contentContainerStyle={{ backgroundColor: "white" }}
          showsVerticalScrollIndicator={false}
        >
          <View style={{ backgroundColor: "white" }}>
            <View
              style={{
                backgroundColor: "white",
                flexDirection: "row-reverse",
                flex: 1
              }}
            >
              <Image
                source={require("../../../assets/darrell.png")}
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
                  <Text style={field.titleText}>
                    {this.props.navigation.getParam("seller")}
                  </Text>
                  <Text style={field.text}>{"example@ucsc.edu"}</Text>
                  <Text style={field.text}>{"+16508683124"}</Text>
                </View>
              </View>
            </View>
            <Text
              style={{
                fontSize: 24,
                fontWeight: "700",
                marginBottom: 20,
                marginTop: 20,
                paddingHorizontal: 20
              }}
            >
              {this.props.navigation.getParam("seller")}'s Listings
            </Text>
            {this.renderSection()}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

var { width, height } = Dimensions.get("window");

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
