'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import { useAdmin } from '@/lib/AdminContext';

export default function TopBar() {
  const router = useRouter();
  const { toggleSidebar, toggleMobileMenu } = useAdmin();
  const [showNotifications, setShowNotifications] = useState(false);

  const handlePostJob = () => {
    router.push('/admin/jobs/new');
  };

  return (
    <div className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-4 md:px-8 sticky top-0 z-30">
      
      <div className="flex items-center gap-4">
        {/* Mobile Menu Toggle */}
        <button 
          onClick={toggleMobileMenu}
          className="p-2 rounded-lg hover:bg-background-secondary md:hidden"
        >
          <svg className="w-6 h-6 text-body" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Desktop Sidebar Toggle */}
        <button 
          onClick={toggleSidebar}
          className="p-2 rounded-lg hover:bg-background-secondary hidden md:block"
        >
          <svg className="w-6 h-6 text-body" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
          </svg>
        </button>

        {/* Company Selector (Hidden on small mobile) */}
        <div className="hidden sm:flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center text-xl">
            🏢
          </div>
          <div className="hidden lg:block">
            <p className="text-xs" style={{ color: '#7C8493' }}>Company</p>
            <button className="flex items-center gap-1 font-semibold text-sm hover:text-primary transition-colors" style={{ color: '#25324B' }}>
              Nomad
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-2 md:gap-4">
        
        {/* Notification Bell */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 rounded-lg hover:bg-background-secondary transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#515B6F' }}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
        </div>

        {/* Post a Job Button */}
        <Button
          variant="primary"
          onClick={handlePostJob}
          className="flex items-center gap-2 whitespace-nowrap"
          size="sm"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <span className="hidden sm:inline">Post a job</span>
        </Button>
      </div>
    </div>
  );
}
