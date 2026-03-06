'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/admin/Sidebar';
import TopBar from '@/components/admin/Topbar';
import { isAuthenticated, getUser } from '@/lib/auth';

// Mock data
const statsData = {
  newCandidates: 76,
  scheduleToday: 3,
  messagesReceived: 24,
};

const chartData = [
  { day: 'Mon', jobView: 180, jobApplied: 120 },
  { day: 'Tue', jobView: 140, jobApplied: 160 },
  { day: 'Wed', jobView: 200, jobApplied: 100 },
  { day: 'Thu', jobView: 90, jobApplied: 180 },
  { day: 'Fri', jobView: 190, jobApplied: 80 },
  { day: 'Sat', jobView: 60, jobApplied: 100 },
  { day: 'Sun', jobView: 120, jobApplied: 140 },
];

const applicantsSummary = {
  fullTime: 45,
  partTime: 24,
  remote: 22,
  internship: 32,
  contract: 30,
};

export default function AdminDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [selectedPeriod, setSelectedPeriod] = useState('Week');
  const [selectedTab, setSelectedTab] = useState('Overview');

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/login');
      return;
    }
    setUser(getUser());
  }, [router]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p style={{ color: '#515B6F' }}>Loading...</p>
        </div>
      </div>
    );
  }

  const maxValue = Math.max(...chartData.map(d => Math.max(d.jobView, d.jobApplied)));

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      
      <div className="flex-1 flex flex-col">
        <TopBar />
        
        <main className="flex-1 p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 
                className="text-3xl font-bold mb-2"
                style={{ 
                  color: '#25324B',
                  fontFamily: 'var(--font-family-display)'
                }}
              >
                Good morning, {user.name.split(' ')[0]}
              </h1>
              <p style={{ color: '#515B6F' }}>
                Here is your job listings statistic report from July 19 - July 25.
              </p>
            </div>

            {/* Date Range Selector */}
            <div className="flex items-center gap-3 px-4 py-2 border border-gray-200 bg-white">
              <span style={{ color: '#515B6F' }}>Jul 19 - Jul 25</span>
              <button>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#515B6F' }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* New Candidates */}
            <div className="p-6 rounded-lg flex items-center justify-between cursor-pointer transition-transform hover:scale-105" style={{ backgroundColor: '#4640DE' }}>
              <div>
                <p className="text-6xl font-bold text-white mb-2">{statsData.newCandidates}</p>
                <p className="text-white text-lg">New candidates to review</p>
              </div>
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>

            {/* Schedule for Today */}
            <div className="p-6 rounded-lg flex items-center justify-between cursor-pointer transition-transform hover:scale-105" style={{ backgroundColor: '#56CDAD' }}>
              <div>
                <p className="text-6xl font-bold text-white mb-2">{statsData.scheduleToday}</p>
                <p className="text-white text-lg">Schedule for today</p>
              </div>
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>

            {/* Messages Received */}
            <div className="p-6 rounded-lg flex items-center justify-between cursor-pointer transition-transform hover:scale-105" style={{ backgroundColor: '#26A4FF' }}>
              <div>
                <p className="text-6xl font-bold text-white mb-2">{statsData.messagesReceived}</p>
                <p className="text-white text-lg">Messages received</p>
              </div>
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Job Statistics Chart */}
            <div className="lg:col-span-2 bg-white p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold mb-1" style={{ color: '#25324B' }}>
                    Job statistics
                  </h2>
                  <p className="text-sm" style={{ color: '#7C8493' }}>
                    Showing Jobstatistic Jul 19-25
                  </p>
                </div>

                {/* Period Tabs */}
                <div className="flex gap-2">
                  {['Week', 'Month', 'Year'].map((period) => (
                    <button
                      key={period}
                      onClick={() => setSelectedPeriod(period)}
                      className={`px-4 py-2 text-sm font-medium transition-colors ${
                        selectedPeriod === period
                          ? 'bg-background-secondary text-primary'
                          : 'text-body hover:text-primary'
                      }`}
                    >
                      {period}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tabs */}
              <div className="flex gap-6 mb-6 border-b border-gray-100">
                {['Overview', 'Jobs View', 'Jobs Applied'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setSelectedTab(tab)}
                    className={`pb-3 font-medium transition-colors relative ${
                      selectedTab === tab ? 'text-primary' : 'text-body hover:text-primary'
                    }`}
                  >
                    {tab}
                    {selectedTab === tab && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5" style={{ backgroundColor: '#4640DE' }}></div>
                    )}
                  </button>
                ))}
              </div>

              {/* Chart */}
              <div className="h-64 flex items-end justify-between gap-3">
                {chartData.map((data, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center gap-2">
                    <div className="w-full flex flex-col gap-1 relative" style={{ height: '200px' }}>
                      {/* Job View Bar */}
                      <div
                        className="w-full rounded-t transition-all hover:opacity-80 cursor-pointer relative group"
                        style={{
                          backgroundColor: '#FFB836',
                          height: `${(data.jobView / maxValue) * 100}%`,
                          marginTop: 'auto',
                        }}
                      >
                        {/* Tooltip */}
                        {index === 2 && (
                          <div className="absolute -top-16 left-1/2 -translate-x-1/2 bg-gray-800 text-white px-3 py-2 rounded text-xs whitespace-nowrap">
                            <div className="flex items-center gap-2 mb-1">
                              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#FFB836' }}></div>
                              <span>122</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#4640DE' }}></div>
                              <span>34</span>
                            </div>
                          </div>
                        )}
                      </div>
                      {/* Job Applied Bar */}
                      <div
                        className="w-full rounded-b transition-all hover:opacity-80 cursor-pointer"
                        style={{
                          backgroundColor: '#4640DE',
                          height: `${(data.jobApplied / maxValue) * 100}%`,
                        }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium" style={{ color: '#7C8493' }}>
                      {data.day}
                    </span>
                  </div>
                ))}
              </div>

              {/* Legend */}
              <div className="flex items-center justify-center gap-6 mt-6">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded" style={{ backgroundColor: '#FFB836' }}></div>
                  <span className="text-sm" style={{ color: '#515B6F' }}>Job View</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded" style={{ backgroundColor: '#4640DE' }}></div>
                  <span className="text-sm" style={{ color: '#515B6F' }}>Job Applied</span>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              
              {/* Job Views */}
              <div className="bg-white p-6 border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold" style={{ color: '#25324B' }}>
                    Job Views
                  </h3>
                  <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: '#FFB83620' }}>
                    <svg className="w-6 h-6" fill="none" stroke="#FFB836" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                </div>
                <p className="text-4xl font-bold mb-2" style={{ color: '#25324B' }}>
                  2,342
                </p>
                <p className="text-sm flex items-center gap-1" style={{ color: '#56CDAD' }}>
                  This Week 6.4%
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                  </svg>
                </p>
              </div>

              {/* Job Applied */}
              <div className="bg-white p-6 border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold" style={{ color: '#25324B' }}>
                    Job Applied
                  </h3>
                  <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: '#4640DE20' }}>
                    <svg className="w-6 h-6" fill="none" stroke="#4640DE" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                </div>
                <p className="text-4xl font-bold mb-2" style={{ color: '#25324B' }}>
                  654
                </p>
                <p className="text-sm flex items-center gap-1" style={{ color: '#FF6550' }}>
                  This Week 0.5%
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </p>
              </div>

              {/* Job Open */}
              <div className="bg-white p-6 border border-gray-100">
                <h3 className="text-lg font-bold mb-4" style={{ color: '#25324B' }}>
                  Job Open
                </h3>
                <p className="text-5xl font-bold mb-2" style={{ color: '#25324B' }}>
                  12
                </p>
                <p className="text-base" style={{ color: '#515B6F' }}>
                  Jobs Opened
                </p>
              </div>

              {/* Applicants Summary */}
              <div className="bg-white p-6 border border-gray-100">
                <h3 className="text-lg font-bold mb-4" style={{ color: '#25324B' }}>
                  Applicants Summary
                </h3>
                <p className="text-5xl font-bold mb-4" style={{ color: '#25324B' }}>
                  67
                </p>
                <p className="text-base mb-6" style={{ color: '#515B6F' }}>
                  Applicants
                </p>

                {/* Progress Bar */}
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden mb-4 flex">
                  <div style={{ width: '33%', backgroundColor: '#4640DE' }}></div>
                  <div style={{ width: '18%', backgroundColor: '#56CDAD' }}></div>
                  <div style={{ width: '16%', backgroundColor: '#26A4FF' }}></div>
                  <div style={{ width: '24%', backgroundColor: '#FFB836' }}></div>
                  <div style={{ width: '22%', backgroundColor: '#FF6550' }}></div>
                </div>

                {/* Legend */}
                <div className="space-y-3">
                  {[
                    { label: 'Full Time', value: applicantsSummary.fullTime, color: '#4640DE' },
                    { label: 'Part-Time', value: applicantsSummary.partTime, color: '#56CDAD' },
                    { label: 'Remote', value: applicantsSummary.remote, color: '#26A4FF' },
                    { label: 'Internship', value: applicantsSummary.internship, color: '#FFB836' },
                    { label: 'Contract', value: applicantsSummary.contract, color: '#FF6550' },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                        <span className="text-sm" style={{ color: '#515B6F' }}>{item.label}</span>
                      </div>
                      <span className="text-sm font-semibold" style={{ color: '#25324B' }}>
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}