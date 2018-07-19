/* React imports */
import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-elements";

class Listings extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={{ alignItems: "center", fontSize: 20, color: "black" }}>
          item name: {this.props.navigation.getParam("name")}
        </Text>
        <Text style={{ alignItems: "center", fontSize: 20, color: "black" }}>
          price: ${this.props.navigation.getParam("price")}
        </Text>
        <Text style={{ alignItems: "center", fontSize: 20, color: "black" }}>
          category: {this.props.navigation.getParam("category")}
        </Text>
        <Text style={{ alignItems: "center", fontSize: 20, color: "black" }}>
          description: {this.props.navigation.getParam("description")}
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
              seller: this.props.navigation.getParam("seller")
            })
          }
          title="View Seller Details"
          containerViewStyle={{
            width: 300,
            paddingBottom: 15,
            paddingRight: 25
          }}
        />
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
