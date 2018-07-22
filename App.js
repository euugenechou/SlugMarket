import React from 'react';
import { createStackNavigator } from "react-navigation";
/* Screen imports */
import Splash from './src/screens/Splash';
// import LoginStack from "./src/screens/login/Login"

/* AWS Imports */
import Amplify from 'aws-amplify';
/* Local imports */
import SignIn from "./src/screens/login/SignIn";
import SignUp from "./src/screens/login/SignUp";
import Confirm from "./src/screens/login/Confirm";
import {BottomTabNavigator} from "./src/screens/Main";
import aws_exports from './src/aws-exports';

Amplify.configure(aws_exports);

export default class App extends React.Component {
    render () {
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
      activeBackgroundColor: "#B0DFE5",
      headerMode: "none"
    }
  );
  