import { forwardRef, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Icon, type IconName } from './Icon';

type Variant = 'primary' | 'ghost' | 'quiet';
type Common = { variant?: Variant; icon?: IconName; iconRight?: IconName; className?: string; children: ReactNode; size?: 'md' | 'lg' };

const base =
  'group relative inline-flex select-none whitespace-nowrap items-center justify-center gap-2.5 rounded-md border border-transparent font-semibold uppercase tracking-[0.16em] transition-[transform,background-color,color,border-color] duration-200 ease-out active:scale-[0.98] disabled:pointer-events-none disabled:opacity-40';
const sizes = { md: 'min-h-12 px-5 text-[12.5px]', lg: 'min-h-14 px-7 text-[13px]' };
const variants: Record<Variant, string> = {
  primary:
    'bg-brass text-ink hover:bg-brass-light',
  ghost: '!border-line-strong bg-transparent text-ivory hover:bg-ivory/5',
  quiet: 'text-brass hover:bg-tint',
};

export const cls = ({ variant = 'primary', size = 'md', className = '' }: Pick<Common, 'variant' | 'size' | 'className'>) =>
  `${base} ${sizes[size]} ${variants[variant]} ${className}`;

function Inner({ icon, iconRight, children }: Pick<Common, 'icon' | 'iconRight' | 'children'>) {
  return (
    <>
      {icon && <Icon name={icon} className="h-[18px] w-[18px]" />}
      <span>{children}</span>
      {iconRight && <Icon name={iconRight} className="h-[18px] w-[18px] transition-transform duration-300 ease-expo group-hover:translate-x-0.5" />}
    </>
  );
}

export const Button = forwardRef<HTMLButtonElement, Common & React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ variant, size, icon, iconRight, className, children, ...rest }, ref) => (
    <button ref={ref} className={cls({ variant, size, className })} {...rest}>
      <Inner icon={icon} iconRight={iconRight}>
        {children}
      </Inner>
    </button>
  ),
);

export function LinkButton({ to, variant, size, icon, iconRight, className, children, onClick }: Common & { to: string; onClick?: () => void }) {
  return (
    <Link to={to} className={cls({ variant, size, className })} onClick={onClick}>
      <Inner icon={icon} iconRight={iconRight}>
        {children}
      </Inner>
    </Link>
  );
}

export function ExternalButton({ href, variant, size, icon, iconRight, className, children, onClick, label }: Common & { href: string; onClick?: () => void; label?: string }) {
  const external = href.startsWith('http');
  return (
    <a href={href} className={cls({ variant, size, className })} onClick={onClick} aria-label={label} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
      <Inner icon={icon} iconRight={iconRight}>
        {children}
      </Inner>
    </a>
  );
}
