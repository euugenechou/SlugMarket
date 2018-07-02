import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation';

import Explore from './screens/Explore'
import Home from './screens/Home'
import Profile from './screens/Profile'
import Settings from './screens/Settings'
import Icon from 'react-native-vector-icons/Ionicons'


export default createBottomTabNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      tabBarLabel: 'HOME',
      tabBarIcon: ({tintColor})=>(
        <Icon name="ios-home-outline"
              color={tintColor}
              size={24}/>
      )
    }
  },
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
    activeTintColor: 'blue',
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
