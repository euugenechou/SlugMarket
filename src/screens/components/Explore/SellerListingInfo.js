// React imports
import React, { Component } from "react";
import { View, Text, StyleSheet, Image } from "react-native";

export default class SellerListingInfo extends Component {
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
        style = { styles.wrapper }
        source = { require("../../../assets/textbooks.jpg") }
      />
    ),
  });

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
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white"
  },
  buttonContainer: {
    width: 300,
    alignSelf: 'center',
    paddingTop: 10
  },
  wrapper: {
    ...StyleSheet.absoluteFillObject,
    marginTop: 20,
  },
});
