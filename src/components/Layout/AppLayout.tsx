import { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Bakery, FilterState } from '../../types';
import { bakeries as allBakeries, arrondissements } from '../../data/bakeries';
import { Sidebar } from '../Sidebar/Sidebar';
import { MapView } from '../Map/MapView';

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
  const [selectedBakeryId, setSelectedBakeryId] = useState<string | null>(null);
  const [flyToCoordinates, setFlyToCoordinates] = useState<[number, number] | null>(null);
  const [filters, setFilters] = useState<FilterState>({
    arrondissement: null,
    searchQuery: '',
  });

  const filteredBakeries = useMemo(
    () => filterBakeries(allBakeries, filters),
    [filters],
  );

  function handleSelectBakery(id: string) {
    setSelectedBakeryId(id);
    const bakery = allBakeries.find((b) => b.id === id);
    if (bakery) {
      setFlyToCoordinates([...bakery.coordinates]);
    }
  }

  function handleFiltersChange(newFilters: FilterState) {
    setFilters(newFilters);
    setSelectedBakeryId(null);
    setFlyToCoordinates(null);
  }

  return (
    <div className="flex h-full w-full overflow-hidden" style={{ background: 'var(--parchment)' }}>
      <Sidebar
        isOpen={sidebarOpen}
        bakeries={filteredBakeries}
        allArrondissements={arrondissements}
        filters={filters}
        selectedBakeryId={selectedBakeryId}
        onFiltersChange={handleFiltersChange}
        onSelectBakery={handleSelectBakery}
      />

      {/* Sidebar toggle tab */}
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

      <div className="flex-1 relative">
        <MapView
          bakeries={filteredBakeries}
          selectedBakeryId={selectedBakeryId}
          flyToCoordinates={flyToCoordinates}
          onBakerySelect={handleSelectBakery}
        />
      </div>
    </div>
  );
}
