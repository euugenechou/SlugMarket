// __tests__/SignUp-test.js
import 'react-native';
import React from 'react';
import SignUp from '../src/screens/login/SignUp';

import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer.create(
    <SignUp />
    ).toJSON();
  expect(tree).toMatchSnapshot();
});