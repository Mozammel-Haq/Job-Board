import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Card({ children, className, hover = false }: CardProps) {
  return (
    <div
      className={cn(
        'bg-white border border-gray-100 p-6 transition-all duration-300',
        hover && 'hover:shadow-lg hover:border-primary/20 cursor-pointer',
        className
      )}
      style={{
        boxShadow: '0px 4px 25px rgba(0, 0, 0, 0.05)',
      }}
    >
      {children}
    </div>
  );
}