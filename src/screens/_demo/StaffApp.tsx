import { useState } from 'react';
import {
  AlertCircle,
  AlertTriangle,
  Bell,
  Building2,
  Camera,
  Car,
  ChevronRight,
  Clock,
  FileText,
  Gift,
  Home,
  LogIn,
  MapPin,
  MoreHorizontal,
  Package,
  Phone as PhoneIcon,
  PlayCircle,
  Plus,
  QrCode,
  Search,
  Settings,
  Shield,
  StopCircle,
  Truck,
  User,
  Wrench,
} from 'lucide-react';
import { TabBar, type TabBarItem } from '@/components';
import { DemoHeading, Phone, PhoneScroll, StatusBar } from './shared';

/**
 * Port del prototipo: app del staff operativo (vigilancia, recepción, mantenimiento).
 * 5 pantallas. Demo-only: los módulos visibles en el tab bar aquí están fijos —
 * en producción dependerán de staff_permissions (paso 6+).
 */

// ============================================================
// INICIO
// ============================================================

function StaffInicio() {
  return (
    <div className="flex flex-col" style={{ paddingBottom: 100 }}>
      <div className="flex justify-between items-center px-5 pt-4">
        <div className="flex items-center gap-2 bg-cream pl-2.5 pr-3 py-1.5 rounded-full">
          <Building2 size={13} className="text-forest" strokeWidth={1.8} />
          <span className="font-sans text-[11px] text-ink font-semibold">
            Torre Marina · Caseta
          </span>
        </div>
        <button className="relative w-9 h-9 rounded-full bg-cream flex items-center justify-center">
          <Bell size={16} className="text-ink" strokeWidth={1.8} />
          <div className="absolute top-2 right-[9px] w-[7px] h-[7px] bg-terra rounded-full border-[1.5px] border-paper" />
        </button>
      </div>

      <div className="px-5 mt-5">
        <p className="font-sans text-[10px] uppercase tracking-[0.18em] text-muted font-semibold">
          Vigilancia · martes 21 abr · 22:41
        </p>
        <h1 className="font-serif text-[34px] leading-[1.05] text-ink font-normal mt-1.5">
          Buenas noches,
          <br />
          <span className="italic">Miguel.</span>
        </h1>
      </div>

      <div className="mx-5 mt-6 p-5 rounded-[20px] bg-forestDeep text-cream relative overflow-hidden">
        <div className="absolute -top-[30px] -right-[30px] w-[140px] h-[140px] rounded-full bg-terra/[0.18]" />
        <div className="relative flex justify-between items-start">
          <div>
            <p className="font-sans text-[10px] uppercase tracking-[0.18em] opacity-65 font-semibold">
              Turno noche
            </p>
            <p className="font-serif text-[26px] mt-1">22:00 – 06:00</p>
            <div className="inline-flex items-center gap-1 mt-3 px-2 py-1 bg-cream/10 rounded-full">
              <div className="w-1.5 h-1.5 bg-sage rounded-full" />
              <span className="font-sans text-[10px] font-bold tracking-[0.05em] uppercase">
                En curso · 41 min
              </span>
            </div>
          </div>
          <button className="px-3 py-2 bg-cream/15 text-cream rounded-[10px] font-sans text-[11px] font-semibold">
            Cerrar turno
          </button>
        </div>
      </div>

      <div className="px-5 mt-6">
        <h2 className="font-serif italic text-[22px] text-ink font-normal">Acceso rápido</h2>
      </div>
      <div className="mx-5 mt-3 grid grid-cols-2 gap-2.5">
        {[
          {
            icon: LogIn,
            label: 'Registrar visita',
            sub: 'Nuevo ingreso',
            cls: 'bg-terra text-cream',
            inner: 'bg-cream/20',
          },
          {
            icon: QrCode,
            label: 'Escanear QR',
            sub: 'Visita autorizada',
            cls: 'bg-paper text-ink border border-line',
            inner: 'bg-cream',
          },
          {
            icon: Package,
            label: 'Recibir paquete',
            sub: '3 pendientes',
            cls: 'bg-paper text-ink border border-line',
            inner: 'bg-cream',
          },
          {
            icon: PlayCircle,
            label: 'Iniciar rondín',
            sub: 'Último hace 2h',
            cls: 'bg-paper text-ink border border-line',
            inner: 'bg-cream',
          },
        ].map((a, i) => {
          const Icon = a.icon;
          return (
            <button
              key={i}
              className={['text-left p-4 rounded-[16px] min-h-[110px]', a.cls].join(' ')}
            >
              <div
                className={[
                  'w-9 h-9 rounded-[10px] flex items-center justify-center',
                  a.inner,
                ].join(' ')}
              >
                <Icon size={17} strokeWidth={1.9} />
              </div>
              <p className="font-serif text-[17px] mt-3.5 font-normal">{a.label}</p>
              <p className="font-sans text-[10px] mt-0.5 opacity-70">{a.sub}</p>
            </button>
          );
        })}
      </div>

      <div className="px-5 mt-7 flex justify-between items-baseline">
        <h2 className="font-serif italic text-[22px] text-ink font-normal">Autorizadas hoy</h2>
        <span className="font-sans text-[10px] text-terra font-bold tracking-[0.1em] uppercase">
          3 pendientes
        </span>
      </div>
      <div className="mx-5 mt-3 space-y-2">
        {[
          {
            name: 'María Pérez',
            unit: '804',
            type: 'Visita',
            time: '23:30',
            authorizedBy: 'Alejandra R.',
          },
          {
            name: 'DHL · entrega',
            unit: '602',
            type: 'Paquete',
            time: 'cualquier hora',
            authorizedBy: 'Mauricio S.',
          },
          {
            name: 'Jorge Martín',
            unit: '1102',
            type: 'Proveedor',
            time: '01:00',
            authorizedBy: 'Carlos M.',
          },
        ].map((v, i) => (
          <div
            key={i}
            className="flex items-center gap-3 p-3 bg-paper border border-line rounded-[14px]"
          >
            <div className="w-10 h-10 rounded-[10px] bg-cream flex items-center justify-center shrink-0">
              {v.type === 'Paquete' ? (
                <Package size={16} className="text-forest" />
              ) : (
                <User size={16} className="text-forest" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-sans text-[13px] text-ink font-semibold">{v.name}</p>
              <p className="font-sans text-[10px] text-muted mt-0.5">
                Unidad {v.unit} · {v.time} · autoriza {v.authorizedBy}
              </p>
            </div>
            <ChevronRight size={16} className="text-muted" />
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================================
// ACCESOS
// ============================================================

function StaffAccesos() {
  const [tab, setTab] = useState<'activas' | 'historial'>('activas');
  const activas = [
    { name: 'Roberto Silva', unit: '804', type: 'Visita', in: '21:15', vehicle: 'ABC-123' },
    { name: 'Uber Eats', unit: '602', type: 'Delivery', in: '22:30', vehicle: '—' },
    { name: 'Fernanda Cruz', unit: '1203', type: 'Visita', in: '22:38', vehicle: '—' },
  ] as const;
  const historial = [
    { name: 'María López', unit: '507', type: 'Visita', in: '19:40', out: '21:05', vehicle: '—' },
    { name: 'DHL', unit: '402', type: 'Paquete', in: '18:22', out: '18:25', vehicle: '—' },
  ] as const;
  const rows = tab === 'activas' ? activas : historial;
  return (
    <div className="flex flex-col" style={{ paddingBottom: 100 }}>
      <DemoHeading eyebrow="Bitácora · martes 21 abr" title="Accesos" />
      <div className="px-5 mt-5 grid grid-cols-2 gap-2.5">
        <button className="flex items-center gap-2 justify-center py-3.5 bg-terra text-cream rounded-[12px] font-sans text-[13px] font-semibold">
          <Plus size={15} strokeWidth={2.3} /> Nueva visita
        </button>
        <button className="flex items-center gap-2 justify-center py-3.5 bg-forestDeep text-cream rounded-[12px] font-sans text-[13px] font-semibold">
          <QrCode size={15} strokeWidth={2.3} /> Escanear QR
        </button>
      </div>

      <div className="mx-5 mt-4 flex items-center gap-2 px-3 py-2 bg-paper border border-line rounded-[12px]">
        <Search size={14} className="text-muted" />
        <input
          placeholder="Buscar por nombre, unidad o placa..."
          className="bg-transparent outline-none flex-1 font-sans text-xs text-ink placeholder:text-muted"
        />
      </div>

      <div className="px-5 mt-5 flex gap-1 border-b border-line">
        {[
          { id: 'activas' as const, label: 'Dentro ahora', count: activas.length },
          { id: 'historial' as const, label: 'Salieron', count: historial.length },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={[
              'pb-3 px-3 flex items-center gap-2 font-sans text-[13px] -mb-px border-b-2',
              tab === t.id
                ? 'text-ink font-semibold border-forestDeep'
                : 'text-muted font-medium border-transparent',
            ].join(' ')}
          >
            {t.label}
            <span
              className={[
                'text-[10px] px-1.5 py-px rounded-full font-bold',
                tab === t.id ? 'bg-ink text-cream' : 'bg-cream text-muted',
              ].join(' ')}
            >
              {t.count}
            </span>
          </button>
        ))}
      </div>

      <div className="mx-5 mt-4 space-y-2">
        {rows.map((v, i) => (
          <div key={i} className="p-3 bg-paper border border-line rounded-[14px]">
            <div className="flex items-start gap-3">
              <div
                className={[
                  'w-10 h-10 rounded-[10px] flex items-center justify-center shrink-0',
                  v.type === 'Delivery' ? 'bg-terraSoft text-terra' : 'bg-cream text-forest',
                ].join(' ')}
              >
                {v.type === 'Delivery' ? (
                  <Truck size={16} />
                ) : v.type === 'Paquete' ? (
                  <Package size={16} />
                ) : (
                  <User size={16} />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-sans text-[13px] text-ink font-semibold">{v.name}</p>
                  <span className="font-sans text-[9px] text-muted bg-cream px-1.5 py-px rounded-full font-bold">
                    {v.type}
                  </span>
                </div>
                <p className="font-sans text-[11px] text-muted mt-1">
                  Unidad {v.unit} · entrada {v.in}
                  {'out' in v && v.out ? ` · salida ${v.out}` : ''}
                </p>
                {v.vehicle && v.vehicle !== '—' && (
                  <div className="flex items-center gap-1 mt-2">
                    <Car size={11} className="text-muted" />
                    <span className="font-serif text-[13px] text-inkSoft tracking-[0.04em]">
                      {v.vehicle}
                    </span>
                  </div>
                )}
              </div>
              {tab === 'activas' && (
                <button className="px-3 py-1.5 bg-ink text-cream rounded-full font-sans text-[11px] font-semibold shrink-0">
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

// ============================================================
// PAQUETES
// ============================================================

function StaffPaquetes() {
  const [tab, setTab] = useState<'pendientes' | 'entregados'>('pendientes');
  const pendientes = [
    { unit: '804', resident: 'Alejandra Reyes', carrier: 'Amazon', received: '16:20' },
    { unit: '602', resident: 'Mauricio Serna', carrier: 'Mercado Libre', received: '17:45' },
    { unit: '1203', resident: 'Raúl Castro', carrier: 'FedEx', received: '19:10' },
  ];
  const entregados = [
    {
      unit: '905',
      resident: 'Andrea Solís',
      carrier: 'Amazon',
      received: '14:10',
      delivered: '19:22',
    },
  ];
  const rows = tab === 'pendientes' ? pendientes : entregados;
  return (
    <div className="flex flex-col" style={{ paddingBottom: 100 }}>
      <DemoHeading eyebrow={`${pendientes.length} por entregar`} title="Paquetería" />
      <button className="mx-5 mt-5 py-3.5 flex items-center gap-2 justify-center bg-terra text-cream rounded-[12px] font-sans text-[13px] font-semibold">
        <Camera size={15} strokeWidth={2.3} /> Recibir nuevo paquete
      </button>

      <div className="px-5 mt-5 flex gap-1 border-b border-line">
        {[
          { id: 'pendientes' as const, label: 'Pendientes', count: pendientes.length },
          {
            id: 'entregados' as const,
            label: 'Entregados hoy',
            count: entregados.length,
          },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={[
              'pb-3 px-3 flex items-center gap-2 font-sans text-[13px] -mb-px border-b-2',
              tab === t.id
                ? 'text-ink font-semibold border-forestDeep'
                : 'text-muted font-medium border-transparent',
            ].join(' ')}
          >
            {t.label}
            <span
              className={[
                'text-[10px] px-1.5 py-px rounded-full font-bold',
                tab === t.id ? 'bg-ink text-cream' : 'bg-cream text-muted',
              ].join(' ')}
            >
              {t.count}
            </span>
          </button>
        ))}
      </div>

      <div className="mx-5 mt-4 space-y-2">
        {rows.map((p, i) => (
          <div key={i} className="p-3.5 bg-paper border border-line rounded-[14px]">
            <div className="flex items-start gap-3">
              <div className="w-11 h-11 rounded-[10px] bg-cream flex items-center justify-center shrink-0">
                <Gift size={17} className="text-forest" strokeWidth={1.8} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="font-sans text-[13px] text-ink font-semibold">Unidad {p.unit}</p>
                  <span className="font-sans text-[9px] text-inkSoft bg-cream px-1.5 py-px rounded-full font-bold">
                    {p.carrier}
                  </span>
                </div>
                <p className="font-sans text-xs text-inkSoft mt-0.5">{p.resident}</p>
                <p className="font-sans text-[10px] text-muted mt-1">
                  Recibido {p.received}
                  {'delivered' in p && p.delivered ? ` · entregado ${p.delivered}` : ' · notificado'}
                </p>
              </div>
              {tab === 'pendientes' && (
                <button className="px-3 py-1.5 bg-ink text-cream rounded-full font-sans text-[11px] font-semibold shrink-0">
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

// ============================================================
// TICKETS
// ============================================================

type TicketPriority = 'urgente' | 'media' | 'baja';
interface TicketRow {
  title: string;
  location: string;
  priority: TicketPriority;
  reporter: string;
  when: string;
  status: 'abierto' | 'en-proceso';
}

function StaffTickets() {
  const tickets: TicketRow[] = [
    {
      title: 'Fuga en pasillo piso 8',
      location: 'Piso 8',
      priority: 'urgente',
      reporter: 'Alejandra R. · 804',
      when: '20 min',
      status: 'abierto',
    },
    {
      title: 'Foco fundido',
      location: 'Escalera piso 3',
      priority: 'media',
      reporter: 'Roberto (admin)',
      when: '4h',
      status: 'en-proceso',
    },
    {
      title: 'Puerta de acceso rechina',
      location: 'Lobby',
      priority: 'baja',
      reporter: 'Vigilancia',
      when: 'ayer',
      status: 'en-proceso',
    },
  ];
  const priorityMap: Record<
    TicketPriority,
    { classes: string; icon: typeof AlertCircle }
  > = {
    urgente: { classes: 'bg-warn/15 text-warn', icon: AlertCircle },
    media: { classes: 'bg-ambar/20 text-ambar', icon: AlertTriangle },
    baja: { classes: 'bg-cream text-muted', icon: Clock },
  };
  return (
    <div className="flex flex-col" style={{ paddingBottom: 100 }}>
      <DemoHeading eyebrow="Mantenimiento" title="Tickets" />
      <button className="mx-5 mt-5 py-3.5 flex items-center gap-2 justify-center bg-terra text-cream rounded-[12px] font-sans text-[13px] font-semibold">
        <Plus size={15} strokeWidth={2.3} /> Reportar incidente
      </button>

      <div className="mx-5 mt-5 space-y-2">
        {tickets.map((t, i) => {
          const p = priorityMap[t.priority];
          const PIcon = p.icon;
          return (
            <div key={i} className="p-4 bg-paper border border-line rounded-[14px]">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-2.5 flex-1 min-w-0">
                  <div
                    className={[
                      'w-7 h-7 rounded-[8px] flex items-center justify-center shrink-0',
                      p.classes,
                    ].join(' ')}
                  >
                    <PIcon size={13} strokeWidth={2.2} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-sans text-[13px] text-ink font-semibold leading-[1.3]">
                      {t.title}
                    </p>
                    <div className="flex items-center gap-1 mt-1.5">
                      <MapPin size={10} className="text-muted" />
                      <p className="font-sans text-[11px] text-muted">{t.location}</p>
                    </div>
                  </div>
                </div>
                <span
                  className={[
                    'font-sans text-[9px] px-2 py-[3px] rounded-full font-bold tracking-[0.04em] uppercase shrink-0',
                    p.classes,
                  ].join(' ')}
                >
                  {t.priority}
                </span>
              </div>
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-line">
                <p className="font-sans text-[10px] text-muted">
                  {t.reporter} · {t.when}
                </p>
                <span
                  className={[
                    'font-sans text-[9px] px-2 py-[2px] rounded-full font-bold tracking-[0.04em] uppercase',
                    t.status === 'abierto' ? 'text-warn bg-warn/10' : 'text-forest bg-sage/20',
                  ].join(' ')}
                >
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

// ============================================================
// MÁS
// ============================================================

function StaffMas() {
  const items: Array<{ icon: typeof PlayCircle; label: string; sub?: string }> = [
    { icon: PlayCircle, label: 'Iniciar rondín', sub: 'Último hace 2h' },
    { icon: FileText, label: 'Bitácora del turno', sub: '6 entradas hoy' },
    { icon: PhoneIcon, label: 'Directorio', sub: 'Residentes y emergencias' },
    { icon: Settings, label: 'Ajustes' },
  ];
  return (
    <div className="flex flex-col" style={{ paddingBottom: 100 }}>
      <DemoHeading eyebrow="Menú" title="Más" />
      <div className="mx-5 mt-5 p-4 flex items-center gap-3 bg-cream rounded-[20px]">
        <div className="w-12 h-12 rounded-full bg-forestDeep text-cream font-serif text-xl flex items-center justify-center">
          M
        </div>
        <div className="flex-1">
          <p className="font-serif text-xl text-ink font-normal">Miguel Torres</p>
          <p className="font-sans text-[11px] text-muted mt-px">Vigilancia · Turno noche</p>
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
                {it.sub && (
                  <p className="font-sans text-[10px] text-muted mt-0.5">{it.sub}</p>
                )}
              </div>
              <ChevronRight size={16} className="text-muted" />
            </button>
          );
        })}
      </div>
      <button className="mx-5 mt-5 flex items-center justify-center gap-2 py-3 bg-warn text-cream rounded-[12px] font-sans text-[13px] font-semibold">
        <StopCircle size={14} /> Cerrar turno
      </button>
    </div>
  );
}

// ============================================================
// APP WRAPPER
// ============================================================

const TABS: TabBarItem[] = [
  { id: 'inicio', icon: Home, label: 'Inicio' },
  { id: 'accesos', icon: Shield, label: 'Accesos', badge: 3 },
  { id: 'paquetes', icon: Package, label: 'Paquetes', badge: 5 },
  { id: 'tickets', icon: Wrench, label: 'Tickets' },
  { id: 'mas', icon: MoreHorizontal, label: 'Más' },
];

export function StaffApp() {
  const [tab, setTab] = useState('inicio');
  return (
    <Phone>
      <StatusBar time="22:41" />
      <PhoneScroll>
        {tab === 'inicio' && <StaffInicio />}
        {tab === 'accesos' && <StaffAccesos />}
        {tab === 'paquetes' && <StaffPaquetes />}
        {tab === 'tickets' && <StaffTickets />}
        {tab === 'mas' && <StaffMas />}
      </PhoneScroll>
      <div className="absolute bottom-0 left-0 right-0">
        <TabBar tabs={TABS} active={tab} onChange={setTab} />
      </div>
    </Phone>
  );
}
