/* React imports */
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

class Listings extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={{ alignItems: "center", fontSize: 16, color: "black" }}>
          {this.props.navigation.getParam("description")}
        </Text>
      </View>
    );
  }
}

export default Listings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
