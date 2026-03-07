'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { isAuthenticated, getUser } from '@/lib/auth';
import { api } from '@/lib/api';

const loadChartData = async (period: 'Week' | 'Month' | 'Year') => {
  try {
    let data: any[] = [];
    if (period === 'Week') {
      data = await api.getWeeklyStats();
      const order = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
      data = data.sort((a, b) => order.indexOf(a.day) - order.indexOf(b.day));
    } else if (period === 'Month') {
      data = await api.getMonthlyStats();
      const order = ['W1', 'W2', 'W3', 'W4', 'W5'];
      data = data.sort((a, b) => order.indexOf(a.day) - order.indexOf(b.day));
    } else {
      data = await api.getYearlyStats();
      const order = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
      data = data.sort((a, b) => order.indexOf(a.day) - order.indexOf(b.day));
    }
    return data.map(d => ({
      day: d.day,
      jobView: Number(d.jobView) || 0,
      jobApplied: Number(d.jobApplied) || 0,
    }));
  } catch {
    return [
      { day: 'Mon', jobView: 120, jobApplied: 45 },
      { day: 'Tue', jobView: 135, jobApplied: 50 },
      { day: 'Wed', jobView: 160, jobApplied: 60 },
      { day: 'Thu', jobView: 140, jobApplied: 52 },
      { day: 'Fri', jobView: 180, jobApplied: 70 },
      { day: 'Sat', jobView: 110, jobApplied: 40 },
      { day: 'Sun', jobView: 100, jobApplied: 38 },
    ];
  }
};

export default function AdminDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState('Week');
  const [selectedTab, setSelectedTab] = useState('Overview');
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);
  
  const [stats, setStats] = useState({
    total_jobs: 0,
    active_jobs: 0,
    total_applications: 0,
    pending_applications: 0,
  });

  const [chartData, setChartData] = useState<Array<{ day: string; jobView: number; jobApplied: number }>>([]);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/login');
      return;
    }
    
    const currentUser = getUser();
    if (!currentUser?.is_admin) {
      router.push('/');
      return;
    }
    
    setUser(currentUser);
    loadDashboardData();
    loadPeriodData('Week');
  }, [router]);

  const loadDashboardData = async () => {
    try {
      const response = await api.getJobStatistics();
      setStats(response);
    } catch (error) {
      console.error('Failed to load statistics:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadPeriodData = async (period: 'Week' | 'Month' | 'Year') => {
    const data = await loadChartData(period);
    setChartData(data);
  };

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

  // Calculate total views and applications
  const totalViews = chartData.reduce((sum, d) => sum + d.jobView, 0);
  const totalApplications = chartData.reduce((sum, d) => sum + d.jobApplied, 0);

  // Calculate applicants breakdown
  const applicantsSummary = {
    fullTime: Math.floor(stats.total_applications * 0.35),
    partTime: Math.floor(stats.total_applications * 0.20),
    remote: Math.floor(stats.total_applications * 0.18),
    internship: Math.floor(stats.total_applications * 0.15),
    contract: Math.floor(stats.total_applications * 0.12),
  };

  return (
    <>
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
            <div className="flex items-center gap-3 px-4 py-2 border border-gray-200 bg-white rounded-lg">
              <span style={{ color: '#515B6F' }}>Jul 19 - Jul 25</span>
              <button className="hover:opacity-70 transition-opacity">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#515B6F' }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="p-6 rounded-lg bg-gray-100 animate-pulse h-32"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {/* New Candidates */}
              <div 
                className="p-6 rounded-lg flex items-center justify-between cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1" 
                style={{ backgroundColor: '#4640DE' }}
                onClick={() => router.push('/admin/applicants')}
              >
                <div>
                  <p className="text-5xl font-bold text-white mb-2">{stats.pending_applications}</p>
                  <p className="text-white text-lg">New candidates to review</p>
                </div>
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>

              {/* Schedule for Today */}
              <div 
                className="p-6 rounded-lg flex items-center justify-between cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1" 
                style={{ backgroundColor: '#56CDAD' }}
                onClick={() => router.push('/admin/schedule')}
              >
                <div>
                  <p className="text-5xl font-bold text-white mb-2">3</p>
                  <p className="text-white text-lg">Schedule for today</p>
                </div>
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>

              {/* Messages Received */}
              <div 
                className="p-6 rounded-lg flex items-center justify-between cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1" 
                style={{ backgroundColor: '#26A4FF' }}
                onClick={() => router.push('/admin/messages')}
              >
                <div>
                  <p className="text-5xl font-bold text-white mb-2">{stats.total_applications}</p>
                  <p className="text-white text-lg">Total applications</p>
                </div>
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Job Statistics Chart */}
            <div className="lg:col-span-2 bg-white p-6 border border-gray-100 rounded-lg">
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
                 <div className="flex gap-2 bg-background-secondary rounded-lg p-1">
                   {['Week', 'Month', 'Year'].map((period) => (
                     <button
                       key={period}
                       onClick={() => {
                         setSelectedPeriod(period);
                         loadPeriodData(period as 'Week' | 'Month' | 'Year');
                       }}
                       className={`px-4 py-2 text-sm font-medium transition-all rounded-md ${
                         selectedPeriod === period
                           ? 'bg-white text-primary shadow-sm'
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
                  <div 
                    key={index} 
                    className="flex-1 flex flex-col items-center gap-2"
                    onMouseEnter={() => setHoveredBar(index)}
                    onMouseLeave={() => setHoveredBar(null)}
                  >
                    <div className="w-full flex flex-col gap-1 relative" style={{ height: '200px' }}>
                      {/* Tooltip */}
                      {hoveredBar === index && (
                        <div className="absolute -top-20 left-1/2 -translate-x-1/2 bg-gray-800 text-white px-4 py-3 rounded-lg text-xs whitespace-nowrap z-10 shadow-lg">
                          <div className="flex items-center gap-2 mb-1">
                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#FFB836' }}></div>
                            <span className="font-medium">Job Views: {data.jobView}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#4640DE' }}></div>
                            <span className="font-medium">Applications: {data.jobApplied}</span>
                          </div>
                          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
                        </div>
                      )}
                      
                      {/* Job View Bar */}
                      <div
                        className="w-full rounded-t transition-all hover:opacity-80 cursor-pointer"
                        style={{
                          backgroundColor: '#FFB836',
                          height: `${(data.jobView / maxValue) * 100}%`,
                          marginTop: 'auto',
                        }}
                      ></div>
                      
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
              <div className="bg-white p-6 border border-gray-100 rounded-lg transition-all hover:shadow-md">
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
                  {totalViews.toLocaleString()}
                </p>
                <p className="text-sm flex items-center gap-1" style={{ color: '#56CDAD' }}>
                  This Week 6.4%
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                  </svg>
                </p>
              </div>

              {/* Job Applied */}
              <div className="bg-white p-6 border border-gray-100 rounded-lg transition-all hover:shadow-md">
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
                  {totalApplications.toLocaleString()}
                </p>
                <p className="text-sm flex items-center gap-1" style={{ color: '#FF6550' }}>
                  This Week 0.5%
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </p>
              </div>

              {/* Job Open */}
              <div className="bg-white p-6 border border-gray-100 rounded-lg transition-all hover:shadow-md">
                <h3 className="text-lg font-bold mb-4" style={{ color: '#25324B' }}>
                  Job Open
                </h3>
                {loading ? (
                  <div className="animate-pulse">
                    <div className="h-12 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-24"></div>
                  </div>
                ) : (
                  <>
                    <p className="text-5xl font-bold mb-2" style={{ color: '#25324B' }}>
                      {stats.active_jobs}
                    </p>
                    <p className="text-base" style={{ color: '#515B6F' }}>
                      Jobs Opened
                    </p>
                  </>
                )}
              </div>

              {/* Applicants Summary */}
              <div className="bg-white p-6 border border-gray-100 rounded-lg transition-all hover:shadow-md">
                <h3 className="text-lg font-bold mb-4" style={{ color: '#25324B' }}>
                  Applicants Summary
                </h3>
                {loading ? (
                  <div className="animate-pulse space-y-3">
                    <div className="h-12 bg-gray-200 rounded"></div>
                    <div className="h-2 bg-gray-200 rounded"></div>
                    <div className="space-y-2">
                      {[1, 2, 3, 4, 5].map(i => (
                        <div key={i} className="h-4 bg-gray-200 rounded"></div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <>
                    <p className="text-5xl font-bold mb-4" style={{ color: '#25324B' }}>
                      {stats.total_applications}
                    </p>
                    <p className="text-base mb-6" style={{ color: '#515B6F' }}>
                      Applicants
                    </p>

                    {/* Progress Bar */}
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden mb-4 flex">
                      <div 
                        className="transition-all duration-500"
                        style={{ 
                          width: `${(applicantsSummary.fullTime / stats.total_applications) * 100}%`, 
                          backgroundColor: '#4640DE' 
                        }}
                      ></div>
                      <div 
                        className="transition-all duration-500"
                        style={{ 
                          width: `${(applicantsSummary.partTime / stats.total_applications) * 100}%`, 
                          backgroundColor: '#56CDAD' 
                        }}
                      ></div>
                      <div 
                        className="transition-all duration-500"
                        style={{ 
                          width: `${(applicantsSummary.remote / stats.total_applications) * 100}%`, 
                          backgroundColor: '#26A4FF' 
                        }}
                      ></div>
                      <div 
                        className="transition-all duration-500"
                        style={{ 
                          width: `${(applicantsSummary.internship / stats.total_applications) * 100}%`, 
                          backgroundColor: '#FFB836' 
                        }}
                      ></div>
                      <div 
                        className="transition-all duration-500"
                        style={{ 
                          width: `${(applicantsSummary.contract / stats.total_applications) * 100}%`, 
                          backgroundColor: '#FF6550' 
                        }}
                      ></div>
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
                        <div key={item.label} className="flex items-center justify-between hover:bg-background-secondary px-2 py-1 rounded transition-colors">
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
                  </>
                )}
              </div>
            </div>
          </div>
 
    </>
  );
}
