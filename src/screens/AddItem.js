// React imports
import React from "react";
import {
  Text,
  TextInput,
  StyleSheet,
  Picker,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback
} from "react-native";
import { Button } from "react-native-elements";
// AWS imports 
import { API, Auth } from "aws-amplify";

export default class AddItem extends React.Component {
  static navigationOptions = ({ navigation }) => ({
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
      timeAdded: "",
      category: "Furniture",
      description: "",
      email: "",
      isRemoved: false,
      isSold: false,
      phoneNumber: "",
      price: 0,
      seller: ""
    };
  }

  onChangeText(key, value) {
    this.setState({
      [key]: value
    });
  }

  // Creates post object to save in itemPostings schema
  createPostObject(userInfo) {
    this.setState({
      userId: userInfo.id,
      timeAdded: new Date().toString(),
      email: userInfo.attributes.email,
      phoneNumber: userInfo.attributes.phone_number,
      seller: userInfo.attributes.name
    })
    return {body: this.state};
  }

  /* Save a new item post to postedItems schema.
   * Primary key: userId and timeAdded */
  async saveItemPost() {
    const { goBack } = this.props.navigation;
    const userInfo = await Auth.currentUserInfo().catch(error => {
      console.log(error);
      return;
    });
    const apiName = "itemPostingsCRUD";
    const path = "/itemPostings";
    const post = this.createPostObject(userInfo);
    console.log(apiName, path, post);
    API.post(apiName, path, post)
      .then(res => {
        console.log(res);
        this.props.navigation.navigate("MainProfile",{
          reload: true
        })
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress = { Keyboard.dismiss } accessible = { false }>
        <KeyboardAvoidingView style = { styles.container } behavior="padding" enabled>
          <Text style = { styles.text }> Item Name </Text>
          <TextInput
            onChangeText = { value => this.onChangeText("itemName", value) }
            style = { styles.input }
            autoCapitalize = "none"
            autoCorrect = { false }
          />
          <Text style = { styles.text }> Item Price (USD) </Text>
          <TextInput
            onChangeText = { value => this.onChangeText("price", value) }
            keyboardType = "number-pad"
            style = { styles.input }
            autoCapitalize = "none"
            autoCorrect = { false }
          />
          <Text style = { styles.categoryText }> Item Category </Text>
          <Picker
            selectedValue = { this.state.category }
            style = {{ width: 120, alignSelf: "center" }}
            itemStyle = {{ height: 110, fontSize: 18 }}
            onValueChange = {( itemValue, itemIndex ) =>
              this.setState({ category: itemValue })
            }
          >
            <Picker.Item label = "Furniture" value = "Furniture" />
            <Picker.Item label = "Textbook" value = "Textbooks" />
            <Picker.Item label = "Electronic" value = "Electronics" />
          </Picker>
          <Text style = { styles.text }> Item Description </Text>
          <TextInput
            onChangeText = { value => this.onChangeText("description", value) }
            style = { styles.input }
            autoCapitalize = "none"
            autoCorrect = { true }
          />
          <Button
            raised
            color = "white"
            title = "Add Item"
            fontWeight = "bold"
            onPress = { () => this.saveItemPost() }
            backgroundColor = "teal"
            borderRadius = { 5 }
            containerViewStyle = { styles.buttonContainer }
          />
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    justifyContent: "center",
    alignSelf: "center",
    height: 40,
    color: "black",
    borderBottomWidth: 0.7,
    borderBottomColor: "darkgray",
    marginBottom: 20,
    width: 300
  },
  categoryText: {
    paddingLeft: 32,
    fontSize: 20,
    color: "black",
    fontWeight: "700",
    textAlign: "left",
    paddingVertical: 10
  },
  box: {
    height: 100,
    width: 300,
    borderColor: "gray",
    borderWidth: 3
  },
  container: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: "white",
  },
  text: {
    paddingLeft: 32,
    fontSize: 20,
    color: "black",
    fontWeight: "700",
    textAlign: "left",
    paddingTop: 10
  },
  buttonContainer: {
    width: 300,
    alignSelf: "center",
    paddingTop: 10
  }
});
