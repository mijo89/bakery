import type { Bakery, FilterState } from '../../types';
import { FilterBar } from './FilterBar';
import { BakeryList } from './BakeryList';

interface SidebarProps {
  isOpen: boolean;
  bakeries: Bakery[];
  allArrondissements: number[];
  filters: FilterState;
  selectedBakeryId: string | null;
  onFiltersChange: (filters: FilterState) => void;
  onSelectBakery: (id: string) => void;
}

export function Sidebar({
  isOpen,
  bakeries,
  allArrondissements,
  filters,
  selectedBakeryId,
  onFiltersChange,
  onSelectBakery,
}: SidebarProps) {
  return (
    <aside
      className="h-full flex flex-col overflow-hidden"
      style={{
        width: isOpen ? '320px' : '0px',
        minWidth: isOpen ? '320px' : '0px',
        background: 'var(--parchment)',
        borderRight: '1px solid var(--border)',
        transition: 'width 0.3s ease, min-width 0.3s ease',
      }}
    >
      <div style={{ width: '320px', height: '100%', display: 'flex', flexDirection: 'column' }}>

        {/* Header */}
        <div
          className="sidebar-fade-in"
          style={{
            padding: '28px 20px 20px',
            borderBottom: '1px solid var(--border)',
            background: 'var(--surface)',
          }}
        >
          {/* Decorative wheat icon + wordmark */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                background: 'var(--accent)',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '18px',
                flexShrink: 0,
              }}
            >
              🥐
            </div>
            <div>
              <h1
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: '22px',
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  lineHeight: 1.1,
                  margin: 0,
                  letterSpacing: '-0.01em',
                }}
              >
                Gluten-Free Paris
              </h1>
              <p
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: '12px',
                  fontStyle: 'italic',
                  color: 'var(--text-muted)',
                  margin: 0,
                  letterSpacing: '0.02em',
                }}
              >
                Les Meilleures Boulangeries
              </p>
            </div>
          </div>

          {/* Count chip */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px',
              marginTop: '12px',
              padding: '4px 10px',
              background: 'var(--accent-light)',
              borderRadius: '20px',
              border: '1px solid rgba(200,75,47,0.15)',
            }}
          >
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: 'var(--accent)',
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontSize: '11px',
                fontWeight: 500,
                color: 'var(--accent)',
                letterSpacing: '0.02em',
              }}
            >
              {bakeries.length} boulangerie{bakeries.length !== 1 ? 's' : ''} trouvée{bakeries.length !== 1 ? 's' : ''}
            </span>
          </div>
        </div>

        <FilterBar
          filters={filters}
          arrondissements={allArrondissements}
          onChange={onFiltersChange}
        />

        <BakeryList
          bakeries={bakeries}
          selectedBakeryId={selectedBakeryId}
          onSelect={onSelectBakery}
        />
      </div>
    </aside>
  );
}
