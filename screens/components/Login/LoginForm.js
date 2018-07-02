import React, {Component} from 'react';
import { 
    StyleSheet,
    View, Image,
    TextInput, Text,
    TouchableOpacity,
    StatusBar
} from 'react-native';

export default class LoginForm extends Component {
    render() {
        return (
            <View style={styles.container}>
            <StatusBar
                barStyle="light-content"
                />
                <TextInput
                    placeholder="UCSC ID"
                    placeholderTextColor='white'
                    returnKeyType="next"
                    onSubmitEditing={() => this.passwordInput.focus()}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    style={styles.input}
                    />
                <TextInput
                    placeholder="Cruz Blue Password"
                    placeholderTextColor='white'
                    returnKeyType="go"
                    secureTextEntry
                    style={styles.input}
                    ref={(input) => this.passwordInput = input}
                    />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 20
    },
    input: {
        height: 40,
        backgroundColor: 'white',
        marginBottom: 20,
        color: 'white'
        paddingHorizontal: 10
    },
    buttonContainer: {
        backgroundColor: 'blue'
        paddingVertical: 15
    },
    buttonText: {
        textAlign: 'center',
        color: 'white',
        fontWeight: '700'
    }

});