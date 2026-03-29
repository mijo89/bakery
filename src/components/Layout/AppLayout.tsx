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
    <div className="flex h-full w-full overflow-hidden">
      <Sidebar
        isOpen={sidebarOpen}
        bakeries={filteredBakeries}
        allArrondissements={arrondissements}
        filters={filters}
        selectedBakeryId={selectedBakeryId}
        onFiltersChange={handleFiltersChange}
        onSelectBakery={handleSelectBakery}
      />

      {/* Toggle button */}
      <button
        onClick={() => setSidebarOpen((prev) => !prev)}
        className="absolute z-[1000] top-1/2 -translate-y-1/2 bg-white border border-gray-300 rounded-r-md shadow-md p-1 hover:bg-gray-50 transition-all duration-300"
        style={{ left: sidebarOpen ? '320px' : '0px' }}
        aria-label={sidebarOpen ? 'Hide sidebar' : 'Show sidebar'}
      >
        {sidebarOpen ? (
          <ChevronLeft className="w-4 h-4 text-gray-600" />
        ) : (
          <ChevronRight className="w-4 h-4 text-gray-600" />
        )}
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
