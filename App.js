import React from 'react';
import { createBottomTabNavigator } from 'react-navigation';

import Explore from './screens/Explore'
import Profile from './screens/Profile'
import Settings from './screens/Settings'
import Icon from 'react-native-vector-icons/Ionicons'

import Amplify from 'aws-amplify';
import aws_exports from './src/aws-exports';

Amplify.configure(aws_exports);

export default createBottomTabNavigator({
  Explore: {
    screen: Explore,
    navigationOptions: {
      tabBarLabel: 'EXPLORE',
      tabBarIcon: ({tintColor})=>(
        <Icon name="ios-search-outline"
              color={tintColor}
              size={24}/>
      )
    }
  },
  Profile: {
    screen: Profile,
    navigationOptions: {
      tabBarLabel: 'PROFILE',
      tabBarIcon: ({tintColor})=>(
        <Icon name="ios-person-outline"
              color={tintColor}
              size={24}/>
      )
    }
  },
  Settings: {
    screen: Settings,
    navigationOptions: {
      tabBarLabel: 'SETTINGS',
      tabBarIcon: ({tintColor})=>(
        <Icon name="ios-settings-outline"
              color={tintColor}
              size={24}/>
      )
    }
  }
},
{
  tabBarOptions: {
    activeTintColor: 'teal',
    inactiveTintColor: 'grey',
    style: {
      backgroundColor: 'white',
      borderTopWidth: 0,
      shadowOffset: {width:5, height:3},
      shadowColor: 'black',
      shadowOpacity: 0.5,
      elevation: 5
    }
  }
})
