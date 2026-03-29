import { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import type { Map as LeafletMap } from 'leaflet';
import type { Bakery } from '../../types';
import { BakeryMarker } from './BakeryMarker';

const PARIS_CENTER: [number, number] = [48.8566, 2.3522];
const DEFAULT_ZOOM = 13;

interface FlyToControllerProps {
  coordinates: [number, number] | null;
}

function FlyToController({ coordinates }: FlyToControllerProps) {
  const map = useMap();
  useEffect(() => {
    if (coordinates) {
      map.flyTo(coordinates, 16, { duration: 1.2 });
    }
  }, [map, coordinates]);
  return null;
}

interface MapViewProps {
  bakeries: Bakery[];
  selectedBakeryId: string | null;
  flyToCoordinates: [number, number] | null;
  onBakerySelect: (id: string) => void;
  mapRef?: (map: LeafletMap | null) => void;
}

export function MapView({
  bakeries,
  selectedBakeryId,
  flyToCoordinates,
  onBakerySelect,
}: MapViewProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} className="w-full h-full">
      <MapContainer
        center={PARIS_CENTER}
        zoom={DEFAULT_ZOOM}
        style={{ width: '100%', height: '100%' }}
        zoomControl={true}
      >
        {/* CartoDB Voyager — warm, detailed, refined tiles */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />
        <FlyToController coordinates={flyToCoordinates} />
        {bakeries.map((bakery) => (
          <BakeryMarker
            key={bakery.id}
            bakery={bakery}
            isSelected={bakery.id === selectedBakeryId}
            onSelect={onBakerySelect}
          />
        ))}
      </MapContainer>
    </div>
  );
}
