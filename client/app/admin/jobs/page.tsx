'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/admin/Sidebar';
import TopBar from '@/components/admin/Topbar';
import Button from '@/components/ui/Button';
import { isAuthenticated, getUser } from '@/lib/auth';
import { api } from '@/lib/api';
import { Job } from '@/lib/types';

export default function AdminJobsPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<number | null>(null);

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
    loadJobs();
  }, [router]);

  const loadJobs = async () => {
    try {
      const response = await api.getAdminJobs({ per_page: 50 });
      setJobs(response.data);
    } catch (error) {
      console.error('Failed to load jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this job? This action cannot be undone.')) {
      return;
    }

    setDeletingId(id);
    try {
      await api.deleteJob(String(id));
      setJobs(jobs.filter(job => job.id !== id));
    } catch (error) {
      console.error('Failed to delete job:', error);
      alert('Failed to delete job. Please try again.');
    } finally {
      setDeletingId(null);
    }
  };

  const handleToggleStatus = async (job: Job) => {
    try {
      await api.updateJob(String(job.id), {
        is_active: !job.is_active,
      });
      
      setJobs(jobs.map(j => 
        j.id === job.id ? { ...j, is_active: !j.is_active } : j
      ));
    } catch (error) {
      console.error('Failed to update job status:', error);
      alert('Failed to update job status. Please try again.');
    }
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
                Job Listings
              </h1>
              <p style={{ color: '#515B6F' }}>
                Manage all your job postings
              </p>
            </div>

          </div>

          {/* Jobs Table */}
          <div className="bg-white border border-gray-100 rounded-lg overflow-hidden">
            {loading ? (
              <div className="p-12 text-center">
                <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p style={{ color: '#515B6F' }}>Loading jobs...</p>
              </div>
            ) : jobs.length === 0 ? (
              <div className="p-12 text-center">
                <h3 className="text-xl font-bold mb-2" style={{ color: '#25324B' }}>
                  No jobs posted yet
                </h3>
                <p className="mb-6" style={{ color: '#515B6F' }}>
                  Start by creating your first job posting
                </p>
                <Button variant="primary" onClick={() => router.push('/admin/jobs/new')}>
                  Post Your First Job
                </Button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-background-secondary">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold" style={{ color: '#25324B' }}>
                        Job Title
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold" style={{ color: '#25324B' }}>
                        Company
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold" style={{ color: '#25324B' }}>
                        Location
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold" style={{ color: '#25324B' }}>
                        Type
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold" style={{ color: '#25324B' }}>
                        Applications
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold" style={{ color: '#25324B' }}>
                        Status
                      </th>
                      <th className="px-6 py-4 text-right text-sm font-semibold" style={{ color: '#25324B' }}>
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {jobs.map((job) => (
                      <tr key={job.id} className="hover:bg-background-secondary transition-colors">
                        <td className="px-6 py-4">
                          <div>
                            <p className="font-semibold" style={{ color: '#25324B' }}>
                              {job.title}
                            </p>
                            <p className="text-sm" style={{ color: '#7C8493' }}>
                              {job.category}
                            </p>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <p style={{ color: '#515B6F' }}>{job.company}</p>
                        </td>
                        <td className="px-6 py-4">
                          <p style={{ color: '#515B6F' }}>{job.location}</p>
                        </td>
                        <td className="px-6 py-4">
                          <span 
                            className="px-3 py-1 text-xs font-medium border rounded-full"
                            style={{
                              color: '#4640DE',
                              borderColor: '#4640DE',
                            }}
                          >
                            {job.employment_type}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <p className="font-semibold" style={{ color: '#25324B' }}>
                            {job.applications_count || 0}
                          </p>
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => handleToggleStatus(job)}
                            className={`px-3 py-1 text-xs font-medium rounded-full transition-colors ${
                              job.is_active
                                ? 'bg-green-100 text-green-700 hover:bg-green-200'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                          >
                            {job.is_active ? 'Active' : 'Inactive'}
                          </button>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => router.push(`/jobs/${job.id}`)}
                              className="p-2 hover:bg-background-secondary rounded transition-colors"
                              title="View"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#515B6F' }}>
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                              </svg>
                            </button>
                            <button
                              onClick={() => router.push(`/admin/jobs/${job.id}/edit`)}
                              className="p-2 hover:bg-background-secondary rounded transition-colors"
                              title="Edit"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#515B6F' }}>
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                            </button>
                            <button
                              onClick={() => handleDelete(job.id)}
                              disabled={deletingId === job.id}
                              className="p-2 hover:bg-red-50 rounded transition-colors disabled:opacity-50"
                              title="Delete"
                            >
                              {deletingId === job.id ? (
                                <div className="w-5 h-5 border-2 border-red-500 border-t-transparent rounded-full animate-spin"></div>
                              ) : (
                                <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                              )}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}