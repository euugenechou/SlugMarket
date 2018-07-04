import React from 'react';
import { createBottomTabNavigator } from 'react-navigation';

import SignIn from './Signin'
import SignUp from './Signup'

export default class Tabs extends React.Component {
  render () {
    return <BottomTabNavigator />;
  }
}

const BottomTabNavigator = createBottomTabNavigator({
  Signin: { screen: SignIn },
  Signup: { screen: SignUp }
})
