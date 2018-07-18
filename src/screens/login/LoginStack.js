/* React imports */
import React from "react";
import { createStackNavigator } from "react-navigation";

/* Local imports */
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import Confirm from "./Confirm";

export default class Login extends React.Component {
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
    SignUpScreen: SignUp,
    ConfirmScreen: Confirm
  },
  {
    initialRouteName: "SignInScreen",
  }
);
