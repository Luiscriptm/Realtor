import React, { useState } from 'react';
import {
  // Shared
  Home, CreditCard, CalendarDays, MessageSquare, User,
  Bell, ChevronRight, ChevronDown, Search,
  Plus, Check, Download, Upload, Info, ArrowRight,
  CheckCircle2, Clock, AlertCircle, AlertTriangle,
  FileText, Settings, LogOut, ChevronLeft,
  // Resident
  Waves, Dumbbell, Utensils, Flame, Car, Users, Wrench, Megaphone,
  Building2, Banknote, Landmark, CircleDot,
  // Admin
  LayoutDashboard, Wallet, FileBarChart, Files, MoreHorizontal,
  Send, Eye, TrendingUp, Sparkles, Filter, Mail,
  // Staff
  Shield, Package, QrCode, Camera, LogIn,
  Truck, Gift, Phone, PlayCircle, StopCircle, MapPin
} from 'lucide-react';

// ============================================================
// DESIGN TOKENS
// ============================================================
const C = {
  cream: '#F5EEDD', creamDeep: '#EDE3CB', paper: '#FBF7EC',
  ink: '#1F2E24', inkSoft: '#3D4A3F', muted: '#7A756A', line: '#E3DBC5',
  forest: '#2F4A37', forestDeep: '#1F3127',
  terra: '#B5643C', terraSoft: '#E8D3C2',
  sage: '#8AA58C', warn: '#A84433', ambar: '#C89B3D',
  sidebarMuted: '#8EA394',
};
const SERIF = "'Instrument Serif', 'Times New Roman', serif";
const SANS = "'Manrope', system-ui, sans-serif";

// ============================================================
// SHARED COMPONENTS
// ============================================================
function StatusBar({ time = '9:41' }) {
  return (
    <div className="flex justify-between items-center px-6 pt-3 pb-1"
         style={{ color: C.ink, fontFamily: SANS, fontSize: 13, fontWeight: 600 }}>
      <span>{time}</span>
      <div className="flex items-center gap-1">
        <div className="flex gap-[2px] items-end">
          {[4,6,8,10].map((h,i)=>(<div key={i} style={{ width:3, height:h, background:C.ink, borderRadius:1 }} />))}
        </div>
        <div style={{ width: 24, height: 11, border: `1px solid ${C.ink}`, borderRadius: 3, padding: 1, marginLeft: 6, position: 'relative' }}>
          <div style={{ width: '75%', height: '100%', background: C.ink, borderRadius: 1 }} />
          <div style={{ position: 'absolute', right: -3, top: 3, width: 2, height: 4, background: C.ink, borderRadius: 1 }} />
        </div>
      </div>
    </div>
  );
}

function TabBar({ tabs, active, onChange }) {
  return (
    <div className="absolute bottom-0 left-0 right-0 px-2 pt-2 pb-6"
         style={{ background: C.paper, borderTop: `1px solid ${C.line}` }}>
      <div className="flex justify-around items-start">
        {tabs.map(t => {
          const Icon = t.icon;
          const isActive = active === t.id;
          return (
            <button key={t.id} onClick={() => onChange(t.id)}
                    className="flex flex-col items-center gap-1 py-1 px-2 relative"
                    style={{ color: isActive ? C.forest : C.muted }}>
              <div className="relative">
                <Icon size={20} strokeWidth={isActive ? 2.2 : 1.6} />
                {t.badge && (
                  <span style={{ position: 'absolute', top: -4, right: -8, background: C.terra, color: C.cream, fontSize: 9, fontWeight: 700, padding: '1px 5px', borderRadius: 100 }}>
                    {t.badge}
                  </span>
                )}
              </div>
              <span style={{ fontFamily: SANS, fontSize: 10, fontWeight: isActive ? 600 : 500 }}>{t.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function StatusPill({ status, small }) {
  const map = {
    pagado:    { label: 'Pagado',    bg: 'rgba(138,165,140,0.2)', fg: C.forest, icon: CheckCircle2 },
    confirmado:{ label: 'Confirmado',bg: 'rgba(138,165,140,0.25)',fg: C.forest, icon: CheckCircle2 },
    revision:  { label: 'Revisión',  bg: '#F4E6C5',               fg: C.ambar,  icon: Clock },
   'en-revision':{label:'En revisión',bg:'#F4E6C5',               fg: C.ambar,  icon: CircleDot },
    pendiente: { label: 'Pendiente', bg: C.terraSoft,             fg: C.terra,  icon: Clock },
    moroso:    { label: 'Moroso',    bg: 'rgba(168,68,51,0.15)',  fg: C.warn,   icon: AlertCircle },
  };
  const s = map[status];
  const Icon = s.icon;
  return (
    <div className="inline-flex items-center gap-1" style={{ background: s.bg, color: s.fg, padding: small ? '3px 7px' : '4px 9px', borderRadius: 100, fontFamily: SANS, fontSize: small ? 9 : 10, fontWeight: 700, letterSpacing: '0.02em', textTransform: 'uppercase' }}>
      <Icon size={9} strokeWidth={2.5} /> {s.label}
    </div>
  );
}

function SectionHeader({ eyebrow, title, subtitle }) {
  return (
    <div className="px-5 pt-4">
      {eyebrow && (
        <p style={{ fontFamily: SANS, fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: C.muted, fontWeight: 600 }}>
          {eyebrow}
        </p>
      )}
      <h1 style={{ fontFamily: SERIF, fontSize: 32, color: C.ink, marginTop: 4, fontWeight: 400, lineHeight: 1.05 }}>
        <span style={{ fontStyle: 'italic' }}>{title}</span>
      </h1>
      {subtitle && (
        <p style={{ fontFamily: SANS, fontSize: 12, color: C.inkSoft, marginTop: 6, lineHeight: 1.45 }}>{subtitle}</p>
      )}
    </div>
  );
}

// ============================================================
// RESIDENT APP
// ============================================================
const RESIDENT_ROLES = {
  'owner-resident': {
    key: 'owner-resident', label: 'Propietario · vive', short: 'Propietaria residente',
    name: 'Alejandra Reyes', initial: 'A', unit: '804', since: 'Propietaria desde 2022',
    cuota: {
      total: 7850, dueDay: 24, status: 'pendiente',
      breakdown: [
        { label: 'Mantenimiento',              amount: 4850 },
        { label: 'Cuota construcción 32 / 60', amount: 3000 },
      ],
    },
    canReserve: true, canVisits: true,
    nextReservation: { place: 'Salón de eventos', dayWord: 'SAB', day: 25, month: 'ABR', time: '20:00 – 01:00', guests: 12 },
  },
  'owner-landlord': {
    key: 'owner-landlord', label: 'Propietario · renta', short: 'Propietaria arrendadora',
    name: 'Alejandra Reyes', initial: 'A', unit: '1102', since: 'Propietaria desde 2019',
    tenant: { name: 'Carlos Mendoza', contract: 'sep 2025 – ago 2026', rentDate: '03 abr' },
    cuota: {
      total: 5200, dueDay: 24, status: 'pendiente',
      breakdown: [{ label: 'Mantenimiento', amount: 5200 }],
    },
    canReserve: false, canVisits: false,
  },
  'tenant': {
    key: 'tenant', label: 'Inquilino', short: 'Inquilino',
    name: 'Mauricio Serna', initial: 'M', unit: '602', since: 'Rentando desde ene 2025',
    landlord: { name: 'Lucía Gómez' },
    cuota: {
      total: 4300, dueDay: 24, status: 'en-revision', method: 'SPEI', submittedAt: '19 abr',
      breakdown: [{ label: 'Mantenimiento', amount: 4300 }],
    },
    canReserve: true, canVisits: true,
    nextReservation: { place: 'Asador', dayWord: 'DOM', day: 26, month: 'ABR', time: '14:00 – 18:00', guests: 8 },
  },
};

function ResidentInicio({ role }) {
  const r = RESIDENT_ROLES[role];
  return (
    <div className="flex flex-col" style={{ paddingBottom: 100 }}>
      <div className="flex justify-between items-start px-5 pt-4">
        <button className="flex items-center gap-2" style={{ background: C.cream, padding: '6px 10px 6px 8px', borderRadius: 100 }}>
          <Building2 size={13} color={C.forest} strokeWidth={1.8} />
          <span style={{ fontFamily: SANS, fontSize: 11, color: C.ink, fontWeight: 600 }}>Torre Marina · {r.unit}</span>
          <ChevronDown size={12} color={C.muted} strokeWidth={2} />
        </button>
        <button className="relative" style={{ width: 36, height: 36, borderRadius: 18, background: C.cream, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Bell size={16} color={C.ink} strokeWidth={1.8} />
          <div style={{ position: 'absolute', top: 8, right: 9, width: 7, height: 7, background: C.terra, borderRadius: 4, border: `1.5px solid ${C.paper}` }} />
        </button>
      </div>

      <div className="px-5 mt-5">
        <p style={{ fontFamily: SANS, fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: C.muted, fontWeight: 600 }}>
          {r.short} · martes 21 abr
        </p>
        <h1 style={{ fontFamily: SERIF, fontSize: 36, lineHeight: 1.05, color: C.ink, fontWeight: 400, marginTop: 6 }}>
          Hola,<br/><span style={{ fontStyle: 'italic' }}>{r.name.split(' ')[0]}.</span>
        </h1>
      </div>

      {role === 'owner-resident' && (
        <div className="mx-5 mt-6 overflow-hidden" style={{ borderRadius: 20, background: C.forestDeep, color: C.cream, position: 'relative' }}>
          <div style={{ position: 'absolute', top: -30, right: -30, width: 140, height: 140, borderRadius: 100, background: 'rgba(181,100,60,0.18)' }} />
          <div className="p-5 relative">
            <div className="flex justify-between items-start">
              <div>
                <p style={{ fontFamily: SANS, fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', opacity: 0.65, fontWeight: 600 }}>Cuota de abril</p>
                <div className="flex items-baseline gap-1 mt-3">
                  <span style={{ fontFamily: SERIF, fontSize: 40, fontWeight: 400, lineHeight: 1 }}>${r.cuota.total.toLocaleString()}</span>
                  <span style={{ fontFamily: SANS, fontSize: 12, opacity: 0.65 }}>MXN</span>
                </div>
              </div>
              <div style={{ background: 'rgba(232,211,194,0.15)', padding: '4px 10px', borderRadius: 100, fontFamily: SANS, fontSize: 10, fontWeight: 700, letterSpacing: '0.05em' }}>
                VENCE EN 3 DÍAS
              </div>
            </div>
            <div className="mt-4 pt-3" style={{ borderTop: '1px solid rgba(245,238,221,0.15)' }}>
              {r.cuota.breakdown.map((b, i) => (
                <div key={i} className="flex justify-between items-center" style={{ marginTop: i > 0 ? 6 : 0 }}>
                  <span style={{ fontFamily: SANS, fontSize: 12, opacity: 0.8 }}>{b.label}</span>
                  <span style={{ fontFamily: SANS, fontSize: 12, fontWeight: 600 }}>${b.amount.toLocaleString()}</span>
                </div>
              ))}
            </div>
            <button className="w-full mt-5 flex items-center justify-between px-4 py-3"
                    style={{ background: C.terra, borderRadius: 12, color: C.cream, fontFamily: SANS, fontWeight: 600, fontSize: 14 }}>
              <span>Pagar ahora</span><ArrowRight size={16} strokeWidth={2.2} />
            </button>
          </div>
        </div>
      )}

      {role === 'owner-landlord' && (
        <>
          <div className="mx-5 mt-6" style={{ borderRadius: 20, background: C.paper, border: `1px solid ${C.line}`, padding: 18 }}>
            <div className="flex justify-between items-start">
              <div>
                <p style={{ fontFamily: SANS, fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: C.muted, fontWeight: 600 }}>Tu inquilino</p>
                <p style={{ fontFamily: SERIF, fontSize: 24, color: C.ink, marginTop: 6, fontWeight: 400 }}>{r.tenant.name}</p>
                <p style={{ fontFamily: SANS, fontSize: 11, color: C.muted, marginTop: 2 }}>Contrato {r.tenant.contract}</p>
              </div>
              <div style={{ width: 44, height: 44, borderRadius: 22, background: C.cream, color: C.forest, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: SERIF, fontSize: 20 }}>C</div>
            </div>
            <div className="flex items-center gap-2 mt-4 pt-3" style={{ borderTop: `1px solid ${C.line}` }}>
              <CheckCircle2 size={14} color={C.sage} strokeWidth={2} />
              <span style={{ fontFamily: SANS, fontSize: 12, color: C.inkSoft, fontWeight: 500 }}>Renta de abril recibida el {r.tenant.rentDate}</span>
            </div>
          </div>
          <div className="mx-5 mt-3 p-4" style={{ borderRadius: 16, background: C.forestDeep, color: C.cream }}>
            <div className="flex justify-between items-center">
              <div>
                <p style={{ fontFamily: SANS, fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', opacity: 0.65, fontWeight: 600 }}>Mantenimiento abril</p>
                <div className="flex items-baseline gap-1 mt-2">
                  <span style={{ fontFamily: SERIF, fontSize: 30, fontWeight: 400, lineHeight: 1 }}>${r.cuota.total.toLocaleString()}</span>
                  <span style={{ fontFamily: SANS, fontSize: 11, opacity: 0.65 }}>MXN</span>
                </div>
              </div>
              <button style={{ background: C.terra, color: C.cream, padding: '10px 16px', borderRadius: 10, fontFamily: SANS, fontSize: 12, fontWeight: 600 }}>Pagar</button>
            </div>
          </div>
        </>
      )}

      {role === 'tenant' && (
        <div className="mx-5 mt-6" style={{ borderRadius: 20, background: C.paper, border: `1px solid ${C.line}`, padding: 18 }}>
          <div className="flex justify-between items-start">
            <div>
              <p style={{ fontFamily: SANS, fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: C.muted, fontWeight: 600 }}>Mantenimiento abril</p>
              <div className="flex items-baseline gap-1 mt-2">
                <span style={{ fontFamily: SERIF, fontSize: 36, color: C.ink, fontWeight: 400, lineHeight: 1 }}>${r.cuota.total.toLocaleString()}</span>
                <span style={{ fontFamily: SANS, fontSize: 12, color: C.muted }}>MXN</span>
              </div>
            </div>
            <StatusPill status={r.cuota.status} />
          </div>
          <div className="mt-4 p-3" style={{ background: C.cream, borderRadius: 12 }}>
            <div className="flex items-start gap-2">
              <Info size={14} color={C.ambar} strokeWidth={2} style={{ marginTop: 2 }} />
              <div>
                <p style={{ fontFamily: SANS, fontSize: 12, color: C.ink, fontWeight: 600 }}>Comprobante SPEI subido</p>
                <p style={{ fontFamily: SANS, fontSize: 11, color: C.muted, marginTop: 2, lineHeight: 1.4 }}>
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
            <h2 style={{ fontFamily: SERIF, fontSize: 22, color: C.ink, fontStyle: 'italic', fontWeight: 400 }}>Esta semana</h2>
            <button style={{ fontFamily: SANS, fontSize: 11, color: C.muted, fontWeight: 500 }}>Ver todo</button>
          </div>
          <div className="mx-5 mt-3" style={{ background: C.paper, border: `1px solid ${C.line}`, borderRadius: 16, padding: 16 }}>
            <div className="flex gap-3">
              <div style={{ width: 44, height: 44, borderRadius: 10, background: C.cream, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span style={{ fontFamily: SANS, fontSize: 8, color: C.muted, letterSpacing: '0.1em', fontWeight: 600 }}>{r.nextReservation.dayWord}</span>
                <span style={{ fontFamily: SERIF, fontSize: 18, color: C.ink, lineHeight: 1 }}>{r.nextReservation.day}</span>
              </div>
              <div className="flex-1">
                <p style={{ fontFamily: SANS, fontSize: 14, color: C.ink, fontWeight: 600 }}>{r.nextReservation.place}</p>
                <p style={{ fontFamily: SANS, fontSize: 12, color: C.muted, marginTop: 2 }}>{r.nextReservation.time} · {r.nextReservation.guests} invitados</p>
              </div>
              <ChevronRight size={18} color={C.muted} strokeWidth={1.5} />
            </div>
          </div>
        </>
      )}

      {!r.canReserve && (
        <div className="mx-5 mt-6 p-4" style={{ background: C.cream, borderRadius: 16 }}>
          <div className="flex gap-3">
            <Info size={16} color={C.forest} strokeWidth={2} style={{ marginTop: 2, flexShrink: 0 }} />
            <div>
              <p style={{ fontFamily: SANS, fontSize: 13, color: C.ink, fontWeight: 600 }}>Esta unidad está arrendada</p>
              <p style={{ fontFamily: SANS, fontSize: 11, color: C.inkSoft, marginTop: 4, lineHeight: 1.5 }}>
                Las reservas y visitas las gestiona <b>{RESIDENT_ROLES['owner-landlord'].tenant.name}</b> durante la vigencia del contrato.
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="px-5 mt-8 flex justify-between items-baseline">
        <h2 style={{ fontFamily: SERIF, fontSize: 22, color: C.ink, fontStyle: 'italic', fontWeight: 400 }}>Avisos</h2>
        <span style={{ fontFamily: SANS, fontSize: 10, color: C.terra, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>3 nuevos</span>
      </div>
      <div className="mx-5 mt-3 space-y-2">
        {[
          { tag: 'Mantenimiento', title: 'Limpieza profunda de alberca', when: 'jueves 24 · todo el día', icon: Wrench },
          { tag: 'Asamblea',      title: 'Nueva cuota aprobada para mayo', when: 'hace 2 días',           icon: Megaphone },
          { tag: 'Seguridad',     title: 'Simulacro de evacuación',         when: 'viernes 25 · 11:00',     icon: Bell },
        ].map((a, i) => {
          const Icon = a.icon;
          return (
            <div key={i} className="flex gap-3 py-3" style={{ borderBottom: i < 2 ? `1px solid ${C.line}` : 'none' }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: C.cream, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Icon size={16} color={C.forest} strokeWidth={1.8} />
              </div>
              <div className="flex-1">
                <p style={{ fontFamily: SANS, fontSize: 9, color: C.muted, letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 700 }}>{a.tag}</p>
                <p style={{ fontFamily: SANS, fontSize: 13, color: C.ink, fontWeight: 500, marginTop: 2 }}>{a.title}</p>
                <p style={{ fontFamily: SANS, fontSize: 11, color: C.muted, marginTop: 2 }}>{a.when}</p>
              </div>
            </div>
          );
        })}
      </div>

      {r.canVisits && (
        <button className="absolute" style={{ bottom: 92, right: 16, background: C.ink, color: C.cream, padding: '12px 18px', borderRadius: 100, fontFamily: SANS, fontSize: 13, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6, boxShadow: '0 8px 24px rgba(31,46,36,0.25)' }}>
          <Plus size={16} strokeWidth={2.4} /> Registrar visita
        </button>
      )}
    </div>
  );
}

function ResidentPagos({ role }) {
  const r = RESIDENT_ROLES[role];
  const [method, setMethod] = useState('spei');
  const methods = [
    { id: 'tarjeta',  icon: CreditCard, label: 'Tarjeta',              sub: 'Débito o crédito · confirmación inmediata' },
    { id: 'spei',     icon: Landmark,   label: 'Transferencia SPEI',   sub: 'Sube comprobante · validación < 24h' },
    { id: 'deposito', icon: Building2,  label: 'Depósito en banco',    sub: 'Ventanilla o práctico · sube comprobante' },
    { id: 'efectivo', icon: Banknote,   label: 'Efectivo en oficina',  sub: 'Lunes a viernes · 9:00 – 18:00' },
  ];
  return (
    <div className="flex flex-col" style={{ paddingBottom: 100 }}>
      <div className="px-5 pt-4">
        <p style={{ fontFamily: SANS, fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: C.muted, fontWeight: 600 }}>Torre Marina · {r.unit}</p>
        <h1 style={{ fontFamily: SERIF, fontSize: 32, color: C.ink, marginTop: 4, fontWeight: 400 }}><span style={{ fontStyle: 'italic' }}>Pagos</span></h1>
      </div>

      <div className="mx-5 mt-5 p-5" style={{ background: C.cream, borderRadius: 20 }}>
        <div className="flex justify-between items-start">
          <div>
            <p style={{ fontFamily: SANS, fontSize: 11, color: C.inkSoft, fontWeight: 500 }}>Por pagar</p>
            <div className="flex items-baseline gap-2 mt-2">
              <span style={{ fontFamily: SERIF, fontSize: 44, color: C.ink, lineHeight: 1, fontWeight: 400 }}>${r.cuota.total.toLocaleString()}</span>
              <span style={{ fontFamily: SANS, fontSize: 12, color: C.muted }}>MXN</span>
            </div>
          </div>
          <StatusPill status={r.cuota.status} />
        </div>
        {r.cuota.breakdown.length > 1 && (
          <div className="mt-3 pt-3" style={{ borderTop: `1px solid ${C.creamDeep}` }}>
            {r.cuota.breakdown.map((b, i) => (
              <div key={i} className="flex justify-between items-center" style={{ marginTop: i > 0 ? 4 : 0 }}>
                <span style={{ fontFamily: SANS, fontSize: 12, color: C.inkSoft }}>{b.label}</span>
                <span style={{ fontFamily: SANS, fontSize: 12, color: C.ink, fontWeight: 600 }}>${b.amount.toLocaleString()}</span>
              </div>
            ))}
          </div>
        )}
        <p style={{ fontFamily: SANS, fontSize: 11, color: C.terra, marginTop: 10, fontWeight: 500 }}>Vence el {r.cuota.dueDay} de abril</p>
      </div>

      <div className="px-5 mt-7">
        <h2 style={{ fontFamily: SERIF, fontSize: 22, color: C.ink, fontStyle: 'italic', fontWeight: 400 }}>Cómo quieres pagar</h2>
      </div>

      <div className="mx-5 mt-3 space-y-2">
        {methods.map(m => {
          const Icon = m.icon;
          const selected = method === m.id;
          return (
            <button key={m.id} onClick={() => setMethod(m.id)}
                    className="w-full flex items-center gap-3 p-3 text-left"
                    style={{
                      background: selected ? C.forestDeep : C.paper,
                      border: `1px solid ${selected ? C.forestDeep : C.line}`,
                      borderRadius: 14,
                      color: selected ? C.cream : C.ink,
                    }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: selected ? 'rgba(245,238,221,0.12)' : C.cream, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon size={16} color={selected ? C.cream : C.forest} strokeWidth={1.8} />
              </div>
              <div className="flex-1">
                <p style={{ fontFamily: SANS, fontSize: 13, fontWeight: 600 }}>{m.label}</p>
                <p style={{ fontFamily: SANS, fontSize: 10, opacity: 0.7, marginTop: 2 }}>{m.sub}</p>
              </div>
              <div style={{ width: 18, height: 18, borderRadius: 9, border: `1.5px solid ${selected ? C.cream : C.line}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {selected && <div style={{ width: 8, height: 8, borderRadius: 4, background: C.cream }} />}
              </div>
            </button>
          );
        })}
      </div>

      <div className="mx-5 mt-3 p-4" style={{ background: C.paper, border: `1px dashed ${C.line}`, borderRadius: 14 }}>
        {method === 'spei' && (
          <>
            <p style={{ fontFamily: SANS, fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: C.muted, fontWeight: 700 }}>Datos para transferir</p>
            <div className="mt-3 space-y-2">
              <div><p style={{ fontFamily: SANS, fontSize: 10, color: C.muted, fontWeight: 600 }}>CLABE</p><p style={{ fontFamily: SERIF, fontSize: 16, color: C.ink }}>012 320 00123456789 0</p></div>
              <div><p style={{ fontFamily: SANS, fontSize: 10, color: C.muted, fontWeight: 600 }}>Concepto / referencia</p><p style={{ fontFamily: SERIF, fontSize: 16, color: C.ink }}>{r.unit}-ABR-26</p></div>
            </div>
            <button className="w-full mt-4 py-3 flex items-center justify-center gap-2" style={{ background: C.forestDeep, color: C.cream, borderRadius: 10, fontFamily: SANS, fontWeight: 600, fontSize: 13 }}>
              <Upload size={14} strokeWidth={2.2} /> Ya transferí · subir comprobante
            </button>
          </>
        )}
        {method === 'tarjeta' && (
          <>
            <p style={{ fontFamily: SANS, fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: C.muted, fontWeight: 700 }}>Pago con tarjeta</p>
            <p style={{ fontFamily: SANS, fontSize: 12, color: C.inkSoft, marginTop: 6, lineHeight: 1.5 }}>Confirmación instantánea.</p>
            <button className="w-full mt-4 py-3" style={{ background: C.forestDeep, color: C.cream, borderRadius: 10, fontFamily: SANS, fontWeight: 600, fontSize: 13 }}>Continuar</button>
          </>
        )}
        {method === 'deposito' && (
          <>
            <p style={{ fontFamily: SANS, fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: C.muted, fontWeight: 700 }}>Depósito bancario</p>
            <div className="mt-3 space-y-2">
              <div><p style={{ fontFamily: SANS, fontSize: 10, color: C.muted, fontWeight: 600 }}>Banco</p><p style={{ fontFamily: SANS, fontSize: 13, color: C.ink, fontWeight: 600 }}>BBVA</p></div>
              <div><p style={{ fontFamily: SANS, fontSize: 10, color: C.muted, fontWeight: 600 }}>Cuenta</p><p style={{ fontFamily: SERIF, fontSize: 16, color: C.ink }}>0123 4567 89</p></div>
            </div>
            <button className="w-full mt-4 py-3 flex items-center justify-center gap-2" style={{ background: C.forestDeep, color: C.cream, borderRadius: 10, fontFamily: SANS, fontWeight: 600, fontSize: 13 }}>
              <Upload size={14} /> Subir comprobante
            </button>
          </>
        )}
        {method === 'efectivo' && (
          <>
            <p style={{ fontFamily: SANS, fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: C.muted, fontWeight: 700 }}>Pago en oficina</p>
            <p style={{ fontFamily: SANS, fontSize: 12, color: C.inkSoft, marginTop: 6, lineHeight: 1.5 }}>Lun – vie · 9:00 a 18:00. Tu cuota se marcará como pagada cuando administración registre el pago.</p>
          </>
        )}
      </div>

      <div className="px-5 mt-8 flex justify-between items-baseline">
        <h2 style={{ fontFamily: SERIF, fontSize: 22, color: C.ink, fontStyle: 'italic', fontWeight: 400 }}>Historial</h2>
        <button className="flex items-center gap-1" style={{ fontFamily: SANS, fontSize: 11, color: C.muted, fontWeight: 500 }}>
          <Download size={12} /> Exportar
        </button>
      </div>
      <div className="mx-5 mt-3">
        {[
          { month: 'Marzo 2026',   amount: r.cuota.total, method: 'SPEI',     date: '03 mar' },
          { month: 'Febrero 2026', amount: r.cuota.total, method: 'Tarjeta',  date: '05 feb' },
          { month: 'Enero 2026',   amount: r.cuota.total, method: 'Efectivo', date: '08 ene' },
        ].map((h, i) => (
          <div key={i} className="flex items-center justify-between py-3" style={{ borderBottom: `1px solid ${C.line}` }}>
            <div>
              <p style={{ fontFamily: SANS, fontSize: 13, color: C.ink, fontWeight: 500 }}>{h.month}</p>
              <p style={{ fontFamily: SANS, fontSize: 11, color: C.muted, marginTop: 2 }}>{h.method} · pagado el {h.date}</p>
            </div>
            <div className="flex items-center gap-3">
              <span style={{ fontFamily: SERIF, fontSize: 17, color: C.ink, fontWeight: 400 }}>${h.amount.toLocaleString()}</span>
              <div style={{ width: 22, height: 22, borderRadius: 11, background: C.sage, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Check size={12} color={C.paper} strokeWidth={3} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ResidentReservas({ role }) {
  const r = RESIDENT_ROLES[role];
  if (!r.canReserve) {
    return (
      <div className="flex flex-col px-5 pt-6" style={{ paddingBottom: 100 }}>
        <SectionHeader eyebrow="Áreas comunes" title="Reservas" />
        <div className="mt-8 p-6 text-center flex flex-col items-center" style={{ background: C.paper, border: `1px solid ${C.line}`, borderRadius: 20 }}>
          <div style={{ width: 52, height: 52, borderRadius: 26, background: C.cream, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Building2 size={20} color={C.forest} strokeWidth={1.5} />
          </div>
          <p style={{ fontFamily: SERIF, fontSize: 20, color: C.ink, marginTop: 12, lineHeight: 1.25, fontWeight: 400 }}>Unidad arrendada</p>
          <p style={{ fontFamily: SANS, fontSize: 12, color: C.inkSoft, marginTop: 8, lineHeight: 1.5, maxWidth: 260 }}>
            Mientras <b>{r.tenant.name}</b> sea el residente, las reservas son exclusivas suyas.
          </p>
        </div>
      </div>
    );
  }
  const amenities = [
    { name: 'Alberca',       icon: Waves,    avail: 'Abierta hasta 21:00', accent: '#4A7DA0' },
    { name: 'Gimnasio',      icon: Dumbbell, avail: '3 personas ahora',    accent: '#8A6B3D' },
    { name: 'Salón eventos', icon: Utensils, avail: 'Reservado sáb',       accent: C.terra },
    { name: 'Asador',        icon: Flame,    avail: 'Libre hoy',           accent: '#A84433' },
  ];
  return (
    <div className="flex flex-col" style={{ paddingBottom: 100 }}>
      <SectionHeader eyebrow="Áreas comunes" title="Reservas" />
      <div className="px-5 mt-6 grid grid-cols-2 gap-3">
        {amenities.map(a => {
          const Icon = a.icon;
          return (
            <button key={a.name} className="text-left p-4" style={{ background: C.paper, border: `1px solid ${C.line}`, borderRadius: 16, minHeight: 130 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: C.cream, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon size={18} color={a.accent} strokeWidth={1.8} />
              </div>
              <p style={{ fontFamily: SERIF, fontSize: 18, color: C.ink, marginTop: 14, fontWeight: 400 }}>{a.name}</p>
              <p style={{ fontFamily: SANS, fontSize: 10, color: C.muted, marginTop: 4, lineHeight: 1.4 }}>{a.avail}</p>
            </button>
          );
        })}
      </div>
      {r.nextReservation && (
        <>
          <div className="px-5 mt-8">
            <h2 style={{ fontFamily: SERIF, fontSize: 22, color: C.ink, fontStyle: 'italic', fontWeight: 400 }}>Mis reservas</h2>
          </div>
          <div className="mx-5 mt-3 p-4" style={{ background: C.forestDeep, color: C.cream, borderRadius: 16 }}>
            <div className="flex justify-between items-start">
              <div>
                <p style={{ fontFamily: SANS, fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', opacity: 0.6, fontWeight: 600 }}>Próxima</p>
                <p style={{ fontFamily: SERIF, fontSize: 22, marginTop: 4, fontWeight: 400 }}>{r.nextReservation.place}</p>
                <p style={{ fontFamily: SANS, fontSize: 12, opacity: 0.75, marginTop: 4 }}>
                  {r.nextReservation.dayWord.toLowerCase()} {r.nextReservation.day} abr · {r.nextReservation.time}
                </p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p style={{ fontFamily: SERIF, fontSize: 34, lineHeight: 1, fontWeight: 400 }}>{r.nextReservation.day}</p>
                <p style={{ fontFamily: SANS, fontSize: 10, letterSpacing: '0.18em', opacity: 0.6, fontWeight: 600 }}>{r.nextReservation.month}</p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function ResidentComunidad() {
  return (
    <div className="flex flex-col" style={{ paddingBottom: 100 }}>
      <SectionHeader eyebrow="Torre Marina" title="Comunidad" />
      <div className="px-5 mt-6 space-y-4">
        {[
          { tag: 'Administración', title: 'Nueva cuota aprobada en asamblea', body: 'A partir del 1 de mayo la cuota mensual será de $5,100 MXN.', when: 'hace 2 días' },
          { tag: 'Mantenimiento',  title: 'Limpieza profunda de alberca',     body: 'El jueves 24 la alberca permanecerá cerrada todo el día.', when: 'hace 4 días' },
          { tag: 'Seguridad',      title: 'Simulacro de evacuación',          body: 'Participación voluntaria, 11:00 hrs en el lobby.', when: 'hace 5 días' },
        ].map((a, i) => (
          <div key={i} style={{ background: C.paper, border: `1px solid ${C.line}`, borderRadius: 16, padding: 16 }}>
            <div className="flex justify-between items-center">
              <span style={{ fontFamily: SANS, fontSize: 9, letterSpacing: '0.16em', textTransform: 'uppercase', color: C.terra, fontWeight: 700 }}>{a.tag}</span>
              <span style={{ fontFamily: SANS, fontSize: 10, color: C.muted }}>{a.when}</span>
            </div>
            <p style={{ fontFamily: SERIF, fontSize: 18, color: C.ink, marginTop: 8, lineHeight: 1.2, fontWeight: 400 }}>{a.title}</p>
            <p style={{ fontFamily: SANS, fontSize: 12, color: C.inkSoft, marginTop: 6, lineHeight: 1.5 }}>{a.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ResidentPerfil({ role }) {
  const r = RESIDENT_ROLES[role];
  const items = role === 'owner-landlord' ? [
    { icon: User,     label: 'Mis datos' },
    { icon: Users,    label: 'Inquilino actual',            hint: r.tenant?.name },
    { icon: FileText, label: 'Contrato de arrendamiento',   hint: r.tenant?.contract },
    { icon: FileText, label: 'Escrituras y documentos' },
  ] : role === 'tenant' ? [
    { icon: User,      label: 'Mis datos' },
    { icon: Car,       label: 'Vehículos',           hint: '1 registrado' },
    { icon: Users,     label: 'Visitas frecuentes',  hint: '2 contactos' },
    { icon: FileText,  label: 'Mi contrato',         hint: 'Hasta ene 2026' },
    { icon: Building2, label: 'Propietario',         hint: r.landlord?.name },
  ] : [
    { icon: User,     label: 'Datos personales' },
    { icon: Car,      label: 'Vehículos',           hint: '2 registrados' },
    { icon: Users,    label: 'Visitas frecuentes',  hint: '5 contactos' },
    { icon: FileText, label: 'Escrituras y documentos' },
    { icon: Settings, label: 'Notificaciones' },
  ];
  return (
    <div className="flex flex-col" style={{ paddingBottom: 100 }}>
      <SectionHeader eyebrow="Tu cuenta" title="Perfil" />
      <div className="mx-5 mt-5 p-5 flex items-center gap-4" style={{ background: C.cream, borderRadius: 20 }}>
        <div style={{ width: 60, height: 60, borderRadius: 30, background: C.forestDeep, color: C.cream, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: SERIF, fontSize: 26 }}>{r.initial}</div>
        <div className="flex-1">
          <p style={{ fontFamily: SERIF, fontSize: 22, color: C.ink, fontWeight: 400 }}>{r.name}</p>
          <p style={{ fontFamily: SANS, fontSize: 12, color: C.muted, marginTop: 2 }}>Torre Marina · Depto {r.unit}</p>
          <div className="inline-flex items-center gap-1 mt-2 px-2 py-[2px]" style={{ background: C.paper, borderRadius: 100 }}>
            <div style={{ width: 5, height: 5, borderRadius: 3, background: C.sage }} />
            <p style={{ fontFamily: SANS, fontSize: 10, color: C.inkSoft, fontWeight: 600 }}>{r.short}</p>
          </div>
        </div>
      </div>
      <div className="mx-5 mt-6" style={{ background: C.paper, border: `1px solid ${C.line}`, borderRadius: 16, overflow: 'hidden' }}>
        {items.map((it, i) => {
          const Icon = it.icon;
          return (
            <button key={i} className="w-full flex items-center gap-3 px-4 py-4"
                    style={{ borderBottom: i < items.length - 1 ? `1px solid ${C.line}` : 'none' }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: C.cream, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon size={15} color={C.forest} strokeWidth={1.8} />
              </div>
              <div className="flex-1 text-left">
                <p style={{ fontFamily: SANS, fontSize: 13, color: C.ink, fontWeight: 500 }}>{it.label}</p>
                {it.hint && <p style={{ fontFamily: SANS, fontSize: 10, color: C.muted, marginTop: 2 }}>{it.hint}</p>}
              </div>
              <ChevronRight size={16} color={C.muted} />
            </button>
          );
        })}
      </div>
    </div>
  );
}

function ResidentApp() {
  const [tab, setTab] = useState('inicio');
  const [role, setRole] = useState('owner-resident');
  const tabs = [
    { id: 'inicio',    icon: Home,          label: 'Inicio' },
    { id: 'pagos',     icon: CreditCard,    label: 'Pagos' },
    { id: 'reservas',  icon: CalendarDays,  label: 'Reservas' },
    { id: 'comunidad', icon: MessageSquare, label: 'Comunidad' },
    { id: 'perfil',    icon: User,          label: 'Perfil' },
  ];
  return (
    <>
      <div className="inline-flex p-1 mb-4" style={{ background: C.paper, border: `1px solid ${C.line}`, borderRadius: 100 }}>
        {Object.values(RESIDENT_ROLES).map(r => (
          <button key={r.key} onClick={() => { setRole(r.key); setTab('inicio'); }}
                  className="px-3 py-2"
                  style={{
                    background: role === r.key ? C.forestDeep : 'transparent',
                    color: role === r.key ? C.cream : C.inkSoft,
                    borderRadius: 100, fontFamily: SANS, fontSize: 10, fontWeight: 600,
                  }}>
            {r.label}
          </button>
        ))}
      </div>

      <Phone>
        <StatusBar />
        <div className="phone-scroll" style={{ height: 'calc(100% - 32px)', overflowY: 'auto', position: 'relative' }}>
          {tab === 'inicio'    && <ResidentInicio    role={role} />}
          {tab === 'pagos'     && <ResidentPagos     role={role} />}
          {tab === 'reservas'  && <ResidentReservas  role={role} />}
          {tab === 'comunidad' && <ResidentComunidad />}
          {tab === 'perfil'    && <ResidentPerfil    role={role} />}
          <TabBar tabs={tabs} active={tab} onChange={setTab} />
        </div>
      </Phone>
    </>
  );
}

// ============================================================
// ADMIN APP
// ============================================================
function AdminInicio() {
  const KPI = ({ label, value, sub, accent }) => (
    <div style={{ background: C.paper, border: `1px solid ${C.line}`, borderRadius: 14, padding: 14 }}>
      <p style={{ fontFamily: SANS, fontSize: 9, letterSpacing: '0.16em', textTransform: 'uppercase', color: C.muted, fontWeight: 700 }}>{label}</p>
      <p style={{ fontFamily: SERIF, fontSize: 26, color: accent || C.ink, lineHeight: 1.1, fontWeight: 400, marginTop: 6 }}>{value}</p>
      <p style={{ fontFamily: SANS, fontSize: 10, color: C.muted, marginTop: 4, lineHeight: 1.3 }}>{sub}</p>
    </div>
  );
  return (
    <div className="flex flex-col" style={{ paddingBottom: 100 }}>
      <div className="flex justify-between items-center px-5 pt-4">
        <div className="flex items-center gap-2" style={{ background: C.cream, padding: '6px 12px 6px 10px', borderRadius: 100 }}>
          <Building2 size={13} color={C.forest} strokeWidth={1.8} />
          <span style={{ fontFamily: SANS, fontSize: 11, color: C.ink, fontWeight: 600 }}>Torre Marina</span>
          <ChevronDown size={12} color={C.muted} strokeWidth={2} />
        </div>
        <button className="relative" style={{ width: 36, height: 36, borderRadius: 18, background: C.cream, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Bell size={16} color={C.ink} strokeWidth={1.8} />
          <div style={{ position: 'absolute', top: 8, right: 9, width: 7, height: 7, background: C.terra, borderRadius: 4, border: `1.5px solid ${C.paper}` }} />
        </button>
      </div>

      <div className="px-5 mt-5">
        <p style={{ fontFamily: SANS, fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: C.muted, fontWeight: 600 }}>
          Administrador · martes 21 abr
        </p>
        <h1 style={{ fontFamily: SERIF, fontSize: 34, lineHeight: 1.05, color: C.ink, fontWeight: 400, marginTop: 6 }}>
          Hola,<br/><span style={{ fontStyle: 'italic' }}>Roberto.</span>
        </h1>
      </div>

      <div className="mx-5 mt-6 overflow-hidden p-5" style={{ borderRadius: 20, background: C.forestDeep, color: C.cream, position: 'relative' }}>
        <div style={{ position: 'absolute', top: -30, right: -30, width: 140, height: 140, borderRadius: 100, background: 'rgba(181,100,60,0.18)' }} />
        <div className="relative">
          <p style={{ fontFamily: SANS, fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', opacity: 0.65, fontWeight: 600 }}>Cobranza abril</p>
          <div className="flex items-baseline gap-2 mt-3">
            <span style={{ fontFamily: SERIF, fontSize: 38, fontWeight: 400, lineHeight: 1 }}>$892k</span>
            <span style={{ fontFamily: SANS, fontSize: 11, opacity: 0.65 }}>/ $950k</span>
          </div>
          <div className="mt-3" style={{ height: 5, background: 'rgba(245,238,221,0.15)', borderRadius: 3, overflow: 'hidden' }}>
            <div style={{ width: '93.9%', height: '100%', background: C.terra }} />
          </div>
          <p style={{ fontFamily: SANS, fontSize: 11, opacity: 0.75, marginTop: 8 }}>93.9% recuperado · 40 de 48 unidades</p>
        </div>
      </div>

      <div className="px-5 mt-3 grid grid-cols-2 gap-2.5">
        <KPI label="Morosidad" value="8" sub="$47,600 vencidos" accent={C.warn} />
        <KPI label="En revisión" value="2" sub="Comprobantes por aprobar" accent={C.ambar} />
        <KPI label="Reservas hoy" value="6" sub="Salón, asador, gym" />
        <KPI label="Tickets" value="3" sub="1 urgente, 2 en proceso" />
      </div>

      <div className="px-5 mt-7 flex justify-between items-baseline">
        <h2 style={{ fontFamily: SERIF, fontSize: 22, color: C.ink, fontStyle: 'italic', fontWeight: 400 }}>Necesita atención</h2>
        <button style={{ fontFamily: SANS, fontSize: 11, color: C.forest, fontWeight: 600 }}>Ver todo</button>
      </div>
      <div className="mx-5 mt-3 space-y-2">
        {[
          { unit: '304',  name: 'Familia Ortega',  months: 3, amount: 14550 },
          { unit: '507',  name: 'Gabriela Ruiz',   months: 2, amount: 9700 },
          { unit: '1208', name: 'Depto vacante',   months: 2, amount: 9700 },
        ].map((r, i) => (
          <div key={i} className="flex items-center gap-3 p-3" style={{ background: C.paper, border: `1px solid ${C.line}`, borderRadius: 14 }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(168,68,51,0.1)', color: C.warn, fontFamily: SERIF, fontSize: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 400, flexShrink: 0 }}>
              {r.unit}
            </div>
            <div className="flex-1 min-w-0">
              <p style={{ fontFamily: SANS, fontSize: 13, color: C.ink, fontWeight: 600 }}>{r.name}</p>
              <p style={{ fontFamily: SANS, fontSize: 11, color: C.warn, fontWeight: 600, marginTop: 1 }}>
                {r.months} meses · ${r.amount.toLocaleString()}
              </p>
            </div>
            <ChevronRight size={16} color={C.muted} />
          </div>
        ))}
      </div>

      <div className="px-5 mt-7">
        <h2 style={{ fontFamily: SERIF, fontSize: 22, color: C.ink, fontStyle: 'italic', fontWeight: 400 }}>Actividad</h2>
      </div>
      <div className="mx-5 mt-3 space-y-1">
        {[
          { icon: CheckCircle2, color: C.sage,   text: 'Pago SPEI confirmado', sub: 'Alejandra Reyes · 804', time: '2h' },
          { icon: Send,         color: C.forest, text: 'Reporte marzo enviado', sub: 'A Fernando Hernández', time: '4h' },
          { icon: CalendarDays, color: C.terra,  text: 'Nueva reserva · Salón', sub: 'Carlos Mendoza · 1102', time: '6h' },
        ].map((a, i) => {
          const Icon = a.icon;
          return (
            <div key={i} className="flex items-center gap-3 py-2.5" style={{ borderBottom: i < 2 ? `1px solid ${C.line}` : 'none' }}>
              <div style={{ width: 34, height: 34, borderRadius: 10, background: C.cream, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Icon size={14} color={a.color} strokeWidth={2} />
              </div>
              <div className="flex-1 min-w-0">
                <p style={{ fontFamily: SANS, fontSize: 12.5, color: C.ink, fontWeight: 500 }}>{a.text}</p>
                <p style={{ fontFamily: SANS, fontSize: 10, color: C.muted, marginTop: 1 }}>{a.sub}</p>
              </div>
              <span style={{ fontFamily: SANS, fontSize: 10, color: C.muted }}>{a.time}</span>
            </div>
          );
        })}
      </div>

      <button className="absolute" style={{ bottom: 92, right: 16, background: C.ink, color: C.cream, padding: '12px 18px', borderRadius: 100, fontFamily: SANS, fontSize: 13, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6, boxShadow: '0 8px 24px rgba(31,46,36,0.25)' }}>
        <Plus size={16} strokeWidth={2.4} /> Registrar pago
      </button>
    </div>
  );
}

function AdminCobranza() {
  const [filter, setFilter] = useState('todos');
  const rows = [
    { unit: '304',  name: 'Familia Ortega',   amount: 14550, due: 'vence 24 ene', status: 'moroso' },
    { unit: '402',  name: 'Arturo Méndez',    amount: 9700,  due: 'vence 24 feb', status: 'moroso' },
    { unit: '602',  name: 'Mauricio Serna',   amount: 4300,  due: 'SPEI 19 abr',  status: 'revision', tenant: true },
    { unit: '801',  name: 'Paulina Vega',     amount: 4850,  due: 'SPEI 18 abr',  status: 'revision' },
    { unit: '804',  name: 'Alejandra Reyes',  amount: 7850,  due: 'Tarjeta 20 abr',status:'pagado' },
    { unit: '1102', name: 'Carlos Mendoza',   amount: 5200,  due: 'vence 24 abr', status: 'pendiente', tenant: true },
  ];
  const filtered = filter === 'todos' ? rows : rows.filter(r => r.status === filter);
  const options = [
    { id: 'todos', label: 'Todos' },
    { id: 'moroso', label: 'Morosos' },
    { id: 'revision', label: 'Revisión' },
    { id: 'pendiente', label: 'Pendiente' },
    { id: 'pagado', label: 'Pagado' },
  ];
  return (
    <div className="flex flex-col" style={{ paddingBottom: 100 }}>
      <div className="flex justify-between items-center px-5 pt-4">
        <p style={{ fontFamily: SANS, fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: C.muted, fontWeight: 600 }}>Abril 2026</p>
        <button className="flex items-center gap-1.5 px-3 py-1.5" style={{ background: C.cream, borderRadius: 100, fontFamily: SANS, fontSize: 11, color: C.ink, fontWeight: 600 }}>
          <Download size={12} /> Exportar
        </button>
      </div>
      <div className="px-5 mt-2">
        <h1 style={{ fontFamily: SERIF, fontSize: 32, color: C.ink, fontWeight: 400 }}><span style={{ fontStyle: 'italic' }}>Cobranza</span></h1>
      </div>

      <div className="mx-5 mt-4 flex items-center gap-2 px-3 py-2" style={{ background: C.paper, border: `1px solid ${C.line}`, borderRadius: 12 }}>
        <Search size={14} color={C.muted} />
        <input placeholder="Buscar unidad o residente..." className="bg-transparent outline-none flex-1" style={{ fontFamily: SANS, fontSize: 12, color: C.ink }} />
      </div>

      <div className="mt-3 flex gap-2 overflow-x-auto px-5 pb-1" style={{ scrollbarWidth: 'none' }}>
        {options.map(o => (
          <button key={o.id} onClick={() => setFilter(o.id)}
                  className="px-3 py-1.5 flex-shrink-0"
                  style={{
                    background: filter === o.id ? C.ink : C.paper,
                    color: filter === o.id ? C.cream : C.inkSoft,
                    border: `1px solid ${filter === o.id ? C.ink : C.line}`,
                    borderRadius: 100, fontFamily: SANS, fontSize: 12, fontWeight: 600,
                  }}>
            {o.label}
          </button>
        ))}
      </div>

      <div className="mx-5 mt-4 space-y-2">
        {filtered.map((r, i) => (
          <div key={i} className="flex items-center gap-3 p-3" style={{ background: C.paper, border: `1px solid ${C.line}`, borderRadius: 14 }}>
            <div style={{ width: 44, height: 44, borderRadius: 11, background: C.cream, color: C.forest, fontFamily: SERIF, fontSize: 15, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              {r.unit}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <p style={{ fontFamily: SANS, fontSize: 13, color: C.ink, fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{r.name}</p>
                {r.tenant && <span style={{ background: C.creamDeep, color: C.inkSoft, fontFamily: SANS, fontSize: 8, fontWeight: 700, padding: '1px 5px', borderRadius: 100, letterSpacing: '0.05em' }}>INQ</span>}
              </div>
              <p style={{ fontFamily: SANS, fontSize: 11, color: C.muted, marginTop: 2 }}>{r.due}</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p style={{ fontFamily: SERIF, fontSize: 16, color: C.ink, lineHeight: 1 }}>${r.amount.toLocaleString()}</p>
              <div style={{ marginTop: 4 }}>
                <StatusPill status={r.status} small />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mx-5 mt-5 flex justify-between items-center p-3" style={{ background: C.cream, borderRadius: 12 }}>
        <span style={{ fontFamily: SANS, fontSize: 11, color: C.inkSoft, fontWeight: 500 }}>Total del periodo</span>
        <span style={{ fontFamily: SERIF, fontSize: 18, color: C.ink }}>$892,400</span>
      </div>
    </div>
  );
}

function AdminReportes() {
  const [type, setType] = useState('financiero');
  const types = [
    { id: 'financiero',    label: 'Financiero mensual', desc: 'Ingresos, egresos, balance' },
    { id: 'cobranza',      label: 'Cobranza',            desc: 'Pagos y morosidad' },
    { id: 'mantenimiento', label: 'Mantenimiento',       desc: 'Incidencias y costos' },
    { id: 'amenidades',    label: 'Áreas comunes',       desc: 'Reservas y ocupación' },
  ];
  return (
    <div className="flex flex-col" style={{ paddingBottom: 100 }}>
      <SectionHeader eyebrow="Generar y enviar" title="Reportes" />
      <div className="mx-5 mt-5 p-5" style={{ background: C.forestDeep, color: C.cream, borderRadius: 20 }}>
        <div className="flex items-center gap-2 mb-2">
          <Sparkles size={14} color={C.terra} />
          <p style={{ fontFamily: SANS, fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: C.sidebarMuted, fontWeight: 700 }}>Nuevo reporte</p>
        </div>
        <p style={{ fontFamily: SERIF, fontSize: 22, fontStyle: 'italic' }}>Arma y envía</p>

        <p style={{ fontFamily: SANS, fontSize: 10, color: C.sidebarMuted, fontWeight: 600, marginTop: 16, marginBottom: 8, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Tipo</p>
        <div className="space-y-2">
          {types.map(t => {
            const selected = type === t.id;
            return (
              <button key={t.id} onClick={() => setType(t.id)}
                      className="w-full text-left flex items-center gap-3 p-2.5"
                      style={{
                        background: selected ? 'rgba(245,238,221,0.1)' : 'transparent',
                        border: `1px solid ${selected ? 'rgba(245,238,221,0.3)' : 'rgba(245,238,221,0.1)'}`,
                        borderRadius: 10,
                      }}>
                <div style={{ width: 14, height: 14, borderRadius: 7, border: `1.5px solid ${selected ? C.cream : 'rgba(245,238,221,0.3)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  {selected && <div style={{ width: 6, height: 6, borderRadius: 3, background: C.cream }} />}
                </div>
                <div className="flex-1 min-w-0">
                  <p style={{ fontFamily: SANS, fontSize: 12, fontWeight: 600 }}>{t.label}</p>
                  <p style={{ fontFamily: SANS, fontSize: 10, opacity: 0.65, marginTop: 1 }}>{t.desc}</p>
                </div>
              </button>
            );
          })}
        </div>

        <p style={{ fontFamily: SANS, fontSize: 9, color: C.sidebarMuted, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginTop: 16, marginBottom: 6 }}>Enviar a</p>
        <div className="flex flex-wrap gap-1.5 p-2" style={{ background: 'rgba(245,238,221,0.08)', borderRadius: 10, minHeight: 40 }}>
          {['Fernando H.', 'Mesa directiva'].map((r, i) => (
            <span key={i} className="inline-flex items-center gap-1.5 px-2 py-1" style={{ background: 'rgba(245,238,221,0.15)', borderRadius: 100, fontFamily: SANS, fontSize: 10, color: C.cream, fontWeight: 500 }}>{r}</span>
          ))}
          <button style={{ fontFamily: SANS, fontSize: 10, color: C.terra, fontWeight: 700, padding: '4px 6px' }}>+ Agregar</button>
        </div>

        <button className="w-full mt-4 py-3 flex items-center justify-center gap-2" style={{ background: C.terra, color: C.cream, borderRadius: 12, fontFamily: SANS, fontSize: 13, fontWeight: 600 }}>
          <Send size={14} /> Generar y enviar
        </button>
      </div>

      <div className="px-5 mt-7">
        <h2 style={{ fontFamily: SERIF, fontSize: 22, color: C.ink, fontStyle: 'italic', fontWeight: 400 }}>Enviados</h2>
      </div>
      <div className="mx-5 mt-3 space-y-2">
        {[
          { title: 'Financiero · marzo',  to: 'Fernando H., Mesa', when: '01 abr', icon: TrendingUp },
          { title: 'Cobranza · Q1',       to: 'Fernando H.',       when: '02 abr', icon: Wallet },
          { title: 'Mantenimiento · mar', to: 'Solo generado',     when: '30 mar', icon: AlertCircle },
        ].map((r, i) => {
          const Icon = r.icon;
          return (
            <div key={i} className="flex items-center gap-3 p-3" style={{ background: C.paper, border: `1px solid ${C.line}`, borderRadius: 14 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: C.cream, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Icon size={14} color={C.forest} strokeWidth={2} />
              </div>
              <div className="flex-1 min-w-0">
                <p style={{ fontFamily: SANS, fontSize: 12.5, color: C.ink, fontWeight: 600 }}>{r.title}</p>
                <p style={{ fontFamily: SANS, fontSize: 10, color: C.muted, marginTop: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {r.to} · {r.when}
                </p>
              </div>
              <button style={{ width: 30, height: 30, borderRadius: 8, background: C.cream, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Download size={12} color={C.inkSoft} />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function AdminDocumentos() {
  const docs = [
    { name: 'Reglamento interno',              size: '2.4 MB', updated: '15 ene', visibility: 'Todos' },
    { name: 'Contrato arrendamiento · 1102',   size: '890 KB', updated: '28 ago', visibility: 'Privado' },
    { name: 'Acta asamblea · marzo 2026',      size: '1.1 MB', updated: '28 mar', visibility: 'Propietarios' },
    { name: 'Presupuesto anual 2026',          size: '640 KB', updated: '10 ene', visibility: 'Propietarios' },
    { name: 'Protocolo de seguridad',          size: '450 KB', updated: '02 feb', visibility: 'Todos' },
  ];
  return (
    <div className="flex flex-col" style={{ paddingBottom: 100 }}>
      <div className="flex justify-between items-start px-5 pt-4">
        <div>
          <p style={{ fontFamily: SANS, fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: C.muted, fontWeight: 600 }}>Biblioteca</p>
          <h1 style={{ fontFamily: SERIF, fontSize: 32, color: C.ink, marginTop: 4, fontWeight: 400 }}>
            <span style={{ fontStyle: 'italic' }}>Documentos</span>
          </h1>
        </div>
        <button className="flex items-center gap-1.5 px-3 py-2 mt-4" style={{ background: C.forestDeep, color: C.cream, borderRadius: 10, fontFamily: SANS, fontSize: 11, fontWeight: 600 }}>
          <Upload size={12} /> Subir
        </button>
      </div>
      <p style={{ fontFamily: SANS, fontSize: 12, color: C.inkSoft, lineHeight: 1.5, marginTop: 8, paddingLeft: 20, paddingRight: 20 }}>
        Reglamento, contratos y actas. Los residentes los descargan desde su app según permisos.
      </p>
      <div className="mx-5 mt-5 space-y-2">
        {docs.map((d, i) => (
          <div key={i} className="p-3.5" style={{ background: C.paper, border: `1px solid ${C.line}`, borderRadius: 14 }}>
            <div className="flex items-start gap-3">
              <div style={{ width: 40, height: 40, borderRadius: 10, background: C.cream, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <FileText size={16} color={C.forest} strokeWidth={1.8} />
              </div>
              <div className="flex-1 min-w-0">
                <p style={{ fontFamily: SANS, fontSize: 13, color: C.ink, fontWeight: 600, lineHeight: 1.3 }}>{d.name}</p>
                <div className="flex items-center gap-2 mt-1.5" style={{ fontFamily: SANS, fontSize: 10, color: C.muted }}>
                  <span>{d.updated}</span>
                  <span>·</span>
                  <span>{d.size}</span>
                </div>
                <div className="inline-flex items-center gap-1 mt-2 px-2 py-[2px]" style={{ background: C.cream, borderRadius: 100 }}>
                  <Users size={9} color={C.forest} />
                  <span style={{ fontFamily: SANS, fontSize: 9, color: C.inkSoft, fontWeight: 700, letterSpacing: '0.04em' }}>{d.visibility}</span>
                </div>
              </div>
              <button style={{ width: 32, height: 32, borderRadius: 8, background: C.cream, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Download size={13} color={C.inkSoft} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AdminMas() {
  const items = [
    { icon: Building2,    label: 'Unidades',     sub: '48 unidades · 3 vacantes' },
    { icon: CalendarDays, label: 'Reservas',     sub: 'Calendario áreas comunes' },
    { icon: Megaphone,    label: 'Comunidad',    sub: 'Avisos y tickets' },
    { icon: TrendingUp,   label: 'Finanzas',     sub: 'Ingresos, egresos, balance' },
    { icon: Shield,       label: 'Staff',        sub: 'Vigilancia, recepción, mtto' },
    { icon: Settings,     label: 'Ajustes',      sub: 'Cuotas, roles, torre' },
  ];
  return (
    <div className="flex flex-col" style={{ paddingBottom: 100 }}>
      <SectionHeader eyebrow="Menú" title="Más" />
      <div className="mx-5 mt-5 p-4 flex items-center gap-3" style={{ background: C.cream, borderRadius: 20 }}>
        <div style={{ width: 48, height: 48, borderRadius: 24, background: C.forestDeep, color: C.cream, fontFamily: SERIF, fontSize: 20, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>R</div>
        <div className="flex-1">
          <p style={{ fontFamily: SERIF, fontSize: 20, color: C.ink, fontWeight: 400 }}>Roberto Aguilar</p>
          <p style={{ fontFamily: SANS, fontSize: 11, color: C.muted, marginTop: 1 }}>Administrador · Torre Marina</p>
        </div>
      </div>
      <div className="mx-5 mt-5" style={{ background: C.paper, border: `1px solid ${C.line}`, borderRadius: 16, overflow: 'hidden' }}>
        {items.map((it, i) => {
          const Icon = it.icon;
          return (
            <button key={i} className="w-full flex items-center gap-3 px-4 py-4"
                    style={{ borderBottom: i < items.length - 1 ? `1px solid ${C.line}` : 'none' }}>
              <div style={{ width: 34, height: 34, borderRadius: 9, background: C.cream, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon size={15} color={C.forest} strokeWidth={1.8} />
              </div>
              <div className="flex-1 text-left">
                <p style={{ fontFamily: SANS, fontSize: 13, color: C.ink, fontWeight: 500 }}>{it.label}</p>
                <p style={{ fontFamily: SANS, fontSize: 10, color: C.muted, marginTop: 2 }}>{it.sub}</p>
              </div>
              <ChevronRight size={16} color={C.muted} />
            </button>
          );
        })}
      </div>
    </div>
  );
}

function AdminApp() {
  const [tab, setTab] = useState('inicio');
  const tabs = [
    { id: 'inicio',     icon: LayoutDashboard, label: 'Inicio' },
    { id: 'cobranza',   icon: Wallet,          label: 'Cobranza', badge: 8 },
    { id: 'reportes',   icon: FileBarChart,    label: 'Reportes' },
    { id: 'documentos', icon: Files,           label: 'Docs' },
    { id: 'mas',        icon: MoreHorizontal,  label: 'Más' },
  ];
  return (
    <Phone>
      <StatusBar />
      <div className="phone-scroll" style={{ height: 'calc(100% - 32px)', overflowY: 'auto', position: 'relative' }}>
        {tab === 'inicio'     && <AdminInicio />}
        {tab === 'cobranza'   && <AdminCobranza />}
        {tab === 'reportes'   && <AdminReportes />}
        {tab === 'documentos' && <AdminDocumentos />}
        {tab === 'mas'        && <AdminMas />}
        <TabBar tabs={tabs} active={tab} onChange={setTab} />
      </div>
    </Phone>
  );
}

// ============================================================
// STAFF APP
// ============================================================
function StaffInicio() {
  return (
    <div className="flex flex-col" style={{ paddingBottom: 100 }}>
      <div className="flex justify-between items-center px-5 pt-4">
        <div className="flex items-center gap-2" style={{ background: C.cream, padding: '6px 12px 6px 10px', borderRadius: 100 }}>
          <Building2 size={13} color={C.forest} strokeWidth={1.8} />
          <span style={{ fontFamily: SANS, fontSize: 11, color: C.ink, fontWeight: 600 }}>Torre Marina · Caseta</span>
        </div>
        <button className="relative" style={{ width: 36, height: 36, borderRadius: 18, background: C.cream, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Bell size={16} color={C.ink} strokeWidth={1.8} />
          <div style={{ position: 'absolute', top: 8, right: 9, width: 7, height: 7, background: C.terra, borderRadius: 4, border: `1.5px solid ${C.paper}` }} />
        </button>
      </div>

      <div className="px-5 mt-5">
        <p style={{ fontFamily: SANS, fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: C.muted, fontWeight: 600 }}>
          Vigilancia · martes 21 abr · 22:41
        </p>
        <h1 style={{ fontFamily: SERIF, fontSize: 34, lineHeight: 1.05, color: C.ink, fontWeight: 400, marginTop: 6 }}>
          Buenas noches,<br/><span style={{ fontStyle: 'italic' }}>Miguel.</span>
        </h1>
      </div>

      <div className="mx-5 mt-6 p-5 overflow-hidden" style={{ borderRadius: 20, background: C.forestDeep, color: C.cream, position: 'relative' }}>
        <div style={{ position: 'absolute', top: -30, right: -30, width: 140, height: 140, borderRadius: 100, background: 'rgba(181,100,60,0.18)' }} />
        <div className="relative flex justify-between items-start">
          <div>
            <p style={{ fontFamily: SANS, fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', opacity: 0.65, fontWeight: 600 }}>Turno noche</p>
            <p style={{ fontFamily: SERIF, fontSize: 26, marginTop: 4 }}>22:00 – 06:00</p>
            <div className="flex items-center gap-1 mt-3 px-2 py-1" style={{ background: 'rgba(245,238,221,0.12)', borderRadius: 100, display: 'inline-flex' }}>
              <div style={{ width: 6, height: 6, background: C.sage, borderRadius: 3 }} />
              <span style={{ fontFamily: SANS, fontSize: 10, fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase' }}>En curso · 41 min</span>
            </div>
          </div>
          <button className="px-3 py-2" style={{ background: 'rgba(245,238,221,0.15)', color: C.cream, borderRadius: 10, fontFamily: SANS, fontSize: 11, fontWeight: 600 }}>
            Cerrar turno
          </button>
        </div>
      </div>

      <div className="px-5 mt-6">
        <h2 style={{ fontFamily: SERIF, fontSize: 22, color: C.ink, fontStyle: 'italic', fontWeight: 400 }}>Acceso rápido</h2>
      </div>
      <div className="mx-5 mt-3 grid grid-cols-2 gap-2.5">
        {[
          { icon: LogIn,      label: 'Registrar visita', sub: 'Nuevo ingreso',     bg: C.terra, fg: C.cream },
          { icon: QrCode,     label: 'Escanear QR',      sub: 'Visita autorizada', bg: C.paper, fg: C.ink, border: true },
          { icon: Package,    label: 'Recibir paquete',  sub: '3 pendientes',      bg: C.paper, fg: C.ink, border: true },
          { icon: PlayCircle, label: 'Iniciar rondín',   sub: 'Último hace 2h',    bg: C.paper, fg: C.ink, border: true },
        ].map((a, i) => {
          const Icon = a.icon;
          return (
            <button key={i} className="text-left p-4"
                    style={{
                      background: a.bg, color: a.fg, borderRadius: 16, minHeight: 110,
                      border: a.border ? `1px solid ${C.line}` : 'none',
                    }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: a.bg === C.terra ? 'rgba(245,238,221,0.2)' : C.cream, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon size={17} color={a.fg} strokeWidth={1.9} />
              </div>
              <p style={{ fontFamily: SERIF, fontSize: 17, marginTop: 14, fontWeight: 400 }}>{a.label}</p>
              <p style={{ fontFamily: SANS, fontSize: 10, marginTop: 2, opacity: 0.7 }}>{a.sub}</p>
            </button>
          );
        })}
      </div>

      <div className="px-5 mt-7 flex justify-between items-baseline">
        <h2 style={{ fontFamily: SERIF, fontSize: 22, color: C.ink, fontStyle: 'italic', fontWeight: 400 }}>Autorizadas hoy</h2>
        <span style={{ fontFamily: SANS, fontSize: 10, color: C.terra, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>3 pendientes</span>
      </div>
      <div className="mx-5 mt-3 space-y-2">
        {[
          { name: 'María Pérez',   unit: '804',  type: 'Visita',    time: '23:30', authorizedBy: 'Alejandra R.' },
          { name: 'DHL · entrega', unit: '602',  type: 'Paquete',   time: 'cualquier hora', authorizedBy: 'Mauricio S.' },
          { name: 'Jorge Martín',  unit: '1102', type: 'Proveedor', time: '01:00', authorizedBy: 'Carlos M.' },
        ].map((v, i) => (
          <div key={i} className="flex items-center gap-3 p-3" style={{ background: C.paper, border: `1px solid ${C.line}`, borderRadius: 14 }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, background: C.cream, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              {v.type === 'Paquete' ? <Package size={16} color={C.forest} /> : <User size={16} color={C.forest} />}
            </div>
            <div className="flex-1 min-w-0">
              <p style={{ fontFamily: SANS, fontSize: 13, color: C.ink, fontWeight: 600 }}>{v.name}</p>
              <p style={{ fontFamily: SANS, fontSize: 10, color: C.muted, marginTop: 2 }}>Unidad {v.unit} · {v.time} · autoriza {v.authorizedBy}</p>
            </div>
            <ChevronRight size={16} color={C.muted} />
          </div>
        ))}
      </div>
    </div>
  );
}

function StaffAccesos() {
  const [tab, setTab] = useState('activas');
  const activas = [
    { name: 'Roberto Silva',  unit: '804',  type: 'Visita',    in: '21:15', vehicle: 'ABC-123' },
    { name: 'Uber Eats',      unit: '602',  type: 'Delivery',  in: '22:30', vehicle: '—' },
    { name: 'Fernanda Cruz',  unit: '1203', type: 'Visita',    in: '22:38', vehicle: '—' },
  ];
  const historial = [
    { name: 'María López',  unit: '507', type: 'Visita',  in: '19:40', out: '21:05' },
    { name: 'DHL',          unit: '402', type: 'Paquete', in: '18:22', out: '18:25' },
  ];
  return (
    <div className="flex flex-col" style={{ paddingBottom: 100 }}>
      <SectionHeader eyebrow="Bitácora · martes 21 abr" title="Accesos" />
      <div className="px-5 mt-5 grid grid-cols-2 gap-2.5">
        <button className="flex items-center gap-2 justify-center py-3.5" style={{ background: C.terra, color: C.cream, borderRadius: 12, fontFamily: SANS, fontSize: 13, fontWeight: 600 }}>
          <Plus size={15} strokeWidth={2.3} /> Nueva visita
        </button>
        <button className="flex items-center gap-2 justify-center py-3.5" style={{ background: C.forestDeep, color: C.cream, borderRadius: 12, fontFamily: SANS, fontSize: 13, fontWeight: 600 }}>
          <QrCode size={15} strokeWidth={2.3} /> Escanear QR
        </button>
      </div>

      <div className="mx-5 mt-4 flex items-center gap-2 px-3 py-2" style={{ background: C.paper, border: `1px solid ${C.line}`, borderRadius: 12 }}>
        <Search size={14} color={C.muted} />
        <input placeholder="Buscar por nombre, unidad o placa..." className="bg-transparent outline-none flex-1" style={{ fontFamily: SANS, fontSize: 12, color: C.ink }} />
      </div>

      <div className="px-5 mt-5 flex gap-1" style={{ borderBottom: `1px solid ${C.line}` }}>
        {[
          { id: 'activas', label: 'Dentro ahora', count: activas.length },
          { id: 'historial', label: 'Salieron', count: historial.length },
        ].map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
                  className="pb-3 px-3 flex items-center gap-2"
                  style={{
                    fontFamily: SANS, fontSize: 13,
                    color: tab === t.id ? C.ink : C.muted,
                    fontWeight: tab === t.id ? 600 : 500,
                    borderBottom: tab === t.id ? `2px solid ${C.forestDeep}` : '2px solid transparent',
                    marginBottom: -1,
                  }}>
            {t.label}
            <span style={{ fontSize: 10, background: tab === t.id ? C.ink : C.cream, color: tab === t.id ? C.cream : C.muted, padding: '1px 6px', borderRadius: 100, fontWeight: 700 }}>{t.count}</span>
          </button>
        ))}
      </div>

      <div className="mx-5 mt-4 space-y-2">
        {(tab === 'activas' ? activas : historial).map((v, i) => (
          <div key={i} className="p-3" style={{ background: C.paper, border: `1px solid ${C.line}`, borderRadius: 14 }}>
            <div className="flex items-start gap-3">
              <div style={{ width: 40, height: 40, borderRadius: 10, background: v.type === 'Delivery' ? C.terraSoft : C.cream, color: v.type === 'Delivery' ? C.terra : C.forest, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                {v.type === 'Delivery' ? <Truck size={16} /> : v.type === 'Paquete' ? <Package size={16} /> : <User size={16} />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p style={{ fontFamily: SANS, fontSize: 13, color: C.ink, fontWeight: 600 }}>{v.name}</p>
                  <span style={{ fontFamily: SANS, fontSize: 9, color: C.muted, background: C.cream, padding: '1px 6px', borderRadius: 100, fontWeight: 700 }}>{v.type}</span>
                </div>
                <p style={{ fontFamily: SANS, fontSize: 11, color: C.muted, marginTop: 3 }}>
                  Unidad {v.unit} · entrada {v.in}{v.out ? ` · salida ${v.out}` : ''}
                </p>
                {v.vehicle && v.vehicle !== '—' && (
                  <div className="flex items-center gap-1 mt-2">
                    <Car size={11} color={C.muted} />
                    <span style={{ fontFamily: SERIF, fontSize: 13, color: C.inkSoft, letterSpacing: '0.04em' }}>{v.vehicle}</span>
                  </div>
                )}
              </div>
              {tab === 'activas' && (
                <button className="px-3 py-1.5 flex-shrink-0" style={{ background: C.ink, color: C.cream, borderRadius: 100, fontFamily: SANS, fontSize: 11, fontWeight: 600 }}>
                  Salida
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function StaffPaquetes() {
  const [tab, setTab] = useState('pendientes');
  const pendientes = [
    { unit: '804',  resident: 'Alejandra Reyes', carrier: 'Amazon',   received: '16:20' },
    { unit: '602',  resident: 'Mauricio Serna',  carrier: 'Mercado Libre', received: '17:45' },
    { unit: '1203', resident: 'Raúl Castro',     carrier: 'FedEx',    received: '19:10' },
  ];
  const entregados = [
    { unit: '905', resident: 'Andrea Solís', carrier: 'Amazon', received: '14:10', delivered: '19:22' },
  ];
  return (
    <div className="flex flex-col" style={{ paddingBottom: 100 }}>
      <SectionHeader eyebrow={`${pendientes.length} por entregar`} title="Paquetería" />
      <button className="mx-5 mt-5 py-3.5 flex items-center gap-2 justify-center" style={{ background: C.terra, color: C.cream, borderRadius: 12, fontFamily: SANS, fontSize: 13, fontWeight: 600 }}>
        <Camera size={15} strokeWidth={2.3} /> Recibir nuevo paquete
      </button>

      <div className="px-5 mt-5 flex gap-1" style={{ borderBottom: `1px solid ${C.line}` }}>
        {[
          { id: 'pendientes', label: 'Pendientes', count: pendientes.length },
          { id: 'entregados', label: 'Entregados hoy', count: entregados.length },
        ].map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
                  className="pb-3 px-3 flex items-center gap-2"
                  style={{
                    fontFamily: SANS, fontSize: 13,
                    color: tab === t.id ? C.ink : C.muted,
                    fontWeight: tab === t.id ? 600 : 500,
                    borderBottom: tab === t.id ? `2px solid ${C.forestDeep}` : '2px solid transparent',
                    marginBottom: -1,
                  }}>
            {t.label}
            <span style={{ fontSize: 10, background: tab === t.id ? C.ink : C.cream, color: tab === t.id ? C.cream : C.muted, padding: '1px 6px', borderRadius: 100, fontWeight: 700 }}>{t.count}</span>
          </button>
        ))}
      </div>

      <div className="mx-5 mt-4 space-y-2">
        {(tab === 'pendientes' ? pendientes : entregados).map((p, i) => (
          <div key={i} className="p-3.5" style={{ background: C.paper, border: `1px solid ${C.line}`, borderRadius: 14 }}>
            <div className="flex items-start gap-3">
              <div style={{ width: 44, height: 44, borderRadius: 10, background: C.cream, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Gift size={17} color={C.forest} strokeWidth={1.8} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <p style={{ fontFamily: SANS, fontSize: 13, color: C.ink, fontWeight: 600 }}>Unidad {p.unit}</p>
                  <span style={{ fontFamily: SANS, fontSize: 9, color: C.inkSoft, background: C.cream, padding: '1px 6px', borderRadius: 100, fontWeight: 700 }}>{p.carrier}</span>
                </div>
                <p style={{ fontFamily: SANS, fontSize: 12, color: C.inkSoft, marginTop: 2 }}>{p.resident}</p>
                <p style={{ fontFamily: SANS, fontSize: 10, color: C.muted, marginTop: 3 }}>
                  Recibido {p.received}{p.delivered ? ` · entregado ${p.delivered}` : ' · notificado'}
                </p>
              </div>
              {tab === 'pendientes' && (
                <button className="px-3 py-1.5 flex-shrink-0" style={{ background: C.ink, color: C.cream, borderRadius: 100, fontFamily: SANS, fontSize: 11, fontWeight: 600 }}>
                  Entregar
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function StaffTickets() {
  const tickets = [
    { title: 'Fuga en pasillo piso 8',   location: 'Piso 8',          priority: 'urgente',  reporter: 'Alejandra R. · 804', when: '20 min', status: 'abierto' },
    { title: 'Foco fundido',             location: 'Escalera piso 3', priority: 'media',    reporter: 'Roberto (admin)', when: '4h', status: 'en-proceso' },
    { title: 'Puerta de acceso rechina', location: 'Lobby',           priority: 'baja',     reporter: 'Vigilancia', when: 'ayer', status: 'en-proceso' },
  ];
  const priorityMap = {
    urgente: { bg: 'rgba(168,68,51,0.15)', fg: C.warn, icon: AlertCircle },
    media:   { bg: '#F4E6C5',              fg: C.ambar, icon: AlertTriangle },
    baja:    { bg: C.cream,                fg: C.muted, icon: Clock },
  };
  return (
    <div className="flex flex-col" style={{ paddingBottom: 100 }}>
      <SectionHeader eyebrow="Mantenimiento" title="Tickets" />
      <button className="mx-5 mt-5 py-3.5 flex items-center gap-2 justify-center" style={{ background: C.terra, color: C.cream, borderRadius: 12, fontFamily: SANS, fontSize: 13, fontWeight: 600 }}>
        <Plus size={15} strokeWidth={2.3} /> Reportar incidente
      </button>

      <div className="mx-5 mt-5 space-y-2">
        {tickets.map((t, i) => {
          const p = priorityMap[t.priority];
          const PIcon = p.icon;
          return (
            <div key={i} className="p-4" style={{ background: C.paper, border: `1px solid ${C.line}`, borderRadius: 14 }}>
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-2.5 flex-1 min-w-0">
                  <div style={{ width: 28, height: 28, borderRadius: 8, background: p.bg, color: p.fg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <PIcon size={13} strokeWidth={2.2} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p style={{ fontFamily: SANS, fontSize: 13, color: C.ink, fontWeight: 600, lineHeight: 1.3 }}>{t.title}</p>
                    <div className="flex items-center gap-1 mt-1.5">
                      <MapPin size={10} color={C.muted} />
                      <p style={{ fontFamily: SANS, fontSize: 11, color: C.muted }}>{t.location}</p>
                    </div>
                  </div>
                </div>
                <span style={{ fontFamily: SANS, fontSize: 9, color: p.fg, background: p.bg, padding: '3px 8px', borderRadius: 100, fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase', flexShrink: 0 }}>
                  {t.priority}
                </span>
              </div>
              <div className="flex items-center justify-between mt-3 pt-3" style={{ borderTop: `1px solid ${C.line}` }}>
                <p style={{ fontFamily: SANS, fontSize: 10, color: C.muted }}>{t.reporter} · {t.when}</p>
                <span style={{ fontFamily: SANS, fontSize: 9, color: t.status === 'abierto' ? C.warn : C.forest, background: t.status === 'abierto' ? 'rgba(168,68,51,0.1)' : 'rgba(138,165,140,0.2)', padding: '2px 7px', borderRadius: 100, fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                  {t.status === 'abierto' ? 'Abierto' : 'En proceso'}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function StaffMas() {
  const items = [
    { icon: PlayCircle, label: 'Iniciar rondín',    sub: 'Último hace 2h' },
    { icon: FileText,   label: 'Bitácora del turno', sub: '6 entradas hoy' },
    { icon: Phone,      label: 'Directorio',         sub: 'Residentes y emergencias' },
    { icon: Settings,   label: 'Ajustes' },
  ];
  return (
    <div className="flex flex-col" style={{ paddingBottom: 100 }}>
      <SectionHeader eyebrow="Menú" title="Más" />
      <div className="mx-5 mt-5 p-4 flex items-center gap-3" style={{ background: C.cream, borderRadius: 20 }}>
        <div style={{ width: 48, height: 48, borderRadius: 24, background: C.forestDeep, color: C.cream, fontFamily: SERIF, fontSize: 20, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>M</div>
        <div className="flex-1">
          <p style={{ fontFamily: SERIF, fontSize: 20, color: C.ink, fontWeight: 400 }}>Miguel Torres</p>
          <p style={{ fontFamily: SANS, fontSize: 11, color: C.muted, marginTop: 1 }}>Vigilancia · Turno noche</p>
        </div>
      </div>
      <div className="mx-5 mt-5" style={{ background: C.paper, border: `1px solid ${C.line}`, borderRadius: 16, overflow: 'hidden' }}>
        {items.map((it, i) => {
          const Icon = it.icon;
          return (
            <button key={i} className="w-full flex items-center gap-3 px-4 py-4"
                    style={{ borderBottom: i < items.length - 1 ? `1px solid ${C.line}` : 'none' }}>
              <div style={{ width: 34, height: 34, borderRadius: 9, background: C.cream, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon size={15} color={C.forest} strokeWidth={1.8} />
              </div>
              <div className="flex-1 text-left">
                <p style={{ fontFamily: SANS, fontSize: 13, color: C.ink, fontWeight: 500 }}>{it.label}</p>
                {it.sub && <p style={{ fontFamily: SANS, fontSize: 10, color: C.muted, marginTop: 2 }}>{it.sub}</p>}
              </div>
              <ChevronRight size={16} color={C.muted} />
            </button>
          );
        })}
      </div>
      <button className="mx-5 mt-5 flex items-center justify-center gap-2 py-3" style={{ background: C.warn, color: C.cream, borderRadius: 12, fontFamily: SANS, fontSize: 13, fontWeight: 600 }}>
        <StopCircle size={14} /> Cerrar turno
      </button>
    </div>
  );
}

function StaffApp() {
  const [tab, setTab] = useState('inicio');
  const tabs = [
    { id: 'inicio',   icon: Home,           label: 'Inicio' },
    { id: 'accesos',  icon: Shield,         label: 'Accesos',  badge: 3 },
    { id: 'paquetes', icon: Package,        label: 'Paquetes', badge: 5 },
    { id: 'tickets',  icon: Wrench,         label: 'Tickets' },
    { id: 'mas',      icon: MoreHorizontal, label: 'Más' },
  ];
  return (
    <Phone>
      <StatusBar time="22:41" />
      <div className="phone-scroll" style={{ height: 'calc(100% - 32px)', overflowY: 'auto', position: 'relative' }}>
        {tab === 'inicio'   && <StaffInicio />}
        {tab === 'accesos'  && <StaffAccesos />}
        {tab === 'paquetes' && <StaffPaquetes />}
        {tab === 'tickets'  && <StaffTickets />}
        {tab === 'mas'      && <StaffMas />}
        <TabBar tabs={tabs} active={tab} onChange={setTab} />
      </div>
    </Phone>
  );
}

// ============================================================
// PHONE FRAME
// ============================================================
function Phone({ children }) {
  return (
    <div className="relative"
         style={{ width: 380, height: 780, background: C.paper, borderRadius: 48,
                  boxShadow: '0 30px 80px -20px rgba(31,46,36,0.35), 0 0 0 1px rgba(31,46,36,0.06)',
                  overflow: 'hidden' }}>
      {children}
    </div>
  );
}

// ============================================================
// MAIN APP — view switcher
// ============================================================
const VIEWS = [
  { id: 'resident', label: 'Residente',       description: 'Propietarios e inquilinos' },
  { id: 'admin',    label: 'Administración',  description: 'Gestión, cobranza, reportes' },
  { id: 'staff',    label: 'Staff',           description: 'Vigilancia, recepción, mantenimiento' },
];

export default function App() {
  const [view, setView] = useState('resident');
  const current = VIEWS.find(v => v.id === view);

  return (
    <div className="min-h-screen w-full flex flex-col items-center p-6"
         style={{ background: `radial-gradient(ellipse at 50% 0%, ${C.cream} 0%, ${C.creamDeep} 70%, ${C.creamDeep} 100%)`, fontFamily: SANS }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Manrope:wght@400;500;600;700&display=swap');
        .phone-scroll::-webkit-scrollbar { display: none; }
        .phone-scroll { scrollbar-width: none; }
      `}</style>

      {/* Top title */}
      <div className="text-center mb-4 mt-4">
        <p style={{ fontFamily: SANS, fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: C.muted, fontWeight: 700 }}>
          Vista Condominio
        </p>
        <p style={{ fontFamily: SERIF, fontSize: 28, color: C.ink, marginTop: 6, fontWeight: 400, fontStyle: 'italic', lineHeight: 1.1 }}>
          {current.description}
        </p>
      </div>

      {/* View switcher */}
      <div className="inline-flex p-1 mb-5" style={{ background: C.paper, border: `1px solid ${C.line}`, borderRadius: 100 }}>
        {VIEWS.map(v => (
          <button key={v.id} onClick={() => setView(v.id)}
                  className="px-4 py-2"
                  style={{
                    background: view === v.id ? C.forestDeep : 'transparent',
                    color: view === v.id ? C.cream : C.inkSoft,
                    borderRadius: 100, fontFamily: SANS, fontSize: 12, fontWeight: 600,
                  }}>
            {v.label}
          </button>
        ))}
      </div>

      {/* The current view (includes role switcher for resident) */}
      <div className="flex flex-col items-center">
        {view === 'resident' && <ResidentApp />}
        {view === 'admin'    && <AdminApp />}
        {view === 'staff'    && <StaffApp />}
      </div>

      <p style={{ fontFamily: SANS, fontSize: 11, color: C.muted, marginTop: 20, maxWidth: 440, textAlign: 'center', lineHeight: 1.55 }}>
        Tres apps, una misma filosofía de diseño. Cambia la vista arriba para navegar entre los roles.
        La app del residente tiene además un switcher interno para ver los tres tipos de residente.
      </p>
    </div>
  );
}
