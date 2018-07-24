// __tests__/Confirm-test.js
import 'react-native';
import React from 'react';
import Confirm from '../src/screens/login/Confirm';

import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer.create(
    <Confirm />
    ).toJSON();
  expect(tree).toMatchSnapshot();
});