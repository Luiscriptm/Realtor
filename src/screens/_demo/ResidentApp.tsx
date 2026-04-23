import { useState } from 'react';
import {
  ArrowRight,
  Banknote,
  Bell,
  Building2,
  Car,
  CalendarDays,
  Check,
  ChevronDown,
  ChevronRight,
  CreditCard,
  Download,
  FileText,
  Home,
  Info,
  Landmark,
  MessageSquare,
  Megaphone,
  Plus,
  Settings,
  Upload,
  User,
  Users,
  Waves,
  Dumbbell,
  Utensils,
  Flame,
  Wrench,
} from 'lucide-react';
import { StatusPill, TabBar, type TabBarItem } from '@/components';
import {
  DemoHeading,
  Phone,
  PhoneScroll,
  RESIDENT_ROLES,
  StatusBar,
  type ResidentRoleKey,
} from './shared';

/**
 * Port del prototipo: app del residente. 5 pantallas + tab bar + switcher de rol
 * (owner-resident / owner-landlord / tenant) arriba del frame. Demo-only.
 */

// ============================================================
// INICIO
// ============================================================

function ResidentInicio({ role }: { role: ResidentRoleKey }) {
  const r = RESIDENT_ROLES[role];
  return (
    <div className="flex flex-col" style={{ paddingBottom: 100 }}>
      <div className="flex justify-between items-start px-5 pt-4">
        <button className="flex items-center gap-2 bg-cream rounded-full pl-2 pr-2.5 py-1.5">
          <Building2 size={13} className="text-forest" strokeWidth={1.8} />
          <span className="font-sans text-[11px] text-ink font-semibold">
            Torre Marina · {r.unit}
          </span>
          <ChevronDown size={12} className="text-muted" strokeWidth={2} />
        </button>
        <button className="relative w-9 h-9 rounded-full bg-cream flex items-center justify-center">
          <Bell size={16} className="text-ink" strokeWidth={1.8} />
          <div className="absolute top-2 right-[9px] w-[7px] h-[7px] bg-terra rounded-full border-[1.5px] border-paper" />
        </button>
      </div>

      <div className="px-5 mt-5">
        <p className="font-sans text-[10px] uppercase tracking-[0.18em] text-muted font-semibold">
          {r.short} · martes 21 abr
        </p>
        <h1 className="font-serif text-[36px] leading-[1.05] text-ink font-normal mt-1.5">
          Hola,
          <br />
          <span className="italic">{r.name.split(' ')[0]}.</span>
        </h1>
      </div>

      {role === 'owner-resident' && (
        <div className="mx-5 mt-6 rounded-[20px] bg-forestDeep text-cream relative overflow-hidden">
          <div className="absolute -top-[30px] -right-[30px] w-[140px] h-[140px] rounded-full bg-terra/[0.18]" />
          <div className="p-5 relative">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-sans text-[10px] uppercase tracking-[0.18em] opacity-65 font-semibold">
                  Cuota de abril
                </p>
                <div className="flex items-baseline gap-1 mt-3">
                  <span className="font-serif text-[40px] leading-none font-normal">
                    ${r.cuota.total.toLocaleString()}
                  </span>
                  <span className="font-sans text-xs opacity-65">MXN</span>
                </div>
              </div>
              <div className="bg-cream/15 px-2.5 py-1 rounded-full font-sans text-[10px] font-bold tracking-[0.05em]">
                VENCE EN 3 DÍAS
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-cream/15">
              {r.cuota.breakdown.map((b, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center"
                  style={{ marginTop: i > 0 ? 6 : 0 }}
                >
                  <span className="font-sans text-xs opacity-80">{b.label}</span>
                  <span className="font-sans text-xs font-semibold">
                    ${b.amount.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
            <button className="w-full mt-5 flex items-center justify-between px-4 py-3 bg-terra text-cream rounded-[12px] font-sans font-semibold text-sm">
              <span>Pagar ahora</span>
              <ArrowRight size={16} strokeWidth={2.2} />
            </button>
          </div>
        </div>
      )}

      {role === 'owner-landlord' && r.tenant && (
        <>
          <div className="mx-5 mt-6 rounded-[20px] bg-paper border border-line p-[18px]">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-sans text-[10px] uppercase tracking-[0.18em] text-muted font-semibold">
                  Tu inquilino
                </p>
                <p className="font-serif text-2xl text-ink mt-1.5 font-normal">{r.tenant.name}</p>
                <p className="font-sans text-[11px] text-muted mt-0.5">
                  Contrato {r.tenant.contract}
                </p>
              </div>
              <div className="w-11 h-11 rounded-full bg-cream text-forest flex items-center justify-center font-serif text-xl">
                C
              </div>
            </div>
            <div className="flex items-center gap-2 mt-4 pt-3 border-t border-line">
              <Check size={14} className="text-sage" strokeWidth={2} />
              <span className="font-sans text-xs text-inkSoft font-medium">
                Renta de abril recibida el {r.tenant.rentDate}
              </span>
            </div>
          </div>
          <div className="mx-5 mt-3 p-4 rounded-[16px] bg-forestDeep text-cream">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-sans text-[10px] uppercase tracking-[0.18em] opacity-65 font-semibold">
                  Mantenimiento abril
                </p>
                <div className="flex items-baseline gap-1 mt-2">
                  <span className="font-serif text-[30px] leading-none font-normal">
                    ${r.cuota.total.toLocaleString()}
                  </span>
                  <span className="font-sans text-[11px] opacity-65">MXN</span>
                </div>
              </div>
              <button className="bg-terra text-cream px-4 py-2.5 rounded-[10px] font-sans text-xs font-semibold">
                Pagar
              </button>
            </div>
          </div>
        </>
      )}

      {role === 'tenant' && (
        <div className="mx-5 mt-6 rounded-[20px] bg-paper border border-line p-[18px]">
          <div className="flex justify-between items-start">
            <div>
              <p className="font-sans text-[10px] uppercase tracking-[0.18em] text-muted font-semibold">
                Mantenimiento abril
              </p>
              <div className="flex items-baseline gap-1 mt-2">
                <span className="font-serif text-4xl text-ink leading-none font-normal">
                  ${r.cuota.total.toLocaleString()}
                </span>
                <span className="font-sans text-xs text-muted">MXN</span>
              </div>
            </div>
            <StatusPill status={r.cuota.status} />
          </div>
          <div className="mt-4 p-3 bg-cream rounded-[12px]">
            <div className="flex items-start gap-2">
              <Info size={14} className="text-ambar mt-0.5" strokeWidth={2} />
              <div>
                <p className="font-sans text-xs text-ink font-semibold">Comprobante SPEI subido</p>
                <p className="font-sans text-[11px] text-muted mt-0.5 leading-[1.4]">
                  Administración lo está validando. Normalmente toma menos de 24 hrs.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {r.canReserve && r.nextReservation && (
        <>
          <div className="px-5 mt-8 flex justify-between items-baseline">
            <h2 className="font-serif italic text-[22px] text-ink font-normal">Esta semana</h2>
            <button className="font-sans text-[11px] text-muted font-medium">Ver todo</button>
          </div>
          <div className="mx-5 mt-3 bg-paper border border-line rounded-[16px] p-4">
            <div className="flex gap-3">
              <div className="w-11 h-11 rounded-[10px] bg-cream flex flex-col items-center justify-center shrink-0">
                <span className="font-sans text-[8px] text-muted tracking-[0.1em] font-semibold">
                  {r.nextReservation.dayWord}
                </span>
                <span className="font-serif text-lg text-ink leading-none">
                  {r.nextReservation.day}
                </span>
              </div>
              <div className="flex-1">
                <p className="font-sans text-sm text-ink font-semibold">
                  {r.nextReservation.place}
                </p>
                <p className="font-sans text-xs text-muted mt-0.5">
                  {r.nextReservation.time} · {r.nextReservation.guests} invitados
                </p>
              </div>
              <ChevronRight size={18} className="text-muted" strokeWidth={1.5} />
            </div>
          </div>
        </>
      )}

      {!r.canReserve && r.tenant && (
        <div className="mx-5 mt-6 p-4 bg-cream rounded-[16px]">
          <div className="flex gap-3">
            <Info size={16} className="text-forest mt-0.5 shrink-0" strokeWidth={2} />
            <div>
              <p className="font-sans text-[13px] text-ink font-semibold">
                Esta unidad está arrendada
              </p>
              <p className="font-sans text-[11px] text-inkSoft mt-1 leading-[1.5]">
                Las reservas y visitas las gestiona <b>{r.tenant.name}</b> durante la vigencia del
                contrato.
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="px-5 mt-8 flex justify-between items-baseline">
        <h2 className="font-serif italic text-[22px] text-ink font-normal">Avisos</h2>
        <span className="font-sans text-[10px] text-terra font-bold tracking-[0.1em] uppercase">
          3 nuevos
        </span>
      </div>
      <div className="mx-5 mt-3 space-y-2">
        {[
          {
            tag: 'Mantenimiento',
            title: 'Limpieza profunda de alberca',
            when: 'jueves 24 · todo el día',
            icon: Wrench,
          },
          {
            tag: 'Asamblea',
            title: 'Nueva cuota aprobada para mayo',
            when: 'hace 2 días',
            icon: Megaphone,
          },
          {
            tag: 'Seguridad',
            title: 'Simulacro de evacuación',
            when: 'viernes 25 · 11:00',
            icon: Bell,
          },
        ].map((a, i) => {
          const Icon = a.icon;
          return (
            <div
              key={i}
              className="flex gap-3 py-3"
              style={{ borderBottom: i < 2 ? '1px solid #E3DBC5' : 'none' }}
            >
              <div className="w-9 h-9 rounded-[10px] bg-cream flex items-center justify-center shrink-0">
                <Icon size={16} className="text-forest" strokeWidth={1.8} />
              </div>
              <div className="flex-1">
                <p className="font-sans text-[9px] text-muted tracking-[0.14em] uppercase font-bold">
                  {a.tag}
                </p>
                <p className="font-sans text-[13px] text-ink font-medium mt-0.5">{a.title}</p>
                <p className="font-sans text-[11px] text-muted mt-0.5">{a.when}</p>
              </div>
            </div>
          );
        })}
      </div>

      {r.canVisits && (
        <button
          className="absolute bg-ink text-cream font-sans text-[13px] font-semibold flex items-center gap-1.5 px-[18px] py-3 rounded-full"
          style={{ bottom: 92, right: 16, boxShadow: '0 8px 24px rgba(31,46,36,0.25)' }}
        >
          <Plus size={16} strokeWidth={2.4} /> Registrar visita
        </button>
      )}
    </div>
  );
}

// ============================================================
// PAGOS
// ============================================================

function ResidentPagos({ role }: { role: ResidentRoleKey }) {
  const r = RESIDENT_ROLES[role];
  const [method, setMethod] = useState<'tarjeta' | 'spei' | 'deposito' | 'efectivo'>('spei');
  const methods = [
    {
      id: 'tarjeta' as const,
      icon: CreditCard,
      label: 'Tarjeta',
      sub: 'Débito o crédito · confirmación inmediata',
    },
    {
      id: 'spei' as const,
      icon: Landmark,
      label: 'Transferencia SPEI',
      sub: 'Sube comprobante · validación < 24h',
    },
    {
      id: 'deposito' as const,
      icon: Building2,
      label: 'Depósito en banco',
      sub: 'Ventanilla o práctico · sube comprobante',
    },
    {
      id: 'efectivo' as const,
      icon: Banknote,
      label: 'Efectivo en oficina',
      sub: 'Lunes a viernes · 9:00 – 18:00',
    },
  ];

  return (
    <div className="flex flex-col" style={{ paddingBottom: 100 }}>
      <div className="px-5 pt-4">
        <p className="font-sans text-[10px] uppercase tracking-[0.18em] text-muted font-semibold">
          Torre Marina · {r.unit}
        </p>
        <h1 className="font-serif italic text-[32px] text-ink font-normal mt-1">Pagos</h1>
      </div>

      <div className="mx-5 mt-5 p-5 bg-cream rounded-[20px]">
        <div className="flex justify-between items-start">
          <div>
            <p className="font-sans text-[11px] text-inkSoft font-medium">Por pagar</p>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="font-serif text-[44px] text-ink leading-none font-normal">
                ${r.cuota.total.toLocaleString()}
              </span>
              <span className="font-sans text-xs text-muted">MXN</span>
            </div>
          </div>
          <StatusPill status={r.cuota.status} />
        </div>
        {r.cuota.breakdown.length > 1 && (
          <div className="mt-3 pt-3 border-t border-creamDeep">
            {r.cuota.breakdown.map((b, i) => (
              <div
                key={i}
                className="flex justify-between items-center"
                style={{ marginTop: i > 0 ? 4 : 0 }}
              >
                <span className="font-sans text-xs text-inkSoft">{b.label}</span>
                <span className="font-sans text-xs text-ink font-semibold">
                  ${b.amount.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        )}
        <p className="font-sans text-[11px] text-terra mt-2.5 font-medium">
          Vence el {r.cuota.dueDay} de abril
        </p>
      </div>

      <div className="px-5 mt-7">
        <h2 className="font-serif italic text-[22px] text-ink font-normal">Cómo quieres pagar</h2>
      </div>

      <div className="mx-5 mt-3 space-y-2">
        {methods.map((m) => {
          const Icon = m.icon;
          const selected = method === m.id;
          return (
            <button
              key={m.id}
              onClick={() => setMethod(m.id)}
              className={[
                'w-full flex items-center gap-3 p-3 text-left border rounded-[14px]',
                selected ? 'bg-forestDeep border-forestDeep text-cream' : 'bg-paper border-line text-ink',
              ].join(' ')}
            >
              <div
                className={[
                  'w-9 h-9 rounded-[10px] flex items-center justify-center',
                  selected ? 'bg-cream/10' : 'bg-cream',
                ].join(' ')}
              >
                <Icon
                  size={16}
                  className={selected ? 'text-cream' : 'text-forest'}
                  strokeWidth={1.8}
                />
              </div>
              <div className="flex-1">
                <p className="font-sans text-[13px] font-semibold">{m.label}</p>
                <p className="font-sans text-[10px] opacity-70 mt-0.5">{m.sub}</p>
              </div>
              <div
                className={[
                  'w-[18px] h-[18px] rounded-full border-[1.5px] flex items-center justify-center',
                  selected ? 'border-cream' : 'border-line',
                ].join(' ')}
              >
                {selected && <div className="w-2 h-2 rounded-full bg-cream" />}
              </div>
            </button>
          );
        })}
      </div>

      <div
        className="mx-5 mt-3 p-4 bg-paper rounded-[14px]"
        style={{ border: '1px dashed #E3DBC5' }}
      >
        {method === 'spei' && (
          <>
            <p className="font-sans text-[11px] tracking-[0.15em] uppercase text-muted font-bold">
              Datos para transferir
            </p>
            <div className="mt-3 space-y-2">
              <div>
                <p className="font-sans text-[10px] text-muted font-semibold">CLABE</p>
                <p className="font-serif text-base text-ink">012 320 00123456789 0</p>
              </div>
              <div>
                <p className="font-sans text-[10px] text-muted font-semibold">
                  Concepto / referencia
                </p>
                <p className="font-serif text-base text-ink">{r.unit}-ABR-26</p>
              </div>
            </div>
            <button className="w-full mt-4 py-3 flex items-center justify-center gap-2 bg-forestDeep text-cream rounded-[10px] font-sans font-semibold text-[13px]">
              <Upload size={14} strokeWidth={2.2} /> Ya transferí · subir comprobante
            </button>
          </>
        )}
        {method === 'tarjeta' && (
          <>
            <p className="font-sans text-[11px] tracking-[0.15em] uppercase text-muted font-bold">
              Pago con tarjeta
            </p>
            <p className="font-sans text-xs text-inkSoft mt-1.5 leading-[1.5]">
              Confirmación instantánea.
            </p>
            <button className="w-full mt-4 py-3 bg-forestDeep text-cream rounded-[10px] font-sans font-semibold text-[13px]">
              Continuar
            </button>
          </>
        )}
        {method === 'deposito' && (
          <>
            <p className="font-sans text-[11px] tracking-[0.15em] uppercase text-muted font-bold">
              Depósito bancario
            </p>
            <div className="mt-3 space-y-2">
              <div>
                <p className="font-sans text-[10px] text-muted font-semibold">Banco</p>
                <p className="font-sans text-[13px] text-ink font-semibold">BBVA</p>
              </div>
              <div>
                <p className="font-sans text-[10px] text-muted font-semibold">Cuenta</p>
                <p className="font-serif text-base text-ink">0123 4567 89</p>
              </div>
            </div>
            <button className="w-full mt-4 py-3 flex items-center justify-center gap-2 bg-forestDeep text-cream rounded-[10px] font-sans font-semibold text-[13px]">
              <Upload size={14} /> Subir comprobante
            </button>
          </>
        )}
        {method === 'efectivo' && (
          <>
            <p className="font-sans text-[11px] tracking-[0.15em] uppercase text-muted font-bold">
              Pago en oficina
            </p>
            <p className="font-sans text-xs text-inkSoft mt-1.5 leading-[1.5]">
              Lun – vie · 9:00 a 18:00. Tu cuota se marcará como pagada cuando administración
              registre el pago.
            </p>
          </>
        )}
      </div>

      <div className="px-5 mt-8 flex justify-between items-baseline">
        <h2 className="font-serif italic text-[22px] text-ink font-normal">Historial</h2>
        <button className="flex items-center gap-1 font-sans text-[11px] text-muted font-medium">
          <Download size={12} /> Exportar
        </button>
      </div>
      <div className="mx-5 mt-3">
        {[
          { month: 'Marzo 2026', amount: r.cuota.total, method: 'SPEI', date: '03 mar' },
          { month: 'Febrero 2026', amount: r.cuota.total, method: 'Tarjeta', date: '05 feb' },
          { month: 'Enero 2026', amount: r.cuota.total, method: 'Efectivo', date: '08 ene' },
        ].map((h, i) => (
          <div
            key={i}
            className="flex items-center justify-between py-3 border-b border-line"
          >
            <div>
              <p className="font-sans text-[13px] text-ink font-medium">{h.month}</p>
              <p className="font-sans text-[11px] text-muted mt-0.5">
                {h.method} · pagado el {h.date}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-serif text-[17px] text-ink font-normal">
                ${h.amount.toLocaleString()}
              </span>
              <div className="w-[22px] h-[22px] rounded-full bg-sage flex items-center justify-center">
                <Check size={12} className="text-paper" strokeWidth={3} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================================
// RESERVAS
// ============================================================

function ResidentReservas({ role }: { role: ResidentRoleKey }) {
  const r = RESIDENT_ROLES[role];
  if (!r.canReserve) {
    return (
      <div className="flex flex-col px-5 pt-6" style={{ paddingBottom: 100 }}>
        <DemoHeading eyebrow="Áreas comunes" title="Reservas" />
        <div className="mt-8 p-6 text-center flex flex-col items-center bg-paper border border-line rounded-[20px]">
          <div className="w-[52px] h-[52px] rounded-full bg-cream flex items-center justify-center">
            <Building2 size={20} className="text-forest" strokeWidth={1.5} />
          </div>
          <p className="font-serif text-xl text-ink mt-3 leading-[1.25] font-normal">
            Unidad arrendada
          </p>
          <p className="font-sans text-xs text-inkSoft mt-2 leading-[1.5] max-w-[260px]">
            Mientras <b>{r.tenant?.name}</b> sea el residente, las reservas son exclusivas suyas.
          </p>
        </div>
      </div>
    );
  }
  const amenities = [
    { name: 'Alberca', icon: Waves, avail: 'Abierta hasta 21:00', accent: 'text-[#4A7DA0]' },
    { name: 'Gimnasio', icon: Dumbbell, avail: '3 personas ahora', accent: 'text-[#8A6B3D]' },
    { name: 'Salón eventos', icon: Utensils, avail: 'Reservado sáb', accent: 'text-terra' },
    { name: 'Asador', icon: Flame, avail: 'Libre hoy', accent: 'text-warn' },
  ];
  return (
    <div className="flex flex-col" style={{ paddingBottom: 100 }}>
      <DemoHeading eyebrow="Áreas comunes" title="Reservas" />
      <div className="px-5 mt-6 grid grid-cols-2 gap-3">
        {amenities.map((a) => {
          const Icon = a.icon;
          return (
            <button
              key={a.name}
              className="text-left p-4 bg-paper border border-line rounded-[16px]"
              style={{ minHeight: 130 }}
            >
              <div className="w-9 h-9 rounded-[10px] bg-cream flex items-center justify-center">
                <Icon size={18} className={a.accent} strokeWidth={1.8} />
              </div>
              <p className="font-serif text-lg text-ink mt-3.5 font-normal">{a.name}</p>
              <p className="font-sans text-[10px] text-muted mt-1 leading-[1.4]">{a.avail}</p>
            </button>
          );
        })}
      </div>
      {r.nextReservation && (
        <>
          <div className="px-5 mt-8">
            <h2 className="font-serif italic text-[22px] text-ink font-normal">Mis reservas</h2>
          </div>
          <div className="mx-5 mt-3 p-4 bg-forestDeep text-cream rounded-[16px]">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-sans text-[10px] uppercase tracking-[0.18em] opacity-60 font-semibold">
                  Próxima
                </p>
                <p className="font-serif text-[22px] mt-1 font-normal">
                  {r.nextReservation.place}
                </p>
                <p className="font-sans text-xs opacity-75 mt-1">
                  {r.nextReservation.dayWord.toLowerCase()} {r.nextReservation.day} abr ·{' '}
                  {r.nextReservation.time}
                </p>
              </div>
              <div className="text-right">
                <p className="font-serif text-[34px] leading-none font-normal">
                  {r.nextReservation.day}
                </p>
                <p className="font-sans text-[10px] tracking-[0.18em] opacity-60 font-semibold">
                  {r.nextReservation.month}
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// ============================================================
// COMUNIDAD
// ============================================================

function ResidentComunidad() {
  return (
    <div className="flex flex-col" style={{ paddingBottom: 100 }}>
      <DemoHeading eyebrow="Torre Marina" title="Comunidad" />
      <div className="px-5 mt-6 space-y-4">
        {[
          {
            tag: 'Administración',
            title: 'Nueva cuota aprobada en asamblea',
            body: 'A partir del 1 de mayo la cuota mensual será de $5,100 MXN.',
            when: 'hace 2 días',
          },
          {
            tag: 'Mantenimiento',
            title: 'Limpieza profunda de alberca',
            body: 'El jueves 24 la alberca permanecerá cerrada todo el día.',
            when: 'hace 4 días',
          },
          {
            tag: 'Seguridad',
            title: 'Simulacro de evacuación',
            body: 'Participación voluntaria, 11:00 hrs en el lobby.',
            when: 'hace 5 días',
          },
        ].map((a, i) => (
          <div key={i} className="bg-paper border border-line rounded-[16px] p-4">
            <div className="flex justify-between items-center">
              <span className="font-sans text-[9px] tracking-[0.16em] uppercase text-terra font-bold">
                {a.tag}
              </span>
              <span className="font-sans text-[10px] text-muted">{a.when}</span>
            </div>
            <p className="font-serif text-lg text-ink mt-2 leading-[1.2] font-normal">{a.title}</p>
            <p className="font-sans text-xs text-inkSoft mt-1.5 leading-[1.5]">{a.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================================
// PERFIL
// ============================================================

function ResidentPerfil({ role }: { role: ResidentRoleKey }) {
  const r = RESIDENT_ROLES[role];
  const items =
    role === 'owner-landlord'
      ? [
          { icon: User, label: 'Mis datos' },
          { icon: Users, label: 'Inquilino actual', hint: r.tenant?.name },
          { icon: FileText, label: 'Contrato de arrendamiento', hint: r.tenant?.contract },
          { icon: FileText, label: 'Escrituras y documentos' },
        ]
      : role === 'tenant'
        ? [
            { icon: User, label: 'Mis datos' },
            { icon: Car, label: 'Vehículos', hint: '1 registrado' },
            { icon: Users, label: 'Visitas frecuentes', hint: '2 contactos' },
            { icon: FileText, label: 'Mi contrato', hint: 'Hasta ene 2026' },
            { icon: Building2, label: 'Propietario', hint: r.landlord?.name },
          ]
        : [
            { icon: User, label: 'Datos personales' },
            { icon: Car, label: 'Vehículos', hint: '2 registrados' },
            { icon: Users, label: 'Visitas frecuentes', hint: '5 contactos' },
            { icon: FileText, label: 'Escrituras y documentos' },
            { icon: Settings, label: 'Notificaciones' },
          ];
  return (
    <div className="flex flex-col" style={{ paddingBottom: 100 }}>
      <DemoHeading eyebrow="Tu cuenta" title="Perfil" />
      <div className="mx-5 mt-5 p-5 flex items-center gap-4 bg-cream rounded-[20px]">
        <div className="w-[60px] h-[60px] rounded-full bg-forestDeep text-cream flex items-center justify-center font-serif text-[26px]">
          {r.initial}
        </div>
        <div className="flex-1">
          <p className="font-serif text-[22px] text-ink font-normal">{r.name}</p>
          <p className="font-sans text-xs text-muted mt-0.5">Torre Marina · Depto {r.unit}</p>
          <div className="inline-flex items-center gap-1 mt-2 px-2 py-[2px] bg-paper rounded-full">
            <div className="w-[5px] h-[5px] rounded-full bg-sage" />
            <p className="font-sans text-[10px] text-inkSoft font-semibold">{r.short}</p>
          </div>
        </div>
      </div>
      <div className="mx-5 mt-6 bg-paper border border-line rounded-[16px] overflow-hidden">
        {items.map((it, i) => {
          const Icon = it.icon;
          return (
            <button
              key={i}
              className="w-full flex items-center gap-3 px-4 py-4"
              style={{ borderBottom: i < items.length - 1 ? '1px solid #E3DBC5' : 'none' }}
            >
              <div className="w-8 h-8 rounded-[8px] bg-cream flex items-center justify-center">
                <Icon size={15} className="text-forest" strokeWidth={1.8} />
              </div>
              <div className="flex-1 text-left">
                <p className="font-sans text-[13px] text-ink font-medium">{it.label}</p>
                {it.hint && (
                  <p className="font-sans text-[10px] text-muted mt-0.5">{it.hint}</p>
                )}
              </div>
              <ChevronRight size={16} className="text-muted" />
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ============================================================
// APP WRAPPER + ROLE SWITCHER
// ============================================================

const TABS: TabBarItem[] = [
  { id: 'inicio', icon: Home, label: 'Inicio' },
  { id: 'pagos', icon: CreditCard, label: 'Pagos' },
  { id: 'reservas', icon: CalendarDays, label: 'Reservas' },
  { id: 'comunidad', icon: MessageSquare, label: 'Comunidad' },
  { id: 'perfil', icon: User, label: 'Perfil' },
];

export function ResidentApp() {
  const [tab, setTab] = useState('inicio');
  const [role, setRole] = useState<ResidentRoleKey>('owner-resident');
  return (
    <>
      <div className="inline-flex p-1 mb-4 bg-paper border border-line rounded-full">
        {Object.values(RESIDENT_ROLES).map((r) => (
          <button
            key={r.key}
            onClick={() => {
              setRole(r.key);
              setTab('inicio');
            }}
            className={[
              'px-3 py-2 rounded-full font-sans text-[10px] font-semibold',
              role === r.key ? 'bg-forestDeep text-cream' : 'bg-transparent text-inkSoft',
            ].join(' ')}
          >
            {r.label}
          </button>
        ))}
      </div>

      <Phone>
        <StatusBar />
        <PhoneScroll>
          {tab === 'inicio' && <ResidentInicio role={role} />}
          {tab === 'pagos' && <ResidentPagos role={role} />}
          {tab === 'reservas' && <ResidentReservas role={role} />}
          {tab === 'comunidad' && <ResidentComunidad />}
          {tab === 'perfil' && <ResidentPerfil role={role} />}
        </PhoneScroll>
        <div className="absolute bottom-0 left-0 right-0">
          <TabBar tabs={TABS} active={tab} onChange={setTab} />
        </div>
      </Phone>
    </>
  );
}
