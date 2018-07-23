// React imports
import React, { Component } from "react";
import { View, Text, StyleSheet, Image } from "react-native";

class Listings extends Component {
  render() {
    return (
      <View
        style = { {
          flexDirection: "row",
          width: this.props.width - 40,
          height: this.props.width / 2 - 80,
          borderWidth: 0.5,
          borderColor: "#dddddd",
          marginBottom: 20,
          borderRadius: 3,
          borderWidth: 1,
          borderColor: "#dddddd",
          shadowOffset: { width: 0, height: 0 },
          shadowColor: "black",
          shadowOpacity: 0.1,
          elevation: 1,
          backgroundColor: "white"
        }}
      >
        <View style = { { flex: 2 } }>
          <Image
            style = { styles.image }
            source = { require("../../../assets/textbooks.jpg") }
          />
        </View>
        <View style = { styles.listingContainer }>
          <Text style = { styles.titleText }>
            { this.props.name }
          </Text>
          <Text style = { { alignItems: "center", fontSize: 12 } }>
            { this.props.category }
          </Text>
          <Text style = { { alignItems: "center", fontSize: 12 } }>
            ${this.props.price}
          </Text>
          <Text style = { { alignItems: "center", fontSize: 12 } }>
            seller: { this.props.seller }
          </Text>
        </View>
      </View>
    );
  }
}

export default Listings;

const styles = StyleSheet.create({
  image: {
    flex: 2,
    width: null,
    height: null,
    resizeMode: "cover",
    borderRadius: 3
  },
  listingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-evenly"
  },
  titleText: {
    alignItems: "center",
    fontSize: 14,
    fontWeight: "bold",
    justifyContent: "center",
    paddingHorizontal: 10
  }
});
