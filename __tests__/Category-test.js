// __tests__/Category-test.js
import 'react-native';
import React from 'react';
import Category from '../src/screens/components/Explore/Category';

import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer.create(
    <Category />
    ).toJSON();
  expect(tree).toMatchSnapshot();
});