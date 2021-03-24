import { shallow } from "enzyme";
import DummyPage from "../../pages/DummyPage";

it("expect to render DummyPage component", () => {
  expect(shallow(<DummyPage />).length).toEqual(1);
});
