import type { ReactNode } from 'react';

/**
 * Encabezado principal de pantalla. Permite combinar un título normal con un segmento
 * italic (ej: "Hola, <i>Alejandra.</i>") y colocar CTAs a la derecha vía el slot `actions`.
 */

export interface PageHeaderProps {
  eyebrow?: string;
  title?: string;
  italicTitle?: string;
  subtitle?: string;
  actions?: ReactNode;
  className?: string;
}

export function PageHeader({
  eyebrow,
  title,
  italicTitle,
  subtitle,
  actions,
  className = '',
}: PageHeaderProps) {
  return (
    <header className={['flex items-start justify-between gap-4', className].join(' ')}>
      <div className="flex-1 min-w-0">
        {eyebrow && (
          <p className="font-sans text-[10px] uppercase tracking-[0.18em] text-muted font-semibold">
            {eyebrow}
          </p>
        )}
        {(title || italicTitle) && (
          <h1 className="font-serif text-[32px] leading-[1.05] text-ink font-normal mt-1.5">
            {title && <span>{title}</span>}
            {title && italicTitle && <br />}
            {italicTitle && <span className="italic">{italicTitle}</span>}
          </h1>
        )}
        {subtitle && (
          <p className="font-sans text-xs text-inkSoft mt-1.5 leading-[1.45]">{subtitle}</p>
        )}
      </div>
      {actions && <div className="flex items-center gap-2 shrink-0">{actions}</div>}
    </header>
  );
}
