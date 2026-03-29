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
      <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
        <p className="text-gray-500 text-sm">No bakeries match your search.</p>
        <p className="text-gray-400 text-xs mt-1">Try adjusting the filters above.</p>
      </div>
    );
  }

  const groups = groupByArrondissement(bakeries);

  return (
    <div className="overflow-y-auto flex-1 py-2">
      {[...groups.entries()].map(([arrondissement, items]) => (
        <div key={arrondissement} className="mb-4">
          <h2 className="px-4 py-1 text-xs font-semibold uppercase tracking-wider text-gray-400 sticky top-0 bg-white z-10">
            {arrondissement}e arrondissement
          </h2>
          <div className="px-3 space-y-2 mt-1">
            {items.map((bakery) => (
              <BakeryCard
                key={bakery.id}
                bakery={bakery}
                isSelected={bakery.id === selectedBakeryId}
                onClick={() => onSelect(bakery.id)}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
