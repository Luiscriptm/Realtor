# Vista Condominio

> App de administración de condominios para el mercado mexicano. **Mobile-first** para los tres tipos de usuario: residentes, administración y staff operativo.

Este README es la **biblia del proyecto**. Claude Code debe leerlo completo antes de tomar decisiones de arquitectura o escribir código. Contiene el modelo de dominio, el modelo de datos, las reglas de negocio, los lineamientos de diseño y el roadmap.

El prototipo visual completo vive en un solo archivo: **`prototypes/App.jsx`**. Ahí están las tres vistas móviles (residente, admin, staff) con un switcher para navegar entre ellas. Es **referencia visual** — no código de producción. Claude Code debe traducirlo a features reales con datos de Supabase.

---

## Tabla de contenidos

1. [Contexto y problema](#contexto-y-problema)
2. [Modelo de dominio](#modelo-de-dominio)
3. [Stack técnico](#stack-técnico)
4. [Estructura del repositorio](#estructura-del-repositorio)
5. [Modelo de datos (Supabase)](#modelo-de-datos-supabase)
6. [Row Level Security](#row-level-security)
7. [Supabase Storage](#supabase-storage)
8. [Design System](#design-system)
9. [Las tres apps](#las-tres-apps)
10. [Instrucciones para Claude Code](#instrucciones-para-claude-code)
11. [Setup local](#setup-local)
12. [Deploy en Vercel](#deploy-en-vercel)
13. [Roadmap](#roadmap)

---

## Contexto y problema

En México la gestión de condominios suele hacerse por WhatsApp, Excel y efectivo. Esto genera pérdida de información, conflictos por pagos no registrados, reservas dobles, visitas sin control y nula trazabilidad para el dueño de la torre cuando pide cuentas al administrador.

**Vista Condominio** resuelve esto con una app **móvil** que tres tipos de usuarios consumen de forma distinta:

- **Residentes** (propietarios que viven + propietarios que rentan + inquilinos) pagan cuotas, reservan áreas comunes, reciben avisos y registran visitas.
- **Administración** cobra, comunica, genera reportes para el dueño de la torre, publica documentos y gestiona al staff. Trabaja principalmente desde el teléfono.
- **Staff operativo** (vigilancia, recepción, mantenimiento) registra accesos, recibe paquetería y atiende tickets.

**Todas las vistas son mobile-first.** El escritorio es secundario y solo aplica al admin cuando una operación masiva lo amerita (usando Tailwind responsive). No construir apps web separadas.

---

## Modelo de dominio

### Regla central: la unidad es el núcleo, no la persona

Una unidad (departamento) siempre tiene un dueño. Puede además tener un inquilino. El **residente actual** puede ser el dueño o el inquilino.

Se modela con `unit_roles`, que vincula `user_id` + `unit_id` + `role` + rango de fechas. Un usuario puede tener múltiples roles en múltiples unidades: Alejandra puede ser `owner-resident` de la 804 y `owner-landlord` de la 1102 al mismo tiempo.

### Derechos por rol

| Derecho | Dueño residente | Dueño arrendador | Inquilino |
|---|---|---|---|
| Pagar mantenimiento | Sí | Sí (si no paga inquilino) | Sí (si contrato lo indica) |
| Reservar áreas comunes | Sí | **No** | Sí |
| Registrar visitas | Sí | **No** | Sí |
| Ver avisos generales | Sí | Sí | Sí |
| Ver avisos solo propietarios | Sí | Sí | **No** |
| Ver contrato de su unidad | N/A | Sí | Sí |
| Ver acta de asamblea | Sí | Sí | **No** |

**Principio:** los derechos operativos (visitas, reservas) siguen al **residente actual**. Los derechos informativos/financieros dependen de si es propietario o no.

### Morosidad del inquilino

Cuando un inquilino se atrasa, la administración trata directamente con el dueño de la unidad **fuera de la app** (vía teléfono o mail). El dueño arrendador NO ve un flujo de "tu inquilino está moroso" en la app — esa complejidad se mantiene en manos del admin.

### Ciclo de pago

```
pendiente → en_revision → confirmado
                ↓
            rechazado (vuelve a pendiente)
```

- **Pendiente**: cuota generada, aún no pagada.
- **En revisión**: el residente subió comprobante (SPEI, depósito). Espera validación del admin.
- **Confirmado**: pago validado. Para tarjeta es automático; para SPEI/depósito/efectivo lo marca el admin.
- **Rechazado**: comprobante inválido. Vuelve a pendiente con nota.

Pagos en efectivo nunca pasan por "en revisión": el admin los registra directo como confirmados.

---

## Stack técnico

- **Frontend**: React 18 + Vite + TypeScript + Tailwind CSS
- **UI**: Componentes propios; sin librerías de componentes. Iconos con `lucide-react`. Gráficas con `recharts`.
- **Routing**: React Router v6
- **Estado servidor**: TanStack Query
- **Estado cliente**: Zustand para auth y UI global
- **Backend**: Supabase (Postgres + Auth + Storage + Realtime)
- **Tipos**: `supabase gen types typescript` → `src/lib/database.types.ts`
- **Forms**: React Hook Form + Zod
- **PDFs**: `@react-pdf/renderer`
- **Deploy**: Vercel

---

## Estructura del repositorio

```
/
├── public/
├── prototypes/
│   └── App.jsx               # prototipo visual de las 3 apps (referencia)
├── src/
│   ├── components/           # UI reutilizable atómica
│   │   ├── Button.tsx
│   │   ├── StatusPill.tsx
│   │   ├── PageHeader.tsx
│   │   ├── KPICard.tsx
│   │   ├── EmptyState.tsx
│   │   └── TabBar.tsx
│   ├── features/             # lógica por dominio
│   │   ├── auth/
│   │   ├── units/
│   │   ├── payments/
│   │   ├── reservations/
│   │   ├── announcements/
│   │   ├── documents/
│   │   ├── tickets/
│   │   ├── access/
│   │   └── reports/
│   ├── screens/              # pantallas completas
│   │   ├── resident/
│   │   ├── admin/
│   │   └── staff/
│   ├── lib/
│   │   ├── supabase.ts
│   │   ├── database.types.ts
│   │   └── utils.ts
│   ├── styles/
│   │   └── tokens.ts
│   ├── hooks/
│   ├── App.tsx
│   └── main.tsx
├── supabase/
│   ├── migrations/
│   └── seed.sql
├── docs/
│   ├── design-decisions.md
│   └── domain-rules.md
├── tailwind.config.js
├── vite.config.ts
├── tsconfig.json
├── .env.example
└── README.md
```

**Nota:** `prototypes/App.jsx` se conserva como referencia visual viva. Cuando Claude Code construya una feature, debe referirse ahí para ver cómo quedan las pantallas. No borrar.

---

## Modelo de datos (Supabase)

Migrations en `supabase/migrations/`. Todas las tablas en `lowercase_snake_case`. Todas con `id uuid default gen_random_uuid() primary key`, `created_at`, `updated_at`.

### Tablas principales

```sql
create table buildings (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  address text,
  owner_user_id uuid references auth.users(id),
  default_due_day int default 24,
  default_maintenance_fee numeric(10,2),
  bank_clabe text,
  bank_account text,
  bank_name text,
  timezone text default 'America/Mexico_City',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table units (
  id uuid default gen_random_uuid() primary key,
  building_id uuid references buildings(id) on delete cascade not null,
  number text not null,
  floor int,
  maintenance_fee numeric(10,2),
  construction_debt numeric(10,2) default 0,
  construction_total_months int,
  construction_paid_months int default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  unique(building_id, number)
);

create table profiles (
  id uuid references auth.users(id) primary key,
  full_name text,
  phone text,
  avatar_url text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create type unit_role as enum ('owner', 'resident', 'tenant');

create table unit_roles (
  id uuid default gen_random_uuid() primary key,
  unit_id uuid references units(id) on delete cascade not null,
  user_id uuid references profiles(id) on delete cascade not null,
  role unit_role not null,
  start_date date not null default current_date,
  end_date date,
  is_active boolean default true,
  contract_document_id uuid,
  rent_amount numeric(10,2),
  rent_paid_by unit_role default 'tenant',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create type payment_status as enum ('pending', 'review', 'confirmed', 'rejected');
create type payment_method as enum ('card', 'spei', 'deposit', 'cash');

create table payments (
  id uuid default gen_random_uuid() primary key,
  unit_id uuid references units(id) not null,
  user_id uuid references profiles(id),
  period_year int not null,
  period_month int not null,
  amount numeric(10,2) not null,
  breakdown jsonb,
  method payment_method,
  status payment_status default 'pending',
  due_date date not null,
  proof_url text,
  reference text,
  submitted_at timestamptz,
  confirmed_at timestamptz,
  confirmed_by uuid references profiles(id),
  notes text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table amenities (
  id uuid default gen_random_uuid() primary key,
  building_id uuid references buildings(id) on delete cascade not null,
  name text not null,
  icon text,
  max_concurrent_reservations int default 1,
  advance_booking_days int default 30,
  max_guests int,
  rules text,
  created_at timestamptz default now()
);

create type reservation_status as enum ('confirmed', 'cancelled');

create table reservations (
  id uuid default gen_random_uuid() primary key,
  amenity_id uuid references amenities(id) not null,
  unit_id uuid references units(id) not null,
  user_id uuid references profiles(id) not null,
  start_time timestamptz not null,
  end_time timestamptz not null,
  guest_count int default 1,
  status reservation_status default 'confirmed',
  notes text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create type announcement_audience as enum ('all', 'owners_only', 'residents_only');
create type announcement_category as enum ('admin', 'maintenance', 'security', 'event', 'assembly');

create table announcements (
  id uuid default gen_random_uuid() primary key,
  building_id uuid references buildings(id) on delete cascade not null,
  title text not null,
  body text not null,
  category announcement_category default 'admin',
  audience announcement_audience default 'all',
  author_id uuid references profiles(id),
  published_at timestamptz default now(),
  created_at timestamptz default now()
);

create type document_visibility as enum ('public', 'owners_only', 'private');

create table documents (
  id uuid default gen_random_uuid() primary key,
  building_id uuid references buildings(id) on delete cascade not null,
  name text not null,
  file_url text not null,
  file_size int,
  mime_type text,
  visibility document_visibility default 'public',
  private_user_ids uuid[],
  unit_id uuid references units(id),
  uploaded_by uuid references profiles(id),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create type access_type as enum ('visit', 'delivery', 'provider', 'package');
create type access_status as enum ('expected', 'inside', 'exited', 'cancelled');

create table access_logs (
  id uuid default gen_random_uuid() primary key,
  building_id uuid references buildings(id) on delete cascade not null,
  unit_id uuid references units(id) not null,
  type access_type not null,
  visitor_name text not null,
  vehicle_plate text,
  id_photo_url text,
  notes text,
  authorized_by uuid references profiles(id),
  qr_code text,
  expected_at timestamptz,
  entry_time timestamptz,
  exit_time timestamptz,
  entry_logged_by uuid references profiles(id),
  exit_logged_by uuid references profiles(id),
  status access_status default 'expected',
  created_at timestamptz default now()
);

create type package_status as enum ('received', 'delivered');

create table packages (
  id uuid default gen_random_uuid() primary key,
  building_id uuid references buildings(id) on delete cascade not null,
  unit_id uuid references units(id) not null,
  carrier text,
  tracking_id text,
  photo_url text,
  received_at timestamptz default now(),
  received_by uuid references profiles(id),
  delivered_at timestamptz,
  delivered_to uuid references profiles(id),
  status package_status default 'received',
  notified boolean default false
);

create type ticket_priority as enum ('low', 'medium', 'urgent');
create type ticket_status as enum ('open', 'in_progress', 'resolved', 'cancelled');

create table tickets (
  id uuid default gen_random_uuid() primary key,
  building_id uuid references buildings(id) on delete cascade not null,
  unit_id uuid references units(id),
  title text not null,
  description text,
  location text,
  priority ticket_priority default 'medium',
  status ticket_status default 'open',
  reported_by uuid references profiles(id) not null,
  assigned_to uuid references profiles(id),
  resolved_at timestamptz,
  photos text[],
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table staff_shifts (
  id uuid default gen_random_uuid() primary key,
  building_id uuid references buildings(id) on delete cascade not null,
  user_id uuid references profiles(id) not null,
  role text not null,
  start_time timestamptz not null,
  end_time timestamptz,
  notes text,
  created_at timestamptz default now()
);

create table staff_permissions (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references profiles(id) on delete cascade not null,
  building_id uuid references buildings(id) on delete cascade not null,
  can_access boolean default false,
  can_packages boolean default false,
  can_tickets boolean default false,
  can_patrol boolean default false,
  created_at timestamptz default now()
);

create type global_role as enum ('resident', 'admin', 'staff', 'tower_owner');

create table user_roles (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references profiles(id) on delete cascade not null,
  building_id uuid references buildings(id) on delete cascade not null,
  role global_role not null,
  created_at timestamptz default now(),
  unique(user_id, building_id, role)
);

create table reports (
  id uuid default gen_random_uuid() primary key,
  building_id uuid references buildings(id) on delete cascade not null,
  type text not null,
  period_start date,
  period_end date,
  file_url text not null,
  generated_by uuid references profiles(id) not null,
  sent_to jsonb,
  sent_at timestamptz,
  created_at timestamptz default now()
);
```

### Índices recomendados

```sql
create index idx_unit_roles_active on unit_roles(unit_id, role, is_active) where is_active = true;
create index idx_payments_status on payments(status, unit_id);
create index idx_payments_period on payments(period_year, period_month);
create index idx_reservations_time on reservations(amenity_id, start_time, end_time);
create index idx_access_status on access_logs(building_id, status);
create index idx_packages_status on packages(building_id, unit_id, status);
```

---

## Row Level Security

**RLS es NO NEGOCIABLE.** Activar en todas las tablas desde la primera migration.

### Funciones auxiliares

```sql
create function user_building_ids(uid uuid)
returns setof uuid language sql stable as $$
  select distinct building_id from user_roles where user_id = uid
$$;

create function is_building_admin(uid uuid, bid uuid)
returns boolean language sql stable as $$
  select exists(
    select 1 from user_roles
    where user_id = uid and building_id = bid and role = 'admin'
  )
$$;

create function is_building_staff(uid uuid, bid uuid)
returns boolean language sql stable as $$
  select exists(
    select 1 from user_roles
    where user_id = uid and building_id = bid and role = 'staff'
  )
$$;

create function has_active_unit_role(uid uuid, uid_unit uuid)
returns boolean language sql stable as $$
  select exists(
    select 1 from unit_roles
    where user_id = uid and unit_id = uid_unit and is_active = true
  )
$$;
```

### Políticas clave

```sql
-- PAYMENTS
alter table payments enable row level security;

create policy payments_select on payments for select using (
  is_building_admin(auth.uid(), (select building_id from units where id = unit_id))
  or has_active_unit_role(auth.uid(), unit_id)
);

create policy payments_write on payments for all using (
  is_building_admin(auth.uid(), (select building_id from units where id = unit_id))
);

create policy payments_submit_proof on payments for update using (
  has_active_unit_role(auth.uid(), unit_id)
  and status in ('pending', 'rejected')
) with check (
  status = 'review'
);

-- DOCUMENTS
alter table documents enable row level security;

create policy documents_select on documents for select using (
  case visibility
    when 'public' then building_id = any(select user_building_ids(auth.uid()))
    when 'owners_only' then exists (
      select 1 from unit_roles ur
      join units u on u.id = ur.unit_id
      where ur.user_id = auth.uid()
        and u.building_id = documents.building_id
        and ur.role = 'owner'
        and ur.is_active = true
    )
    when 'private' then auth.uid() = any(private_user_ids)
  end
);

-- RESERVATIONS
alter table reservations enable row level security;

create policy reservations_select on reservations for select using (
  exists(select 1 from user_roles where user_id = auth.uid()
    and building_id = (select building_id from units where id = reservations.unit_id))
);

create policy reservations_insert on reservations for insert with check (
  exists(
    select 1 from unit_roles
    where user_id = auth.uid()
      and unit_id = reservations.unit_id
      and role in ('resident', 'tenant')
      and is_active = true
  )
);
```

Replicar para todas las demás tablas. Resumen:

- **buildings**: ver si el usuario tiene cualquier rol ahí. Escribir solo admin.
- **units**: ver si está vinculado al building. Escribir solo admin.
- **unit_roles**: ver si involucra al usuario o es admin. Escribir solo admin.
- **announcements**: ver según audience (igual que documents).
- **access_logs**: ver si es residente de la unidad o staff con `can_access`. Escribir solo staff.
- **packages**: ver si es residente o staff con `can_packages`. Escribir solo staff.
- **tickets**: ver todo el building. Escribir cualquiera del building.
- **reports**: solo admin y tower_owner.

---

## Supabase Storage

Cuatro buckets con políticas distintas:

- **`public-docs`** — Reglamento, protocolos. Legible por cualquier usuario del building.
- **`owner-docs`** — Actas, presupuesto. Solo usuarios con `unit_role` tipo `owner` activo.
- **`private-contracts`** — Contratos y comprobantes. Solo las partes vinculadas.
- **`packages`** y **`tickets`** — Fotos. Residente/reportante + staff autorizado + admin.

Crear buckets y políticas vía SQL en migrations, no desde el dashboard.

---

## Design System

### Paleta

```ts
// src/styles/tokens.ts
export const colors = {
  cream: '#F5EEDD',
  creamDeep: '#EDE3CB',
  paper: '#FBF7EC',
  ink: '#1F2E24',
  inkSoft: '#3D4A3F',
  muted: '#7A756A',
  line: '#E3DBC5',
  forest: '#2F4A37',
  forestDeep: '#1F3127',
  terra: '#B5643C',
  terraSoft: '#E8D3C2',
  sage: '#8AA58C',
  warn: '#A84433',
  ambar: '#C89B3D',
};
```

Estos valores están hardcodeados en `prototypes/App.jsx` como la constante `C`. Al migrar a código de producción, extraerlos a `tokens.ts` y extender `tailwind.config.js` para exponerlos como clases.

### Tipografía

- **Serif editorial**: Instrument Serif. Títulos, saludos, cifras grandes. Weight 400, cursivas para énfasis.
- **Sans neutro**: Manrope. UI, metadata, cuerpo. Weights 400/500/600/700.
- No monospace.

### Principios

1. **Una sola cosa urgente por pantalla.** El elemento más importante va en tarjeta oscura o terracota; el resto respira.
2. **Jerarquía por urgencia, no por tamaño.** Un CTA primario (terra), uno secundario (forest outline), el resto ghost.
3. **Status = color + icono + label.** Nunca confiar solo en color.
4. **Espacios generosos.** Mejor scroll que saturación. Padding base 4px, múltiplos de 4.
5. **Border-radius por jerarquía:** inputs 10-12, cards 14-16, hero cards 20, pills 100.
6. **Estados vacíos con personalidad.** "Todo al corriente, descansa." en vez de "Sin datos".
7. **Skeletons, no spinners.** Estructura con `bg-cream` animado mientras carga.
8. **Optimistic updates.** Cambiar UI al instante y revertir si la mutation falla.

### Componentes base a crear primero

- `<Button variant="primary|secondary|ghost|danger" size="sm|md|lg">`
- `<StatusPill status="...">`
- `<PageHeader eyebrow title italicTitle subtitle actions>`
- `<SectionHeader eyebrow title subtitle>`
- `<KPICard label value unit sub trend>`
- `<EmptyState icon title body action>`
- `<Avatar name size>`
- `<TabBar tabs active onChange>`
- `<Skeleton variant="text|card|circle">`

### No permitidos

- Librerías de componentes (shadcn, MUI, Chakra). Todo propio.
- Gradientes morados (cliché de IA).
- Emojis en UI de producto.
- Más de 2 fuentes.
- Toasts para confirmaciones triviales.

---

## Las tres apps

**Todas son mobile-first.** Tab bar inferior de 5 secciones en las tres.

### 1. App del residente

Tab bar: Inicio, Pagos, Reservas, Comunidad, Perfil.

Detecta el rol del usuario en la unidad seleccionada y adapta:

- **`owner-resident`**: cuota con desglose (mantenimiento + construcción si aplica), reservas, visitas.
- **`owner-landlord`**: hero es su inquilino + estatus de renta, ve mantenimiento, **no ve reservas ni visitas** (transferidas al tenant).
- **`tenant`**: cuota (si le toca según contrato), reservas, visitas.

Un usuario con múltiples unidades ve un switcher arriba para cambiar entre ellas.

### 2. App del admin

Tab bar: Inicio, Cobranza, Reportes, Docs, Más. "Más" contiene: Unidades, Reservas, Comunidad, Finanzas, Staff, Ajustes.

Mobile-first. Para operaciones masivas que ameritan pantalla grande (exportar 500 pagos, generar reporte anual), usar Tailwind responsive (`md:`) en esa pantalla específica.

### 3. App del staff

Tab bar: Inicio, Accesos, Paquetes, Tickets, Más.

Los módulos visibles dependen de `staff_permissions`. Si `can_tickets = false`, la pestaña no aparece. El admin asigna permisos.

---

## Instrucciones para Claude Code

### Orden de construcción (no saltárselo)

1. **Setup**: Vite + React + TS + Tailwind + React Router + TanStack Query + Zustand + RHF + Zod. ESLint + Prettier.
2. **Design tokens** en `src/styles/tokens.ts` + extender `tailwind.config.js`.
3. **Componentes base** (lista arriba).
4. **Supabase**: crear proyecto, aplicar migrations, generar tipos.
5. **Auth**: email/password + magic link. `useAuth` en Zustand. Guards por `global_role`.
6. **App residente** en orden: Pagos → Avisos → Reservas → Visitas → Documentos → Perfil.
7. **App admin** en orden: Dashboard → Cobranza → Documentos → Reportes → Unidades → Staff.
8. **App staff** en orden: Accesos → Paquetería → Tickets → Bitácora.
9. **Realtime** para: pagos, visitas, tickets.
10. **Deploy en Vercel** + variables.

### Reglas al escribir código

- **TypeScript estricto**. No `any`.
- **Nombres en inglés** en código y BD. UI en español.
- **Fechas en UTC** (`timestamptz`). Renderizar en horario local del building.
- **Dinero**: `numeric(10,2)` en BD, `number` en JS, render con `Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' })`.
- **Queries**: siempre TanStack Query. Claves: `['payments', buildingId, period]`.
- **Mutations**: invalidar queries tras éxito. Optimistic updates cuando aplique.
- **Formularios**: RHF + Zod. Nunca `useState` para forms largos.
- **No validar en cliente lo que cubre RLS** o check constraints.
- **Un solo cliente de Supabase** (singleton en `src/lib/supabase.ts`).
- **No fetch en `useEffect`**. Siempre TanStack Query.
- **No implementar reglas de acceso en cliente**. Todo en RLS.
- **No endpoints custom**. Supabase queries + Edge Functions cuando haga falta server-side.
- **No inventar colores ni iconos**. Solo tokens y `lucide-react`.

### Cuando haya ambigüedad

Orden de autoridad:
1. Este README.
2. `docs/domain-rules.md` (crearlo si no existe).
3. `docs/design-decisions.md` (crearlo).
4. `prototypes/App.jsx` como referencia visual.
5. Preguntar al humano. No inventar.

---

## Setup local

### Prerequisitos

- Node 20+
- pnpm (preferido) o npm
- Supabase CLI

### Pasos

```bash
git clone <tu-repo>
cd vista-condominio
pnpm install
cp .env.example .env.local

supabase start
supabase db reset
supabase gen types typescript --local > src/lib/database.types.ts

pnpm dev
```

### Variables de entorno

```
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```

No versionar `.env.local`. El `service_role_key` NUNCA al frontend.

### Ver solo el prototipo (sin backend)

El prototipo puro se puede previsualizar importando `prototypes/App.jsx` desde `main.tsx`:

```tsx
import App from '../prototypes/App.jsx'
```

Útil para demo en Vercel mientras el backend está en progreso.

---

## Deploy en Vercel

1. Push al repo en GitHub.
2. En Vercel: New Project → Import from GitHub.
3. Framework preset: **Vite**.
4. Environment variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
5. Deploy.
6. En Supabase → Authentication → URL Configuration, agregar el dominio de Vercel a `Site URL` y `Redirect URLs`.

### Dos proyectos Supabase recomendados

`vista-condominio-dev` y `vista-condominio-prod` separados. Vercel puede apuntar preview de ramas a dev y dominio principal a prod. Así no rompes datos reales iterando.

### Demo visual (sin backend)

Mientras el backend está en progreso, `main` puede apuntar directamente a `prototypes/App.jsx` para que cualquiera con el link vea las tres vistas. Cuando empiecen las features reales, `main` cambia a la versión con Supabase.

---

## Roadmap

### v0.1 — Prototipo (actual)
- [x] Diseño visual de las tres apps (`prototypes/App.jsx`)
- [x] Modelo de dominio definido
- [x] README como biblia del proyecto

### v0.2 — MVP técnico
- [ ] Setup Vite + TS + Tailwind + Supabase
- [ ] Auth con roles
- [ ] App del residente: pagos + avisos + perfil
- [ ] App del admin: cobranza + documentos

### v0.3 — Funcional
- [ ] Reservas con calendario
- [ ] Visitas con QR pre-autorizado
- [ ] App del staff: accesos + paquetería

### v0.4 — Completo
- [ ] Reportes en PDF
- [ ] Tickets con fotos
- [ ] Realtime en pagos y visitas
- [ ] Notificaciones push

### v1.0 — Producto
- [ ] Onboarding de edificios
- [ ] Multi-edificio para admins
- [ ] Panel para dueño de torre
- [ ] Facturación CFDI
- [ ] Cobros automáticos con Stripe

---

## Licencia

Privado. Todos los derechos reservados.
