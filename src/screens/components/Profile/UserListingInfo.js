/* React imports */
import React, { Component } from "react";
import { View, Text, StyleSheet, Image, Button, TextInput } from "react-native";

/* AWS imports */
import { Auth } from "aws-amplify";

class UserListingsInfo extends Component {
  createPutObject(cognitoUserId) {
    const put = { body: this.state };
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
      .then(res => this.props.navigation.navigate("MainProfile"))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          Item name: {this.props.navigation.getParam("name")}
        </Text>
        <TextInput
          // onChangeText={value => this.onChangeText("username", value)}
          style={styles.text}
          placeholder="item name"
          placeholderTextColor="gray"
          autoCapitalize="none"
          autoCorrect={false}
        />
        <Text style={styles.text}>
          Item price: ${this.props.navigation.getParam("price")}
        </Text>
        <TextInput
          // onChangeText={value => this.onChangeText("username", value)}
          style={styles.text}
          placeholder="price"
          placeholderTextColor="gray"
          autoCapitalize="none"
          autoCorrect={false}
        />
        <Text style={styles.text}>
          Item description: {this.props.navigation.getParam("description")}
        </Text>
        <TextInput
          // onChangeText={value => this.onChangeText("description", value)}
          style={styles.text}
          placeholder="description"
          placeholderTextColor="gray"
          autoCapitalize="none"
          autoCorrect={false}
        />
        <Button
          style={{
            justifyContent: "center"
          }}
          color="teal"
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
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    flex: 1,
    paddingBottom: 80,
    alignItems: "flex-start",
    fontSize: 16,
    color: "black"
  }
});
