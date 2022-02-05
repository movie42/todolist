import { randomNumber } from "./util";

test("type is number", () => {
  expect(typeof randomNumber()).toBe("number");
});
