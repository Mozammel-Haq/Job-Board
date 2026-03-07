'use client';

import { useState, useEffect, useRef } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import JobCard from '@/components/jobs/JobCard';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { api } from '@/lib/api';
import { Job, PaginatedResponse } from '@/lib/types';
import Image from 'next/image';
import Pagination from '@/components/ui/Pagination';

const staticJobTypes = ['All', 'Full Time', 'Part Time', 'Remote', 'Contract', 'Internship'];

import { Suspense } from 'react';

function JobsPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const lastRequestRef = useRef<number>(0);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalJobs, setTotalJobs] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [categories, setCategories] = useState<string[]>(['All']);
  const [locations, setLocations] = useState<string[]>(['All']);
  const [jobTypes, setJobTypes] = useState<string[]>(staticJobTypes);

  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'All');
  const [selectedJobType, setSelectedJobType] = useState('All');
  const [selectedLocation, setSelectedLocation] = useState(searchParams.get('location') || 'All');
  const [locationSearch, setLocationSearch] = useState('');
  const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false);
  const locationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (locationRef.current && !locationRef.current.contains(event.target as Node)) {
        setIsLocationDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const filters = await api.getJobFilters();
        setCategories(['All', ...filters.categories.map(c => c.name)]);
        setLocations(['All', ...filters.locations]);
        if (filters.employment_types.length > 0) {
          setJobTypes(['All', ...filters.employment_types]);
        }
      } catch (error) {
        console.error('Failed to fetch filters:', error);
      }
    };
    fetchFilters();
  }, []);

  useEffect(() => {
    const search = searchParams.get('search') || '';
    const location = searchParams.get('location') || 'All';
    const category = searchParams.get('category') || 'All';

    setSearchTerm(search);
    setSelectedLocation(location);
    setSelectedCategory(category);
  }, [searchParams]);

  useEffect(() => {
    loadJobs();
  }, [searchTerm, selectedCategory, selectedJobType, selectedLocation, currentPage]);

  const loadJobs = async () => {
    const requestId = ++lastRequestRef.current;
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

      if (requestId !== lastRequestRef.current) return;

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
    router.push('/jobs');
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">

        {/* Page Header */}
        <div className="bg-background-secondary py-12">
          <div className="container-custom relative">
            <div className="absolute right-0 lg:top-0 md:top-20 top-80 w-[45%] h-full">
              <Image
                src="/images/Pattern.svg"
                alt=""
                fill
                className="object-cover object-center"
                priority
              />
            </div>
            <h1
              className="text-5xl font-bold mb-4 mt-20"
              style={{
                color: '#25324B',
                fontFamily: 'var(--font-family-display)'
              }}
            >
              Find Your <span className="text-primary">Dream</span> Job
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
                <div className="mb-6 relative" ref={locationRef}>
                  <label className="block text-sm font-semibold mb-3" style={{ color: '#25324B' }}>
                    Location
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <input
                      type="text"
                      placeholder="Search location..."
                      value={isLocationDropdownOpen ? locationSearch : (selectedLocation === 'All' ? '' : selectedLocation)}
                      onFocus={() => {
                        setIsLocationDropdownOpen(true);
                        setLocationSearch('');
                      }}
                      onChange={(e) => setLocationSearch(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-base"
                      style={{ color: '#25324B' }}
                    />

                    {isLocationDropdownOpen && (
                      <div className="absolute z-50 w-full mt-1 bg-white border border-gray-100 rounded-lg shadow-xl max-h-60 overflow-auto py-1">
                        <div
                          className="px-4 py-2 cursor-pointer hover:bg-gray-50 transition-colors text-sm"
                          onClick={() => {
                            setSelectedLocation('All');
                            setIsLocationDropdownOpen(false);
                            setLocationSearch('');
                          }}
                          style={{ color: selectedLocation === 'All' ? '#4640DE' : '#515B6F' }}
                        >
                          All Locations
                        </div>
                        {locations
                          .filter(loc => loc !== 'All' && loc.toLowerCase().includes(locationSearch.toLowerCase()))
                          .map((location) => (
                            <div
                              key={location}
                              className="px-4 py-2 cursor-pointer hover:bg-gray-50 transition-colors text-sm"
                              onClick={() => {
                                setSelectedLocation(location);
                                setIsLocationDropdownOpen(false);
                                setLocationSearch('');
                              }}
                              style={{ color: selectedLocation === location ? '#4640DE' : '#515B6F' }}
                            >
                              {location}
                            </div>
                          ))}
                        {locations.filter(loc => loc !== 'All' && loc.toLowerCase().includes(locationSearch.toLowerCase())).length === 0 && (
                          <div className="px-4 py-2 text-sm text-gray-400 italic">No locations found</div>
                        )}
                      </div>
                    )}
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
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                  />
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

export default function JobsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p style={{ color: '#515B6F' }}>Loading jobs...</p>
        </div>
      </div>
    }>
      <JobsPageContent />
    </Suspense>
  );
}
