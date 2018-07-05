import React from 'react';
import { TextInput, Button, StyleSheet, Text, View, Alert } from 'react-native';
import { Auth } from 'aws-amplify'

import SignIn from './SignIn'

export default class App extends React.Component {
  state = {
    username: '',
    password: '',
    phone_number: '',
    email: '',
    confirmationCode: ''
  }

  onChangeText(key, value) {
    this.setState({
      [key]: value
    })
  }

  signUp() {
    Auth.signUp({
      username: this.state.username,
      password: this.state.password,
      attributes: {
        email: this.state.email,
        phone_number: this.state.phone_number
      }
    })
    .then(() => this.props.navigation.navigate('ConfirmScreen', {
      userName: this.state.username
    }))
    .catch(err => Alert.alert(err))
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          onChangeText={value => this.onChangeText('username', value)}
          style={styles.input}
          placeholder='UCSC ID'
          placeholderTextColor='gray'
          autoCapitalize="none"
          autoCorrect={false}
        />
        <TextInput
          onChangeText={value => this.onChangeText('password', value)}
          style={styles.input}
          secureTextEntry={true}
          placeholder='Cruz Blue password'
          placeholderTextColor='gray'
          autoCapitalize="none"
          autoCorrect={false}
        />
        <TextInput
          onChangeText={value => this.onChangeText('phone_number', value)}
          style={styles.input}
          placeholder='phone'
          placeholderTextColor='gray'
          autoCapitalize="none"
          autoCorrect={false}
        />
        <TextInput
          onChangeText={value => this.onChangeText('email', value)}
          style={styles.input}
          placeholder='email'
          placeholderTextColor='gray'
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />
        <Button color='teal' title="Sign Up" 
          onPress={() => this.signUp()} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    height: 50,
    borderBottomWidth: 2,
    borderBottomColor: 'teal',
    color: 'black',
    margin: 10
  },
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: 'white',
    justifyContent: 'center',
  },
});