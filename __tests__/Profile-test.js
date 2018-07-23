// __tests__/Profile-test.js
import 'react-native';
import React from 'react';
import Profile from '../src/screens/Profile'

import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer.create(
    <Profile />
    ).toJSON();
  expect(tree).toMatchSnapshot();
});