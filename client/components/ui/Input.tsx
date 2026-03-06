import { InputHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon, className, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-semibold mb-2" style={{ color: '#25324B' }}>
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: '#515B6F' }}>
              {icon}
            </div>
          )}
          <input
            ref={ref}
            className={cn(
              'w-full px-4 py-3 text-base border transition-all',
              'focus:outline-none focus:ring-1',
              icon && 'pl-12',
              error && 'border-red-500 focus:border-red-500 focus:ring-red-500',
              !error && 'border-gray-200 focus:ring-primary',
              className
            )}
            style={{
              color: '#25324B',
              backgroundColor: '#FFFFFF',
              borderColor: error ? '#EF4444' : '#E5E7EB',
            }}
            {...props}
          />
        </div>
        {error && (
          <p className="mt-1 text-sm text-red-500">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;