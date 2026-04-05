import type { Bakery, FilterState } from '../../types';
import { FilterBar } from './FilterBar';
import { BakeryList } from './BakeryList';

interface SidebarProps {
  isOpen: boolean;
  isMobile?: boolean;
  bakeries: Bakery[];
  allArrondissements: number[];
  filters: FilterState;
  selectedBakeryId: string | null;
  onFiltersChange: (filters: FilterState) => void;
  onSelectBakery: (id: string) => void;
  onClose?: () => void;
}

export function Sidebar({
  isOpen,
  isMobile = false,
  bakeries,
  allArrondissements,
  filters,
  selectedBakeryId,
  onFiltersChange,
  onSelectBakery,
  onClose,
}: SidebarProps) {
  // Mobile: bottom sheet that slides up. Desktop: side panel that slides in from the left.
  const mobileStyle: React.CSSProperties = {
    height: isOpen ? '58vh' : '0px',
    width: '100%',
    minWidth: '100%',
    background: 'var(--parchment)',
    transition: 'height 0.35s ease',
    overflow: 'hidden',
  };

  const desktopStyle: React.CSSProperties = {
    width: isOpen ? '320px' : '0px',
    minWidth: isOpen ? '320px' : '0px',
    background: 'var(--parchment)',
    borderRight: '1px solid var(--border)',
    transition: 'width 0.3s ease, min-width 0.3s ease',
    overflow: 'hidden',
  };

  return (
    <aside
      className={`h-full flex flex-col overflow-hidden${isMobile ? ' sidebar-bottom-sheet' : ''}`}
      style={isMobile ? mobileStyle : desktopStyle}
    >
      {/* Drag handle — visible on mobile to indicate the sheet can be dismissed */}
      {isMobile && (
        <button
          onClick={onClose}
          aria-label="Fermer le panneau"
          style={{
            background: 'none',
            border: 'none',
            padding: '12px 0 4px',
            cursor: 'pointer',
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
            flexShrink: 0,
          }}
        >
          <div style={{ width: '40px', height: '4px', borderRadius: '2px', background: 'var(--border-strong)' }} />
        </button>
      )}

      <div style={{ width: isMobile ? '100%' : '320px', height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

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
