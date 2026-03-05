import { ReactNode } from 'react';
import { cn } from '@/app/lib/utils';

interface BadgeProps {
  children: ReactNode;
  variant?: 'primary' | 'success' | 'warning' | 'info';
  className?: string;
}

export default function Badge({ children, variant = 'primary', className }: BadgeProps) {
  const styles = {
    primary: { bg: '#4640DE', text: '#FFFFFF' },
    success: { bg: '#56CDAD', text: '#FFFFFF' },
    warning: { bg: '#FFB836', text: '#25324B' },
    info: { bg: '#F8F8FD', text: '#4640DE' },
  };

  const colors = styles[variant];

  return (
    <span
      className={cn('inline-flex items-center px-3 py-1 text-sm font-semibold', className)}
      style={{
        backgroundColor: colors.bg,
        color: colors.text,
      }}
    >
      {children}
    </span>
  );
}