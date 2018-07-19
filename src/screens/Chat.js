/* React imports */
import React from "react";
import Expo from "expo";
import {
    AppRegistry,
    StyleSheet,
    View,
    ScrollView,
    Text,
    TouchableHighlight,
    Button,
    Alert
} from "react-native";
import {
    List, 
    ListItem,
} from "react-native-elements";

export default class Chat extends React.Component{
    _onPressButton() {
        Alert.alert('You tapped the button!')
      }

    render() {
        return(
            <ScrollView> 
                <Button
                
                onPress={this._onPressButton}
                title="Press Me"
                />
                    {/* <List>
                        <ListItem
                            title = "This is where chat messages will go"
                        />
                        <ListItem 
                            title ="This is where more messages will go"
                        />
                    </List> */}
            </ScrollView>

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