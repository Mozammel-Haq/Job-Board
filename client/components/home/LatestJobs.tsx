'use client';

import { useEffect, useState } from 'react';
import JobListItem from '@/components/jobs/JobListItem';
import Link from 'next/link';
import { api } from '@/lib/api';
import { Job } from '@/lib/types';

export default function LatestJobs() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLatestJobs();
  }, []);

  const loadLatestJobs = async () => {
    try {
      const response = await api.getLatestJobs();
      setJobs(response.data || []);
    } catch (error) {
      console.error('Failed to load latest jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-20 bg-background-secondary relative overflow-hidden">
        <div className="container-custom text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4" style={{ color: '#515B6F' }}>Loading latest jobs...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-background-secondary relative overflow-hidden">
      {/* Background Pattern - Diagonal Lines */}
      <div className="absolute inset-0 opacity-5">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="diagonal-lines" patternUnits="userSpaceOnUse" width="40" height="40" patternTransform="rotate(45)">
              <line x1="0" y1="0" x2="0" y2="40" stroke="#25324B" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#diagonal-lines)" />
        </svg>
      </div>

      <div className="container-custom relative z-10">
        
        {/* Section Header */}
        <div className="flex items-center justify-between mb-12">
          <h2
            className="text-4xl md:text-5xl font-bold"
            style={{
              color: '#25324B',
              fontFamily: 'var(--font-family-display)',
            }}
          >
            Latest <span style={{ color: '#26A4FF' }}>jobs open</span>
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

        {/* Jobs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {jobs.map((job) => (
            <JobListItem
              key={job.id}
              id={String(job.id)}
              title={job.title}
              company={job.company}
              location={job.location}
              logo={job.logo || '/images/companies/dropbox.svg'}
              employmentType={job.employment_type}
              categories={[job.category]}
            />
          ))}
        </div>

        {/* Mobile Show All Link */}
        <div className="md:hidden text-center">
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
    </section>
  );
}