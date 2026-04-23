import type { ComponentProps } from 'react';

/**
 * Iniciales (máx 2 letras) sobre un fondo determinístico por nombre.
 * Si pasas `src`, muestra la imagen en vez de las iniciales.
 */

export type AvatarSize = 'sm' | 'md' | 'lg';

export interface AvatarProps extends ComponentProps<'div'> {
  name: string;
  size?: AvatarSize;
  src?: string;
}

const SIZE_CLASSES: Record<AvatarSize, string> = {
  sm: 'w-8 h-8 text-sm',
  md: 'w-10 h-10 text-base',
  lg: 'w-12 h-12 text-lg',
};

// Paleta curada para avatares (se evitan warn, muted, line — no son para identidad).
const AVATAR_BG: readonly string[] = [
  'bg-forest',
  'bg-forestDeep',
  'bg-terra',
  'bg-sage',
  'bg-ambar',
  'bg-inkSoft',
];

function initialsFrom(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '?';
  const first = parts[0]?.[0] ?? '';
  const last = parts.length > 1 ? (parts[parts.length - 1]?.[0] ?? '') : '';
  return (first + last).toUpperCase();
}

function hashToIndex(name: string, mod: number): number {
  let h = 0;
  for (let i = 0; i < name.length; i++) {
    h = (h * 31 + name.charCodeAt(i)) | 0;
  }
  return Math.abs(h) % mod;
}

export function Avatar({ name, size = 'md', src, className = '', ...rest }: AvatarProps) {
  const bg = AVATAR_BG[hashToIndex(name, AVATAR_BG.length)] ?? 'bg-forest';
  return (
    <div
      {...rest}
      aria-label={name}
      className={[
        'inline-flex items-center justify-center rounded-full font-serif text-cream overflow-hidden shrink-0',
        SIZE_CLASSES[size],
        src ? 'bg-cream' : bg,
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {src ? (
        <img src={src} alt={name} className="w-full h-full object-cover" />
      ) : (
        <span>{initialsFrom(name)}</span>
      )}
    </div>
  );
}
