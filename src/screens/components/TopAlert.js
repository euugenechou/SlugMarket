import React from "react";
import { View, Text, StyleSheet, Alert } from "react-native";

export default class TopAlert extends React.Component {
  render() {
    if (this.props.visible) {
      return (
        <View style={styles.container}>
          <Text style={styles.text}>{this.props.message}</Text>
        </View>
      );
    } else {
      return null;
    }
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "red"
  },
  text: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
    padding: 5
  }
});
