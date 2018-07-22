/* React imports */
import React, { Component } from "react";
import {
  Alert,
  Platform,
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  header
} from "react-native";
import { Button } from "react-native-elements";
import LoginStack from "./login/LoginStack";
import SettingsList from "react-native-settings-list";
import { API, Auth } from "aws-amplify";
import UserListings from "./components/Profile/UserListings";

export default class Settings extends Component {
  static navigationOptions = () => ({
    headerTintColor: "teal",
    headerStyle: {
      height: 10,
      backgroundColor: "white",
      shadowColor: "transparent",
      borderBottomWidth: 0
    }
  });

  constructor(props) {
    super(props);
    this.onValueChange = this.onValueChange.bind(this);
    this.state = { switchValue: false };
    this.state = {
      activeIndex: 0,
      postsToRender: [],
      userName: "",
      userAttributes: {},
      refreshing: false,
      switchValue: false
    };
  }

  getUserInfo() {
    Auth.currentUserInfo()
      .then(res => {
        this.setState({ userAttributes: res.attributes });
        this.setState({ userName: res.username });
        console.log(res);
      })
      .catch(err => console.log(err));
  }

  componentWillMount() {
    this.startHeaderHeight = 60;
    this.getUserInfo();
    console.log(this.state.postsToRender);
  }

  onValueChange(value) {
    this.setState({ switchValue: value });
	}
	
	handleLogOut() {
		Auth.signOut()
			.then(() => {
				this.props.navigation.popToTop()
			})
			.catch(error => {
				console.log(error);
				Alert.alert("Logout error occured. Please try again")
			})
	}

  render() {
    return (
      <View
        style={{ backgroundColor: "white", flex: 1, paddingHorizontal: 10 }}
      >
        <View style={{ flex: 1, marginTop: 25 }}>
          <SettingsList borderColor="white" defaultItemSize={70}>
            <SettingsList.Header
              headerText="Settings"
              headerStyle={{
                color: "black",
                fontWeight: "700",
                fontSize: 36,
                paddingLeft: 10
              }}
            />
            <SettingsList.Item
              title="View/Edit Profile"
              titleStyle={styles.item}
              hasNavArrow={true}
              arrowStyle={{ tintColor: "teal" }}
              onPress={() => this.props.navigation.navigate("TermsScreen")}
            />
            <SettingsList.Item
              title="Terms of Service"
              titleStyle={styles.item}
              hasNavArrow={true}
              arrowStyle={{ tintColor: "teal" }}
              onPress={() => this.props.navigation.navigate("TermsScreen")}
            />
            <SettingsList.Item
              title="Slug Market v0.1.0"
              titleStyle={styles.item}
              hasNavArrow={false}
            />
          </SettingsList>
          <View>
            <Button
              raised
              color="white"
              title="Sign Out"
              fontWeight="bold"
              backgroundColor="teal"
              borderRadius={5}
              containerViewStyle={{
                width: 300,
                alignSelf: "center",
                paddingBottom: 30
              }}
              onPress={() => this.handleLogOut()}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  bottomView: {
    flex: 1,
    width: "100%",
    height: 50,
    backgroundColor: "#FF9800",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 0
  },
  settings: {
    flex: 1,
    fontSize: 30,
    justifyContent: "flex-start"
  },
  row: {
    flexDirection: "column",
    justifyContent: "center",
    padding: 10,
    backgroundColor: "#f6f6f6",
    marginBottom: 8
  },
  text: {
    flex: 1
  },
  item: {
    fontSize: 18
  }
});
