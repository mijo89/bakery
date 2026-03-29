import type { Bakery } from '../../types';
import { MapPin, Clock } from 'lucide-react';

interface BakeryCardProps {
  bakery: Bakery;
  isSelected: boolean;
  onClick: () => void;
  animationDelay?: number;
}

export function BakeryCard({ bakery, isSelected, onClick, animationDelay = 0 }: BakeryCardProps) {
  const is100GF = bakery.tags.includes('100% GF');

  return (
    <div className="bakery-card-reveal" style={{ animationDelay: `${animationDelay}ms` }}>
      <button
        onClick={onClick}
        style={{
          width: '100%',
          textAlign: 'left',
          background: isSelected ? 'var(--surface)' : 'var(--surface)',
          border: `1px solid ${isSelected ? 'var(--accent)' : 'var(--border)'}`,
          borderRadius: '8px',
          padding: '12px 14px',
          cursor: 'pointer',
          transition: 'border-color 0.15s, box-shadow 0.15s, background 0.15s',
          boxShadow: isSelected
            ? '0 2px 12px rgba(200,75,47,0.12)'
            : '0 1px 3px rgba(28,18,8,0.04)',
          position: 'relative',
          overflow: 'hidden',
          outline: 'none',
        }}
        onMouseEnter={(e) => {
          if (!isSelected) {
            const el = e.currentTarget as HTMLElement;
            el.style.borderColor = 'var(--border-strong)';
            el.style.boxShadow = '0 2px 8px rgba(28,18,8,0.08)';
          }
        }}
        onMouseLeave={(e) => {
          if (!isSelected) {
            const el = e.currentTarget as HTMLElement;
            el.style.borderColor = 'var(--border)';
            el.style.boxShadow = '0 1px 3px rgba(28,18,8,0.04)';
          }
        }}
      >
        {/* Selected left accent bar */}
        {isSelected && (
          <div
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              bottom: 0,
              width: '3px',
              background: 'var(--accent)',
              borderRadius: '8px 0 0 8px',
            }}
          />
        )}

        {/* Top row: name + arrondissement badge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            gap: '8px',
            marginBottom: '6px',
          }}
        >
          <span
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '15px',
              fontWeight: 600,
              color: isSelected ? 'var(--accent)' : 'var(--text-primary)',
              lineHeight: 1.2,
              flex: 1,
            }}
          >
            {bakery.name}
          </span>
          <span
            style={{
              flexShrink: 0,
              fontSize: '10px',
              fontWeight: 500,
              letterSpacing: '0.03em',
              color: isSelected ? 'var(--accent)' : 'var(--text-muted)',
              background: isSelected ? 'var(--accent-light)' : 'var(--parchment)',
              border: `1px solid ${isSelected ? 'rgba(200,75,47,0.25)' : 'var(--border)'}`,
              borderRadius: '4px',
              padding: '2px 6px',
              lineHeight: 1.4,
            }}
          >
            {bakery.arrondissement}e
          </span>
        </div>

        {/* Address */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '5px',
            marginBottom: '8px',
          }}
        >
          <MapPin
            size={11}
            style={{ color: 'var(--text-muted)', marginTop: '1px', flexShrink: 0 }}
          />
          <span
            style={{
              fontSize: '11px',
              color: 'var(--text-secondary)',
              lineHeight: 1.4,
            }}
          >
            {bakery.address}
          </span>
        </div>

        {/* Tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
          {bakery.tags.map((tag) => (
            <span
              key={tag}
              style={{
                fontSize: '10px',
                fontWeight: 500,
                padding: '2px 7px',
                borderRadius: '20px',
                background: tag === '100% GF'
                  ? 'var(--green-light)'
                  : (is100GF ? 'rgba(45,106,79,0.07)' : 'var(--parchment)'),
                color: tag === '100% GF' ? 'var(--green)' : 'var(--text-secondary)',
                border: tag === '100% GF'
                  ? '1px solid rgba(45,106,79,0.2)'
                  : '1px solid var(--border)',
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Opening hours — shown only when selected */}
        {isSelected && bakery.openingHours && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              marginTop: '10px',
              paddingTop: '8px',
              borderTop: '1px solid var(--border)',
            }}
          >
            <Clock size={11} style={{ color: 'var(--accent)', flexShrink: 0 }} />
            <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
              {bakery.openingHours}
            </span>
          </div>
        )}
      </button>
    </div>
  );
}
