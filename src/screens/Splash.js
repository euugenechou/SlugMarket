import React, {Component} from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';
import Login from './Login';
import Main from './Main'

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
                        fuck you jon
                    </Text>
                </View>
            )
        } else {
            return (
                <Login />
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontWeight: 'bold',
        fontSize: 18,
        color: 'black'
    }
});