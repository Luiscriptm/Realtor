import { useState } from 'react';
import type { ReactNode } from 'react';
import {
  AlertCircle,
  Bell,
  Building2,
  CalendarDays,
  ChevronDown,
  ChevronRight,
  CheckCircle2,
  Download,
  FileBarChart,
  FileText,
  Files,
  LayoutDashboard,
  Megaphone,
  MoreHorizontal,
  Plus,
  Search,
  Send,
  Settings,
  Shield,
  Sparkles,
  TrendingUp,
  Upload,
  Users,
  Wallet,
} from 'lucide-react';
import {
  StatusPill,
  TabBar,
  type PaymentStatus,
  type TabBarItem,
} from '@/components';
import { DemoHeading, Phone, PhoneScroll, StatusBar } from './shared';

/**
 * Port del prototipo: app de administración. 5 pantallas (Inicio, Cobranza, Reportes,
 * Documentos, Más). Mobile-first; en paso 6+ se le agregarán breakpoints md: donde
 * una operación masiva lo amerite (según README).
 */

// ============================================================
// INICIO
// ============================================================

interface KPIProps {
  label: string;
  value: ReactNode;
  sub: string;
  accent?: string;
}
function KPI({ label, value, sub, accent }: KPIProps) {
  return (
    <div className="bg-paper border border-line rounded-[14px] p-3.5">
      <p className="font-sans text-[9px] tracking-[0.16em] uppercase text-muted font-bold">
        {label}
      </p>
      <p
        className={[
          'font-serif text-[26px] leading-[1.1] mt-1.5 font-normal',
          accent ?? 'text-ink',
        ].join(' ')}
      >
        {value}
      </p>
      <p className="font-sans text-[10px] text-muted mt-1 leading-[1.3]">{sub}</p>
    </div>
  );
}

function AdminInicio() {
  return (
    <div className="flex flex-col" style={{ paddingBottom: 100 }}>
      <div className="flex justify-between items-center px-5 pt-4">
        <div className="flex items-center gap-2 bg-cream pl-2.5 pr-3 py-1.5 rounded-full">
          <Building2 size={13} className="text-forest" strokeWidth={1.8} />
          <span className="font-sans text-[11px] text-ink font-semibold">Torre Marina</span>
          <ChevronDown size={12} className="text-muted" strokeWidth={2} />
        </div>
        <button className="relative w-9 h-9 rounded-full bg-cream flex items-center justify-center">
          <Bell size={16} className="text-ink" strokeWidth={1.8} />
          <div className="absolute top-2 right-[9px] w-[7px] h-[7px] bg-terra rounded-full border-[1.5px] border-paper" />
        </button>
      </div>

      <div className="px-5 mt-5">
        <p className="font-sans text-[10px] uppercase tracking-[0.18em] text-muted font-semibold">
          Administrador · martes 21 abr
        </p>
        <h1 className="font-serif text-[34px] leading-[1.05] text-ink font-normal mt-1.5">
          Hola,
          <br />
          <span className="italic">Roberto.</span>
        </h1>
      </div>

      <div className="mx-5 mt-6 rounded-[20px] bg-forestDeep text-cream relative overflow-hidden p-5">
        <div className="absolute -top-[30px] -right-[30px] w-[140px] h-[140px] rounded-full bg-terra/[0.18]" />
        <div className="relative">
          <p className="font-sans text-[10px] uppercase tracking-[0.18em] opacity-65 font-semibold">
            Cobranza abril
          </p>
          <div className="flex items-baseline gap-2 mt-3">
            <span className="font-serif text-[38px] leading-none font-normal">$892k</span>
            <span className="font-sans text-[11px] opacity-65">/ $950k</span>
          </div>
          <div className="mt-3 h-[5px] bg-cream/15 rounded-[3px] overflow-hidden">
            <div className="h-full bg-terra" style={{ width: '93.9%' }} />
          </div>
          <p className="font-sans text-[11px] opacity-75 mt-2">
            93.9% recuperado · 40 de 48 unidades
          </p>
        </div>
      </div>

      <div className="px-5 mt-3 grid grid-cols-2 gap-2.5">
        <KPI label="Morosidad" value="8" sub="$47,600 vencidos" accent="text-warn" />
        <KPI label="En revisión" value="2" sub="Comprobantes por aprobar" accent="text-ambar" />
        <KPI label="Reservas hoy" value="6" sub="Salón, asador, gym" />
        <KPI label="Tickets" value="3" sub="1 urgente, 2 en proceso" />
      </div>

      <div className="px-5 mt-7 flex justify-between items-baseline">
        <h2 className="font-serif italic text-[22px] text-ink font-normal">Necesita atención</h2>
        <button className="font-sans text-[11px] text-forest font-semibold">Ver todo</button>
      </div>
      <div className="mx-5 mt-3 space-y-2">
        {[
          { unit: '304', name: 'Familia Ortega', months: 3, amount: 14550 },
          { unit: '507', name: 'Gabriela Ruiz', months: 2, amount: 9700 },
          { unit: '1208', name: 'Depto vacante', months: 2, amount: 9700 },
        ].map((r, i) => (
          <div
            key={i}
            className="flex items-center gap-3 p-3 bg-paper border border-line rounded-[14px]"
          >
            <div className="w-10 h-10 rounded-[10px] bg-warn/10 text-warn font-serif text-sm flex items-center justify-center font-normal shrink-0">
              {r.unit}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-sans text-[13px] text-ink font-semibold">{r.name}</p>
              <p className="font-sans text-[11px] text-warn font-semibold mt-px">
                {r.months} meses · ${r.amount.toLocaleString()}
              </p>
            </div>
            <ChevronRight size={16} className="text-muted" />
          </div>
        ))}
      </div>

      <div className="px-5 mt-7">
        <h2 className="font-serif italic text-[22px] text-ink font-normal">Actividad</h2>
      </div>
      <div className="mx-5 mt-3 space-y-1">
        {[
          {
            icon: CheckCircle2,
            color: 'text-sage',
            text: 'Pago SPEI confirmado',
            sub: 'Alejandra Reyes · 804',
            time: '2h',
          },
          {
            icon: Send,
            color: 'text-forest',
            text: 'Reporte marzo enviado',
            sub: 'A Fernando Hernández',
            time: '4h',
          },
          {
            icon: CalendarDays,
            color: 'text-terra',
            text: 'Nueva reserva · Salón',
            sub: 'Carlos Mendoza · 1102',
            time: '6h',
          },
        ].map((a, i) => {
          const Icon = a.icon;
          return (
            <div
              key={i}
              className="flex items-center gap-3 py-2.5"
              style={{ borderBottom: i < 2 ? '1px solid #E3DBC5' : 'none' }}
            >
              <div className="w-[34px] h-[34px] rounded-[10px] bg-cream flex items-center justify-center shrink-0">
                <Icon size={14} className={a.color} strokeWidth={2} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-sans text-[12.5px] text-ink font-medium">{a.text}</p>
                <p className="font-sans text-[10px] text-muted mt-px">{a.sub}</p>
              </div>
              <span className="font-sans text-[10px] text-muted">{a.time}</span>
            </div>
          );
        })}
      </div>

      <button
        className="absolute bg-ink text-cream px-[18px] py-3 rounded-full font-sans text-[13px] font-semibold flex items-center gap-1.5"
        style={{ bottom: 92, right: 16, boxShadow: '0 8px 24px rgba(31,46,36,0.25)' }}
      >
        <Plus size={16} strokeWidth={2.4} /> Registrar pago
      </button>
    </div>
  );
}

// ============================================================
// COBRANZA
// ============================================================

interface CobranzaRow {
  unit: string;
  name: string;
  amount: number;
  due: string;
  status: PaymentStatus;
  tenant?: boolean;
}

function AdminCobranza() {
  const [filter, setFilter] = useState<'todos' | PaymentStatus>('todos');
  const rows: CobranzaRow[] = [
    { unit: '304', name: 'Familia Ortega', amount: 14550, due: 'vence 24 ene', status: 'moroso' },
    { unit: '402', name: 'Arturo Méndez', amount: 9700, due: 'vence 24 feb', status: 'moroso' },
    {
      unit: '602',
      name: 'Mauricio Serna',
      amount: 4300,
      due: 'SPEI 19 abr',
      status: 'revision',
      tenant: true,
    },
    { unit: '801', name: 'Paulina Vega', amount: 4850, due: 'SPEI 18 abr', status: 'revision' },
    {
      unit: '804',
      name: 'Alejandra Reyes',
      amount: 7850,
      due: 'Tarjeta 20 abr',
      status: 'pagado',
    },
    {
      unit: '1102',
      name: 'Carlos Mendoza',
      amount: 5200,
      due: 'vence 24 abr',
      status: 'pendiente',
      tenant: true,
    },
  ];
  const filtered = filter === 'todos' ? rows : rows.filter((r) => r.status === filter);
  const options: Array<{ id: 'todos' | PaymentStatus; label: string }> = [
    { id: 'todos', label: 'Todos' },
    { id: 'moroso', label: 'Morosos' },
    { id: 'revision', label: 'Revisión' },
    { id: 'pendiente', label: 'Pendiente' },
    { id: 'pagado', label: 'Pagado' },
  ];
  return (
    <div className="flex flex-col" style={{ paddingBottom: 100 }}>
      <div className="flex justify-between items-center px-5 pt-4">
        <p className="font-sans text-[10px] uppercase tracking-[0.18em] text-muted font-semibold">
          Abril 2026
        </p>
        <button className="flex items-center gap-1.5 px-3 py-1.5 bg-cream rounded-full font-sans text-[11px] text-ink font-semibold">
          <Download size={12} /> Exportar
        </button>
      </div>
      <div className="px-5 mt-2">
        <h1 className="font-serif italic text-[32px] text-ink font-normal">Cobranza</h1>
      </div>

      <div className="mx-5 mt-4 flex items-center gap-2 px-3 py-2 bg-paper border border-line rounded-[12px]">
        <Search size={14} className="text-muted" />
        <input
          placeholder="Buscar unidad o residente..."
          className="bg-transparent outline-none flex-1 font-sans text-xs text-ink placeholder:text-muted"
        />
      </div>

      <div className="mt-3 flex gap-2 overflow-x-auto px-5 pb-1 phone-scroll">
        {options.map((o) => (
          <button
            key={o.id}
            onClick={() => setFilter(o.id)}
            className={[
              'px-3 py-1.5 shrink-0 rounded-full font-sans text-xs font-semibold border',
              filter === o.id
                ? 'bg-ink text-cream border-ink'
                : 'bg-paper text-inkSoft border-line',
            ].join(' ')}
          >
            {o.label}
          </button>
        ))}
      </div>

      <div className="mx-5 mt-4 space-y-2">
        {filtered.map((r, i) => (
          <div
            key={i}
            className="flex items-center gap-3 p-3 bg-paper border border-line rounded-[14px]"
          >
            <div className="w-11 h-11 rounded-[11px] bg-cream text-forest font-serif text-[15px] flex items-center justify-center shrink-0">
              {r.unit}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <p className="font-sans text-[13px] text-ink font-semibold truncate">{r.name}</p>
                {r.tenant && (
                  <span className="bg-creamDeep text-inkSoft font-sans text-[8px] font-bold px-1.5 py-px rounded-full tracking-[0.05em]">
                    INQ
                  </span>
                )}
              </div>
              <p className="font-sans text-[11px] text-muted mt-0.5">{r.due}</p>
            </div>
            <div className="text-right">
              <p className="font-serif text-base text-ink leading-none">
                ${r.amount.toLocaleString()}
              </p>
              <div className="mt-1">
                <StatusPill status={r.status} size="sm" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mx-5 mt-5 flex justify-between items-center p-3 bg-cream rounded-[12px]">
        <span className="font-sans text-[11px] text-inkSoft font-medium">Total del periodo</span>
        <span className="font-serif text-lg text-ink">$892,400</span>
      </div>
    </div>
  );
}

// ============================================================
// REPORTES
// ============================================================

function AdminReportes() {
  const [type, setType] = useState('financiero');
  const types = [
    {
      id: 'financiero',
      label: 'Financiero mensual',
      desc: 'Ingresos, egresos, balance',
    },
    { id: 'cobranza', label: 'Cobranza', desc: 'Pagos y morosidad' },
    { id: 'mantenimiento', label: 'Mantenimiento', desc: 'Incidencias y costos' },
    { id: 'amenidades', label: 'Áreas comunes', desc: 'Reservas y ocupación' },
  ];
  return (
    <div className="flex flex-col" style={{ paddingBottom: 100 }}>
      <DemoHeading eyebrow="Generar y enviar" title="Reportes" />
      <div className="mx-5 mt-5 p-5 bg-forestDeep text-cream rounded-[20px]">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles size={14} className="text-terra" />
          <p className="font-sans text-[10px] uppercase tracking-[0.18em] text-[#8EA394] font-bold">
            Nuevo reporte
          </p>
        </div>
        <p className="font-serif text-[22px] italic">Arma y envía</p>

        <p className="font-sans text-[10px] text-[#8EA394] font-semibold mt-4 mb-2 uppercase tracking-[0.05em]">
          Tipo
        </p>
        <div className="space-y-2">
          {types.map((t) => {
            const selected = type === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setType(t.id)}
                className={[
                  'w-full text-left flex items-center gap-3 p-2.5 rounded-[10px] border',
                  selected ? 'bg-cream/10 border-cream/30' : 'bg-transparent border-cream/10',
                ].join(' ')}
              >
                <div
                  className={[
                    'w-[14px] h-[14px] rounded-full border-[1.5px] flex items-center justify-center shrink-0',
                    selected ? 'border-cream' : 'border-cream/30',
                  ].join(' ')}
                >
                  {selected && <div className="w-1.5 h-1.5 rounded-full bg-cream" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-sans text-xs font-semibold">{t.label}</p>
                  <p className="font-sans text-[10px] opacity-65 mt-px">{t.desc}</p>
                </div>
              </button>
            );
          })}
        </div>

        <p className="font-sans text-[9px] text-[#8EA394] font-bold tracking-[0.08em] uppercase mt-4 mb-1.5">
          Enviar a
        </p>
        <div className="flex flex-wrap gap-1.5 p-2 bg-cream/[0.08] rounded-[10px] min-h-[40px]">
          {['Fernando H.', 'Mesa directiva'].map((r, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-1.5 px-2 py-1 bg-cream/15 rounded-full font-sans text-[10px] text-cream font-medium"
            >
              {r}
            </span>
          ))}
          <button className="font-sans text-[10px] text-terra font-bold px-1.5 py-1">
            + Agregar
          </button>
        </div>

        <button className="w-full mt-4 py-3 flex items-center justify-center gap-2 bg-terra text-cream rounded-[12px] font-sans text-[13px] font-semibold">
          <Send size={14} /> Generar y enviar
        </button>
      </div>

      <div className="px-5 mt-7">
        <h2 className="font-serif italic text-[22px] text-ink font-normal">Enviados</h2>
      </div>
      <div className="mx-5 mt-3 space-y-2">
        {[
          {
            title: 'Financiero · marzo',
            to: 'Fernando H., Mesa',
            when: '01 abr',
            icon: TrendingUp,
          },
          { title: 'Cobranza · Q1', to: 'Fernando H.', when: '02 abr', icon: Wallet },
          {
            title: 'Mantenimiento · mar',
            to: 'Solo generado',
            when: '30 mar',
            icon: AlertCircle,
          },
        ].map((r, i) => {
          const Icon = r.icon;
          return (
            <div
              key={i}
              className="flex items-center gap-3 p-3 bg-paper border border-line rounded-[14px]"
            >
              <div className="w-9 h-9 rounded-[10px] bg-cream flex items-center justify-center shrink-0">
                <Icon size={14} className="text-forest" strokeWidth={2} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-sans text-[12.5px] text-ink font-semibold">{r.title}</p>
                <p className="font-sans text-[10px] text-muted mt-px truncate">
                  {r.to} · {r.when}
                </p>
              </div>
              <button className="w-[30px] h-[30px] rounded-[8px] bg-cream flex items-center justify-center">
                <Download size={12} className="text-inkSoft" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ============================================================
// DOCUMENTOS
// ============================================================

function AdminDocumentos() {
  const docs = [
    { name: 'Reglamento interno', size: '2.4 MB', updated: '15 ene', visibility: 'Todos' },
    {
      name: 'Contrato arrendamiento · 1102',
      size: '890 KB',
      updated: '28 ago',
      visibility: 'Privado',
    },
    {
      name: 'Acta asamblea · marzo 2026',
      size: '1.1 MB',
      updated: '28 mar',
      visibility: 'Propietarios',
    },
    {
      name: 'Presupuesto anual 2026',
      size: '640 KB',
      updated: '10 ene',
      visibility: 'Propietarios',
    },
    { name: 'Protocolo de seguridad', size: '450 KB', updated: '02 feb', visibility: 'Todos' },
  ];
  return (
    <div className="flex flex-col" style={{ paddingBottom: 100 }}>
      <div className="flex justify-between items-start px-5 pt-4">
        <div>
          <p className="font-sans text-[10px] uppercase tracking-[0.18em] text-muted font-semibold">
            Biblioteca
          </p>
          <h1 className="font-serif italic text-[32px] text-ink mt-1 font-normal">Documentos</h1>
        </div>
        <button className="flex items-center gap-1.5 px-3 py-2 mt-4 bg-forestDeep text-cream rounded-[10px] font-sans text-[11px] font-semibold">
          <Upload size={12} /> Subir
        </button>
      </div>
      <p className="font-sans text-xs text-inkSoft leading-[1.5] mt-2 px-5">
        Reglamento, contratos y actas. Los residentes los descargan desde su app según permisos.
      </p>
      <div className="mx-5 mt-5 space-y-2">
        {docs.map((d, i) => (
          <div key={i} className="p-3.5 bg-paper border border-line rounded-[14px]">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-[10px] bg-cream flex items-center justify-center shrink-0">
                <FileText size={16} className="text-forest" strokeWidth={1.8} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-sans text-[13px] text-ink font-semibold leading-[1.3]">
                  {d.name}
                </p>
                <div className="flex items-center gap-2 mt-1.5 font-sans text-[10px] text-muted">
                  <span>{d.updated}</span>
                  <span>·</span>
                  <span>{d.size}</span>
                </div>
                <div className="inline-flex items-center gap-1 mt-2 px-2 py-[2px] bg-cream rounded-full">
                  <Users size={9} className="text-forest" />
                  <span className="font-sans text-[9px] text-inkSoft font-bold tracking-[0.04em]">
                    {d.visibility}
                  </span>
                </div>
              </div>
              <button className="w-8 h-8 rounded-[8px] bg-cream flex items-center justify-center shrink-0">
                <Download size={13} className="text-inkSoft" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================================
// MÁS
// ============================================================

function AdminMas() {
  const items = [
    { icon: Building2, label: 'Unidades', sub: '48 unidades · 3 vacantes' },
    { icon: CalendarDays, label: 'Reservas', sub: 'Calendario áreas comunes' },
    { icon: Megaphone, label: 'Comunidad', sub: 'Avisos y tickets' },
    { icon: TrendingUp, label: 'Finanzas', sub: 'Ingresos, egresos, balance' },
    { icon: Shield, label: 'Staff', sub: 'Vigilancia, recepción, mtto' },
    { icon: Settings, label: 'Ajustes', sub: 'Cuotas, roles, torre' },
  ];
  return (
    <div className="flex flex-col" style={{ paddingBottom: 100 }}>
      <DemoHeading eyebrow="Menú" title="Más" />
      <div className="mx-5 mt-5 p-4 flex items-center gap-3 bg-cream rounded-[20px]">
        <div className="w-12 h-12 rounded-full bg-forestDeep text-cream font-serif text-xl flex items-center justify-center">
          R
        </div>
        <div className="flex-1">
          <p className="font-serif text-xl text-ink font-normal">Roberto Aguilar</p>
          <p className="font-sans text-[11px] text-muted mt-px">
            Administrador · Torre Marina
          </p>
        </div>
      </div>
      <div className="mx-5 mt-5 bg-paper border border-line rounded-[16px] overflow-hidden">
        {items.map((it, i) => {
          const Icon = it.icon;
          return (
            <button
              key={i}
              className="w-full flex items-center gap-3 px-4 py-4"
              style={{ borderBottom: i < items.length - 1 ? '1px solid #E3DBC5' : 'none' }}
            >
              <div className="w-[34px] h-[34px] rounded-[9px] bg-cream flex items-center justify-center">
                <Icon size={15} className="text-forest" strokeWidth={1.8} />
              </div>
              <div className="flex-1 text-left">
                <p className="font-sans text-[13px] text-ink font-medium">{it.label}</p>
                <p className="font-sans text-[10px] text-muted mt-0.5">{it.sub}</p>
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
// APP WRAPPER
// ============================================================

const TABS: TabBarItem[] = [
  { id: 'inicio', icon: LayoutDashboard, label: 'Inicio' },
  { id: 'cobranza', icon: Wallet, label: 'Cobranza', badge: 8 },
  { id: 'reportes', icon: FileBarChart, label: 'Reportes' },
  { id: 'documentos', icon: Files, label: 'Docs' },
  { id: 'mas', icon: MoreHorizontal, label: 'Más' },
];

export function AdminApp() {
  const [tab, setTab] = useState('inicio');
  return (
    <Phone>
      <StatusBar />
      <PhoneScroll>
        {tab === 'inicio' && <AdminInicio />}
        {tab === 'cobranza' && <AdminCobranza />}
        {tab === 'reportes' && <AdminReportes />}
        {tab === 'documentos' && <AdminDocumentos />}
        {tab === 'mas' && <AdminMas />}
      </PhoneScroll>
      <div className="absolute bottom-0 left-0 right-0">
        <TabBar tabs={TABS} active={tab} onChange={setTab} />
      </div>
    </Phone>
  );
}
