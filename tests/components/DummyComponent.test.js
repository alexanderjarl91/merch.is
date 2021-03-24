import { shallow } from "enzyme";
import DummyComponent from "../../components/DummyComponent";

it("expect to render DummyComponent component", () => {
  expect(shallow(<DummyComponent />).length).toEqual(1);
});