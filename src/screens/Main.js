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
import ItemCategory from "./components/Explore/ItemCategory";
import ListingInfo from "./components/Explore/ListingInfo";

import Profile from "./Profile";
import EditProfile from "./EditProfile";
import UserListings from "./components/Profile/UserListings";
import UserListingInfo from "./components/Profile/UserListingInfo";

import Settings from "./Settings";
import SignIn from "./login/SignIn";
import Chat from "./Chat";

export default class Main extends React.Component {
  render() {
    return <BottomTabNavigator />;
  }
}

const ExploreStack = createStackNavigator(
  {
    MainExplore: {
      screen: Explore,
      headerVisible: false
    },
    AddItem: { screen: AddItem },
    ListingInfo: { screen: ListingInfo },
    ViewCategory: { screen: ItemCategory }
  },
  // { headerMode: 'none' }
);

const ProfileStack = createStackNavigator(
  {
    MainProfile: { 
      screen: Profile,
    },
    EditProfile: { screen: EditProfile },
    UserListingScreen: { screen: UserListings},
    UserListingInfoScreen: { screen: UserListingInfo}
  },
  // { headerMode: "none" }
);

const SettingsStack = createStackNavigator(
  {
    MainSettings: { screen: Settings },
    SignInScreen: { screen: SignIn }
  },
  // { headerMode: "none" }
);

const ChatStack = createStackNavigator(
  {
    MainChat: { screen: Chat},
  },
  {
      headerMode: "none",
  }
)

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
    Chat: {
      screen: ChatStack,
      navigationOptions: {
        tabBarLabel: "MESSAGES",
        tabBarIcon: ({tintColor}) => (
          <Icon name = "ios-chatbubbles-outline" color ={tintColor} size = {24}/>
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
        elevation: 5,
        paddingTop: 5,
        paddingBottom: 5
      }
    }
  }
);
