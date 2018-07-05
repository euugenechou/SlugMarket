import React from 'react';
import { createStackNavigator } from 'react-navigation';

/* Screen imports */
import Splash from './src/screens/Splash';

/* AWS Imports */
import Amplify from 'aws-amplify';
import { withAuthenticator } from 'aws-amplify-react-native';
import aws_exports from './src/aws-exports';

Amplify.configure(aws_exports);

export default class App extends React.Component {
    render () {
        return <Splash />;
    }
}
