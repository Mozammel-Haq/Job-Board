'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { isAuthenticated, getUser } from '@/lib/auth';
import { api } from '@/lib/api';
import { Application } from '@/lib/types';
import AdminCard from '@/components/admin/AdminCard';
import JobLoader from '@/components/ui/JobLoader';

export default function ApplicantsPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<number | null>(null);

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
    loadApplications();
  }, [router]);

  const loadApplications = async () => {
    try {
      const response = await api.getApplications({ per_page: 50 });
      setApplications(response.data || []);
    } catch (error) {
      console.error('Failed to load applications:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (id: number, status: string) => {
    setUpdatingId(id);
    try {
      await api.updateApplicationStatus(id, status);
      setApplications(applications.map(app => 
        app.id === id ? { ...app, status: status as any } : app
      ));
    } catch (error) {
      console.error('Failed to update status:', error);
      alert('Failed to update status');
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this application?')) return;
    
    try {
      await api.deleteApplication(id);
      setApplications(applications.filter(app => app.id !== id));
    } catch (error) {
      console.error('Failed to delete application:', error);
      alert('Failed to delete application');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'reviewed': return 'bg-blue-100 text-blue-700';
      case 'accepted': return 'bg-green-100 text-green-700';
      case 'rejected': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  if (!user) return <JobLoader />;

  return (
    <AdminCard 
      title="All Applicants" 
      description="Manage and review job applications"
    >
      {loading ? (
        <JobLoader />
      ) : applications.length === 0 ? (
        <div className="p-12 text-center">
          <p style={{ color: '#515B6F' }}>No applications found.</p>
        </div>
      ) : (
        <div className="overflow-x-auto -mx-6 md:mx-0">
          <table className="w-full min-w-[800px]">
            <thead className="bg-background-secondary">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold" style={{ color: '#25324B' }}>Applicant</th>
                <th className="px-6 py-4 text-left text-sm font-semibold" style={{ color: '#25324B' }}>Applied For</th>
                <th className="px-6 py-4 text-left text-sm font-semibold" style={{ color: '#25324B' }}>Date</th>
                <th className="px-6 py-4 text-left text-sm font-semibold" style={{ color: '#25324B' }}>Status</th>
                <th className="px-6 py-4 text-right text-sm font-semibold" style={{ color: '#25324B' }}>Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {applications.map((app) => (
                <tr key={app.id} className="hover:bg-background-secondary transition-colors">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-semibold" style={{ color: '#25324B' }}>{app.name}</p>
                      <p className="text-sm" style={{ color: '#7C8493' }}>{app.email}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p style={{ color: '#515B6F' }}>{app.job?.title || 'Unknown Job'}</p>
                  </td>
                  <td className="px-6 py-4 text-sm" style={{ color: '#515B6F' }}>
                    {new Date(app.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 text-xs font-medium rounded-full whitespace-nowrap ${getStatusColor(app.status)}`}>
                      {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <select 
                        className="text-sm border border-gray-200 rounded p-1 bg-white focus:outline-none focus:ring-2 focus:ring-primary/20"
                        value={app.status}
                        onChange={(e) => handleUpdateStatus(app.id, e.target.value)}
                        disabled={updatingId === app.id}
                      >
                        <option value="pending">Pending</option>
                        <option value="reviewed">Reviewed</option>
                        <option value="accepted">Accepted</option>
                        <option value="rejected">Rejected</option>
                      </select>
                      <a 
                        href={app.resume_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="p-2 hover:bg-gray-100 rounded transition-colors cursor-pointer"
                        title="View Resume"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#515B6F' }}>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </a>
                      <button
                        onClick={() => handleDelete(app.id)}
                        className="p-2 hover:bg-red-50 rounded transition-colors cursor-pointer"
                        title="Delete"
                      >
                        <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </AdminCard>
  );
}

