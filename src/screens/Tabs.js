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
  "SIGN IN": { screen: SignIn },
  "SIGN UP": { screen: SignUp }
},
{    
    tabBarOptions: {
      activeTintColor: 'teal',
      inactiveTintColor: 'grey',
      style: {
        backgroundColor: 'white',
        borderTopWidth: 0,
        shadowOffset: { width: 5, height: 3 },
        shadowColor: 'black',
        shadowOpacity: 0.5,
        elevation: 5
      }
    }
})
