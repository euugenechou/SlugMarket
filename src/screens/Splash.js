import React, {Component} from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';
import LoginTwo from './LoginTwo';

export default class Splash extends Component {
    constructor (props){
        super(props);
        this.state = {
            timePassed: false
        };
        setTimeout(() => this.setState({timePassed: true}), 900);
    }
    
    render () {
        if (!this.state.timePassed) {
            return (
                <View style={styles.container}>
                    <Text style={styles.title}>
                        fuck you tim
                    </Text>
                </View>
            )
        } else {
            return (
                <LoginTwo />
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontWeight: 'bold',
        fontSize: 18,
        color: 'white'
    }
});