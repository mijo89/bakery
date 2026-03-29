import L from 'leaflet';
import { Marker, Popup } from 'react-leaflet';
import type { Bakery } from '../../types';

function createMarkerIcon(isSelected: boolean, is100GF: boolean) {
  const size = isSelected ? 40 : 32;
  const bg = isSelected
    ? '#C84B2F'
    : is100GF
    ? '#2D6A4F'
    : '#8B6238';
  const borderColor = '#FFFFFF';
  const borderWidth = isSelected ? 3 : 2;
  const fontSize = isSelected ? 17 : 14;
  const shadow = isSelected
    ? '0 4px 16px rgba(200,75,47,0.45)'
    : '0 2px 8px rgba(28,18,8,0.25)';

  return L.divIcon({
    html: `<div class="bakery-marker-div" style="
      width: ${size}px;
      height: ${size}px;
      background: ${bg};
      border: ${borderWidth}px solid ${borderColor};
      border-radius: 50%;
      box-shadow: ${shadow};
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: ${fontSize}px;
      line-height: 1;
      cursor: pointer;
      transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
    ">🥐</div>`,
    className: '',
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -(size / 2) - 6],
  });
}

interface BakeryMarkerProps {
  bakery: Bakery;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

export function BakeryMarker({ bakery, isSelected, onSelect }: BakeryMarkerProps) {
  const is100GF = bakery.tags.includes('100% GF');

  return (
    <Marker
      position={bakery.coordinates}
      icon={createMarkerIcon(isSelected, is100GF)}
      eventHandlers={{
        click: () => onSelect(bakery.id),
      }}
    >
      <Popup maxWidth={280} minWidth={240}>
        {/* Popup header */}
        <div
          style={{
            padding: '14px 16px 12px',
            borderBottom: '1px solid #E8DDD4',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              gap: '8px',
              marginBottom: '5px',
            }}
          >
            <h3
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 600,
                fontSize: '17px',
                color: '#1C1208',
                margin: 0,
                lineHeight: 1.2,
                flex: 1,
              }}
            >
              {bakery.name}
            </h3>
            <span
              style={{
                fontSize: '10px',
                fontWeight: 500,
                color: '#C84B2F',
                background: '#F9EDE8',
                border: '1px solid rgba(200,75,47,0.2)',
                padding: '2px 6px',
                borderRadius: '4px',
                whiteSpace: 'nowrap',
                flexShrink: 0,
              }}
            >
              {bakery.arrondissement}e
            </span>
          </div>
          <p style={{ fontSize: '12px', color: '#6B5B4E', margin: '0 0 10px', lineHeight: 1.4 }}>
            {bakery.address}
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
            {bakery.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  fontSize: '10px',
                  fontWeight: 500,
                  padding: '2px 8px',
                  borderRadius: '20px',
                  background: tag === '100% GF' ? '#D8EDDF' : '#FAF7F2',
                  color: tag === '100% GF' ? '#2D6A4F' : '#6B5B4E',
                  border: tag === '100% GF'
                    ? '1px solid rgba(45,106,79,0.2)'
                    : '1px solid #E8DDD4',
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Opening hours */}
        {bakery.openingHours && (
          <div
            style={{
              padding: '10px 16px',
              borderBottom: (bakery.phone || bakery.website) ? '1px solid #E8DDD4' : 'none',
              fontSize: '11.5px',
              color: '#6B5B4E',
              lineHeight: 1.5,
            }}
          >
            <span style={{ fontWeight: 600, color: '#1C1208' }}>Horaires : </span>
            {bakery.openingHours}
          </div>
        )}

        {/* Links */}
        {(bakery.phone || bakery.website) && (
          <div
            style={{
              padding: '10px 16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
            }}
          >
            {bakery.phone && (
              <a
                href={`tel:${bakery.phone}`}
                style={{
                  fontSize: '12px',
                  color: '#C84B2F',
                  textDecoration: 'none',
                  fontWeight: 500,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <span>📞</span> {bakery.phone}
              </a>
            )}
            {bakery.website && (
              <a
                href={bakery.website}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontSize: '12px',
                  color: '#C84B2F',
                  textDecoration: 'none',
                  fontWeight: 500,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <span>🌐</span> Visiter le site →
              </a>
            )}
          </div>
        )}
      </Popup>
    </Marker>
  );
}
