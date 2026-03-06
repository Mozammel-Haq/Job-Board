'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import { logout } from '@/lib/auth';

export default function TopBar() {
  const router = useRouter();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const handlePostJob = () => {
    router.push('/admin/jobs/new');
  };

  return (
    <div className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-8">
      
      {/* Company Selector */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
          <span className="text-2xl">🏢</span>
        </div>
        <div>
          <p className="text-sm" style={{ color: '#7C8493' }}>Company</p>
          <button className="flex items-center gap-2 font-semibold hover:text-primary transition-colors" style={{ color: '#25324B' }}>
            Nomad
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-4">
        
        {/* Notification Bell */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 rounded-lg hover:bg-background-secondary transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#515B6F' }}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
        </div>

        {/* Post a Job Button */}
        <Button
          variant="primary"
          onClick={handlePostJob}
          className="flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Post a job
        </Button>
      </div>
    </div>
  );
}