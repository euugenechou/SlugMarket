/* React imports */
import React, { Component } from "react";
import { View, Text, StyleSheet, Image, Button } from "react-native";

/* AWS imports */
import {Auth} from "aws-amplify"

class UserListingsInfo extends Component {
  createPutObject(cognitoUserId) {
    const put = { "body": this.state };
    put.body.timeAdded = new Date().toString();
    return post;
  }

  async saveItemChanges() {
    const userInfo = await Auth.currentUserInfo().catch(error => {
      Alert.alert(JSON.stringify(error));
      return;
    });
    const apiName = "itemPostingsCRUD";
    const path = "/itemPostings";
    const put = this.createPutObject(userInfo.id);
    API.put(apiName, path, put)
      .then(res => this.props.navigation.navigate("MainProfile", {
        reload: true
      }))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          Item name: {this.props.navigation.getParam("name")}
        </Text>
        <Text style={styles.text}>
          Item price: ${this.props.navigation.getParam("price")}
        </Text>
        <Text style={styles.text}>
          Item description: {this.props.navigation.getParam("description")}
        </Text>
        <Button
          style={{
            justifyContent: "center"
          }}
          color="black"
          onPress={() => this.saveItemChanges()}
          title="Save Changes!"
        />
      </View>
    );
  }
}

export default UserListingsInfo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    alignItems: "center",
    justifyContent: "center"
  },
  text: {
    flex: 1,
    alignItems: 'flex-start',
    fontSize: 16,
    color: "black"
  }
});
