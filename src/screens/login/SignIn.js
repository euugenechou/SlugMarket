/* React imports */
import React from "react";
import {
  TextInput,
  StyleSheet,
  View,
  Text,
  ScrollView
} from "react-native";
import TopAlert from "../components/TopAlert";

/* AWS imports */
import { Auth } from "aws-amplify";
import Expo, { Font } from 'expo';
import { Button } from 'react-native-elements'

export default class App extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    header: null
  });

  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      confirmationCode: "",
      user: {},
      visible: false,
      errorMessage: ""
    };
  }

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
      .catch(() =>
        this.setState({
          visible: true,
          errorMessage: "Username or password incorrect"
        })
      );
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <TopAlert
          visible={this.state.visible}
          message={this.state.errorMessage}
        />
        <ScrollView
          contentContainerStyle={styles.container}
          centerContent={true}
        >
          <Text style={styles.titleText}>SLUGMARKET</Text>
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
            raised
            color='white'
            title="Sign In"
            fontWeight="bold"
            onPress={() => this.signIn()}
            backgroundColor="teal"
            borderRadius={5}
            containerViewStyle={{width: 300, paddingVertical: 20}}
            />
          <Button
            raised
            color="white"
            title="Sign Up"
            fontWeight="bold"
            backgroundColor="teal"
            borderRadius={5}
            containerViewStyle={{width: 300}}
            onPress={() => {
              this.setState({ visible: false });
              this.props.navigation.navigate("SignUpScreen");
            }}
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
    borderWidth: 1,
    borderRadius: 4,
    borderColor: "white",
    margin: 10,
    width: 300,
    paddingLeft: 10,
    backgroundColor: "white"
  },
  container: {
    flex: 1,
    paddingVertical: 150,
    backgroundColor: "#B0DFE5",
    alignItems: "center",
  },
  titleText: {
    fontSize: 36,
    fontWeight: "800",
    padding: 20,
    color: "white",
    textShadowColor: "#dddddd",
    textShadowRadius: 15
  }
});
