import type { Bakery } from '../../types';
import { BakeryCard } from './BakeryCard';

interface BakeryListProps {
  bakeries: Bakery[];
  selectedBakeryId: string | null;
  onSelect: (id: string) => void;
}

function groupByArrondissement(bakeries: Bakery[]): Map<number, Bakery[]> {
  const groups = new Map<number, Bakery[]>();
  for (const bakery of bakeries) {
    const group = groups.get(bakery.arrondissement) ?? [];
    group.push(bakery);
    groups.set(bakery.arrondissement, group);
  }
  return new Map([...groups.entries()].sort(([a], [b]) => a - b));
}

export function BakeryList({ bakeries, selectedBakeryId, onSelect }: BakeryListProps) {
  if (bakeries.length === 0) {
    return (
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px 20px',
          textAlign: 'center',
        }}
      >
        <div style={{ fontSize: '32px', marginBottom: '12px', opacity: 0.5 }}>🥐</div>
        <p
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '17px',
            fontStyle: 'italic',
            color: 'var(--text-secondary)',
            margin: '0 0 4px',
          }}
        >
          Aucun résultat
        </p>
        <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: 0 }}>
          Essayez d'autres critères de recherche.
        </p>
      </div>
    );
  }

  const groups = groupByArrondissement(bakeries);

  // Build a flat list of cards with their cumulative index for staggered animation
  let cardIndex = 0;

  return (
    <div
      style={{
        overflowY: 'auto',
        flex: 1,
        paddingTop: '8px',
        paddingBottom: '16px',
      }}
    >
      {[...groups.entries()].map(([arrondissement, items]) => (
        <div key={arrondissement} style={{ marginBottom: '16px' }}>
          {/* Arrondissement section header */}
          <div
            style={{
              position: 'sticky',
              top: 0,
              zIndex: 10,
              padding: '6px 16px',
              background: 'var(--parchment)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <span
              style={{
                fontFamily: "'Jost', sans-serif",
                fontSize: '10px',
                fontWeight: 500,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--text-muted)',
                whiteSpace: 'nowrap',
              }}
            >
              {arrondissement}e arr.
            </span>
            <div
              style={{
                flex: 1,
                height: '1px',
                background: 'var(--border)',
              }}
            />
            <span
              style={{
                fontSize: '10px',
                color: 'var(--text-muted)',
                fontWeight: 400,
              }}
            >
              {items.length}
            </span>
          </div>

          {/* Cards */}
          <div style={{ padding: '4px 12px 0', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {items.map((bakery) => {
              const delay = (cardIndex++ % 8) * 40;
              return (
                <BakeryCard
                  key={bakery.id}
                  bakery={bakery}
                  isSelected={bakery.id === selectedBakeryId}
                  onClick={() => onSelect(bakery.id)}
                  animationDelay={delay}
                />
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
