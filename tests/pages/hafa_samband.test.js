import { shallow } from "enzyme";
import hafa_samband from "../../pages/hafa_samband";

it("expect hafa_samband component to match Snapshot", () => {
  expect(shallow(<hafa_samband />)).toMatchSnapshot();
});

it("expect to render component hafa_samband", () => {
  expect(shallow(<hafa_samband />).length).toEqual(1);
});
