/* React imports */
import React from 'react';
import { StyleSheet, View } from 'react-native';

/* AWS imports */
import Amplify from 'aws-amplify'
// import AWSConfig from '../../aws-exports'
// Amplify.configure(AWSConfig)

/* Local imports */
import Main from '../Main'

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
        <LoginStack
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
