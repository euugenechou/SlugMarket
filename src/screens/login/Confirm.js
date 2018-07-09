/* React imports */
import React from 'react';
import { TextInput, Button, StyleSheet, View, Alert } from 'react-native';

/* AWS imports */
import { Auth } from 'aws-amplify'

export default class App extends React.Component {
  state = {
    confirmationCode: ''
  }

  onChangeText(key, value) {
    this.setState({
      [key]: value
    })
  }

  confirmSignUp() {
    Auth.confirmSignUp(this.props.navigation.getParam("userName"), this.state.confirmationCode)
    .then(() => this.props.navigation.navigate('SignInScreen'))
    .catch(err => Alert.alert(err))
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          onChangeText={value => this.onChangeText('confirmationCode', value)}
          style={styles.input}
          placeholder='confirmation code'
          placeholderTextColor='gray'
          autoCapitalize="none"
          autoCorrect={false}
        />
        <Button color='teal' title="Confirm Sign Up" onPress={() => this.confirmSignUp()} />
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