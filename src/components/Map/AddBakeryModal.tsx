import { useState } from 'react';
import { X, MapPin } from 'lucide-react';
import type { Bakery } from '../../types';

interface AddBakeryModalProps {
  coordinates: [number, number];
  onAdd: (bakery: Bakery) => void;
  onClose: () => void;
}

// A simple form modal that appears after clicking the map.
// The user fills in the bakery details; coordinates are already set from the click.
export function AddBakeryModal({ coordinates, onAdd, onClose }: AddBakeryModalProps) {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [arrondissement, setArrondissement] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [website, setWebsite] = useState('');
  const [phone, setPhone] = useState('');
  const [openingHours, setOpeningHours] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const newBakery: Bakery = {
      id: `custom-${Date.now()}`,
      name: name.trim(),
      address: address.trim(),
      arrondissement: parseInt(arrondissement, 10),
      coordinates,
      description: description.trim(),
      // Tags are entered comma-separated, e.g. "100% GF, Bread"
      tags: tags.split(',').map((t) => t.trim()).filter(Boolean),
      website: website.trim() || undefined,
      phone: phone.trim() || undefined,
      openingHours: openingHours.trim() || undefined,
    };

    onAdd(newBakery);
    onClose();
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '8px 10px',
    fontSize: '13px',
    fontFamily: 'inherit',
    color: 'var(--text-primary)',
    background: 'var(--parchment)',
    border: '1px solid var(--border)',
    borderRadius: '6px',
    outline: 'none',
    boxSizing: 'border-box',
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: '11px',
    fontWeight: 600,
    letterSpacing: '0.05em',
    textTransform: 'uppercase',
    color: 'var(--text-muted)',
    marginBottom: '4px',
  };

  return (
    // Backdrop — clicking outside the modal closes it
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 2000,
        background: 'rgba(28,18,8,0.35)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
      }}
    >
      {/* Modal box — stop click from bubbling to backdrop */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: '12px',
          boxShadow: '0 8px 40px rgba(28,18,8,0.18)',
          width: '100%',
          maxWidth: '460px',
          maxHeight: '90vh',
          overflowY: 'auto',
          padding: '24px',
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '22px', fontWeight: 600, color: 'var(--text-primary)', margin: 0 }}>
              Ajouter une boulangerie
            </h2>
            {/* Show the coordinates the user clicked so they know where it'll be pinned */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
              <MapPin size={11} style={{ color: 'var(--accent)' }} />
              <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                {coordinates[0].toFixed(5)}, {coordinates[1].toFixed(5)}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: '1px solid var(--border)',
              borderRadius: '6px',
              padding: '4px 6px',
              cursor: 'pointer',
              color: 'var(--text-muted)',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <X size={14} />
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {/* Name */}
          <div>
            <label style={labelStyle}>Nom *</label>
            <input
              style={inputStyle}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex : Helmut Newcake"
              required
            />
          </div>

          {/* Address + Arrondissement side by side */}
          <div style={{ display: 'flex', gap: '10px' }}>
            <div style={{ flex: 1 }}>
              <label style={labelStyle}>Adresse *</label>
              <input
                style={inputStyle}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="36 Rue Bichat, 75010 Paris"
                required
              />
            </div>
            <div style={{ width: '80px' }}>
              <label style={labelStyle}>Arrdt *</label>
              <select
                style={{ ...inputStyle, cursor: 'pointer' }}
                value={arrondissement}
                onChange={(e) => setArrondissement(e.target.value)}
                required
              >
                <option value="">–</option>
                {Array.from({ length: 20 }, (_, i) => i + 1).map((n) => (
                  <option key={n} value={n}>{n}e</option>
                ))}
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label style={labelStyle}>Description *</label>
            <textarea
              style={{ ...inputStyle, resize: 'vertical', minHeight: '72px' }}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Décrivez cette boulangerie..."
              required
            />
          </div>

          {/* Tags */}
          <div>
            <label style={labelStyle}>Tags * <span style={{ fontWeight: 400, textTransform: 'none', letterSpacing: 0 }}>(séparés par des virgules)</span></label>
            <input
              style={inputStyle}
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="100% GF, Pastries, Café"
              required
            />
          </div>

          {/* Optional fields */}
          <div>
            <label style={labelStyle}>Site web <span style={{ fontWeight: 400, textTransform: 'none', letterSpacing: 0 }}>(optionnel)</span></label>
            <input
              style={inputStyle}
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              placeholder="https://..."
              type="url"
            />
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <div style={{ flex: 1 }}>
              <label style={labelStyle}>Téléphone <span style={{ fontWeight: 400, textTransform: 'none', letterSpacing: 0 }}>(optionnel)</span></label>
              <input
                style={inputStyle}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+33 1 00 00 00 00"
                type="tel"
              />
            </div>
            <div style={{ flex: 1 }}>
              <label style={labelStyle}>Horaires <span style={{ fontWeight: 400, textTransform: 'none', letterSpacing: 0 }}>(optionnel)</span></label>
              <input
                style={inputStyle}
                value={openingHours}
                onChange={(e) => setOpeningHours(e.target.value)}
                placeholder="Lun–Sam 8:00–19:00"
              />
            </div>
          </div>

          {/* Buttons */}
          <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                flex: 1,
                padding: '9px',
                fontSize: '13px',
                fontFamily: 'inherit',
                background: 'none',
                border: '1px solid var(--border)',
                borderRadius: '7px',
                cursor: 'pointer',
                color: 'var(--text-secondary)',
              }}
            >
              Annuler
            </button>
            <button
              type="submit"
              style={{
                flex: 2,
                padding: '9px',
                fontSize: '13px',
                fontFamily: 'inherit',
                fontWeight: 600,
                background: 'var(--accent)',
                border: 'none',
                borderRadius: '7px',
                cursor: 'pointer',
                color: '#fff',
              }}
            >
              Ajouter sur la carte
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
