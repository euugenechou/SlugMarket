// React imports
import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Alert,
  ScrollView
} from "react-native";
import { Button } from "react-native-elements";
// AWS imports
import { API, Auth } from "aws-amplify";

export default class UserListingsInfo extends Component {
  state = {
    userId: "",
    timeAdded: this.props.navigation.getParam("timeAdded"),
    category: this.props.navigation.getParam("category"),
    itemName: this.props.navigation.getParam("itemName"),
    price: this.props.navigation.getParam("price"),
    seller: this.props.navigation.getParam("seller"),
    description: this.props.navigation.getParam("description"),
    isSold: this.props.navigation.getParam("isSold"),
    isRemoved: this.props.navigation.getParam("isRemoved"),
    phoneNumber: this.props.navigation.getParam("phoneNumber"),
    email: this.props.navigation.getParam("email")
  };

  static navigationOptions = () => ({
    headerTintColor: "teal",
    headerStyle: {
      height: 40,
      backgroundColor: "white",
      shadowColor: "transparent",
      borderBottomWidth: 0
    }
  });

  async updateItemFields() {
    const userInfo = await Auth.currentUserInfo().catch(error => {
      Alert.alert(JSON.stringify(error));
      return;
    });
    const apiName = "itemPostingsCRUD";
    const path = "/itemPostings";
    const updatedObject = this.getUpdatedPostObject(userInfo);
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

  getUpdatedPostObject() {
    let postObject = { body: this.state };
    return postObject;
  }

  async deletePost() {
    const userInfo = await Auth.currentUserInfo().catch(error => {
      Alert.alert(JSON.stringify(error));
      return;
    });
    const apiName = "itemPostingsCRUD";
    const path = "/itemPostings";
    const updatedObject = this.getUpdatedPostObject();
    updatedObject.body.isRemoved = true;
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

  async sellPost() {
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
      <View style={{ backgroundColor: "white", flex: 1, paddingTop: 20 }}>
        <View>
          <Text style={styles.text}> Item Name </Text>
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            autoCorrect={false}
            defaultValue={this.props.navigation.getParam("itemName")}
            onChangeText={value => this.onChangeText("itemName", value)}
          />
          <Text style={styles.text}> Item Price (USD) </Text>
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            autoCorrect={false}
            defaultValue={this.props.navigation.getParam("price")}
            onChangeText={value => this.onChangeText("price", value)}
          />
          <Text style={styles.text}> Item Description </Text>
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            autoCorrect={false}
            defaultValue={this.props.navigation.getParam("description")}
            onChangeText={value => this.onChangeText("description", value)}
          />
        </View>
        <View style={{ backgroundColor: "white", paddingTop: 20 }}>
          <Button
            raised
            color="white"
            backgroundColor="teal"
            borderRadius={5}
            fontWeight="bold"
            onPress={() => this.updateItemFields()}
            title="Save Changes"
            containerViewStyle={styles.buttonStyle}
          />
          <Button
            raised
            color="white"
            backgroundColor="goldenrod"
            borderRadius={5}
            fontWeight="bold"
            onPress={() => this.sellPost()}
            title="Mark Item As Sold"
            containerViewStyle={styles.buttonStyle}
          />
          <Button
            raised
            color="white"
            backgroundColor="red"
            borderRadius={5}
            fontWeight="bold"
            onPress={() => this.deletePost()}
            title="Delete Item"
            containerViewStyle={styles.buttonStyle}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    color: "black",
    fontWeight: "700",
    paddingLeft: 35
  },
  input: {
    height: 50,
    color: "black",
    borderBottomWidth: 0.8,
    borderBottomColor: "#dddddd",
    marginBottom: 20,
    width: 300,
    alignSelf: "center"
  },
  buttonStyle: {
    width: 300,
    alignSelf: "center",
    paddingBottom: 20
  }
});
