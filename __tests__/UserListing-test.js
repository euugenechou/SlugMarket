// __tests__/UserListings-test.js
import 'react-native';
import React from 'react';
import UserListings from '../src/screens/components/Profile/UserListings';

import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer.create(
    <UserListings />
    ).toJSON();
  expect(tree).toMatchSnapshot();
});