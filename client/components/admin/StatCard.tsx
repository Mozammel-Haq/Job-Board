import { ReactNode } from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: ReactNode;
  color: string;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  onClick?: () => void;
}

export default function StatCard({ title, value, subtitle, icon, color, trend, onClick }: StatCardProps) {
  return (
    <div
      onClick={onClick}
      className={`p-6 rounded-lg transition-all duration-300 ${onClick ? 'cursor-pointer hover:shadow-lg hover:-translate-y-1' : ''}`}
      style={{ backgroundColor: color }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <p className="text-white text-sm font-medium mb-1 opacity-90">
            {title}
          </p>
          <p className="text-white text-4xl font-bold mb-1">
            {value}
          </p>
          {subtitle && (
            <p className="text-white text-sm opacity-75">
              {subtitle}
            </p>
          )}
          {trend && (
            <div className="flex items-center gap-1 mt-2">
              <svg 
                className="w-4 h-4 text-white" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                {trend.isPositive ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                )}
              </svg>
              <span className="text-white text-sm font-medium">{trend.value}</span>
            </div>
          )}
        </div>
        <div className="w-12 h-12 rounded-full bg-white bg-opacity-20 flex items-center justify-center flex-shrink-0">
          {icon}
        </div>
      </div>
    </div>
  );
}