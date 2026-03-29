import L from 'leaflet';
import { Marker, Popup } from 'react-leaflet';
import type { Bakery } from '../../types';

// Fix for default marker icons in Vite/webpack
const defaultIcon = L.icon({
  iconUrl: new URL('leaflet/dist/images/marker-icon.png', import.meta.url).href,
  iconRetinaUrl: new URL('leaflet/dist/images/marker-icon-2x.png', import.meta.url).href,
  shadowUrl: new URL('leaflet/dist/images/marker-shadow.png', import.meta.url).href,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const selectedIcon = L.icon({
  iconUrl: new URL('leaflet/dist/images/marker-icon.png', import.meta.url).href,
  iconRetinaUrl: new URL('leaflet/dist/images/marker-icon-2x.png', import.meta.url).href,
  shadowUrl: new URL('leaflet/dist/images/marker-shadow.png', import.meta.url).href,
  iconSize: [30, 49],
  iconAnchor: [15, 49],
  popupAnchor: [1, -40],
  shadowSize: [41, 41],
  className: 'marker-selected',
});

interface BakeryMarkerProps {
  bakery: Bakery;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

export function BakeryMarker({ bakery, isSelected, onSelect }: BakeryMarkerProps) {
  return (
    <Marker
      position={bakery.coordinates}
      icon={isSelected ? selectedIcon : defaultIcon}
      eventHandlers={{
        click: () => onSelect(bakery.id),
      }}
    >
      <Popup>
        <div className="min-w-[200px] p-1">
          <h3 className="font-semibold text-base mb-1">{bakery.name}</h3>
          <p className="text-sm text-gray-600 mb-2">{bakery.address}</p>
          {bakery.openingHours && (
            <p className="text-xs text-gray-500 mb-2">
              <span className="font-medium">Hours:</span> {bakery.openingHours}
            </p>
          )}
          {bakery.phone && (
            <p className="text-xs text-gray-500 mb-2">
              <span className="font-medium">Tel:</span>{' '}
              <a href={`tel:${bakery.phone}`} className="text-blue-600 hover:underline">
                {bakery.phone}
              </a>
            </p>
          )}
          <div className="flex flex-wrap gap-1 mt-2">
            {bakery.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center rounded-full bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10"
              >
                {tag}
              </span>
            ))}
          </div>
          {bakery.website && (
            <a
              href={bakery.website}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-block text-xs text-blue-600 hover:underline"
            >
              Visit website →
            </a>
          )}
        </div>
      </Popup>
    </Marker>
  );
}
