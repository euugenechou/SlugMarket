// __tests__/Main-test.js
import 'react-native';
import React from 'react';
import Main from '../src/screens/Main';

import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer.create(
    <Main />
    ).toJSON();
  expect(tree).toMatchSnapshot();
});