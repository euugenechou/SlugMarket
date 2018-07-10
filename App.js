import React from 'react';

/* Screen imports */
import Splash from './src/screens/Splash';

/* AWS Imports */
import Amplify from 'aws-amplify';
import aws_exports from './src/aws-exports';

Amplify.configure(aws_exports);

export default class App extends React.Component {
    render () {
        return <Splash />;
    }
}
