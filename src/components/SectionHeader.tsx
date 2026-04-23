/**
 * Encabezado de sección dentro de una pantalla: eyebrow pequeño con tracking,
 * título en serif italic, subtitle opcional. Patrón base que se repite en todas las vistas.
 */

export interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  className?: string;
}

export function SectionHeader({ eyebrow, title, subtitle, className = '' }: SectionHeaderProps) {
  return (
    <div className={className}>
      {eyebrow && (
        <p className="font-sans text-[10px] uppercase tracking-[0.18em] text-muted font-semibold">
          {eyebrow}
        </p>
      )}
      <h2 className="font-serif italic text-[22px] leading-[1.15] text-ink font-normal mt-1">
        {title}
      </h2>
      {subtitle && (
        <p className="font-sans text-xs text-inkSoft mt-1.5 leading-[1.45]">{subtitle}</p>
      )}
    </div>
  );
}
