import type { ReactNode } from 'react';

/**
 * Estado vacío con personalidad (principio #6 del design system:
 * "Todo al corriente, descansa." en vez de "Sin datos"). Centrado, aireado, CTA opcional.
 */

export interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  body?: string;
  action?: ReactNode;
  className?: string;
}

export function EmptyState({ icon, title, body, action, className = '' }: EmptyStateProps) {
  return (
    <div
      className={[
        'flex flex-col items-center text-center py-12 px-6',
        className,
      ].join(' ')}
    >
      {icon && (
        <div className="w-14 h-14 rounded-full bg-cream flex items-center justify-center text-forest mb-4">
          {icon}
        </div>
      )}
      <h3 className="font-serif italic text-2xl text-ink leading-tight">{title}</h3>
      {body && (
        <p className="font-sans text-sm text-muted mt-2 max-w-xs leading-relaxed">{body}</p>
      )}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
