// __tests__/TopAlert-test.js
import 'react-native';
import React from 'react';
import TopAlert from '../src/screens/components/TopAlert';

import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer.create(
    <TopAlert />
    ).toJSON();
  expect(tree).toMatchSnapshot();
});