/* React imports */
import React from "react";
import {
  TextInput,
  StyleSheet,
  Text,
  View,
  Alert,
  ScrollView
} from "react-native";

/* AWS imports */
import { Auth } from "aws-amplify";
import { Button } from "react-native-elements";

export default class App extends React.Component {
  state = {
    username: "",
    password: "",
    phone_number: "",
    email: "",
    confirmationCode: ""
  };

  static navigationOptions = () => ({
    headerTransparent: true,
    headerStyle: {
      height: 40,
      shadowColor: "transparent"
    }
  });

  onChangeText(key, value) {
    this.setState({ [key]: value });
  }

  signUp() {
    Auth.signUp({
      username: this.state.username,
      password: this.state.password,
      attributes: {
        email: this.state.email,
        phone_number: this.state.phone_number
      }
    })
      .then(() =>
        this.props.navigation.navigate("ConfirmScreen", {
          userName: this.state.username
        })
      )
      .catch(err => console.log(err));
  }

  render() {
    return (
      <ScrollView centerContent={true} contentContainerStyle={styles.container}>
        <View style={styles.container}>
          <TextInput
            onChangeText={value => this.onChangeText("username", value)}
            style={styles.input}
            placeholder="UCSC ID"
            placeholderTextColor="gray"
            autoCapitalize="none"
            autoCorrect={false}
          />
          <TextInput
            onChangeText={value => this.onChangeText("password", value)}
            style={styles.input}
            secureTextEntry={true}
            placeholder="Cruz Blue password"
            placeholderTextColor="gray"
            autoCapitalize="none"
            autoCorrect={false}
          />
          <TextInput
            onChangeText={value => this.onChangeText("phone_number", value)}
            style={styles.input}
            placeholder="phone"
            placeholderTextColor="gray"
            autoCapitalize="none"
            autoCorrect={false}
          />
          <TextInput
            onChangeText={value => this.onChangeText("email", value)}
            style={styles.input}
            placeholder="email"
            placeholderTextColor="gray"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />
          <Button
            raised
            color="white"
            title="Sign Up"
            fontWeight="bold"
            backgroundColor="teal"
            borderRadius={5}
            containerViewStyle={{ width: 300, paddingTop: 10 }}
            onPress={() => this.signUp()}
          />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    height: 50,
    color: "black",
    borderWidth: 1,
    borderRadius: 4,
    borderColor: "white",
    margin: 10,
    width: 300,
    paddingLeft: 10,
    alignContent: "center",
    backgroundColor: "white"
  },
  container: {
    flex: 1,
    backgroundColor: "#B0DFE5",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10
  }
});
