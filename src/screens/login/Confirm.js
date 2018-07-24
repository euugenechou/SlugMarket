// React imports 
import React from "react";
import {
  Text,
  TextInput,
  StyleSheet,
  View,
  Keyboard,
  TouchableWithoutFeedback
} from "react-native";
import Icon from "react-native-vector-icons/Entypo";
import { Button } from "react-native-elements";
// AWS imports 
import { Auth } from "aws-amplify";
// Local imports
import TopAlert from "../components/TopAlert";

export default class App extends React.Component {
  state = {
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
    this.setState({
      [key]: value
    });
  }

  confirmSignUp() {
    Auth.confirmSignUp(
      this.props.navigation.getParam("userName"),
      this.state.confirmationCode
    )
      .then(() => this.props.navigation.navigate("SignInScreen"))
      .catch(() =>
        this.setState({
          visible: true,
          errorMessage: "Confirmation code incorrect"
        })
      );
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress = { Keyboard.dismiss } accessible = { false }>
        <View style = { styles.container }>
          <TopAlert
            visible = { this.state.visible }
            message = { this.state.errorMessage }
          />
          <Icon
            name = "chevron-small-left"
            size = { 45 }
            color = "teal"
            style = { {paddingVertical: 30} }
            onPress = { () => this.props.navigation.navigate("SignUpScreen") }
          />
          <View style = { styles.innerContainer }>
            <Text style = { styles.text }> Confirmation Code </Text>
            <TextInput
              onChangeText = { value => this.onChangeText("confirmationCode", value) }
              style = { styles.input }
              keyboardType = "number-pad"
              placeholder = "e.g.: 123456"
              placeholderTextColor = "gray"
              autoCapitalize = "none"
              autoCorrect = {false}
            />
            <Button
              raised
              color = "white"
              title = "Confirm Sign Up"
              fontWeight = "bold"
              backgroundColor = "teal"
              borderRadius = { 5 }
              containerViewStyle = { styles.buttonContainer }
              onPress={ () => this.confirmSignUp() }
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    alignContent: "center",
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
    backgroundColor: "white"
  },
  innerContainer: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    paddingBottom: 90,
  },
  buttonContainer: {
    width: 300,
    paddingTop: 10,
    alignSelf: "center"
  },
  text: {
    paddingLeft: 32,
    fontSize: 20,
    color: "black",
    fontWeight: "700",
    textAlign: "left"
  }
});
