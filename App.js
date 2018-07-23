// React Imports
import React from "react";
import { createStackNavigator } from "react-navigation";
// AWS Imports
import Amplify from "aws-amplify";
import aws_exports from "./aws-exports";
// Local Imports
import Splash from "./src/screens/Splash";
import SignIn from "./src/screens/login/SignIn";
import SignUp from "./src/screens/login/SignUp";
import Confirm from "./src/screens/login/Confirm";
import { BottomTabNavigator } from "./src/screens/Main";
// Icon Imports
import { Font } from 'expo';
import Entypo from "./node_modules/@expo/vector-icons/fonts/Entypo.ttf";
import Ionicons from "./node_modules/@expo/vector-icons/fonts/Ionicons.ttf";

Amplify.configure(aws_exports);

export default class App extends React.Component {
  async componentWillMount() {
    try {
      await Font.loadAsync({
        Entypo,
        Ionicons
      });

      this.setState({ fontLoaded: true });
    } catch (error) {
      console.log("error loading icon fonts", error);
    }
  }

  render() {
    return <LoginStack />;
  }
}

const LoginStack = createStackNavigator(
  {
    SignInScreen: SignIn,
    SignUpScreen: SignUp,
    ConfirmScreen: Confirm,
    MainScreen: BottomTabNavigator
  },
  {
    initialRouteName: "SignInScreen",
    activeBackgroundColor: "white",
    headerMode: "none",
    navigationOptions: {
      gesturesEnabled: false
    }
  }
);
