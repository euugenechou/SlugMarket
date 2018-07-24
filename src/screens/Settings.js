// React imports
import React, { Component } from "react";
import {
  Alert,
  View,
  StyleSheet,
} from "react-native";
import { Button } from "react-native-elements";
import SettingsList from "react-native-settings-list";
// AWS imports 
import { API, Auth } from "aws-amplify";

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
      })
      .catch(() => Alert.alert("error getting user info"));
  }

  componentWillMount() {
    this.startHeaderHeight = 60;
    this.getUserInfo();
  }

  onValueChange(value) {
    this.setState({ switchValue: value });
	}
	
	handleLogOut() {
		Auth.signOut()
			.then(() => {
				this.props.navigation.popToTop()
			})
			.catch(() => Alert.alert("Logout error occured. Please try again"))
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
              headerStyle={styles.header}
            />
            <SettingsList.Item
              title="Terms of Service"
              titleStyle={styles.item}
              hasNavArrow={true}
              arrowStyle={{ tintColor: "teal" }}
              onPress={() => this.props.navigation.navigate("TermsScreen")}
            />
            <SettingsList.Item
              title="SlugMarket v0.1.0"
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
              backgroundColor="red"
              borderRadius={5}
              containerViewStyle={styles.buttonContainer}
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
  },
  buttonContainer:{
    width: 300,
    alignSelf: "center",
    paddingBottom: 40
  },
  header: {
    color: "black",
    fontWeight: "700",
    fontSize: 36,
    paddingLeft: 10
  },
});
