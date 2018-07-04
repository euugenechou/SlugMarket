import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import Amplify, { Auth } from 'aws-amplify'
import AWSConfig from '../aws-exports'
Amplify.configure(AWSConfig)

import Tabs from './Tabs'

export default class LoginTwo extends React.Component {
  state = {
    isAuthenticated: false
  }

  authenticate(isAuthenticated) {
    this.setState({ isAuthenticated })
  }

  render() {
    if (this.state.isAuthenticated) {
      console.log('Auth: ', Auth)
      return (
        <Main />
      )
    }
    return (
      <View style={styles.container}>
        <Tabs
          screenProps={{
            authenticate: this.authenticate.bind(this)
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
