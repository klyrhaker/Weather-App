import { useState } from "react";
type StateLocation = {
  loading: boolean;
  error: string | null;
  coords: { latitude: number; longitude: number } | null;
};
type ReturnedLocation = StateLocation & {
  requestLocation: () => void;
};
function useGeolocation(): ReturnedLocation {
  const [location, setLocation] = useState<StateLocation>({
    loading: false,
    error: null,
    coords: null,
  });
  function requestLocation() {
    setLocation((prev) => ({ ...prev, loading: true, error: null }));

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          loading: false,
          error: null,
          coords: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          },
        });
      },
      (error) => {
        setLocation({
          loading: false,
          error: error.message,
          coords: null,
        });
      },
    );
  }
  return { ...location, requestLocation };
}
export default useGeolocation;
