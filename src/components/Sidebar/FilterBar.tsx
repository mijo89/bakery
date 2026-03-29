import type { FilterState } from '../../types';
import { Search, X } from 'lucide-react';

interface FilterBarProps {
  filters: FilterState;
  arrondissements: number[];
  onChange: (filters: FilterState) => void;
}

export function FilterBar({ filters, arrondissements, onChange }: FilterBarProps) {
  return (
    <div className="p-4 space-y-3 border-b border-gray-200 bg-gray-50">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        <input
          type="text"
          placeholder="Search bakeries…"
          value={filters.searchQuery}
          onChange={(e) => onChange({ ...filters, searchQuery: e.target.value })}
          className="w-full rounded-md border border-gray-300 bg-white py-2 pl-9 pr-8 text-sm shadow-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        {filters.searchQuery && (
          <button
            onClick={() => onChange({ ...filters, searchQuery: '' })}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      <div>
        <select
          value={filters.arrondissement ?? ''}
          onChange={(e) =>
            onChange({
              ...filters,
              arrondissement: e.target.value ? Number(e.target.value) : null,
            })
          }
          className="w-full rounded-md border border-gray-300 bg-white py-2 px-3 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">All arrondissements</option>
          {arrondissements.map((arr) => (
            <option key={arr} value={arr}>
              {arr}e arrondissement
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
