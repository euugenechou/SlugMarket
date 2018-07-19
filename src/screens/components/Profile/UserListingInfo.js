/* React imports */
import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  TextInput,
  Alert,
  ScrollView
} from "react-native";

/* AWS imports */
import { API, Auth } from "aws-amplify";

class UserListingsInfo extends Component {
  state = {
    itemName: this.props.navigation.getParam("name"),
    price: this.props.navigation.getParam("price"),
    seller: this.props.navigation.getParam("seller"),
    category: this.props.navigation.getParam("category"),
    description: this.props.navigation.getParam("description"),
    timeAdded: this.props.navigation.getParam("timeAdded")
  };

  async updateItemFields() {
    const userInfo = await Auth.currentUserInfo().catch(error => {
      Alert.alert(JSON.stringify(error));
      return;
    });
    const apiName = "itemPostingsCRUD";
    const path = "/itemPostings";
    const updatedObject = this.getUpdatedPostObject(userInfo.id);
    API.put(apiName, path, updatedObject)
      .then(res => {
        console.log(res);
        this.props.navigation.navigate("ProfileScreen");
      })
      .catch(err => {
        Alert.alert("Error updating post. Please try again");
        console.log(err);
      });
  }

  getUpdatedPostObject(cognitoUserId) {
    let postObject = { body: this.state };
    postObject.body.userId = cognitoUserId;
    return postObject;
  }

  onChangeText(key, value) {
    this.setState({
      [key]: value
    });
  }

  render() {
    return (
      <ScrollView>
        <Text style={styles.text}>Item name:</Text>
        <TextInput
          // onChangeText={value => this.onChangeText("username", value)}
          style={styles.input}
          placeholder="item name"
          placeholderTextColor="gray"
          autoCapitalize="none"
          autoCorrect={false}
          defaultValue={this.props.navigation.getParam("itemName")}
          onChangeText={value => this.onChangeText("itemName", value)}
        />
        <Text style={styles.text}>Item price:</Text>
        <TextInput
          // onChangeText={value => this.onChangeText("username", value)}
          style={styles.input}
          placeholder="price"
          placeholderTextColor="gray"
          autoCapitalize="none"
          autoCorrect={false}
          defaultValue={this.props.navigation.getParam("price")}
          onChangeText={value => this.onChangeText("price", value)}
        />
        <Text style={styles.text}>
          Item description:
        </Text>
        <TextInput
          // onChangeText={value => this.onChangeText("description", value)}
          style={styles.input}
          placeholder="description"
          placeholderTextColor="gray"
          autoCapitalize="none"
          autoCorrect={false}
          defaultValue={this.props.navigation.getParam("description")}
          onChangeText={value => this.onChangeText("description", value)}
        />
        <Button
          style={{
            justifyContent: "center"
          }}
          color="teal"
          onPress={() => this.updateItemFields()}
          title="Save Changes"
        />
      </ScrollView>
    );
  }
}

export default UserListingsInfo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white"
  },
  text: {
    flex: 1,
    paddingBottom: 20,
    alignItems: "flex-start",
    fontSize: 16,
    color: "black", 
  },
  input: {
    height: 50,
    color: "black",
    borderBottomWidth: 2,
    borderBottomColor: "teal",
    margin: 10,
    width: 300
  }
});
