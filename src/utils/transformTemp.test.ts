import transformTemp from "./transformTemp";

describe("transformTemp", () => {
  test("transforms celsius to fahrenheit", () => {
    const temp = transformTemp(20, "celsius");
    expect(temp).toBe(68);
  });
  test("transforms fahrenheit to celsius", () => {
    const temp = transformTemp(59, "fahrenheit");
    expect(temp).toBe(15);
  });
});
