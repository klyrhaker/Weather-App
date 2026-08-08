import weatherService from "./weatherService";

describe("weatherService", () => {
  const mockRawResponse = {
    days: [
      {
        datetime: "2026-08-08",
        temp: 25,
        conditions: "Clear",
        icon: "clear-day",
      },
    ],
  };
  test("calls fetch with the given url and signal", async () => {
    const fetchSpy = vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: true,
      json: async () => mockRawResponse,
    } as Response);
    const controller = new AbortController();
    const url = "https://api.example.com/weather?city=London";
    await weatherService(url, controller.signal);
    expect(fetchSpy).toHaveBeenCalledWith(url, { signal: controller.signal });
  });
  test("returns parsed JSON on success", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: true,
      json: async () => mockRawResponse,
    } as Response);
    const result = await weatherService(
      "https://api.example.com/weather?city=London",
      new AbortController().signal,
    );
    expect(result).toEqual(mockRawResponse);
  });
  test("throws when response is not ok", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: false,
      status: 404,
    } as Response);
    await expect(
      weatherService(
        "https://api.example.com/weather?city=London",
        new AbortController().signal,
      ),
    ).rejects.toThrow();
  });
  test("propagates AbortError when the request is cancelled", async () => {
    const abortError = new DOMException("Aborted", "AbortError");
    vi.spyOn(globalThis, "fetch").mockRejectedValue(abortError);

    await expect(
      weatherService(
        "https://api.example.com/weather",
        new AbortController().signal,
      ),
    ).rejects.toThrow("Aborted");
  });
});
