import { Loader2 } from 'lucide-react';
import type { ComponentProps, ReactNode } from 'react';

/**
 * CTA principal de la app. Una acción primaria (terra), una secundaria (forest outline),
 * ghost para acciones terciarias, danger para destructivas. Los mapas de clases son
 * literales explícitos — NO usar interpolación tipo `bg-${variant}` (Tailwind JIT no lo ve).
 */

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ComponentProps<'button'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  loading?: boolean;
  fullWidth?: boolean;
}

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary: 'bg-terra text-cream hover:bg-terra/90 active:bg-terra/80 focus-visible:ring-terra',
  secondary:
    'bg-paper text-ink border border-line hover:bg-cream active:bg-creamDeep focus-visible:ring-forest',
  ghost: 'bg-transparent text-inkSoft hover:bg-cream hover:text-ink focus-visible:ring-line',
  danger: 'bg-warn text-cream hover:bg-warn/90 active:bg-warn/80 focus-visible:ring-warn',
};

const SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: 'h-8 px-3 text-xs gap-1.5 rounded-[10px]',
  md: 'h-10 px-4 text-sm gap-2 rounded-[12px]',
  lg: 'h-12 px-5 text-[15px] gap-2 rounded-[12px]',
};

const SPINNER_SIZE: Record<ButtonSize, number> = { sm: 12, md: 14, lg: 16 };

export function Button({
  variant = 'primary',
  size = 'md',
  iconLeft,
  iconRight,
  loading = false,
  fullWidth = false,
  disabled,
  className = '',
  children,
  type = 'button',
  ...rest
}: ButtonProps) {
  const isDisabled = disabled || loading;
  return (
    <button
      {...rest}
      type={type}
      disabled={isDisabled}
      data-variant={variant}
      className={[
        'inline-flex items-center justify-center font-sans font-semibold transition-colors',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-paper',
        'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
        VARIANT_CLASSES[variant],
        SIZE_CLASSES[size],
        fullWidth ? 'w-full' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {loading ? (
        <Loader2 size={SPINNER_SIZE[size]} className="animate-spin" strokeWidth={2.2} />
      ) : (
        iconLeft
      )}
      {children}
      {!loading && iconRight}
    </button>
  );
}
