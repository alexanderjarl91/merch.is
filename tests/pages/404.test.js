import { shallow } from "enzyme";
import Custom404 from "../../pages/404";

it("expect Custom404 component to match Snapshot", () => {
  expect(shallow(<Custom404 />)).toMatchSnapshot();
});

it("expect to render component Custom404", () => {
  expect(shallow(<Custom404 />).length).toEqual(1);
});
