'use client';

import { useEffect, useState } from 'react';
import JobCard from '@/components/jobs/JobCard';
import Link from 'next/link';
import { api } from '@/lib/api';
import { Job } from '@/lib/types';

export default function FeaturedJobs() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFeaturedJobs();
  }, []);

  const loadFeaturedJobs = async () => {
    try {
      const response = await api.getFeaturedJobs();
      setJobs(response.data || []);
    } catch (error) {
      console.error('Failed to load featured jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-20 bg-white">
        <div className="container-custom text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4" style={{ color: '#515B6F' }}>Loading featured jobs...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-white">
      <div className="container-custom">
        
        {/* Section Header */}
        <div className="flex items-center justify-between mb-12">
          <h2
            className="text-4xl md:text-5xl font-bold"
            style={{
              color: '#25324B',
              fontFamily: 'var(--font-family-display)',
            }}
          >
            Featured <span style={{ color: '#26A4FF' }}>jobs</span>
          </h2>

          <Link
            href="/jobs"
            className="hidden md:flex items-center gap-2 font-semibold transition-colors hover:text-primary"
            style={{ color: '#4640DE' }}
          >
            Show all jobs
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {jobs.map((job) => (
            <JobCard
              key={job.id}
              id={String(job.id)}
              title={job.title}
              company={job.company}
              location={job.location}
              logo={job.logo || '/images/companies/dropbox.svg'}
              description={job.description}
              employmentType={job.employment_type}
              categories={[job.category]}
            />
          ))}
        </div>

        {/* Mobile Slider */}
        <div className="md:hidden">
          <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
            {jobs.map((job) => (
              <div key={job.id} className="min-w-[85%] snap-start">
                <JobCard
                  id={String(job.id)}
                  title={job.title}
                  company={job.company}
                  location={job.location}
                  logo={job.logo || '/images/companies/dropbox.svg'}
                  description={job.description}
                  employmentType={job.employment_type}
                  categories={[job.category]}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Show All Link */}
        <div className="md:hidden text-center mt-6">
          <Link
            href="/jobs"
            className="inline-flex items-center gap-2 font-semibold transition-colors hover:text-primary"
            style={{ color: '#4640DE' }}
          >
            Show all jobs
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}