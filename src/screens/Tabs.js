import React from 'react';
import { createBottomTabNavigator } from 'react-navigation';

import SignIn from './SignIn'
import SignUp from './SignUp'

export default class Tabs extends React.Component {
  render () {
    return (<BottomTabNavigator
            screenProps={{
              authenticate: this.props.screenProps.authenticate
            }}/>);
  }
}

const BottomTabNavigator = createBottomTabNavigator({
  "SIGN IN": { screen: SignIn },
  "SIGN UP": { screen: SignUp }
},
{   
    tabBarPosition: 'bottom',
    swipeEnabled: 'true',
    tabBarOptions: {
      activeTintColor: 'teal',
      inactiveTintColor: 'grey',
      swipeEnabled: 'true',
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
