/* React imports */
import React from "react";
import Expo from "expo";
import {
  TextInput,
  StyleSheet,
  View,
  Button,
  ScrollView,
  Alert,
  Picker
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
   * Open image picker for creating a new post
   */
  async getPostImage() {
    let result = await Expo.ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      mediaTypes: "Images"
    });
    return result;
  }

  /**
   * Creates post object to save in itemPostings schema
   */
  createPostObject(cognitoUserId) {
    const post = {"body": this.state};
    post.body.userId = cognitoUserId;
    post.body.timeAdded = new Date().toString();
    return post;
  }

  /**
   * Saves image(s) associated with a user post to S3 bucket
   */
  saveImageToS3(cognitoUserId, imageUriArray, timeAdded) {
    imageUriArray.forEach((imageUri) => {
      Storage.put(imageUri, { 
        level: "protected",
        identityId: cognitoUserId
      })
      .then()
      .catch(error => console.log(error));
    })
  }

  /**
   * Save a new item post to postedItems schema.
   * Primary key: userId and timeAdded
   */
  async saveItemPost() {
    const userInfo = await Auth.currentUserInfo().catch(error => {
      Alert.alert(JSON.stringify(error));
      return;
    });
    const apiName = "itemPostingsCRUD";
    const path = "/itemPostings";
    const post = this.createPostObject(userInfo.id);
    API.post(apiName, path, post)
      .then(res => this.props.navigation.navigate("MainExplore", {
        reload: true
      }))
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
          <Picker
            selectedValue={this.state.category}
            style={{ height: 50, width: 100, flex: 1 }}
            onValueChange={(itemValue, itemIndex) => this.setState({ category: itemValue })}>
            <Picker.Item label="Furniture" value="furniture" />
            <Picker.Item label="Textbook" value="textbook" />
            <Picker.Item label="Electronic" value="electronic" />
          </Picker>
          <TextInput
            onChangeText={value => this.onChangeText("description", value)}
            style={styles.input}
            placeholder="description"
            placeholderTextColor="gray"
            autoCapitalize="none"
            autoCorrect={true}
          />
          <TextInput
            onChangeText={value => this.onChangeText("seller", value)}
            style={styles.input}
            placeholder="seller name"
            placeholderTextColor="gray"
            autoCapitalize="words"
            autoCorrect={false}
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
