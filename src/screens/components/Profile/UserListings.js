/* React imports */
import React, { Component } from "react";
import { View, Text, StyleSheet, Image } from "react-native";

class UserListings extends Component {
  render() {
    return (
      <View
        style={{
          flexDirection: "row",
          width: this.props.width - 40,
          height: this.props.width / 2 - 80,
          borderWidth: 0.5,
          borderColor: "#dddddd",
          marginLeft: 20,
          marginTop: 20,
          borderRadius: 3,
          borderWidth: 0.5,
          borderColor: "#dddddd",
          shadowOffset: { width: 0, height: 0 },
          shadowColor: "black",
          shadowOpacity: 0.1,
          elevation: 1
        }}
      >
        <View style={{ flex: 2 }}>
          <Image
            style={{
              flex: 2,
              width: null,
              height: null,
              resizeMode: "cover",
              borderRadius: 3
            }}
            source={require("../../../assets/textbooks.jpg")}
          />
        </View>
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Text
            style={{
              alignItems: "center",
              justifyContent: "center",
              fontSize: 14,
              fontWeight: "bold",
              paddingHorizontal: 10,
            }}
          >
            {this.props.name}
          </Text>
          <Text
            style={{
              alignItems: "center",
              justifyContent: "center",
              fontSize: 12
            }}
          >
            {this.props.category}
          </Text>
          <Text
            style={{
              alignItems: "center",
              justifyContent: "center",
              fontSize: 12
            }}
          >
            ${this.props.price}
          </Text>
        </View>
      </View>
    );
  }
}

export default UserListings;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center"
  }
});
