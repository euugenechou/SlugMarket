// __tests__/Authors.js
import "react-native";
import React from "react";
import Terms from "../src/screens/Terms";

import renderer from "react-test-renderer";

it("renders correctly", () => {
  const tree = renderer.create(<Terms />).toJSON();
  expect(tree).toMatchSnapshot();
});
