import { renderHook, waitFor } from "@testing-library/react";
import useGeolocation from "./useGeolocation";
import { act } from "react";

const mockGetCurrentPosition = vi.fn();

beforeEach(() => {
  vi.stubGlobal("navigator", {
    geolocation: {
      getCurrentPosition: mockGetCurrentPosition,
    },
  });
});

afterEach(() => {
  vi.unstubAllGlobals();
  mockGetCurrentPosition.mockReset();
});

describe("useGeolocation", () => {
  test("sets coords when requestLocation succeeds", async () => {
    mockGetCurrentPosition.mockImplementation((onSuccess) => {
      onSuccess({
        coords: {
          latitude: 51.5072,
          longitude: -0.1275,
        },
      });
    });
    const { result } = renderHook(() => useGeolocation());
    act(() => {
      result.current.requestLocation();
    });

    await waitFor(() => {
      expect(result.current.coords).toEqual({
        latitude: 51.5072,
        longitude: -0.1275,
      });
    });
  });
  test("loading becomes true when requestLocation is called", () => {
    mockGetCurrentPosition.mockImplementation(() => {});

    const { result } = renderHook(() => useGeolocation());

    expect(result.current.loadingLoc).toBe(false);
    act(() => {
      result.current.requestLocation();
    });
    expect(result.current.loadingLoc).toBe(true);
  });
  test("sets error when requestLocation fails", async () => {
    mockGetCurrentPosition.mockImplementation((onSuccess, onError) => {
      onError({
        code: 1,
        message: "User denied Geolocation",
      });
    });

    const { result } = renderHook(() => useGeolocation());
    act(() => {
      result.current.requestLocation();
    });
    await waitFor(() => {
      expect(result.current.errorLoc).toBe("User denied Geolocation");
    });
  });
});
