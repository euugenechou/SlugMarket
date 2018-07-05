import React from 'react';
import { StyleSheet,
  View
} from 'react-native';

import Amplify, { Auth } from 'aws-amplify'
import AWSConfig from '../aws-exports'
Amplify.configure(AWSConfig)

import Main from './Main'
import Tabs from './Tabs'

export default class Login extends React.Component {
  state = {
    isAuthenticated: false
  }

  authenticate(isAuthenticated) {
    this.setState({ isAuthenticated: isAuthenticated });
  }

  render() {
    if (this.state.isAuthenticated) {
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
