'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import JobCard from '@/components/jobs/JobCard';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { api } from '@/lib/api';
import { Job, PaginatedResponse } from '@/lib/types';

const categories = ['All', 'Design', 'Technology', 'Marketing', 'Business', 'Finance'];
const jobTypes = ['All', 'Full Time', 'Part Time', 'Remote', 'Contract', 'Internship'];
const locations = ['All', 'USA', 'UK', 'Europe', 'Remote'];

export default function JobsPage() {
  const searchParams = useSearchParams();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalJobs, setTotalJobs] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedJobType, setSelectedJobType] = useState('All');
  const [selectedLocation, setSelectedLocation] = useState('All');

  useEffect(() => {
    loadJobs();
  }, [searchTerm, selectedCategory, selectedJobType, selectedLocation, currentPage]);

  const loadJobs = async () => {
    setLoading(true);
    try {
      const response: PaginatedResponse<Job> = await api.getJobs({
        search: searchTerm || undefined,
        category: selectedCategory !== 'All' ? selectedCategory : undefined,
        employment_type: selectedJobType !== 'All' ? selectedJobType : undefined,
        location: selectedLocation !== 'All' ? selectedLocation : undefined,
        page: currentPage,
        per_page: 15,
      });

      setJobs(response.data);
      setTotalJobs(response.meta.total);
      setTotalPages(response.meta.last_page);
    } catch (error) {
      console.error('Failed to load jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All');
    setSelectedJobType('All');
    setSelectedLocation('All');
    setCurrentPage(1);
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        
        {/* Page Header */}
        <div className="bg-background-secondary py-12">
          <div className="container-custom">
            <div className="mb-6">
              <p className="text-base mb-2" style={{ color: '#515B6F' }}>
                <span className="hover:text-primary cursor-pointer">Home</span>
                {' '}/{' '}
                <span style={{ color: '#25324B' }}>Find Jobs</span>
              </p>
            </div>
            
            <h1 
              className="text-5xl font-bold mb-4"
              style={{ 
                color: '#25324B',
                fontFamily: 'var(--font-family-display)'
              }}
            >
              Find Your Dream Job
            </h1>
            
            <p className="text-lg" style={{ color: '#515B6F' }}>
              {loading ? 'Loading...' : `Showing ${totalJobs} jobs available`}
            </p>
          </div>
        </div>

        <div className="container-custom py-12">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            
            {/* Sidebar Filters */}
            <aside className="lg:col-span-1">
              <div className="bg-white border border-gray-100 p-6 sticky top-24">
                <h2 
                  className="text-xl font-bold mb-6"
                  style={{ 
                    color: '#25324B',
                    fontFamily: 'var(--font-family-display)'
                  }}
                >
                  Filters
                </h2>

                {/* Search */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold mb-2" style={{ color: '#25324B' }}>
                    Search
                  </label>
                  <Input
                    type="text"
                    placeholder="Job title or keyword"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    icon={
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    }
                  />
                </div>

                {/* Category Filter */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold mb-3" style={{ color: '#25324B' }}>
                    Category
                  </label>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <label key={category} className="flex items-center cursor-pointer group">
                        <input
                          type="radio"
                          name="category"
                          checked={selectedCategory === category}
                          onChange={() => setSelectedCategory(category)}
                          className="w-4 h-4 accent-primary cursor-pointer"
                        />
                        <span 
                          className="ml-3 text-base group-hover:text-primary transition-colors"
                          style={{ color: selectedCategory === category ? '#4640DE' : '#515B6F' }}
                        >
                          {category}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Job Type Filter */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold mb-3" style={{ color: '#25324B' }}>
                    Job Type
                  </label>
                  <div className="space-y-2">
                    {jobTypes.map((type) => (
                      <label key={type} className="flex items-center cursor-pointer group">
                        <input
                          type="radio"
                          name="jobType"
                          checked={selectedJobType === type}
                          onChange={() => setSelectedJobType(type)}
                          className="w-4 h-4 accent-primary cursor-pointer"
                        />
                        <span 
                          className="ml-3 text-base group-hover:text-primary transition-colors"
                          style={{ color: selectedJobType === type ? '#4640DE' : '#515B6F' }}
                        >
                          {type}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Location Filter */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold mb-3" style={{ color: '#25324B' }}>
                    Location
                  </label>
                  <div className="space-y-2">
                    {locations.map((location) => (
                      <label key={location} className="flex items-center cursor-pointer group">
                        <input
                          type="radio"
                          name="location"
                          checked={selectedLocation === location}
                          onChange={() => setSelectedLocation(location)}
                          className="w-4 h-4 accent-primary cursor-pointer"
                        />
                        <span 
                          className="ml-3 text-base group-hover:text-primary transition-colors"
                          style={{ color: selectedLocation === location ? '#4640DE' : '#515B6F' }}
                        >
                          {location}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Clear Filters */}
                <Button
                  variant="outline"
                  fullWidth
                  onClick={handleClearFilters}
                >
                  Clear All Filters
                </Button>
              </div>
            </aside>

            {/* Jobs Grid */}
            <div className="lg:col-span-3">
              {loading ? (
                <div className="flex items-center justify-center py-20">
                  <div className="text-center">
                    <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p style={{ color: '#515B6F' }}>Loading jobs...</p>
                  </div>
                </div>
              ) : jobs.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
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

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="mt-12 flex justify-center">
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                          disabled={currentPage === 1}
                          className="px-4 py-2 border border-gray-200 hover:border-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          style={{ color: '#515B6F' }}
                        >
                          Previous
                        </button>
                        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                          const page = i + 1;
                          return (
                            <button
                              key={page}
                              onClick={() => setCurrentPage(page)}
                              className="px-4 py-2 border transition-colors"
                              style={{
                                borderColor: page === currentPage ? '#4640DE' : '#E5E7EB',
                                backgroundColor: page === currentPage ? '#4640DE' : 'transparent',
                                color: page === currentPage ? '#FFFFFF' : '#515B6F',
                              }}
                            >
                              {page}
                            </button>
                          );
                        })}
                        <button 
                          onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                          disabled={currentPage === totalPages}
                          className="px-4 py-2 border border-gray-200 hover:border-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          style={{ color: '#515B6F' }}
                        >
                          Next
                        </button>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-20">
                  <h3 
                    className="text-2xl font-bold mb-4"
                    style={{ 
                      color: '#25324B',
                      fontFamily: 'var(--font-family-display)'
                    }}
                  >
                    No jobs found
                  </h3>
                  <p className="text-lg mb-6" style={{ color: '#515B6F' }}>
                    Try adjusting your filters to find more jobs
                  </p>
                  <Button variant="primary" onClick={handleClearFilters}>
                    Clear All Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}