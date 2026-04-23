import type { ComponentProps } from 'react';

/**
 * Placeholders de carga con pulse sobre bg-cream. Tres formas: text (línea),
 * card (bloque con radio 14), circle (círculo para avatares). Principio #7: skeletons, no spinners.
 */

export type SkeletonVariant = 'text' | 'card' | 'circle';

export interface SkeletonProps extends ComponentProps<'div'> {
  variant?: SkeletonVariant;
}

const VARIANT_CLASSES: Record<SkeletonVariant, string> = {
  text: 'h-4 w-full rounded-md',
  card: 'h-24 w-full rounded-[14px]',
  circle: 'w-10 h-10 rounded-full',
};

export function Skeleton({ variant = 'text', className = '', ...rest }: SkeletonProps) {
  return (
    <div
      {...rest}
      aria-hidden="true"
      className={[
        'animate-pulse bg-cream',
        VARIANT_CLASSES[variant],
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    />
  );
}
