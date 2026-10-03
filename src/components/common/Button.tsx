import React from 'react';
import { Link } from 'react-router-dom';
import { cn, sanitizeUrl } from '../../lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'outline' | 'outline-white' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  as?: 'button' | 'a';
  href?: string;
  target?: string;
  rel?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  className,
  children,
  icon,
  iconPosition = 'right',
  as = 'button',
  href,
  target,
  rel,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none select-none';

  const variants = {
    primary: 'bg-navy-900 text-white hover:bg-navy-800 shadow-sm focus-visible:ring-navy-900 border border-transparent',
    secondary: 'bg-navy-50 text-navy-900 hover:bg-navy-100 focus-visible:ring-navy-700 border border-navy-100',
    accent: 'bg-gold-400 text-navy-950 font-semibold hover:bg-gold-500 shadow-sm focus-visible:ring-gold-500 border border-transparent',
    outline: 'border-2 border-navy-900 text-navy-900 hover:bg-navy-900 hover:text-white focus-visible:ring-navy-900',
    'outline-white': 'border-2 border-white/80 text-white hover:bg-white hover:text-navy-950 focus-visible:ring-white',
    ghost: 'text-navy-900 hover:bg-navy-50/70 focus-visible:ring-navy-700'
  };

  const sizes = {
    sm: 'text-xs px-3.5 py-1.5 rounded-md gap-1.5',
    md: 'text-sm px-5 py-2.5 rounded-lg gap-2',
    lg: 'text-base px-6 py-3 rounded-lg gap-2.5 font-semibold'
  };

  const content = (
    <>
      {icon && iconPosition === 'left' && <span className="inline-flex shrink-0">{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === 'right' && <span className="inline-flex shrink-0">{icon}</span>}
    </>
  );

  if (as === 'a' && href) {
    const safeHref = sanitizeUrl(href);
    const isInternal = safeHref.startsWith('/') && !safeHref.startsWith('//');

    if (isInternal) {
      return (
        <Link
          to={safeHref}
          className={cn(baseStyles, variants[variant], sizes[size], className)}
          {...(props as any)}
        >
          {content}
        </Link>
      );
    }

    return (
      <a
        href={safeHref}
        target={target}
        rel={rel || (target === '_blank' ? 'noopener noreferrer' : undefined)}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {content}
    </button>
  );
};

export default Button;
