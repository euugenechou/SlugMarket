// React imports
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableHighlight,
  Image,
  Dimensions,
  RefreshControl
} from "react-native";
// AWS imports
import { API } from "aws-amplify";
// Local imports
import UserListings from "../Profile/UserListings";

export default class SellerDetails extends React.Component {
  state = {
    postsToRender: [],
    refreshing: false
  };

  static navigationOptions = () => ({
    headerTintColor: "teal",
    headerStyle: {
      height: 40,
      backgroundColor: "white",
      shadowColor: "transparent",
      borderBottomWidth: 0
    }
  });

  componentWillMount() {
    this.getPostsToRender();
  }

  _onRefresh = () => {
    this.setState({ refreshing: true });
    this.getPostsToRender();
    this.setState({ refreshing: false });
  };

  getPostsToRender() {
    const path = "/itemPostings/allPosts";
    const apiName = "itemPostingsCRUD";
    const params = {
      headers: {},
      response: true
    };

    API.get(apiName, path, params)
      .then(response => {
        this.setState({
          postsToRender: response.data.filter(post => {
            console.log(post.userId);
            console.log(this.props.navigation.getParam("userId"));
            return (
              post.userId === this.props.navigation.getParam("userId") &&
              post.isSold === false
            );
          })
        });
      })
      .catch(err => console.log(err));
  }

  renderListings = () => {
    return this.state.postsToRender.map(post => {
      return (
        <TouchableHighlight
          onPress = { () =>
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
          key = { post.timeAdded }
        >
          <UserListings
            width = { width }
            name = { post.itemName }
            price = { post.price }
            category = { post.category }
            seller = { post.seller }
          />
        </TouchableHighlight>
      );
    });
  };

  render() {
    return (
      <SafeAreaView style = { { backgroundColor: "white", flex: 1 } }>
        <ScrollView
          scrollEventThrottle = { 16 }
          showsVerticalScrollIndicator = { false }
          contentContainerStyle = { { backgroundColor: "white" } }
          refreshControl = {
            <RefreshControl
              refreshing = { this.state.refreshing }
              onRefresh = { this._onRefresh }
            />
          }
        >
          <View style = { { backgroundColor: "white" } }>
            <View style = { styles.topView }>
              <Image
                source = { require("../../../assets/darrell.png") }
                style = { styles.image }
              />
              <View style = { styles.midView } >
                <View style = { styles.botView }>
                  <Text style = { styles.titleText }>
                    { this.props.navigation.getParam("seller") }
                  </Text>
                  <Text style = { styles.text }> { this.props.navigation.getParam("email") } </Text>
                  <Text style = { styles.text }> { this.props.navigation.getParam("phoneNumber") } </Text>
                </View>
              </View>
            </View>
            <Text style = { styles.listingText }>
              { this.props.navigation.getParam("seller") }'s Listings
            </Text>
            { this.renderListings() }
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

var { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  topView: {
    backgroundColor: "white",
    flexDirection: "row-reverse",
    flex: 1
  },
  image: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
    width: null,
    height: 150,
    resizeMode: "contain",
    borderRadius: 8,
    flex: 1
  },
  midView: {
    backgroundColor: "white",
    flexDirection: "column",
    flex: 1,
    paddingTop: 60
  },
  botView: {
    alignItems: "center",
    backgroundColor: "white",
    justifyContent: "flex-start",
    paddingLeft: 20
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
