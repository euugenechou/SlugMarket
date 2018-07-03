import React, {Component} from 'react';
import { StyleSheet, View, Image } from 'react-native';

export default class Login extends Component {
    render () {
        return {
            <View style={styles.container}>
                <View style={styles.logoContainer}>
                    <Image
                        style={styles.logo}
                        source={require('../assets/furniture.jpg')}/>
                    <Text style={styles.title}>
                        Fuck you Jon
                    </Text>
                </View>
                <View style={styles.formContainer}>
                </View>
            </View>
        };
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    logoContainer: {
        alignItems: 'center',
        flexGrow: 1,
        justifyContent: 'center'
    },
    logo: {
        width: 100,
        height: 100
    },
    title: {
        color: 'white',
        marginTop: 10,
        width: 160,
        textAlign: 'center',
        opacity: 0.9
    }
});