/* React imports */
import React, { Component } from "react";
import { View, Text, StyleSheet, Image } from "react-native";

class Listings extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={{alignItems: "center", fontSize: 20, color: "black"}}>
          item name: {this.props.navigation.getParam("name")}
        </Text>
        <Text style={{alignItems: "center", fontSize: 20, color: "black"}}>
          price: ${this.props.navigation.getParam("price")}
        </Text>
        <Text style={{alignItems: "center", fontSize: 20, color: "black"}}>
          category: {this.props.navigation.getParam("category")}
        </Text>
        <Text style={{alignItems: "center", fontSize: 20, color: "black"}}>
          description: {this.props.navigation.getParam("description")}
        </Text>
      </View>
    );
  }
}

export default Listings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white"
  }
});
