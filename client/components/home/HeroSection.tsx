'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';

export default function HeroSection() {
  const router = useRouter();
  const [jobTitle, setJobTitle] = useState('');
  const [location, setLocation] = useState('');

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (jobTitle) params.set('search', jobTitle);
    if (location) params.set('location', location);
    router.push(`/jobs?${params.toString()}`);
  };

  return (
    <section className="relative lg:max-h-[calc(100vh-0.25rem)] overflow-hidden bg-[#F8F8FD] lg:pt-0 pt-10">

      {/* Background Pattern - Extends further left */}
      <div className="absolute right-0 lg:top-0 md:top-20 top-80 w-[65%] h-full">
        <Image
          src="/images/Pattern.svg"
          alt=""
          fill
          className="object-cover object-right"
          priority
        />
      </div>

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center py-16 lg:py-24">

          {/* Left Content */}
          <div className="space-y-8 relative z-20 lg:mb-10 w-full">

            {/* Heading */}
            <div>
              <h1
                className="font-display font-bold leading-tight mb-6"
                style={{
                  fontSize: 'clamp(3rem, 5vw, 4.5rem)',
                  color: '#25324B',
                  lineHeight: '1.1'
                }}
              >
                Discover
                <br />
                more than
                <br />
                <span className="relative inline-block" style={{ color: '#26A4FF' }}>
                  5000+ Jobs
                  <Image
                    src="/images/divider.svg"
                    alt=""
                    width={400}
                    height={20}
                    className="absolute -bottom-12 left-0 w-full"
                  />
                </span>
              </h1>

              <p
                className="text-lg leading-relaxed max-w-md mt-16"
                style={{ color: '#515B6F' }}
              >
                Great platform for the job seeker that searching for new career heights and passionate about startups.
              </p>
            </div>

            {/* Search Bar */}
            <div className="bg-white shadow-lg lg:shadow-lg p-2.5 flex flex-col sm:flex-row gap-4 items-stretch overflow-visible relative z-50 lg:absolute lg:top-[385px] lg:left-0 lg:w-[840px]">

              {/* Job Title Input */}
              <div className="flex-1 flex items-center gap-3 px-4 py-3 mb-0">
                <svg
                  className="w-5 h-5 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  style={{ color: '#515B6F' }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <input
                  type="text"
                  placeholder="Job title or keyword"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  className="flex-1 outline-none text-base pb-2 border-b-2 border-gray-200"
                  style={{ color: '#25324B' }}
                />
              </div>

              {/* Location Input */}
              <div className="flex-1 flex items-center gap-3 p-4">
                <svg
                  className="w-5 h-5 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  style={{ color: '#515B6F' }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <input
                  type="text"
                  placeholder="Florence, Italy"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="flex-1 outline-none text-base pb-2 border-b-2 border-gray-200"
                  style={{ color: '#25324B' }}
                />
              </div>

              {/* Search Button */}
              <Button
                variant="primary"
                className="whitespace-nowrap px-8 w-full sm:w-auto self-center"
                size="md"
                onClick={handleSearch}
              >
                Search my job
              </Button>
            </div>

            <div className="flex flex-wrap items-center gap-3 mt-6 lg:mt-32">
              <span className="font-medium text-[var(--c-text-dark)]">
                Popular :
              </span>

              <div className="flex flex-wrap gap-2 text-sm font-medium text-[var(--c-text-dark)]">
                {['UI Designer', 'UX Researcher', 'Android', 'Admin'].map((keyword, index, array) => (
                  <button
                    key={keyword}
                    onClick={() => {
                      const params = new URLSearchParams();
                      params.set('search', keyword);
                      router.push(`/jobs?${params.toString()}`);
                    }}
                    className="hover:text-primary transition-colors pr-1"
                  >
                    {keyword}{index < array.length - 1 ? ',' : ''}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Content - Hero Person Image */}
          <div className="relative w-full h-[400px] lg:h-[640px] hidden lg:block">
            <Image
              src="/images/hero-person.png"
              alt="Professional pointing"
              fill
              className="object-contain object-bottom"
              priority
            />
            {/* Angled White Rectangle */}
            <div
              className="absolute bg-white"
              style={{
                width: '285px',
                height: '718px',
                bottom: '-62%',
                left: '80%',
                transform: 'rotate(64deg)',
                zIndex: 5,
              }}
            ></div>
          </div>

        </div>
      </div>
    </section>
  );
}