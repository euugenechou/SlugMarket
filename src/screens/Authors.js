/* React imports */
import React from 'react';
import Expo from "expo";
import {
  StyleSheet,
  View,
  Text,
} from "react-native";

export default class Authors extends React.Component{
    static navigationOptions = ({ navigation }) => ({
		header: null
	})
    constructor(props) {
        super(props);
      }
    render (){
        return (
            <View>
                <Text> This is where the Authors will go </Text>
            </View>
        )
    }
}