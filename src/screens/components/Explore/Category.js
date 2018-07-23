// React imports 
import React, { Component } from "react";
import { View, Text, StyleSheet, Image } from "react-native";

class Category extends Component {
  render() {
    return (
      <View style = { styles.container }>
        <View style = {{ flex: 2 }}>
          <Image
            source = { this.props.imageUri }
            style = { styles.image }
          />
        </View>
        <View style = { styles.text }>
          <Text style = {{ fontWeight: '600' }}> { this.props.name } </Text>
        </View>
      </View>
    );
  }
}

export default Category;

const styles = StyleSheet.create({
  text: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    height: 120,
    width: 130,
    marginLeft: 20,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: "#dddddd",
    shadowOffset: { width: 0, height: 0 },
    shadowColor: "black",
    shadowOpacity: 0.2,
    elevation: 1,
    backgroundColor: 'white'
  },
  image: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: "cover",
    borderWidth: 0.1,
    borderRadius: 3,
    shadowOffset: { width: 0, height: 0 },
    shadowColor: "black",
    shadowOpacity: 0.2
  },
});
