// React imports
import React, { Component } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Button } from "react-native-elements";

import { API, Auth } from "aws-amplify"

export default class SoldListingsInfo extends Component {
  static navigationOptions = () => ({
    headerTintColor: "white",
    headerStyle: {
      height: 40,
      backgroundColor: "white",
      shadowColor: "transparent",
      borderBottomWidth: 0
    },
    headerBackground: (
      <Image
        style = { StyleSheet.absoluteFill }
        source = { require("../../../assets/textbooks.jpg") }
      />
    ),
  });

  state = {
    userId: "",
    timeAdded: this.props.navigation.getParam("timeAdded"),
    category: this.props.navigation.getParam("category"),
    itemName: this.props.navigation.getParam("itemName"),
    price: this.props.navigation.getParam("price"),
    seller: this.props.navigation.getParam("seller"),
    description: this.props.navigation.getParam("description"),
    isSold: this.props.navigation.getParam("isSold"),
    isRemoved: this.props.navigation.getParam("isRemoved"),
    phoneNumber: this.props.navigation.getParam("phoneNumber"),
    email: this.props.navigation.getParam("email")
  };

  getUpdatedPostObject() {
    let postObject = { body: this.state };
    return postObject;
  }

  async deletePost() {
    const userInfo = await Auth.currentUserInfo().catch(error => {
      Alert.alert(JSON.stringify(error));
      return;
    });
    const apiName = "itemPostingsCRUD";
    const path = "/itemPostings";
    const updatedObject = this.getUpdatedPostObject();
    updatedObject.body.isRemoved = true;
    API.put(apiName, path, updatedObject)
      .then(res => {
        console.log(res);
        this.props.navigation.navigate("MainProfile");
      })
      .catch(err => {
        Alert.alert("Error updating post. Please try again");
        console.log(err);
      });
  }

  render() {
    return (
      <View style = { styles.container }>
        <Text style = { styles.titleText }>
          { this.props.navigation.getParam("itemName") }
        </Text>
        <Text style = { styles.text }>
          ${ this.props.navigation.getParam("price") }
        </Text>
        <Text style = { styles.text }>
          { this.props.navigation.getParam("category") }
        </Text>
        <Text style = { styles.text }>
          { this.props.navigation.getParam("description") }
        </Text>
        <Button
            raised
            color = "white"
            backgroundColor = "red"
            borderRadius = { 5 }
            fontWeight = "bold"
            onPress = { () => this.deletePost() }
            title = "Delete Item"
            containerViewStyle = { styles.buttonContainer }
          />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 22,
    color: "black",
    fontWeight: "400",
    alignSelf: 'center',
    paddingBottom: 10,
    paddingHorizontal: 30,
  },
  titleText: {
    fontSize: 30,
    color: "black",
    fontWeight: "800",
    alignSelf: 'center',
    paddingBottom: 10,
    marginTop: 100
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white"
  },
  buttonContainer: {
    width: 300,
    alignSelf: "center",
    paddingVertical: 20
  }
});
