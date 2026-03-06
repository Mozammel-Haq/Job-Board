'use client';

import { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import JobCard from '@/components/jobs/JobCard';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Image from 'next/image';

// Sample job data (will come from API later)
const allJobs = [
  {
    id: '1',
    title: 'Senior Frontend Developer',
    company: 'Google',
    location: 'San Francisco, USA',
    logo: '/images/companies/dropbox.svg',
    description: 'We are looking for a Senior Frontend Developer to join our team and help build amazing user experiences.',
    employmentType: 'Full Time',
    categories: ['Technology', 'Design'],
  },
  {
    id: '2',
    title: 'Product Designer',
    company: 'Facebook',
    location: 'New York, USA',
    logo: '/images/companies/revolut.svg',
    description: 'Join our design team to create beautiful and intuitive products used by millions.',
    employmentType: 'Full Time',
    categories: ['Design', 'Business'],
  },
  {
    id: '3',
    title: 'Backend Engineer',
    company: 'Amazon',
    location: 'Seattle, USA',
    logo: '/images/companies/pitch.svg',
    description: 'Build scalable backend systems that power our global e-commerce platform.',
    employmentType: 'Full Time',
    categories: ['Technology'],
  },
  {
    id: '4',
    title: 'Marketing Manager',
    company: 'Spotify',
    location: 'London, UK',
    logo: '/images/companies/blinkist.svg',
    description: 'Lead marketing campaigns and help grow our user base across Europe.',
    employmentType: 'Full Time',
    categories: ['Marketing', 'Business'],
  },
  {
    id: '5',
    title: 'Data Scientist',
    company: 'Netflix',
    location: 'Los Angeles, USA',
    logo: '/images/companies/canva.svg',
    description: 'Use data to drive insights and improve our recommendation algorithms.',
    employmentType: 'Full Time',
    categories: ['Technology'],
  },
  {
    id: '6',
    title: 'UX Researcher',
    company: 'Airbnb',
    location: 'Remote',
    logo: '/images/companies/godaddy.svg',
    description: 'Conduct user research to improve our platform and enhance user experience.',
    employmentType: 'Remote',
    categories: ['Design'],
  },
];

const categories = ['All', 'Design', 'Technology', 'Marketing', 'Business'];
const jobTypes = ['All', 'Full Time', 'Part Time', 'Remote', 'Contract'];
const locations = ['All', 'USA', 'UK', 'Europe', 'Remote'];

export default function JobsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedJobType, setSelectedJobType] = useState('All');
  const [selectedLocation, setSelectedLocation] = useState('All');

  // Filter jobs based on selections
  const filteredJobs = allJobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || job.categories.includes(selectedCategory);
    const matchesJobType = selectedJobType === 'All' || job.employmentType === selectedJobType;
    const matchesLocation = selectedLocation === 'All' || job.location.includes(selectedLocation);

    return matchesSearch && matchesCategory && matchesJobType && matchesLocation;
  });

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        
        {/* Page Header */}
        <div className="bg-background-secondary py-12 pt-24">
          <div className="container-custom relative z-10">
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
              className="text-5xl font-bold mb-4"
              style={{ 
                color: '#25324B',
                fontFamily: 'var(--font-family-display)'
              }}
            >
              Find Your <span className="text-primary">Dream</span> Job
            </h1>
            
            <p className="text-lg" style={{ color: '#515B6F' }}>
              Showing {filteredJobs.length} jobs available
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
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('All');
                    setSelectedJobType('All');
                    setSelectedLocation('All');
                  }}
                >
                  Clear All Filters
                </Button>
              </div>
            </aside>

            {/* Jobs Grid */}
            <div className="lg:col-span-3">
              {filteredJobs.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredJobs.map((job) => (
                      <JobCard key={job.id} {...job} />
                    ))}
                  </div>

                  {/* Pagination Placeholder */}
                  <div className="mt-12 flex justify-center">
                    <div className="flex items-center gap-2">
                      <button 
                        className="px-4 py-2 border border-gray-200 hover:border-primary transition-colors"
                        style={{ color: '#515B6F' }}
                      >
                        Previous
                      </button>
                      {[1, 2, 3].map((page) => (
                        <button
                          key={page}
                          className="px-4 py-2 border transition-colors"
                          style={{
                            borderColor: page === 1 ? '#4640DE' : '#E5E7EB',
                            backgroundColor: page === 1 ? '#4640DE' : 'transparent',
                            color: page === 1 ? '#FFFFFF' : '#515B6F',
                          }}
                        >
                          {page}
                        </button>
                      ))}
                      <button 
                        className="px-4 py-2 border border-gray-200 hover:border-primary transition-colors"
                        style={{ color: '#515B6F' }}
                      >
                        Next
                      </button>
                    </div>
                  </div>
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
                  <Button
                    variant="primary"
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedCategory('All');
                      setSelectedJobType('All');
                      setSelectedLocation('All');
                    }}
                  >
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