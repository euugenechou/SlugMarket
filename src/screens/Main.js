/* React imports */
import React from "react";
import {
  createBottomTabNavigator,
  createStackNavigator
} from "react-navigation";
import Icon from "react-native-vector-icons/Ionicons";

/* Local imports */
import Explore from "./Explore";
import AddItem from "./AddItem";
import ListingInfo from "./components/Explore/ListingInfo";

import Profile from "./Profile";
import EditProfile from "./EditProfile";
import UserListings from "./components/Profile/UserListings";
import UserListingInfo from "./components/Profile/UserListingInfo";

import Settings from "./Settings";
import SignIn from "./login/SignIn";

export default class Main extends React.Component {
  render() {
    return <BottomTabNavigator />;
  }
}

const ExploreStack = createStackNavigator(
  {
    MainExplore: { screen: Explore },
    AddItem: { screen: AddItem },
    ListingInfo: { screen: ListingInfo }
  },
  { headerMode: 'none' }
);

const ProfileStack = createStackNavigator(
  {
    MainProfile: { screen: Profile },
    EditProfile: { screen: EditProfile },
    UserListingScreen: { screen: UserListings},
    UserListingInfoScreen: { screen: UserListingInfo}
  },
  { headerMode: "none" }
);

const SettingsStack = createStackNavigator(
  {
    MainSettings: { screen: Settings },
    SignInScreen: { screen: SignIn }
  },
  { headerMode: "none" }
);

const BottomTabNavigator = createBottomTabNavigator(
  {
    Explore: {
      screen: ExploreStack,
      navigationOptions: {
        tabBarLabel: "EXPLORE",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="ios-search-outline" color={tintColor} size={24} />
        )
      }
    },
    Profile: {
      screen: ProfileStack,
      navigationOptions: {
        tabBarLabel: "PROFILE",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="ios-person-outline" color={tintColor} size={24} />
        )
      }
    },
    Settings: {
      screen: SettingsStack,
      navigationOptions: {
        tabBarLabel: "SETTINGS",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="ios-settings-outline" color={tintColor} size={24} />
        )
      }
    }
  },
  {
    tabBarPosition: "bottom",
    swipeEnabled: "true",
    tabBarOptions: {
      activeTintColor: "teal",
      inactiveTintColor: "grey",
      style: {
        backgroundColor: "white",
        borderTopWidth: 0,
        shadowOffset: { width: 5, height: 3 },
        shadowColor: "black",
        shadowOpacity: 0.5,
        elevation: 5
      }
    }
  }
);
