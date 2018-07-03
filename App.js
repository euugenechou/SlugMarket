import React from 'react';
import { createStackNavigator } from 'react-navigation';

import Main from './screens/Main';

/* AWS Imports */
import Amplify from 'aws-amplify';
import aws_exports from './src/aws-exports';

Amplify.configure(aws_exports);

export default class App extends React.Component {
    render () {
        return <Main />;
    }
}
