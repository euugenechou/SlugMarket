/* React imports */
import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Alert,
  ScrollView
} from "react-native";

/* AWS imports */
import { API, Auth } from "aws-amplify";

import { Button } from "react-native-elements";

class UserListingsInfo extends Component {
  state = {
    itemName: this.props.navigation.getParam("itemName"),
    price: this.props.navigation.getParam("price"),
    seller: this.props.navigation.getParam("seller"),
    category: this.props.navigation.getParam("category"),
    description: this.props.navigation.getParam("description"),
    timeAdded: this.props.navigation.getParam("timeAdded")
  };

  static navigationOptions = () => ({
    headerTintColor: "teal",
    headerStyle: {
      height: 40,
      backgroundColor: "white",
      shadowColor: "transparent",
      borderBottomWidth: 0,
    }
  });

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
        this.props.navigation.navigate("MainProfile");
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

  async deletePost() {
    const userInfo = await Auth.currentUserInfo().catch(error => {
      Alert.alert(JSON.stringify(error));
      return;
    });
    const apiName = "itemPostingsCRUD";
    const path = "/itemPostings";
    const updatedObject = this.getUpdatedPostObject(userInfo.id);
    updatedObject.body.isSold = true;
    API.put(apiName, path, updatedObject)
      .then(res => {
        console.log(res);
        this.props.navigation.navigate("MainProfile");
      })
      .catch(err => {
        Alert.alert("Error updating post. Please try again");
        console.log(err);
      });
  }

  onChangeText(key, value) {
    this.setState({
      [key]: value
    });
  }

  render() {
    return (
      <View style={{ backgroundColor: "white", flex: 1 }}>
        <ScrollView
          contentContainerStyle={{
            backgroundColor: "white",
            paddingTop: 30,
            paddingLeft: 35,
            flex: 1
          }}
        >
          <View>
            <Text style={styles.text}>Item Name</Text>
            <TextInput
              style={styles.input}
              autoCapitalize="none"
              autoCorrect={false}
              defaultValue={this.props.navigation.getParam("itemName")}
              onChangeText={value => this.onChangeText("itemName", value)}
            />
            <Text style={styles.text}>Item Price</Text>
            <TextInput
              style={styles.input}
              autoCapitalize="none"
              autoCorrect={false}
              defaultValue={this.props.navigation.getParam("price")}
              onChangeText={value => this.onChangeText("price", value)}
            />
            <Text style={styles.text}>Item Description</Text>
            <TextInput
              style={styles.input}
              autoCapitalize="none"
              autoCorrect={false}
              defaultValue={this.props.navigation.getParam("description")}
              onChangeText={value => this.onChangeText("description", value)}
            />
          </View>
          <View
            style={{
              backgroundColor: "white",
              paddingTop: 40,
              alignContent: "space-around",
              justifyContent: "space-around"
            }}
          >
            <Button
              raised
              color="white"
              backgroundColor="teal"
              borderRadius={5}
              fontWeight="bold"
              onPress={() => this.updateItemFields()}
              title="Save Changes"
              containerViewStyle={{
                width: 300,
                paddingBottom: 15,
                paddingRight: 25
              }}
            />
            <Button
              raised
              color="white"
              backgroundColor="goldenrod"
              borderRadius={5}
              fontWeight="bold"
              onPress={() => this.deletePost()}
              title="Mark Item As Sold"
              containerViewStyle={{
                width: 300,
                paddingBottom: 15,
                paddingRight: 25
              }}
            />
            <Button
              raised
              color="white"
              backgroundColor="red"
              borderRadius={5}
              fontWeight="bold"
              onPress={() => this.deletePost()}
              title="Delete Item"
              containerViewStyle={{
                width: 300,
                paddingBottom: 15,
                paddingRight: 25
              }}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default UserListingsInfo;

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    color: "black",
    fontWeight: "700"
  },
  input: {
    height: 50,
    color: "black",
    borderBottomWidth: 0.8,
    borderBottomColor: "#dddddd",
    marginBottom: 20,
    width: 300
  },
  container: {
    marginTop: 30,
    marginLeft: 30
  }
});
