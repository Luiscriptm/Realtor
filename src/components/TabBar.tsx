import type { LucideIcon } from 'lucide-react';

/**
 * Barra inferior móvil con 5 tabs. Activa se pinta en forest; inactivas en muted.
 * No posiciona — el screen padre decide (sticky/fixed/flow). Patrón del prototipo App.jsx.
 */

export interface TabBarItem {
  id: string;
  label: string;
  icon: LucideIcon;
  badge?: string | number;
}

export interface TabBarProps {
  tabs: TabBarItem[];
  active: string;
  onChange: (id: string) => void;
  className?: string;
}

export function TabBar({ tabs, active, onChange, className = '' }: TabBarProps) {
  return (
    <nav
      className={[
        'bg-paper border-t border-line px-2 pt-2 pb-6',
        'flex justify-around items-start',
        className,
      ].join(' ')}
    >
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = tab.id === active;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange(tab.id)}
            aria-current={isActive ? 'page' : undefined}
            className={[
              'flex flex-col items-center gap-1 py-1 px-2 relative transition-colors',
              isActive ? 'text-forest' : 'text-muted hover:text-inkSoft',
            ].join(' ')}
          >
            <span className="relative">
              <Icon size={20} strokeWidth={isActive ? 2.2 : 1.6} />
              {tab.badge !== undefined && (
                <span className="absolute -top-1 -right-2 bg-terra text-cream text-[9px] font-bold font-sans px-1.5 py-[1px] rounded-full leading-none">
                  {tab.badge}
                </span>
              )}
            </span>
            <span
              className={[
                'font-sans text-[10px]',
                isActive ? 'font-semibold' : 'font-medium',
              ].join(' ')}
            >
              {tab.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
