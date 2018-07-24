// __tests__/SignIn-test.js
import "react-native";
import React from "react";
import SignIn from "../src/screens/login/SignIn";

import renderer from "react-test-renderer";

it("renders correctly", () => {
  const tree = renderer.create(<SignIn />).toJSON();
  expect(tree).toMatchSnapshot();
});
