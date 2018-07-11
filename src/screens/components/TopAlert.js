import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default class TopAlert extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: this.props.visible,
      message: this.props.message
    }
  }

  render() {
    if (!this.state.visible) {
      return null;
    }
    return (
      <View style={styles.container}>
        <Text>
          {this.state.message}
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "red"
  },
  text: {
    color: "white",
    textAlign: "center",
    fontSize: 18,
    padding: 5
  }
});
