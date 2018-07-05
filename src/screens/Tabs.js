import React from "react";
import { createStackNavigator } from "react-navigation";

import SignIn from "./SignIn";
import SignUp from "./SignUp";

export default class Tabs extends React.Component {
  render() {
    return (
      <LoginStack
        screenProps={{
          authenticate: this.props.screenProps.authenticate
        }}
      />
    );
  }
}

const LoginStack = createStackNavigator(
  {
    SignInScreen: SignIn,
    SignUpScreen: SignUp
  },
  {
    initialRouteName: "SignInScreen"
  }
);
