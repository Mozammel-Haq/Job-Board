import { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/app/lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        // Base styles
        'inline-flex items-center justify-center font-bold transition-all duration-200',
        'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary',
        'disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer',
        
        // Variants
        variant === 'primary' && 'bg-primary text-white hover:bg-primary-dark',
        variant === 'secondary' && 'bg-heading text-white hover:opacity-90',
        variant === 'outline' && 'border-2 border-primary text-primary hover:text-white hover:bg-primary',
        variant === 'ghost' && 'text-heading hover:text-primary',
        
        // Sizes
        size === 'sm' && 'px-4 py-2 text-sm',
        size === 'md' && 'px-6 py-3.25 text-base',
        size === 'lg' && 'px-8 py-4 text-lg',
        
        // Full width
        fullWidth && 'w-full',
        
        className
      )}
      disabled={disabled}
      style={{
        backgroundColor: variant === 'primary' && !disabled ? '#4640DE' : undefined,
        color: variant === 'primary' ? '#FFFFFF'  : undefined,
        borderColor: variant === 'outline' ? '#4640DE' : undefined,
      }}
      {...props}
    >
      {children}
    </button>
  );
}