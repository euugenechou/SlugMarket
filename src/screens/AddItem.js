/* React imports */
import React from "react";
import {
  TextInput,
  StyleSheet,
  View,
  Button,
  ScrollView,
  Alert
} from "react-native";
import { API, Auth } from "aws-amplify";

export default class AddItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: "",
      category: "",
      description: "",
      isSold: false,
      itemName: "",
      price: -1,
      seller: "",
      timeAdded: ""
    };
  }

  onChangeText(key, value) {
    this.setState({
      [key]: value
    });
  }

  createPostObject() {
    const userInfo = Auth.currentUserInfo().catch(error =>
      Alert.alert(JSON.stringify(error))
    );
    const post = { "body": this.state };
    post.body.userId = userInfo["id"];
    post.body.seller = "jon";
    post.body.timeAdded = new Date().toString();
    return post;
  }

  /**
   * Save new post to postedItems schema in DynamoDB
   */
  saveItemPost() {
    const apiName = "itemPostingsCRUD";
    const path = "/itemPostings";
    const post = this.createPostObject();
    API.post(apiName, path, post)
      .then(res => console.log(res))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={styles.container}
          centerContent={true}
        >
          <TextInput
            onChangeText={value => this.onChangeText("itemName", value)}
            style={styles.input}
            placeholder="item name"
            placeholderTextColor="gray"
            autoCapitalize="none"
            autoCorrect={false}
          />
          <TextInput
            onChangeText={value => this.onChangeText("price", value)}
            style={styles.input}
            placeholder="price (USD)"
            placeholderTextColor="gray"
            autoCapitalize="none"
            autoCorrect={false}
          />
          <TextInput
            onChangeText={value => this.onChangeText("category", value)}
            style={styles.input}
            placeholder="category"
            placeholderTextColor="gray"
            autoCapitalize="none"
            autoCorrect={false}
          />
          <TextInput
            onChangeText={value => this.onChangeText("description", value)}
            style={styles.input}
            placeholder="description"
            placeholderTextColor="gray"
            autoCapitalize="none"
            autoCorrect={true}
          />
          <Button
            style={{
              flex: 2,
              justifyContent: "center"
            }}
            color="black"
            onPress={() => this.saveItemPost()}
            title="Add Item!"
          />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    height: 50,
    color: "black",
    borderBottomWidth: 2,
    borderBottomColor: "teal",
    margin: 10,
    width: 300
  },
  box: {
    height: 100,
    width: 300,
    borderColor: "gray",
    borderWidth: 3
  },
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: "white",
    alignItems: "center"
  },
  titleText: {
    fontSize: 36,
    padding: 50,
    color: "teal"
  }
});
