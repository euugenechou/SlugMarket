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
      errorMessage: "",
      isAuthenticated: false
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
        this.props.navigation.push("MainScreen");
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
          <Text style={styles.titleText}>SlugMarket</Text>
          <TextInput
            onChangeText={value => this.onChangeText("username", value)}
            style={styles.input}
            placeholder="UCSC email"
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
    paddingVertical: 150,
    backgroundColor: "white",
    alignItems: "center",
  },
  titleText: {
    fontSize: 36,
    fontWeight: "700",
    padding: 30,
    color: "black",
    textShadowColor: "#dddddd",
    textShadowRadius: 15,
  }
});
