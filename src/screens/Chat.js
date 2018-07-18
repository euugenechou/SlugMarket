/* React imports */
import React from "react";
import Expo from "expo";
import {
  StyleSheet,
  View,
  ScrollView,
  Text
} from "react-native";

export default class Chat extends React.Component{
    render() {
        return(
            <View style = {file.header}> 
                <Text style = {file.titleText}> This is where chat messages will go </Text>
            </View> 
        )
    }
}

const file = StyleSheet.create({
    titleText: {
        fontSize: 24,
        fontWeight: 'bold',
        justifyContent: 'center'
    },
    header: {
        flexDirection: 'row', 
        paddingTop: 30, 
        justifyContent: 'center'
    }
})