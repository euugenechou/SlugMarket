/* React imports */
import React from "react";
import {
  TextInput,
  StyleSheet,
  View,
  ScrollView,
  Alert
} from "react-native";
import { API, Auth } from "aws-amplify";

import { Button } from "react-native-elements";

export default class AddItem extends React.Component {
  static navigationOptions = () => ({
    headerTintColor: "teal",
    headerStyle: {
      height: 40,
      backgroundColor: "white",
      shadowColor: "transparent",
      borderBottomWidth: 0
    }
  });

  constructor(props) {
    super(props);
    this.state = { lookingFor: "" };
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
            raised
            color="white"
            backgroundColor="teal"
            borderRadius={5}
            containerViewStyle={{ width: 300, paddingTop: 10 }}
            onPress={() => console.log("Changing profile!")}
            title="Save Changes"
            fontWeight="bold"
          />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    height: 50,
    width: 300,
    color: "black",
    borderBottomWidth: 0.8,
    borderBottomColor: "#dddddd",
    marginBottom: 10,
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
