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
      className="h-full flex flex-col bg-white border-r border-gray-200 overflow-hidden transition-all duration-300 ease-in-out"
      style={{ width: isOpen ? '320px' : '0px', minWidth: isOpen ? '320px' : '0px' }}
    >
      <div className="w-[320px] h-full flex flex-col">
        <div className="px-4 py-4 border-b border-gray-200">
          <h1 className="text-lg font-bold text-gray-900">Gluten-Free Paris</h1>
          <p className="text-xs text-gray-500 mt-0.5">
            {bakeries.length} bakeri{bakeries.length !== 1 ? 'es' : 'e'} found
          </p>
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
