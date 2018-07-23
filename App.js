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
import { Font } from "expo";
import Entypo from "./node_modules/@expo/vector-icons/fonts/Entypo.ttf";
import Ionicons from "./node_modules/@expo/vector-icons/fonts/Ionicons.ttf";
import { YellowBox } from "react-native";
YellowBox.ignoreWarnings([
  "Encountered an error loading page",
  "Deprecation warning: moment construction falls back to js Date. This is discouraged and will be removed in upcoming major release. Please refer to http://momentjs.com/guides/#/warnings/js-date/ for more info.",
  "Task orphaned for request ",
  "Remote debugger is in a background tab which may cause apps to perform slowly"
]);

Amplify.configure(aws_exports);

export default class App extends React.Component {
  state = {
    fontLoaded: false,
    component: <Splash />
  };

  async componentWillMount() {
    try {
      await Font.loadAsync({
        Entypo,
        Ionicons
      });
      this.setState({ fontLoaded: true });
    } catch (error) {
      console.log(error);
    }
    this.timeoutHandle = setTimeout(() => {
      this.setState({ component: <LoginStack /> });
    }, 900);
  }

  componentWillUnmount() {
    clearTimeout(this.timeoutHandle);
  }

  render() {
    return this.state.component;
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
