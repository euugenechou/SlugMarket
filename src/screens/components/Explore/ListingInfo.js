/* React imports */
import React, { Component } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Button } from "react-native-elements";

class Listings extends Component {
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
        style={StyleSheet.absoluteFill}
        source={require("../../../assets/textbooks.jpg")}
      />
    ),
  });

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.titleText}>
          {this.props.navigation.getParam("name")}
        </Text>
        <Text style={styles.text}>
          ${this.props.navigation.getParam("price")}
        </Text>
        <Text style={styles.text}>
          {this.props.navigation.getParam("category")}
        </Text>
        <Text style={styles.text}>
          {this.props.navigation.getParam("description")}
        </Text>
        <Button
          raised
          color="white"
          backgroundColor="teal"
          borderRadius={5}
          fontWeight="bold"
          onPress={() =>
            this.props.navigation.navigate("SellerDetails", {
              userId: this.props.navigation.getParam("userId"),
              seller: this.props.navigation.getParam("seller"),
              phoneNumber: this.props.navigation.getParam("phoneNumber"),
              email: this.props.navigation.getParam("email")
            })
          }
          title="View Seller Details"
          containerViewStyle={styles.buttonContainer}
        />
      </View>
    );
  }
}

export default Listings;

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
    alignSelf: 'center',
    paddingTop: 10
  }
});
