/* React Imports */
import React from "react";
import { createStackNavigator } from "react-navigation";
/* AWS Imports */
import Amplify from "aws-amplify";
import aws_exports from "./aws-exports";
/* Local imports */
import Splash from "./src/screens/Splash";
import SignIn from "./src/screens/login/SignIn";
import SignUp from "./src/screens/login/SignUp";
import Confirm from "./src/screens/login/Confirm";
import { BottomTabNavigator } from "./src/screens/Main";

Amplify.configure(aws_exports);

export default class App extends React.Component {
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
