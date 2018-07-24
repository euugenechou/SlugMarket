// __tests__/Explore-test.js
import "react-native";
import React from "react";
import Explore from "../src/screens/Explore";

import renderer from "react-test-renderer";

it("renders correctly", () => {
  const tree = renderer.create(<Explore />).toJSON();
  expect(tree).toMatchSnapshot();
});
