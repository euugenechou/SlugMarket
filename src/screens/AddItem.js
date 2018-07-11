/* React imports */
import React from "react";
import { StyleSheet, View, Text } from "react-native";

export default class AddItem extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text> This is a dummy page </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "white"
  }
});
