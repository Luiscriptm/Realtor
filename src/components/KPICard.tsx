import type { ReactNode } from 'react';

/**
 * Tarjeta de indicador para dashboards. Cifra grande en serif, eyebrow arriba, sub abajo.
 * Variante `accent` cambia el fondo (hero = dark forestDeep para KPI estrella).
 */

export type KPIAccent = 'default' | 'hero' | 'terra' | 'cream';

export interface KPICardProps {
  label: string;
  value: string | number;
  unit?: string;
  sub?: string;
  accent?: KPIAccent;
  trailing?: ReactNode;
  className?: string;
}

const ACCENT_CLASSES: Record<KPIAccent, string> = {
  default: 'bg-paper border border-line text-ink',
  hero: 'bg-forestDeep text-cream',
  terra: 'bg-terra text-cream',
  cream: 'bg-cream text-ink',
};

const EYEBROW_CLASSES: Record<KPIAccent, string> = {
  default: 'text-muted',
  hero: 'text-cream/65',
  terra: 'text-cream/75',
  cream: 'text-muted',
};

const UNIT_CLASSES: Record<KPIAccent, string> = {
  default: 'text-muted',
  hero: 'text-cream/65',
  terra: 'text-cream/75',
  cream: 'text-muted',
};

const SUB_CLASSES: Record<KPIAccent, string> = {
  default: 'text-inkSoft',
  hero: 'text-cream/75',
  terra: 'text-cream/85',
  cream: 'text-inkSoft',
};

export function KPICard({
  label,
  value,
  unit,
  sub,
  accent = 'default',
  trailing,
  className = '',
}: KPICardProps) {
  return (
    <div className={['rounded-[16px] p-5', ACCENT_CLASSES[accent], className].join(' ')}>
      <div className="flex items-start justify-between gap-3">
        <p
          className={[
            'font-sans text-[10px] uppercase tracking-[0.18em] font-semibold',
            EYEBROW_CLASSES[accent],
          ].join(' ')}
        >
          {label}
        </p>
        {trailing}
      </div>
      <div className="flex items-baseline gap-1.5 mt-3">
        <span className="font-serif text-[36px] leading-none font-normal">{value}</span>
        {unit && (
          <span className={['font-sans text-xs', UNIT_CLASSES[accent]].join(' ')}>{unit}</span>
        )}
      </div>
      {sub && (
        <p className={['font-sans text-xs mt-2', SUB_CLASSES[accent]].join(' ')}>{sub}</p>
      )}
    </div>
  );
}
