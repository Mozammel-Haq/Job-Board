'use client';

import React from 'react';

interface AdminCardProps {
  title: string;
  description?: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
}

export default function AdminCard({ title, description, actions, children }: AdminCardProps) {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden flex flex-col">
      {/* Card Header */}
      <div className="px-6 py-8 border-b border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white">
        <div>
          <h1 
            className="text-2xl md:text-3xl font-bold mb-1"
            style={{ 
              color: '#25324B',
              fontFamily: 'var(--font-family-display)'
            }}
          >
            {title}
          </h1>
          {description && (
            <p className="text-sm md:text-base" style={{ color: '#515B6F' }}>
              {description}
            </p>
          )}
        </div>
        {actions && (
          <div className="flex items-center gap-3">
            {actions}
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="flex-1 p-6 md:p-8">
        {children}
      </div>
    </div>
  );
}
