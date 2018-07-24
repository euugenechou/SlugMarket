// React imports
import React, { Component } from "react";
import { StyleSheet, Image, View } from "react-native";

export default class Splash extends Component {
  render() {
    return (
      <View style = { styles.container }>
        <Image   
					source = {require("../assets/Slug.png")}
					style = { styles.image } />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    alignSelf: "center",
    resizeMode: "contain",
    aspectRatio: 0.15
  },
  container: {
    flex: 1,
    backgroundColor: "teal"
  }
});
