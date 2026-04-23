import { useState } from 'react';
import {
  ArrowRight,
  Bell,
  CalendarDays,
  CreditCard,
  Home,
  Inbox,
  MessageSquare,
  Plus,
  User,
} from 'lucide-react';
import {
  Avatar,
  Button,
  EmptyState,
  KPICard,
  PageHeader,
  SectionHeader,
  Skeleton,
  StatusPill,
  TabBar,
  type PaymentStatus,
  type TabBarItem,
} from '@/components';

const PAYMENT_STATUSES: PaymentStatus[] = [
  'pagado',
  'confirmado',
  'pendiente',
  'revision',
  'en-revision',
  'moroso',
  'rechazado',
];

const TABS: TabBarItem[] = [
  { id: 'home', label: 'Inicio', icon: Home },
  { id: 'pagos', label: 'Pagos', icon: CreditCard, badge: 1 },
  { id: 'reservas', label: 'Reservas', icon: CalendarDays },
  { id: 'comunidad', label: 'Comunidad', icon: MessageSquare, badge: 3 },
  { id: 'perfil', label: 'Perfil', icon: User },
];

function GalleryBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-line py-8">
      <p className="font-sans text-[10px] uppercase tracking-[0.18em] text-muted font-semibold">
        Componente
      </p>
      <h2 className="font-serif italic text-[26px] text-ink mt-1 mb-5">{title}</h2>
      {children}
    </section>
  );
}

export default function ComponentGallery() {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <main className="min-h-screen bg-paper text-ink">
      <div className="max-w-3xl mx-auto px-6 py-10">
        <PageHeader
          eyebrow="Vista Condominio · Galería"
          title="Galería de"
          italicTitle="componentes base."
          subtitle="Primitivas del design system. Ruta oculta: /_gallery"
        />

        <GalleryBlock title="Button">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="danger">Danger</Button>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Button iconLeft={<Plus size={16} strokeWidth={2.2} />}>Con icon left</Button>
              <Button variant="secondary" iconRight={<ArrowRight size={16} strokeWidth={2.2} />}>
                Con icon right
              </Button>
              <Button loading>Loading</Button>
              <Button disabled>Disabled</Button>
            </div>
            <div className="max-w-sm">
              <Button variant="primary" fullWidth iconRight={<ArrowRight size={16} strokeWidth={2.2} />}>
                Pagar ahora
              </Button>
            </div>
          </div>
        </GalleryBlock>

        <GalleryBlock title="StatusPill">
          <div className="flex flex-wrap items-center gap-2">
            {PAYMENT_STATUSES.map((s) => (
              <StatusPill key={s} status={s} />
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-2 mt-3">
            {PAYMENT_STATUSES.map((s) => (
              <StatusPill key={s} status={s} size="sm" />
            ))}
          </div>
        </GalleryBlock>

        <GalleryBlock title="SectionHeader">
          <SectionHeader
            eyebrow="Esta semana"
            title="Próximas reservas"
            subtitle="Tres áreas comunes reservadas en los próximos siete días."
          />
        </GalleryBlock>

        <GalleryBlock title="PageHeader">
          <PageHeader
            eyebrow="Propietaria residente · martes 21 abr"
            title="Hola,"
            italicTitle="Alejandra."
            subtitle="Tienes una cuota pendiente y una reserva este fin de semana."
            actions={
              <Button variant="ghost" size="sm" iconLeft={<Bell size={16} strokeWidth={1.8} />}>
                3
              </Button>
            }
          />
        </GalleryBlock>

        <GalleryBlock title="EmptyState">
          <div className="bg-paper border border-line rounded-[16px]">
            <EmptyState
              icon={<Inbox size={22} strokeWidth={1.8} />}
              title="Todo al corriente."
              body="No hay pagos pendientes, ni avisos sin leer. Descansa."
              action={<Button variant="secondary">Ver historial</Button>}
            />
          </div>
        </GalleryBlock>

        <GalleryBlock title="Avatar">
          <div className="flex items-end gap-4">
            <div className="flex flex-col items-center gap-1">
              <Avatar name="Alejandra Reyes" size="sm" />
              <span className="font-sans text-[10px] text-muted">sm</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <Avatar name="Carlos Mendoza" size="md" />
              <span className="font-sans text-[10px] text-muted">md</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <Avatar name="Mauricio Serna" size="lg" />
              <span className="font-sans text-[10px] text-muted">lg</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <Avatar name="Lucía Gómez" size="lg" />
              <span className="font-sans text-[10px] text-muted">hash</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <Avatar name="Diego Fernández" size="lg" />
              <span className="font-sans text-[10px] text-muted">hash</span>
            </div>
          </div>
        </GalleryBlock>

        <GalleryBlock title="TabBar">
          <div className="max-w-sm border border-line rounded-[24px] overflow-hidden bg-paper">
            <div className="h-40 flex items-center justify-center bg-cream">
              <span className="font-sans text-xs text-muted">contenido de la pantalla</span>
            </div>
            <TabBar tabs={TABS} active={activeTab} onChange={setActiveTab} />
          </div>
          <p className="font-sans text-xs text-muted mt-3">
            Tab activo: <span className="text-ink font-semibold">{activeTab}</span>
          </p>
        </GalleryBlock>

        <GalleryBlock title="KPICard">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <KPICard
              label="Cobrado este mes"
              value="412,500"
              unit="MXN"
              sub="52 de 60 unidades · 86.6%"
              accent="hero"
            />
            <KPICard
              label="Pendientes"
              value={8}
              sub="3 en revisión · 5 por pagar"
              trailing={<StatusPill status="pendiente" size="sm" />}
            />
            <KPICard label="Morosos" value={2} sub="Más de 30 días" accent="terra" />
            <KPICard
              label="Reservas del fin"
              value={5}
              sub="Salón, asador, cancha"
              accent="cream"
            />
          </div>
        </GalleryBlock>

        <GalleryBlock title="Skeleton">
          <div className="space-y-3 max-w-md">
            <div className="flex items-center gap-3">
              <Skeleton variant="circle" />
              <div className="flex-1 space-y-2">
                <Skeleton variant="text" className="w-1/2" />
                <Skeleton variant="text" className="w-3/4 h-3" />
              </div>
            </div>
            <Skeleton variant="card" />
            <Skeleton variant="card" className="h-32" />
          </div>
        </GalleryBlock>

        <p className="font-sans text-[10px] text-muted uppercase tracking-widest mt-10">
          Fin de la galería
        </p>
      </div>
    </main>
  );
}
