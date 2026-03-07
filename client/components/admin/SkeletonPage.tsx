'use client';

import React from 'react';
import AdminCard from '@/components/admin/AdminCard';

export default function SkeletonPage({ title }: { title: string }) {
  return (
    <AdminCard 
      title={title} 
      description="This page is currently under development"
    >
      <div className="bg-white p-12 text-center">
        <div className="w-24 h-24 bg-background-secondary rounded-full flex items-center justify-center mx-auto mb-6 group hover:scale-110 transition-transform duration-300">
          <svg className="w-12 h-12 animate-pulse text-primary/40 group-hover:text-primary transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </div>
        <h3 className="text-xl font-bold mb-2" style={{ color: '#25324B' }}>
          Coming Soon
        </h3>
        <p style={{ color: '#515B6F' }}>
          We're working hard to bring you the {title.toLowerCase()} features.
        </p>
      </div>
    </AdminCard>
  );
}

