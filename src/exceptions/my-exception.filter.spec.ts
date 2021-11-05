import { MyExceptionFilter } from "./my-exception.filter";

describe("ExceptionFilter", () => {
  it("should be defined", () => {
    expect(new MyExceptionFilter()).toBeDefined();
  });
});
