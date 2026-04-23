import type { ReactNode } from 'react';
import type { PaymentStatus } from '@/components';

/**
 * Utilidades compartidas del demo. NO son código de producción: replican el chrome
 * del prototipo (marco de teléfono, status bar falsa, heading grande) para que las
 * tres apps móviles se vean como en `prototypes/App.jsx`.
 */

// ============================================================
// TIPOS DE DATOS DEMO
// ============================================================

export type ResidentRoleKey = 'owner-resident' | 'owner-landlord' | 'tenant';

export interface CuotaBreakdown {
  label: string;
  amount: number;
}

export interface Cuota {
  total: number;
  dueDay: number;
  status: PaymentStatus;
  method?: string;
  submittedAt?: string;
  breakdown: CuotaBreakdown[];
}

export interface NextReservation {
  place: string;
  dayWord: string;
  day: number;
  month: string;
  time: string;
  guests: number;
}

export interface ResidentRole {
  key: ResidentRoleKey;
  label: string;
  short: string;
  name: string;
  initial: string;
  unit: string;
  since: string;
  cuota: Cuota;
  canReserve: boolean;
  canVisits: boolean;
  nextReservation?: NextReservation;
  tenant?: { name: string; contract: string; rentDate: string };
  landlord?: { name: string };
}

export const RESIDENT_ROLES: Record<ResidentRoleKey, ResidentRole> = {
  'owner-resident': {
    key: 'owner-resident',
    label: 'Propietario · vive',
    short: 'Propietaria residente',
    name: 'Alejandra Reyes',
    initial: 'A',
    unit: '804',
    since: 'Propietaria desde 2022',
    cuota: {
      total: 7850,
      dueDay: 24,
      status: 'pendiente',
      breakdown: [
        { label: 'Mantenimiento', amount: 4850 },
        { label: 'Cuota construcción 32 / 60', amount: 3000 },
      ],
    },
    canReserve: true,
    canVisits: true,
    nextReservation: {
      place: 'Salón de eventos',
      dayWord: 'SAB',
      day: 25,
      month: 'ABR',
      time: '20:00 – 01:00',
      guests: 12,
    },
  },
  'owner-landlord': {
    key: 'owner-landlord',
    label: 'Propietario · renta',
    short: 'Propietaria arrendadora',
    name: 'Alejandra Reyes',
    initial: 'A',
    unit: '1102',
    since: 'Propietaria desde 2019',
    tenant: { name: 'Carlos Mendoza', contract: 'sep 2025 – ago 2026', rentDate: '03 abr' },
    cuota: {
      total: 5200,
      dueDay: 24,
      status: 'pendiente',
      breakdown: [{ label: 'Mantenimiento', amount: 5200 }],
    },
    canReserve: false,
    canVisits: false,
  },
  tenant: {
    key: 'tenant',
    label: 'Inquilino',
    short: 'Inquilino',
    name: 'Mauricio Serna',
    initial: 'M',
    unit: '602',
    since: 'Rentando desde ene 2025',
    landlord: { name: 'Lucía Gómez' },
    cuota: {
      total: 4300,
      dueDay: 24,
      status: 'en-revision',
      method: 'SPEI',
      submittedAt: '19 abr',
      breakdown: [{ label: 'Mantenimiento', amount: 4300 }],
    },
    canReserve: true,
    canVisits: true,
    nextReservation: {
      place: 'Asador',
      dayWord: 'DOM',
      day: 26,
      month: 'ABR',
      time: '14:00 – 18:00',
      guests: 8,
    },
  },
};

// ============================================================
// CHROME DEL DEMO (phone frame + status bar)
// ============================================================

export function Phone({ children }: { children: ReactNode }) {
  return (
    <div
      className="relative bg-paper overflow-hidden"
      style={{
        width: 380,
        height: 780,
        borderRadius: 48,
        boxShadow:
          '0 30px 80px -20px rgba(31,46,36,0.35), 0 0 0 1px rgba(31,46,36,0.06)',
      }}
    >
      {children}
    </div>
  );
}

export function StatusBar({ time = '9:41' }: { time?: string }) {
  return (
    <div className="flex justify-between items-center px-6 pt-3 pb-1 text-ink font-sans text-[13px] font-semibold">
      <span>{time}</span>
      <div className="flex items-center gap-1">
        <div className="flex gap-[2px] items-end">
          {[4, 6, 8, 10].map((h, i) => (
            <div key={i} className="bg-ink rounded-[1px]" style={{ width: 3, height: h }} />
          ))}
        </div>
        <div
          className="border border-ink rounded-[3px] p-[1px] ml-1.5 relative"
          style={{ width: 24, height: 11 }}
        >
          <div className="h-full bg-ink rounded-[1px]" style={{ width: '75%' }} />
          <div
            className="absolute bg-ink rounded-[1px]"
            style={{ right: -3, top: 3, width: 2, height: 4 }}
          />
        </div>
      </div>
    </div>
  );
}

// ============================================================
// HEADING DEL DEMO (título de sección grande, como el prototipo)
// ============================================================
// El SectionHeader de producción usa h2 22px; el prototipo usa h1 32px.
// DemoHeading replica el prototipo para que las pantallas se vean idénticas.

export interface DemoHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}

export function DemoHeading({ eyebrow, title, subtitle }: DemoHeadingProps) {
  return (
    <div className="px-5 pt-4">
      {eyebrow && (
        <p className="font-sans text-[10px] uppercase tracking-[0.18em] text-muted font-semibold">
          {eyebrow}
        </p>
      )}
      <h1 className="font-serif italic text-[32px] leading-[1.05] text-ink font-normal mt-1">
        {title}
      </h1>
      {subtitle && (
        <p className="font-sans text-xs text-inkSoft mt-1.5 leading-[1.45]">{subtitle}</p>
      )}
    </div>
  );
}

// ============================================================
// SCROLL CONTAINER del teléfono
// ============================================================

export function PhoneScroll({ children }: { children: ReactNode }) {
  return (
    <div
      className="phone-scroll"
      style={{ height: 'calc(100% - 32px)', overflowY: 'auto' }}
    >
      {children}
    </div>
  );
}
