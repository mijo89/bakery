import type { Bakery } from '../../types';
import { cn } from '../../lib/utils';
import { MapPin } from 'lucide-react';

interface BakeryCardProps {
  bakery: Bakery;
  isSelected: boolean;
  onClick: () => void;
}

export function BakeryCard({ bakery, isSelected, onClick }: BakeryCardProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'w-full text-left px-4 py-3 rounded-lg border transition-all duration-150 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500',
        isSelected
          ? 'bg-blue-50 border-blue-300 shadow-md'
          : 'bg-white border-gray-200 hover:border-blue-200 hover:bg-gray-50',
      )}
    >
      <div className="flex items-start justify-between gap-2 mb-1">
        <span className={cn('font-semibold text-sm leading-tight', isSelected ? 'text-blue-800' : 'text-gray-900')}>
          {bakery.name}
        </span>
        <span
          className={cn(
            'shrink-0 inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset',
            isSelected
              ? 'bg-blue-100 text-blue-700 ring-blue-700/20'
              : 'bg-gray-100 text-gray-600 ring-gray-500/20',
          )}
        >
          {bakery.arrondissement}e
        </span>
      </div>

      <div className="flex items-start gap-1 mb-2">
        <MapPin className="w-3 h-3 mt-0.5 shrink-0 text-gray-400" />
        <span className="text-xs text-gray-500 leading-tight">{bakery.address}</span>
      </div>

      <div className="flex flex-wrap gap-1">
        {bakery.tags.map((tag) => (
          <span
            key={tag}
            className={cn(
              'inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset',
              tag === '100% GF'
                ? 'bg-green-50 text-green-700 ring-green-700/20'
                : 'bg-slate-50 text-slate-600 ring-slate-500/20',
            )}
          >
            {tag}
          </span>
        ))}
      </div>
    </button>
  );
}
