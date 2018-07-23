// __tests__/Settings-test.js
import 'react-native';
import React from 'react';
import Settings from '../src/screens/Settings';

import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer.create(
    <Settings />
    ).toJSON();
  expect(tree).toMatchSnapshot();
});