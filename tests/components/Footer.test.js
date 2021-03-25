import { shallow } from "enzyme";
import React from "react";
import Footer from "../../components/Footer";

it("expect Footer component to match Snapshot", () => {
  expect(shallow(<Footer />)).toMatchSnapshot();
});

it("expect to render component Footer", () => {
  expect(shallow(<Footer />).length).toEqual(1);
});
