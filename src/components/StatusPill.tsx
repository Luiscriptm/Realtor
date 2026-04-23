import { AlertCircle, CheckCircle2, Clock } from 'lucide-react';
import type { ComponentProps } from 'react';
import type { LucideIcon } from 'lucide-react';

/**
 * Badge de estado para pagos, reservas, visitas. Status = color + icono + label
 * (nunca confiar solo en color, principio #3 del design system).
 */

export type PaymentStatus =
  | 'pagado'
  | 'confirmado'
  | 'pendiente'
  | 'revision'
  | 'en-revision'
  | 'moroso'
  | 'rechazado';

export type StatusPillSize = 'sm' | 'md';

export interface StatusPillProps extends ComponentProps<'span'> {
  status: PaymentStatus;
  size?: StatusPillSize;
}

interface StatusSpec {
  label: string;
  classes: string;
  Icon: LucideIcon;
}

const STATUS_MAP: Record<PaymentStatus, StatusSpec> = {
  pagado: { label: 'Pagado', classes: 'bg-sage/25 text-forest', Icon: CheckCircle2 },
  confirmado: { label: 'Confirmado', classes: 'bg-sage/25 text-forest', Icon: CheckCircle2 },
  pendiente: { label: 'Pendiente', classes: 'bg-terraSoft text-terra', Icon: Clock },
  revision: { label: 'Revisión', classes: 'bg-ambar/20 text-ambar', Icon: Clock },
  'en-revision': { label: 'En revisión', classes: 'bg-ambar/20 text-ambar', Icon: Clock },
  moroso: { label: 'Moroso', classes: 'bg-warn/15 text-warn', Icon: AlertCircle },
  rechazado: { label: 'Rechazado', classes: 'bg-warn/15 text-warn', Icon: AlertCircle },
};

const SIZE_CLASSES: Record<StatusPillSize, string> = {
  sm: 'px-2 py-[3px] text-[9px] gap-1',
  md: 'px-[9px] py-1 text-[10px] gap-1',
};

export function StatusPill({
  status,
  size = 'md',
  className = '',
  ...rest
}: StatusPillProps) {
  const spec = STATUS_MAP[status];
  const { Icon } = spec;
  const iconSize = size === 'sm' ? 9 : 10;
  return (
    <span
      {...rest}
      data-status={status}
      className={[
        'inline-flex items-center rounded-full font-sans font-bold uppercase tracking-[0.02em]',
        spec.classes,
        SIZE_CLASSES[size],
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <Icon size={iconSize} strokeWidth={2.5} />
      {spec.label}
    </span>
  );
}
