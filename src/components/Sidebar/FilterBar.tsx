import type { FilterState } from '../../types';
import { Search, X } from 'lucide-react';

interface FilterBarProps {
  filters: FilterState;
  arrondissements: number[];
  onChange: (filters: FilterState) => void;
}

const inputBase: React.CSSProperties = {
  width: '100%',
  boxSizing: 'border-box',
  border: '1px solid var(--border)',
  borderRadius: '8px',
  background: 'var(--surface)',
  color: 'var(--text-primary)',
  fontSize: '13px',
  fontFamily: "'Jost', sans-serif",
  outline: 'none',
  transition: 'border-color 0.15s, box-shadow 0.15s',
};

export function FilterBar({ filters, arrondissements, onChange }: FilterBarProps) {
  return (
    <div
      style={{
        padding: '14px 16px',
        borderBottom: '1px solid var(--border)',
        background: 'var(--parchment)',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
      }}
    >
      {/* Search input */}
      <div style={{ position: 'relative' }}>
        <Search
          size={14}
          style={{
            position: 'absolute',
            left: '11px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: 'var(--text-muted)',
            pointerEvents: 'none',
          }}
        />
        <input
          type="text"
          placeholder="Rechercher une boulangerie…"
          value={filters.searchQuery}
          onChange={(e) => onChange({ ...filters, searchQuery: e.target.value })}
          style={{
            ...inputBase,
            padding: '8px 32px 8px 32px',
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = 'var(--accent)';
            e.currentTarget.style.boxShadow = '0 0 0 3px rgba(200,75,47,0.1)';
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = 'var(--border)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        />
        {filters.searchQuery && (
          <button
            onClick={() => onChange({ ...filters, searchQuery: '' })}
            style={{
              position: 'absolute',
              right: '9px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '2px',
              color: 'var(--text-muted)',
              display: 'flex',
              alignItems: 'center',
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--text-primary)'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--text-muted)'; }}
          >
            <X size={13} />
          </button>
        )}
      </div>

      {/* Arrondissement select */}
      <select
        value={filters.arrondissement ?? ''}
        onChange={(e) =>
          onChange({
            ...filters,
            arrondissement: e.target.value ? Number(e.target.value) : null,
          })
        }
        style={{
          ...inputBase,
          padding: '8px 12px',
          appearance: 'none',
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%239B8B7E' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'right 10px center',
          paddingRight: '28px',
          cursor: 'pointer',
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = 'var(--accent)';
          e.currentTarget.style.boxShadow = '0 0 0 3px rgba(200,75,47,0.1)';
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = 'var(--border)';
          e.currentTarget.style.boxShadow = 'none';
        }}
      >
        <option value="">Tous les arrondissements</option>
        {arrondissements.map((arr) => (
          <option key={arr} value={arr}>
            {arr}e arrondissement
          </option>
        ))}
      </select>
    </div>
  );
}
