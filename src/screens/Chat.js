/* React imports */
import React from "react";
import Expo from "expo";
import {
  TextInput,
  StyleSheet,
  View,
  Button,
  ScrollView,
  Alert,
  Picker,
  Text
} from "react-native";

export default class Chat extends React.Component{
    render() {
        return(
            <View style = {{paddingTop: 30, justifyContent: 'center'}}> 
                <Text> This is where chat messages will go </Text>
            </View>
        )
    }
}