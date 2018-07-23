// __tests__/Authors.js
import 'react-native';
import React from 'react';
import Authors from '../src/screens/Authors';

import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer.create(
    <Authors />
    ).toJSON();
  expect(tree).toMatchSnapshot();
});