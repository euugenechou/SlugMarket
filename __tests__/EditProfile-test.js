// __tests__/EditProfile-test.js
import 'react-native';
import React from 'react';
import EditProfile from '../src/screens/EditProfile';

import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer.create(
    <EditProfile />
    ).toJSON();
  expect(tree).toMatchSnapshot();
});