import { useMapEvents } from 'react-leaflet';

interface MapClickHandlerProps {
  onMapClick: (coords: [number, number]) => void;
}

// This invisible component lives inside the MapContainer.
// It listens for any click on the map and passes the coordinates up.
export function MapClickHandler({ onMapClick }: MapClickHandlerProps) {
  useMapEvents({
    click(e) {
      onMapClick([e.latlng.lat, e.latlng.lng]);
    },
  });
  return null;
}
