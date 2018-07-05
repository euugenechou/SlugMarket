import React, { Component } from 'react';

import { 
    StyleSheet,
    View, Image,
    TextInput, Text,
    TouchableOpacity,
    StatusBar,
    Button,
    Alert
} from 'react-native';

import Main from './Main';
import Signup from './Signup';
import Amplify, { Auth } from 'aws-amplify';
import AWSConfig from '../aws-exports';
Amplify.configure(AWSConfig)

export default class Login extends Component {
    constructor (props) {
        super(props);
        this.state = {
            hasLoggedIn: false
        }
    }

    handleLogin () {
        this.setState({hasLoggedIn: true});
    }

    render() {
        if (!this.state.hasLoggedIn) {
            return (
                <View style={styles.container}>
                <StatusBar
                    barStyle="light-content"
                    />
                    <TextInput
                        placeholder="UCSC ID"
                        placeholderTextColor='black'
                        returnKeyType="next"
                        onSubmitEditing={() => this.passwordInput.focus()}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoCorrect={false}
                        style={styles.input}
                        />
                    <TextInput
                        placeholder="Cruz Blue Password"
                        placeholderTextColor='black'
                        returnKeyType="go"
                        secureTextEntry
                        style={styles.input}
                        ref={(input) => this.passwordInput = input}
                        />
                    <Button
                        title="Log in"
                        onPress={() => this.handleLogin()}
                        />
                    <Button
                        title='Sign up'
                        onPress={() => <Signup />}
                        />
                </View>
            );
        } else {
            return <Main />;
        }
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 50,
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'black'
    },
    input: {
        height: 40,
        backgroundColor: 'white',
        marginBottom: 20,
        color: 'black',
        paddingHorizontal: 10
    },
    buttonContainer: {
        backgroundColor: 'grey',
        paddingVertical: 15
    },
    buttonText: {
        textAlign: 'center',
        color: 'white',
        fontWeight: '700'
    }
});