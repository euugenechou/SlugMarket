// React imports 
import React from "react";
import {
  TextInput,
  StyleSheet,
  Text,
  View,
  Alert,
  ScrollView
} from "react-native";
import Icon from "react-native-vector-icons/Entypo";
import { Button } from "react-native-elements";
// AWS imports 
import { Auth } from "aws-amplify";
// Local imports
import TopAlert from "../components/TopAlert";

export default class App extends React.Component {
  state = {
    name: "",
    email: "",
    phone_number: "",
    password: "",
    confirmationCode: "",
    visible: false
  };

  static navigationOptions = () => ({
    headerTintColor: "teal",
    headerStyle: {
      height: 40,
      backgroundColor: "white",
      borderBottomWidth: 0
    }
  });

  onChangeText(key, value) {
    this.setState({ [key]: value });
  }

  signUp() {
    Auth.signUp({
      username: this.state.email,
      password: this.state.password,
      attributes: {
        name: this.state.name,
        phone_number: this.state.phone_number
      }
    })
      .then(() =>
        this.props.navigation.navigate("ConfirmScreen", {
          userName: this.state.email
        })
      )
      .catch(() =>
        this.setState({
          visible: true,
          errorMessage: "Username, password, phone number, or email incorrect"
        })
      );
  }

  render() {
    return (
      <ScrollView centerContent={true} contentContainerStyle={styles.container}>
        <TopAlert
          visible = { this.state.visible }
          message = { this.state.errorMessage }
        />
        <Icon
          name = "chevron-small-left"
          size = { 45 }
          color = "teal"
          style = { {paddingVertical: 10} }
          onPress = { () => this.props.navigation.navigate("SignInScreen") }
        />
        <View style = { styles.container }>
          <Text style = { styles.text }> First Name </Text>
          <TextInput
            onChangeText = { value => this.onChangeText("name", value) }
            style = { styles.input }
            placeholder = "e.g.: Sammy"
            placeholderTextColor = "gray"
            autoCapitalize = "none"
            autoCorrect = { false }
          />
          <Text style = { styles.text }> Password </Text>
          <TextInput
            onChangeText = { value => this.onChangeText("password", value) }
            style = { styles.input }
            secureTextEntry = { true }
            placeholder=  "e.g.: Slug6969"
            placeholderTextColor = "gray"
            autoCapitalize = "none"
            autoCorrect = { false }
          />
          <Text style = { styles.text }> Phone Number </Text>
          <TextInput
            onChangeText = { value => this.onChangeText("phone_number", value) }
            style = { styles.input }
            placeholder = "e.g.: +15101234567"
            placeholderTextColor = "gray"
            autoCapitalize = "none"
            autoCorrect = { false }
          />
          <Text style = { styles.text }> UCSC Email </Text>
          <TextInput
            onChangeText = { value => this.onChangeText("email", value) }
            style = { styles.input }
            placeholder = "e.g.: sammyslug@ucsc.edu"
            placeholderTextColor = "gray"
            keyboardType = "email-address"
            autoCapitalize = "none"
            autoCorrect = {false}
          />
          <Button
            raised
            color = "white"
            title = "Sign Up"
            fontWeight = "bold"
            backgroundColor = "teal"
            borderRadius = { 5 }
            containerViewStyle = { styles.buttonContainer }
            onPress = { () => this.signUp() }
          />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    justifyContent: "center",
    alignSelf: "center",
    height: 50,
    color: "black",
    borderBottomWidth: 0.7,
    borderBottomColor: "darkgray",
    marginBottom: 20,
    width: 300
  },
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingVertical: 10
  },
  buttonContainer: {
    width: 300,
    paddingTop: 10,
    alignSelf: "center"
  },
  text: {
    paddingLeft: 36,
    fontSize: 20,
    color: "black",
    fontWeight: "700",
    textAlign: "left",
    paddingTop: 10
  }
});
