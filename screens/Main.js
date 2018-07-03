import React from 'react';
import { createBottomTabNavigator } from 'react-navigation';

import Explore from "./Explore";
import Profile from "./Profile";
import Settings from "./Settings";
import Icon from "react-native-vector-icons/Ionicons";

export default class Main extends React.Component {
  render () {
    return <BottomTabNavigator />;
  }
}

const BottomTabNavigator = createBottomTabNavigator({
  Explore: {
    screen: Explore,
    navigationOptions: {
      tabBarLabel: 'EXPLORE',
      tabBarIcon: ({ tintColor }) => (
        <Icon name="ios-search-outline"
          color={tintColor}
          size={24} />
      )
    }
  },
  Profile: {
    screen: Profile,
    navigationOptions: {
      tabBarLabel: 'PROFILE',
      tabBarIcon: ({ tintColor }) => (
        <Icon name="ios-person-outline"
          color={tintColor}
          size={24} />
      )
    }
  },
  Settings: {
    screen: Settings,
    navigationOptions: {
      tabBarLabel: 'SETTINGS',
      tabBarIcon: ({ tintColor }) => (
        <Icon name="ios-settings-outline"
          color={tintColor}
          size={24} />
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
        shadowOffset: { width: 5, height: 3 },
        shadowColor: 'black',
        shadowOpacity: 0.5,
        elevation: 5
      }
    }
});
