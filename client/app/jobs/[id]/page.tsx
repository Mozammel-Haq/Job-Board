'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import JobCard from '@/components/jobs/JobCard';
import { api } from '@/lib/api';
import { Job } from '@/lib/types';

export default function JobDetailPage() {
  const params = useParams();
  const router = useRouter();
  const jobId = params.id as string;

  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [relatedJobs, setRelatedJobs] = useState<Job[]>([]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    resumeUrl: '',
    coverNote: '',
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  useEffect(() => {
    loadJobDetails();
    loadRelatedJobs();
  }, [jobId]);

  const loadJobDetails = async () => {
    try {
      const response = await api.getJob(jobId);
      setJob(response.data || null);
    } catch (error) {
      console.error('Failed to load job:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadRelatedJobs = async () => {
    try {
      const response = await api.getLatestJobs();
      setRelatedJobs(response.data?.slice(0, 3) || []);
    } catch (error) {
      console.error('Failed to load related jobs:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};

    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (!formData.resumeUrl.trim()) {
      errors.resumeUrl = 'Resume URL is required';
    } else if (!/^https?:\/\/.+/.test(formData.resumeUrl)) {
      errors.resumeUrl = 'Please enter a valid URL (starting with http:// or https://)';
    }

    if (!formData.coverNote.trim()) {
      errors.coverNote = 'Cover note is required';
    } else if (formData.coverNote.trim().length < 50) {
      errors.coverNote = 'Cover note should be at least 50 characters';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      await api.submitApplication({
        job_id: Number(jobId),
        name: formData.name,
        email: formData.email,
        resume_url: formData.resumeUrl,
        cover_note: formData.coverNote,
      });

      setSubmitted(true);
      setNotification({ type: 'success', message: 'Application submitted successfully' });
      setFormData({
        name: '',
        email: '',
        resumeUrl: '',
        coverNote: '',
      });
    } catch (error: any) {
      console.error('Application error:', error);

      if (error.errors) {
        setFormErrors(error.errors);
      } else {
        const msg = error.message || 'Application failed. Please try again.';
        setFormErrors({ email: msg });
        setNotification({ type: 'error', message: msg });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <>
        <Header />
        <main className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p style={{ color: '#515B6F' }}>Loading job details...</p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (!job) {
    return (
      <>
        <Header />
        <main className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4" style={{ color: '#25324B' }}>
              Job Not Found
            </h1>
            <p className="text-lg mb-6" style={{ color: '#515B6F' }}>
              The job you're looking for doesn't exist.
            </p>
            <Button variant="primary" onClick={() => router.push('/jobs')}>
              Browse All Jobs
            </Button>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">


        <div className="container-custom py-12 pt-20">
          {notification && (
            <div
              className={`mb-6 rounded-lg border p-4 flex items-start gap-3 ${notification.type === 'success'
                  ? 'border-green-200 bg-green-50'
                  : 'border-red-200 bg-red-50'
                }`}
            >
              <div className="mt-0.5">
                {notification.type === 'success' ? (
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold" style={{ color: '#25324B' }}>
                  {notification.message}
                </p>
                {notification.type === 'error' && notification.message.includes('already applied') && (
                  <p className="text-xs mt-1" style={{ color: '#7C8493' }}>
                    It looks like you’ve already sent an application for this role using this email.
                  </p>
                )}
              </div>
              <button
                className="p-1 rounded hover:bg-white/60"
                aria-label="Dismiss notification"
                onClick={() => setNotification(null)}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#7C8493' }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          )}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">

              {/* Job Header */}
              <div className="border border-gray-100 p-8">
                <div className="flex items-start gap-6 mb-6">
                  <div className="w-20 h-20 relative flex-shrink-0 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                    {job.logo ? (
                      job.logo.toLowerCase().endsWith('.svg') ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={job.logo}
                          alt={`${job.company} logo`}
                          className="object-contain w-20 h-20"
                        />
                      ) : (
                        <Image
                          src={job.logo}
                          alt={`${job.company} logo`}
                          fill
                          className="object-contain"
                        />
                      )
                    ) : (
                      <span className="text-2xl font-bold" style={{ color: '#4640DE' }}>
                        {job.company.charAt(0)}
                      </span>
                    )}
                  </div>

                  <div className="flex-1">
                    <h1
                      className="text-4xl font-bold mb-3"
                      style={{
                        color: '#25324B',
                        fontFamily: 'var(--font-family-display)'
                      }}
                    >
                      {job.title}
                    </h1>

                    <div className="flex flex-wrap items-center gap-4 mb-4">
                      <p className="text-lg" style={{ color: '#515B6F' }}>
                        {job.company}
                      </p>
                      <span className="text-lg" style={{ color: '#515B6F' }}>•</span>
                      <p className="text-lg" style={{ color: '#515B6F' }}>
                        {job.location}
                      </p>
                      <span className="text-lg" style={{ color: '#515B6F' }}>•</span>
                      <p className="text-lg" style={{ color: '#515B6F' }}>
                        {new Date(job.created_at).toLocaleDateString()}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <span
                        className="px-3 py-1 text-sm font-medium border"
                        style={{
                          color: '#4640DE',
                          borderColor: '#4640DE',
                        }}
                      >
                        {job.employment_type}
                      </span>
                      <span
                        className="px-3 py-1 text-sm font-medium"
                        style={{
                          backgroundColor: '#FFB836',
                          color: '#FFFFFF',
                        }}
                      >
                        {job.category}
                      </span>
                    </div>
                  </div>
                </div>

                {job.salary && (
                  <div className="pt-6 border-t border-gray-100">
                    <p className="text-2xl font-bold" style={{ color: '#25324B' }}>
                      {job.salary}
                    </p>
                  </div>
                )}
              </div>

              {/* Job Description */}
              <div>
                <h2
                  className="text-2xl font-bold mb-4"
                  style={{
                    color: '#25324B',
                    fontFamily: 'var(--font-family-display)'
                  }}
                >
                  Job Description
                </h2>
                <p className="text-base leading-relaxed whitespace-pre-line" style={{ color: '#515B6F' }}>
                  {job.description}
                </p>
              </div>

              {/* Responsibilities */}
              {job.responsibilities && job.responsibilities.length > 0 && (
                <div>
                  <h2
                    className="text-2xl font-bold mb-4"
                    style={{
                      color: '#25324B',
                      fontFamily: 'var(--font-family-display)'
                    }}
                  >
                    Responsibilities
                  </h2>
                  <ul className="space-y-3">
                    {job.responsibilities.map((item: string, index: number) => (
                      <li key={index} className="flex items-start gap-3">
                        <svg className="w-6 h-6 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20" style={{ color: '#56CDAD' }}>
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-base" style={{ color: '#515B6F' }}>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Requirements */}
              {job.requirements && job.requirements.length > 0 && (
                <div>
                  <h2
                    className="text-2xl font-bold mb-4"
                    style={{
                      color: '#25324B',
                      fontFamily: 'var(--font-family-display)'
                    }}
                  >
                    Requirements
                  </h2>
                  <ul className="space-y-3">
                    {job.requirements.map((item: string, index: number) => (
                      <li key={index} className="flex items-start gap-3">
                        <svg className="w-6 h-6 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20" style={{ color: '#4640DE' }}>
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-base" style={{ color: '#515B6F' }}>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Benefits */}
              {job.benefits && job.benefits.length > 0 && (
                <div>
                  <h2
                    className="text-2xl font-bold mb-4"
                    style={{
                      color: '#25324B',
                      fontFamily: 'var(--font-family-display)'
                    }}
                  >
                    Benefits
                  </h2>
                  <ul className="space-y-3">
                    {job.benefits.map((item: string, index: number) => (
                      <li key={index} className="flex items-start gap-3">
                        <svg className="w-6 h-6 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20" style={{ color: '#FFB836' }}>
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="text-base" style={{ color: '#515B6F' }}>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Application Form */}
              <div className="border border-gray-100 p-8" id="apply-form">
                <h2
                  className="text-3xl font-bold mb-6"
                  style={{
                    color: '#25324B',
                    fontFamily: 'var(--font-family-display)'
                  }}
                >
                  Apply for this Position
                </h2>

                {submitted ? (
                  <div className="text-center py-8">
                    <svg className="w-20 h-20 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20" style={{ color: '#56CDAD' }}>
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <h3 className="text-2xl font-bold mb-2" style={{ color: '#25324B' }}>
                      Application Submitted!
                    </h3>
                    <p className="text-lg mb-6" style={{ color: '#515B6F' }}>
                      Thank you for applying. We'll review your application and get back to you soon.
                    </p>
                    <Button variant="primary" onClick={() => setSubmitted(false)}>
                      Apply to Another Position
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <Input
                      label="Full Name *"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                      error={formErrors.name}
                    />

                    <Input
                      label="Email Address *"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="you@example.com"
                      error={formErrors.email}
                    />

                    <Input
                      label="Resume URL *"
                      name="resumeUrl"
                      value={formData.resumeUrl}
                      onChange={handleInputChange}
                      placeholder="https://drive.google.com/..."
                      error={formErrors.resumeUrl}
                    />

                    <div className="w-full">
                      <label className="block text-sm font-semibold mb-2" style={{ color: '#25324B' }}>
                        Cover Note *
                      </label>
                      <textarea
                        name="coverNote"
                        value={formData.coverNote}
                        onChange={handleInputChange}
                        placeholder="Tell us why you're a great fit for this position (minimum 50 characters)"
                        rows={6}
                        className="w-full px-4 py-3 text-base border border-gray-200 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all resize-none"
                        style={{ color: '#25324B' }}
                      />
                      {formErrors.coverNote && (
                        <p className="mt-1 text-sm text-red-500">{formErrors.coverNote}</p>
                      )}
                      <p className="mt-1 text-sm" style={{ color: '#7C8493' }}>
                        {formData.coverNote.length} characters
                      </p>
                    </div>

                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      fullWidth
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit Application'}
                    </Button>
                  </form>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">

                {/* Quick Apply CTA */}
                <div className="border border-gray-100 p-6 text-center">
                  <h3 className="text-xl font-bold mb-4" style={{ color: '#25324B' }}>
                    Interested in this role?
                  </h3>
                  <Button
                    variant="primary"
                    fullWidth
                    onClick={() => {
                      document.getElementById('apply-form')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    Apply Now
                  </Button>
                </div>

                {/* Company Info */}
                <div className="border border-gray-100 p-6">
                  <h3 className="text-xl font-bold mb-4" style={{ color: '#25324B' }}>
                    About {job.company}
                  </h3>
                  <p className="text-base mb-4" style={{ color: '#515B6F' }}>
                    {job.company} is a leading company committed to innovation and excellence.
                  </p>
                  <Button variant="outline" fullWidth>
                    View Company Profile
                  </Button>
                </div>

                {/* Related Jobs */}
                {relatedJobs.length > 0 && (
                  <div>
                    <h3 className="text-xl font-bold mb-4" style={{ color: '#25324B' }}>
                      Related Jobs
                    </h3>
                    <div className="space-y-4">
                      {relatedJobs.map((relatedJob) => (
                        <JobCard
                          key={relatedJob.id}
                          id={String(relatedJob.id)}
                          title={relatedJob.title}
                          company={relatedJob.company}
                          location={relatedJob.location}
                          logo={relatedJob.logo || '/images/companies/dropbox.svg'}
                          description={relatedJob.description}
                          employmentType={relatedJob.employment_type}
                          categories={[relatedJob.category]}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
