/* React imports */
import React from "react";
import {
  TextInput,
  Button,
  StyleSheet,
  View,
  Alert,
  Text,
  ScrollView,
  Image
} from "react-native";
import TopAlert from "../components/TopAlert";

/* AWS imports */
import { Auth } from "aws-amplify";

export default class App extends React.Component {
  state = {
    username: "",
    password: "",
    confirmationCode: "",
    user: {},
    hasLoginError: false,
    loginErrorMessage: ""
  };

  onChangeText(key, value) {
    this.setState({
      [key]: value
    });
  }

  signIn() {
    const { username, password } = this.state;
    Auth.signIn(username, password)
      .then(() => {
        user => this.setState({ user });
        this.props.screenProps.authenticate(true);
      })
      .catch(err =>
        this.setState({ hasloginError: true, loginErrorMessage: err })
      );
  }

  render() {
    return (
      <View style={{ flexGrow: 1 }}>
        <TopAlert
          visible={this.state.hasLoginError}
          message={this.state.loginErrorMessage}
        />
        <ScrollView
          contentContainerStyle={styles.container}
          centerContent={true}
        >
          {/* <Image
          source={require("../../assets/Slug.png")}
          /> */}
          <Text style={styles.titleText}>SlugMarket</Text>
          <TextInput
            onChangeText={value => this.onChangeText("username", value)}
            style={styles.input}
            placeholder="username"
            placeholderTextColor="gray"
            autoCapitalize="none"
            autoCorrect={false}
          />
          <TextInput
            onChangeText={value => this.onChangeText("password", value)}
            style={styles.input}
            secureTextEntry={true}
            placeholder="password"
            placeholderTextColor="gray"
            autoCapitalize="none"
            autoCorrect={false}
          />
          <Button
            color="teal"
            title="Sign In"
            onPress={this.signIn.bind(this)}
          />
          <Button
            color="teal"
            title="Sign Up"
            onPress={() => this.props.navigation.navigate("SignUpScreen")}
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
