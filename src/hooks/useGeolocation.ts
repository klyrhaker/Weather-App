import { useState } from "react";
type StateLocation = {
  loadingLoc: boolean;
  errorLoc: string | null;
  coords: { latitude: number; longitude: number } | null;
};
type ReturnedLocation = StateLocation & {
  requestLocation: () => void;
};
function useGeolocation(): ReturnedLocation {
  const [location, setLocation] = useState<StateLocation>({
    loadingLoc: false,
    errorLoc: null,
    coords: null,
  });
  function requestLocation() {
    setLocation((prev) => ({ ...prev, loadingLoc: true, errorLoc: null }));

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          loadingLoc: false,
          errorLoc: null,
          coords: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          },
        });
      },
      (error) => {
        setLocation({
          loadingLoc: false,
          errorLoc: error.message,
          coords: null,
        });
      },
    );
  }
  return { ...location, requestLocation };
}
export default useGeolocation;
