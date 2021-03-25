import { shallow } from "enzyme";
import React from "react";
import Carousel from "../../components/Carousel";

it("expect Carousel component to match Snapshot", () => {
  expect(shallow(<Carousel />)).toMatchSnapshot();
});

it("expect to render component Carousel", () => {
  expect(shallow(<Carousel />).length).toEqual(1);
});
