import type { ButtonHTMLAttributes, CSSProperties, ReactNode } from 'react';
import './GlassActionButton.css';

export type GlassButtonVariant = 'rounded' | 'pill' | 'circle';

export interface GlassActionButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  icon?: ReactNode;
  variant?: GlassButtonVariant;
  size?: number;
  tintOpacity?: number;
}

export function GlassActionButton({
  label = 'Chat with Arsh',
  icon,
  variant = 'pill',
  size = 52,
  tintOpacity = 0.2,
  className = '',
  style,
  ...props
}: GlassActionButtonProps) {
  const radius = variant === 'circle' ? size / 2 : variant === 'pill' ? size * 0.72 : size * 0.38;

  const cssVars: CSSProperties = {
    ['--glass-btn-size' as string]: `${size}px`,
    ['--glass-btn-radius' as string]: `${radius}px`,
    ['--glass-btn-tint-opacity' as string]: String(tintOpacity),
  };

  return (
    <button
      type="button"
      className={`pf-glass-action-btn pf-glass-action-btn--${variant} ${className}`.trim()}
      style={{ ...cssVars, ...style }}
      {...props}
    >
      <span className="pf-glass-action-btn__shine" aria-hidden="true" />
      <span className="pf-glass-action-btn__content">
        {icon ? <span className="pf-glass-action-btn__icon">{icon}</span> : null}
        <span className="mono pf-glass-action-btn__label">{label}</span>
      </span>
    </button>
  );
}
