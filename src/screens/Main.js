// React imports
import React from "react";
import {
  createBottomTabNavigator,
  createStackNavigator
} from "react-navigation";
// Import for Icon
import Icon from "react-native-vector-icons/Ionicons";
// Imports for Explore
import Explore from "./Explore";
import ItemCategory from "./components/Explore/ItemCategory";
import ListingInfo from "./components/Explore/ListingInfo";
import SellerDetails from "./components/Explore/SellerDetails";
import SellerListingInfo from "./components/Explore/SellerListingInfo";
// Imports for Profile
import Profile from "./Profile";
import AddItem from "./AddItem";
import UserListings from "./components/Profile/UserListings";
import UserListingInfo from "./components/Profile/UserListingInfo";
import SoldListingInfo from "./components/Profile/SoldListingInfo";
// Imports for Settings
import Settings from "./Settings";
import SignIn from "./login/SignIn";
import Terms from "./Terms";

export default class Main extends React.Component {
  render() {
    return <BottomTabNavigator />;
  }
}

const ExploreStack = createStackNavigator({
  MainExplore: { screen: Explore },
  ListingInfo: { screen: ListingInfo },
  ViewCategory: { screen: ItemCategory },
  SellerDetails: { screen: SellerDetails },
  SellerListingInfo: { screen: SellerListingInfo }
});

const ProfileStack = createStackNavigator({
  MainProfile: { screen: Profile },
  AddItem: { screen: AddItem },
  UserListingScreen: { screen: UserListings },
  UserListingInfoScreen: { screen: UserListingInfo },
  SoldListingInfoScreen: { screen: SoldListingInfo }
});

const SettingsStack = createStackNavigator({
  MainSettings: { screen: Settings },
  SignInScreen: { screen: SignIn },
  TermsScreen: { screen: Terms }
});

export const BottomTabNavigator = createBottomTabNavigator(
  {
    Explore: {
      screen: ExploreStack,
      navigationOptions: {
        gesturesEnabled: false,
        tabBarLabel: "EXPLORE",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="ios-search-outline" color={tintColor} size={24} />
        )
      }
    },
    Profile: {
      screen: ProfileStack,
      navigationOptions: {
        gesturesEnabled: false,
        tabBarLabel: "PROFILE",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="ios-person-outline" color={tintColor} size={24} />
        )
      }
    },
    Settings: {
      screen: SettingsStack,
      navigationOptions: {
        gesturesEnabled: false,
        tabBarLabel: "SETTINGS",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="ios-settings-outline" color={tintColor} size={24} />
        )
      }
    }
  },
  {
    tabBarPosition: "bottom",
    swipeEnabled: "false",
    tabBarOptions: {
      activeTintColor: "teal",
      inactiveTintColor: "grey",
      style: {
        backgroundColor: "white",
        borderTopWidth: 0.5,
        borderTopColor: "#dddddd",
        shadowOffset: { width: 5, height: 3 },
        shadowColor: "black",
        shadowOpacity: 0.5,
        elevation: 5,
        paddingTop: 5,
        paddingBottom: 5
      }
    }
  }
);
