import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default class TopAlert extends React.Component {
  render() {
    if (this.props.visible) {
      return (
        <View style = {styles.container}>
          <Text style = {styles.text}> {this.props.message} </Text>
        </View>
      );
    } else {
      return null;
    }
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "red",
    zIndex: 1,
    position: "absolute",
    left: 0,
    right: 0,
    marginLeft: "auto",
    marginRight: "auto"
  },
  text: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
    padding: 8
  }
});
