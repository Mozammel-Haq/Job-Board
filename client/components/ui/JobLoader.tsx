'use client';

import React from 'react';

const JobLoader = () => {
  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className="relative w-20 h-20">
        {/* Outer fast spinning ring */}
        <div className="absolute inset-0 border-4 border-primary/20 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin duration-500"></div>
        
        {/* Inner pulsing briefcase/job icon */}
        <div className="absolute inset-0 flex items-center justify-center animate-pulse duration-700">
          <svg 
            className="w-10 h-10 text-primary" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" 
            />
          </svg>
        </div>
      </div>
      <p className="mt-4 font-bold text-primary animate-bounce duration-1000 tracking-wider text-sm uppercase">
        Loading...
      </p>
    </div>
  );
};

export default JobLoader;
