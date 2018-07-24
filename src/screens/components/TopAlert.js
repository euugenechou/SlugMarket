import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default class TopAlert extends React.Component {
  state = {
    timeout: false
  };

  componentWillMount() {
    this.timeoutHandle = setTimeout(() => {
      this.setState({ timeout: true });
    }, 3500);
  }

  render() {
    if (this.props.visible && !this.state.timeout) {
      return (
        <View style={styles.container}>
          <Text style={styles.text}> {this.props.message} </Text>
        </View>
      );
    } else {
      return null;
    }
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    backgroundColor: "red",
    zIndex: 1,
    position: "absolute",
    left: 0,
    right: 0,
    marginLeft: "auto"
  },
  text: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
    padding: 8
  }
});
