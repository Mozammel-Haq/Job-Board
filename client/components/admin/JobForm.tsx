'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { api } from '@/lib/api';
import { isAuthenticated, getUser } from '@/lib/auth';
import AdminCard from '@/components/admin/AdminCard';
import JobLoader from '@/components/ui/JobLoader';

export default function JobForm({ id }: { id?: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(!!id);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<Record<string, string[]>>({});

  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    category: '',
    employment_type: 'Full Time',
    salary: '',
    description: '',
    responsibilities: '',
    requirements: '',
    benefits: '',
    logo: '',
    is_active: true,
  });
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/login');
      return;
    }
    const user = getUser();
    if (!user?.is_admin) {
      router.push('/');
      return;
    }

    if (id) {
      loadJob(id);
    }
  }, [id, router]);

  const loadJob = async (jobId: string) => {
    try {
      const response = await api.getJob(jobId);
      const job = response.data;
      if (!job) {
        alert('Job not found');
        router.push('/admin/jobs');
        return;
      }
      setFormData({
        title: job.title,
        company: job.company,
        location: job.location,
        category: job.category,
        employment_type: job.employment_type,
        salary: job.salary || '',
        description: job.description,
        responsibilities: (job.responsibilities || []).join('\n'),
        requirements: (job.requirements || []).join('\n'),
        benefits: (job.benefits || []).join('\n'),
        logo: job.logo || '',
        is_active: job.is_active,
      });
    } catch (error) {
      console.error('Failed to load job:', error);
      alert('Failed to load job data');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setFormData(prev => ({ ...prev, [name]: val }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setErrors({});

    const payload = {
      ...formData,
      responsibilities: formData.responsibilities.split('\n').filter(s => s.trim() !== ''),
      requirements: formData.requirements.split('\n').filter(s => s.trim() !== ''),
      benefits: formData.benefits.split('\n').filter(s => s.trim() !== ''),
    };

    try {
      if (logoFile) {
        const upload = await api.uploadJobLogo(logoFile);
        payload.logo = upload.url;
      }
      if (id) {
        await api.updateJob(id, payload);
      } else {
        await api.createJob(payload);
      }
      router.push('/admin/jobs');
    } catch (error: any) {
      console.error('Failed to save job:', error);
      if (error.errors) {
        setErrors(error.errors);
      } else {
        alert(error.message || 'Failed to save job');
      }
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <JobLoader />;

  return (
    <AdminCard
      title={id ? 'Edit Job' : 'Post New Job'}
      description="Fill in the details for your job posting"
      actions={
        <Button variant="outline" onClick={() => router.back()}>Cancel</Button>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-8 max-w-5xl mx-auto">
        {/* Basic Information Section */}
        <section className="space-y-6">
          <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-bold text-lg" style={{ color: '#25324B' }}>Basic Information</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: '#25324B' }}>Job Title *</label>
              <Input name="title" value={formData.title} onChange={handleInputChange} required placeholder="e.g. Senior Software Engineer" />
              {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title[0]}</p>}
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: '#25324B' }}>Company *</label>
              <Input name="company" value={formData.company} onChange={handleInputChange} required placeholder="e.g. Acme Corp" />
              {errors.company && <p className="text-red-500 text-xs mt-1">{errors.company[0]}</p>}
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: '#25324B' }}>Location *</label>
              <Input name="location" value={formData.location} onChange={handleInputChange} required placeholder="e.g. Remote / New York" />
              {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location[0]}</p>}
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: '#25324B' }}>Category *</label>
              <Input name="category" value={formData.category} onChange={handleInputChange} required placeholder="e.g. Technology / Design" />
              {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category[0]}</p>}
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: '#25324B' }}>Employment Type *</label>
              <select
                name="employment_type"
                value={formData.employment_type}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all bg-white"
              >
                <option value="Full Time">Full Time</option>
                <option value="Part Time">Part Time</option>
                <option value="Remote">Remote</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: '#25324B' }}>Salary Range</label>
              <Input name="salary" value={formData.salary} onChange={handleInputChange} placeholder="e.g. $100k - $120k" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold mb-2 text-[#25324B]">
                Company Logo
              </label>

              <div className="flex items-center gap-4">

                {/* Upload Box */}
                <label className="flex flex-col items-center justify-center w-40 h-24 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-400 hover:bg-gray-50 transition">

                  <span className="text-xs text-gray-500 text-center px-2">
                    Click to upload <br /> PNG / JPG
                  </span>

                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0] || null;
                      setLogoFile(file);

                      if (file) {
                        const preview = URL.createObjectURL(file);
                        setLogoPreview(preview);
                      } else {
                        setLogoPreview(null);
                      }
                    }}
                  />
                </label>

                {/* Preview */}
                {(logoPreview || formData.logo) && (
                  <div className="relative w-20 h-20 rounded-xl border bg-white shadow-sm overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={logoPreview || formData.logo}
                      alt="Logo preview"
                      className="w-full h-full object-contain p-1"
                    />
                  </div>
                )}
              </div>

              {errors.logo && (
                <p className="text-red-500 text-xs mt-1">{errors.logo[0]}</p>
              )}
            </div>
          </div>
        </section>

        {/* Job Details Section */}
        <section className="space-y-6">
          <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
              </svg>
            </div>
            <h3 className="font-bold text-lg" style={{ color: '#25324B' }}>Job Details</h3>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2" style={{ color: '#25324B' }}>Job Description *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
              rows={6}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              placeholder="Detailed description of the role..."
            />
            {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description[0]}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: '#25324B' }}>Responsibilities (One per line)</label>
              <textarea
                name="responsibilities"
                value={formData.responsibilities}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                placeholder="Lead development of core features&#10;Mentor junior developers"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: '#25324B' }}>Requirements (One per line)</label>
              <textarea
                name="requirements"
                value={formData.requirements}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                placeholder="5+ years of React experience&#10;Excellent communication skills"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2" style={{ color: '#25324B' }}>Benefits (One per line)</label>
            <textarea
              name="benefits"
              value={formData.benefits}
              onChange={handleInputChange}
              rows={3}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              placeholder="Health insurance&#10;Flexible hours"
            />
          </div>
        </section>

        {/* Status Section */}
        <section className="pt-4 border-t border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-3 bg-background-secondary p-4 rounded-xl border border-gray-100">
            <div className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                id="is_active"
                name="is_active"
                checked={formData.is_active}
                onChange={handleInputChange}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              <label htmlFor="is_active" className="ml-3 text-sm font-bold" style={{ color: '#25324B' }}>
                Post as Active
              </label>
            </div>
            <p className="text-xs text-gray-500 ml-auto hidden sm:block">
              Visible to all candidates immediately
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="outline" type="button" onClick={() => router.back()} className="flex-1 md:flex-none px-8">
              Cancel
            </Button>
            <Button variant="primary" type="submit" className="flex-1 md:flex-none px-12" disabled={saving}>
              {saving ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  Saving...
                </span>
              ) : (id ? 'Update Job' : 'Post Job')}
            </Button>
          </div>
        </section>
      </form>
    </AdminCard>
  );
}
