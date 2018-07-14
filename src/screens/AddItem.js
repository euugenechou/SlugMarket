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
import { API, Auth, Storage } from "aws-amplify";

export default class AddItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: "",
      category: "",
      description: "",
      isSold: false,
      itemName: "",
      price: 0,
      seller: "",
      timeAdded: ""
    };
  }

  onChangeText(key, value) {
    this.setState({
      [key]: value
    });
  }

  /**
   * Creates post object to save in itemPostings schema
   */
  createPostObject(cognitoUserId) {
    const post = {"body": this.state};
    post.body.userId = cognitoUserId;
    post.body.seller = "jon";
    post.body.timeAdded = new Date().toString();
    return post;
  }

  /**
   * Saves image(s) associated with a user post to S3 bucket as
   * a protected file (others can se but can't modify)
   */
  saveImageAsProtected(cognitoUserId, imageUriArray) {
    imageUriArray.forEach((imageUri) => {
      
    })
  }

  /**
   * Save new post to postedItems schema in DynamoDB
   */
  async saveItemPost() {
    const userInfo = await Auth.currentUserInfo().catch(error =>
      Alert.alert(JSON.stringify(error))
    );
    const apiName = "itemPostingsCRUD";
    const path = "/itemPostings";
    const post = this.createPostObject(userInfo.id);
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
