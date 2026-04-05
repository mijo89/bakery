import { useState, useMemo, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Bakery, FilterState } from '../../types';
import { bakeries as allBakeries } from '../../data/bakeries';
import { Sidebar } from '../Sidebar/Sidebar';
import { MapView } from '../Map/MapView';
import { AddBakeryModal } from '../Map/AddBakeryModal';

function filterBakeries(bakeries: Bakery[], filters: FilterState): Bakery[] {
  return bakeries.filter((b) => {
    const matchesArrondissement =
      filters.arrondissement === null || b.arrondissement === filters.arrondissement;
    const query = filters.searchQuery.trim().toLowerCase();
    const matchesSearch =
      !query ||
      b.name.toLowerCase().includes(query) ||
      b.address.toLowerCase().includes(query) ||
      b.tags.some((t) => t.toLowerCase().includes(query)) ||
      b.description.toLowerCase().includes(query);
    return matchesArrondissement && matchesSearch;
  });
}

export function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Detect mobile screen (< 640px wide — covers all iPhones)
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 640);
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);
  const [selectedBakeryId, setSelectedBakeryId] = useState<string | null>(null);
  const [flyToCoordinates, setFlyToCoordinates] = useState<[number, number] | null>(null);
  const [filters, setFilters] = useState<FilterState>({
    arrondissement: null,
    searchQuery: '',
  });

  // Local list of bakeries — starts with the static data, grows when user adds entries
  const [bakeries, setBakeries] = useState<Bakery[]>(allBakeries);

  // When not null, the user has clicked the map at these coordinates → show the modal
  const [pendingCoordinates, setPendingCoordinates] = useState<[number, number] | null>(null);

  const filteredBakeries = useMemo(
    () => filterBakeries(bakeries, filters),
    [bakeries, filters],
  );

  // Recompute arrondissement list whenever bakeries change (new ones may add new arrondissements)
  const arrondissements = useMemo(
    () => [...new Set(bakeries.map((b) => b.arrondissement))].sort((a, b) => a - b),
    [bakeries],
  );

  function handleSelectBakery(id: string) {
    setSelectedBakeryId(id);
    const bakery = bakeries.find((b) => b.id === id);
    if (bakery) {
      setFlyToCoordinates([...bakery.coordinates]);
    }
  }

  function handleFiltersChange(newFilters: FilterState) {
    setFilters(newFilters);
    setSelectedBakeryId(null);
    setFlyToCoordinates(null);
  }

  // Called when the user clicks a blank spot on the map
  function handleMapClick(coords: [number, number]) {
    setPendingCoordinates(coords);
  }

  // Called when the user submits the "add bakery" form
  function handleAddBakery(bakery: Bakery) {
    setBakeries((prev) => [...prev, bakery]);
    // Immediately select and fly to the new bakery
    setSelectedBakeryId(bakery.id);
    setFlyToCoordinates([...bakery.coordinates]);
  }

  return (
    <div className="flex h-full w-full overflow-hidden" style={{ background: 'var(--parchment)' }}>

      {/* Map always fills the full screen; on mobile the sidebar overlays it from the bottom */}
      <div className="flex-1 relative">
        <MapView
          bakeries={filteredBakeries}
          selectedBakeryId={selectedBakeryId}
          flyToCoordinates={flyToCoordinates}
          onBakerySelect={handleSelectBakery}
          onMapClick={handleMapClick}
        />
      </div>

      <Sidebar
        isOpen={sidebarOpen}
        isMobile={isMobile}
        bakeries={filteredBakeries}
        allArrondissements={arrondissements}
        filters={filters}
        selectedBakeryId={selectedBakeryId}
        onFiltersChange={handleFiltersChange}
        onSelectBakery={handleSelectBakery}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Desktop sidebar toggle tab — hidden on mobile */}
      {!isMobile && (
        <button
          onClick={() => setSidebarOpen((prev) => !prev)}
          aria-label={sidebarOpen ? 'Masquer le panneau' : 'Afficher le panneau'}
          className="sidebar-toggle-tab"
          style={{
            position: 'absolute',
            zIndex: 1000,
            top: '50%',
            transform: 'translateY(-50%)',
            left: sidebarOpen ? '320px' : '0px',
            width: '18px',
            height: '52px',
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: '0 6px 6px 0',
            boxShadow: '3px 0 12px rgba(28,18,8,0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'left 0.3s ease, background 0.15s, color 0.15s',
            color: 'var(--text-muted)',
            outline: 'none',
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.background = 'var(--accent-light)';
            el.style.color = 'var(--accent)';
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.background = 'var(--surface)';
            el.style.color = 'var(--text-muted)';
          }}
        >
          {sidebarOpen ? <ChevronLeft size={11} /> : <ChevronRight size={11} />}
        </button>
      )}

      {/* Mobile floating toggle button — shown only when sidebar is closed */}
      {isMobile && !sidebarOpen && (
        <button
          onClick={() => setSidebarOpen(true)}
          aria-label="Afficher la liste"
          style={{
            position: 'fixed',
            bottom: 'calc(env(safe-area-inset-bottom, 0px) + 20px)',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 1000,
            padding: '12px 24px',
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: '999px',
            boxShadow: '0 4px 16px rgba(28,18,8,0.18)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            cursor: 'pointer',
            color: 'var(--text-primary)',
            fontSize: '14px',
            fontFamily: 'inherit',
            fontWeight: 500,
            whiteSpace: 'nowrap',
          }}
        >
          <ChevronRight size={14} style={{ transform: 'rotate(-90deg)' }} />
          Liste des boulangeries
        </button>
      )}

      {/* Modal shown when the user clicks a blank spot on the map */}
      {pendingCoordinates && (
        <AddBakeryModal
          coordinates={pendingCoordinates}
          onAdd={handleAddBakery}
          onClose={() => setPendingCoordinates(null)}
        />
      )}
    </div>
  );
}
