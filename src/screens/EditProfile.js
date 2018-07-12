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
    this.state = {lookingFor: ""};
  }

  onChangeText(key, value) {
    this.setState({
      [key]: value
    });
  }

  // createPost(userId) {
  //   const newPost = { body: this.state };
  //   newPost.body.userId = userId;
  //   newPost.body.timeAdded = new Date().toString();
  //   return newPost;
  // }

  /**
   * Save new post to postedItems schema in DynamoDB
   */
  // async saveItemPost() {
  //   const userInfo = await Auth.currentUserInfo().catch(error =>
  //     Alert.alert(JSON.stringify(error))
  //   );
  //   const path = "/itemPosts";
  //   const postInfo = this.createPost(userInfo["id"]);
  //   try {
  //     const apiResponse = await API.post("itemPostsCRUD", path, postInfo);
  //     Alert.alert(JSON.stringify(apiResponse));
  //   } catch (error) {
  //     Alert.alert(JSON.stringify(error));
  //   }
  // }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={styles.container}
          centerContent={true}
        >
          <TextInput
            onChangeText={value => this.onChangeText("lookingFor", value)}
            style={styles.input}
            placeholder="What are you looking for?"
            placeholderTextColor="gray"
            autoCapitalize="none"
            autoCorrect={false}
          />
          <Button
            style={{
              flex: 2,
              justifyContent: "center"
            }}
            color="black"
            onPress={() => console.log("Changing profile!")}
            title="Save changes!"
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
