import React from 'react';
import { TextInput, Button, StyleSheet, Text, View } from 'react-native';

import { Auth } from 'aws-amplify'

export default class App extends React.Component {
  state = {
    username: '',
    password: '',
    confirmationCode: '',
    user: {}
  }
  onChangeText(key, value) {
    this.setState({
      [key]: value
    })
  }
  signIn() {
    const { username, password } = this.state
    Auth.signIn(username, password)
    .then(user => {
      this.setState({ user })
      console.log('successful sign in!')
    })
    .catch(err => console.log('error signing in!: ', err))
  }
  confirmSignIn() {
    Auth.confirmSignIn(this.state.user, this.state.confirmationCode)
    .then(() => {
      console.log('successful confirm sign in!')
      this.props.screenProps.authenticate(true)
    })
    .catch(err => console.log('error confirming signing in!: ', err))
  }
  render() {
    return (
      <View style={styles.container}>
        <TextInput
          onChangeText={value => this.onChangeText('username', value)}
          style={styles.input}
          placeholder='username'
          placeholderTextColor='gray'
          autoCapitalize="none"
          autoCorrect={false}
        />
        <TextInput
          onChangeText={value => this.onChangeText('password', value)}
          style={styles.input}
          secureTextEntry={true}
          placeholder='password'
          placeholderTextColor='gray'
          autoCapitalize="none"
          autoCorrect={false}
        />
        <Button color='teal' title="Sign In" onPress={this.signIn.bind(this)} />
        <TextInput
          onChangeText={value => this.onChangeText('confirmationCode', value)}
          style={styles.input}
          placeholder='confirmation code'
          placeholderTextColor='gray'
          autoCapitalize="none"
          autoCorrect={false}
        />
        <Button color='teal' title="Confirm Sign In" onPress={this.confirmSignIn.bind(this)} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    height: 50,
    color: 'black',
    borderBottomWidth: 2,
    borderBottomColor: 'teal',
    margin: 10
  },
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: 'white',
    justifyContent: 'center',
  },
});