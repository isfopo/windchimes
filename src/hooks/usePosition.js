// Adapted from "Creating React usePosition() hook for getting browser’s geolocation" March 2020
// by Oleksii Trekhleb
// https://itnext.io/creating-react-useposition-hook-for-getting-browsers-geolocation-2f27fc1d96de

import {useState, useEffect} from 'react';

export const usePosition = () => {

  const [position, setPosition] = useState({});
  const [error, setError] = useState(null);
  
  const onChange = ({coords}) => {
    setPosition({
      latitude: coords.latitude,
      longitude: coords.longitude,
    });
  };
  
  const onError = (error) => {
    setError(error.message);
  };

  useEffect(() => {
    const geo = navigator.geolocation;
    if (!geo) {
      setError('Geolocation is not supported');
      return;
    }
    const watcher = geo.watchPosition(onChange, onError);
    return () => geo.clearWatch(watcher);
  }, []);

  return {...position, error};
}
