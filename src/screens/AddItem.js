/* React imports */
import React from "react";
import Expo from "expo";
import {
  Text,
  TextInput,
  StyleSheet,
  View,
  ScrollView,
  Alert,
  Picker
} from "react-native";
import { API, Auth, Storage } from "aws-amplify";

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
    const post = { body: this.state };
    post.body.userId = cognitoUserId;
    post.body.timeAdded = new Date().toString();
    return post;
  }

  /**
   * Saves image(s) associated with a user post to S3 bucket
   */
  saveImageToS3(cognitoUserId, imageUriArray, timeAdded) {
    imageUriArray.forEach(imageUri => {
      Storage.put(imageUri, {
        level: "protected",
        identityId: cognitoUserId
      })
        .then()
        .catch(error => console.log(error));
    });
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
      .then(res =>
        this.props.navigation.navigate("MainExplore", {
          reload: true
        })
      )
      .catch(err => console.log(err));
  }

  render() {
    return (
        <View style={styles.container}>
          <Text style={styles.text}>Item Name</Text>
          <TextInput
            onChangeText={value => this.onChangeText("itemName", value)}
            style={styles.input}
            autoCapitalize="none"
            autoCorrect={false}
          />
          <Text style={styles.text}>Item Price (USD) </Text>
          <TextInput
            onChangeText={value => this.onChangeText("price", value)}
            style={styles.input}
            autoCapitalize="none"
            autoCorrect={false}
          />
          <Text
            style={{
              paddingLeft: 36,
              fontSize: 16,
              color: "black",
              fontWeight: "700",
              textAlign: "left",
              paddingBottom: 10
            }}
          >
            Item Category
          </Text>
          <Picker
            selectedValue={this.state.category}
            style={{ width: 120, alignSelf: "center" }}
            itemStyle={{ height: 120, fontSize: 18 }}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({ category: itemValue })
            }
          >
            <Picker.Item label="Furniture" value="furniture" />
            <Picker.Item label="Textbook" value="textbook" />
            <Picker.Item label="Electronic" value="electronic" />
          </Picker>
          <Text style={styles.text}>Item Description</Text>
          <TextInput
            onChangeText={value => this.onChangeText("description", value)}
            style={styles.input}
            autoCapitalize="none"
            autoCorrect={true}
          />
          <Text style={styles.text}>Seller Name</Text>
          <TextInput
            onChangeText={value => this.onChangeText("seller", value)}
            style={styles.input}
            autoCapitalize="words"
            autoCorrect={false}
          />
          <Button
            raised
            color="white"
            title="Add Item"
            fontWeight="bold"
            onPress={() => this.saveItemPost()}
            backgroundColor="teal"
            borderRadius={5}
            containerViewStyle={{
              width: 300,
              alignSelf: "center",
              paddingTop: 10
            }}
          />
        </View>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    justifyContent: "center",
    alignSelf: "center",
    height: 30,
    color: "black",
    borderBottomWidth: 0.5,
    borderBottomColor: "#dddddd",
    marginBottom: 20,
    width: 300
  },
  box: {
    height: 100,
    width: 300,
    borderColor: "gray",
    borderWidth: 3
  },
  container: {
    flexGrow: 1,
    backgroundColor: "white",
  },
  text: {
    paddingLeft: 36,
    fontSize: 16,
    color: "black",
    fontWeight: "700",
    textAlign: "left",
    paddingTop: 10
  }
});
