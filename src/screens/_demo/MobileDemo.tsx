import { useState } from 'react';
import { ResidentApp } from './ResidentApp';
import { AdminApp } from './AdminApp';
import { StaffApp } from './StaffApp';

/**
 * Pantalla raíz del demo. Muestra un switcher (Residente / Administración / Staff)
 * y renderiza la app móvil correspondiente dentro de un phone frame centrado.
 */

type ViewKey = 'resident' | 'admin' | 'staff';

const VIEWS: Array<{ id: ViewKey; label: string; description: string }> = [
  { id: 'resident', label: 'Residente', description: 'Propietarios e inquilinos' },
  { id: 'admin', label: 'Administración', description: 'Gestión, cobranza, reportes' },
  {
    id: 'staff',
    label: 'Staff',
    description: 'Vigilancia, recepción, mantenimiento',
  },
];

export default function MobileDemo() {
  const [view, setView] = useState<ViewKey>('resident');
  const current = VIEWS.find((v) => v.id === view) ?? VIEWS[0]!;

  return (
    <div
      className="min-h-screen w-full flex flex-col items-center p-6 font-sans"
      style={{
        background:
          'radial-gradient(ellipse at 50% 0%, #F5EEDD 0%, #EDE3CB 70%, #EDE3CB 100%)',
      }}
    >
      <div className="text-center mb-4 mt-4">
        <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-muted font-bold">
          Vista Condominio
        </p>
        <p className="font-serif italic text-[28px] text-ink mt-1.5 leading-[1.1] font-normal">
          {current.description}
        </p>
      </div>

      <div className="inline-flex p-1 mb-5 bg-paper border border-line rounded-full">
        {VIEWS.map((v) => (
          <button
            key={v.id}
            onClick={() => setView(v.id)}
            className={[
              'px-4 py-2 rounded-full font-sans text-xs font-semibold transition-colors',
              view === v.id ? 'bg-forestDeep text-cream' : 'bg-transparent text-inkSoft',
            ].join(' ')}
          >
            {v.label}
          </button>
        ))}
      </div>

      <div className="flex flex-col items-center">
        {view === 'resident' && <ResidentApp />}
        {view === 'admin' && <AdminApp />}
        {view === 'staff' && <StaffApp />}
      </div>

      <p className="font-sans text-[11px] text-muted mt-5 max-w-[440px] text-center leading-[1.55]">
        Tres apps, una misma filosofía de diseño. Cambia la vista arriba para navegar entre los
        roles. La app del residente tiene además un switcher interno para ver los tres tipos de
        residente.
      </p>
    </div>
  );
}
