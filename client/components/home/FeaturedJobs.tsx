'use client';

import { useRef } from 'react';
import JobCard from '@/components/jobs/JobCard';
import Link from 'next/link';
import { useSwipeable } from 'react-swipeable';

const featuredJobs = [
  {
    id: '1',
    title: 'Email Marketing',
    company: 'Revolut',
    location: 'Madrid, Spain',
    logo: '/images/companies/revolut.svg',
    description: 'Revolut is looking for Email Marketing to help team ma...',
    employmentType: 'Full Time',
    categories: ['Marketing', 'Design'],
  },
  {
    id: '2',
    title: 'Brand Designer',
    company: 'Dropbox',
    location: 'San Fransisco, US',
    logo: '/images/companies/dropbox.svg',
    description: 'Dropbox is looking for Brand Designer to help the team t...',
    employmentType: 'Full Time',
    categories: ['Design', 'Business'],
  },
  {
    id: '3',
    title: 'Email Marketing',
    company: 'Pitch',
    location: 'Berlin, Germany',
    logo: '/images/companies/pitch.svg',
    description: 'Pitch is looking for Customer Manager to join marketing t...',
    employmentType: 'Full Time',
    categories: ['Marketing'],
  },
  {
    id: '4',
    title: 'Visual Designer',
    company: 'Blinkist',
    location: 'Granada, Spain',
    logo: '/images/companies/blinkist.svg',
    description: 'Blinkist is looking for Visual Designer to help team desi...',
    employmentType: 'Full Time',
    categories: ['Design'],
  },
  {
    id: '5',
    title: 'Product Designer',
    company: 'ClassPass',
    location: 'Manchester, UK',
    logo: '/images/companies/classpass.svg',
    description: 'ClassPass is looking for Product Designer to help us...',
    employmentType: 'Full Time',
    categories: ['Marketing', 'Design'],
  },
  {
    id: '6',
    title: 'Lead Designer',
    company: 'Canva',
    location: 'Ontario, Canada',
    logo: '/images/companies/canva.svg',
    description: 'Canva is looking for Lead Engineer to help develop n...',
    employmentType: 'Full Time',
    categories: ['Design', 'Business'],
  },
  {
    id: '7',
    title: 'Brand Strategist',
    company: 'GoDaddy',
    location: 'Marseille, France',
    logo: '/images/companies/godaddy.svg',
    description: 'GoDaddy is looking for Brand Strategist to join the team...',
    employmentType: 'Full Time',
    categories: ['Marketing'],
  },
  {
    id: '8',
    title: 'Data Analyst',
    company: 'Twitter',
    location: 'San Diego, US',
    logo: '/images/companies/twitter.svg',
    description: 'Twitter is looking for Data Analyst to help team desi...',
    employmentType: 'Full Time',
    categories: ['Technology'],
  },
];

export default function FeaturedJobs() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Swipe handlers for mobile
  const handlers = useSwipeable({
    onSwipedLeft: () => snapScroll(1),
    onSwipedRight: () => snapScroll(-1),
    trackMouse: true,
    trackTouch: true,
  });

  // Function to scroll to next/previous card
  const snapScroll = (direction: 1 | -1) => {
    if (!scrollContainerRef.current) return;

    const container = scrollContainerRef.current;
    const cardWidth = container.firstElementChild?.clientWidth || 0;
    const scrollLeft = container.scrollLeft;

    // calculate next snap position
    const nextIndex = Math.round(scrollLeft / cardWidth) + direction;
    const maxIndex = container.children.length - 1;
    const targetIndex = Math.max(0, Math.min(nextIndex, maxIndex));

    container.scrollTo({
      left: targetIndex * cardWidth,
      behavior: 'smooth',
    });
  };

  return (
    <section id='jobs' className="py-20 bg-white">
      <div className="container-custom">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-12">
          <h2
            className="text-4xl md:text-5xl font-bold"
            style={{ color: '#25324B', fontFamily: 'var(--font-family-display)' }}
          >
            Featured <span style={{ color: '#26A4FF' }}>jobs</span>
          </h2>

          <Link
            href="/jobs"
            className="hidden md:flex items-center gap-2 font-semibold transition-colors hover:text-primary"
            style={{ color: '#4640DE' }}
          >
            Show all jobs
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {featuredJobs.map((job) => (
            <JobCard key={job.id} {...job} />
          ))}
        </div>

        {/* Mobile Slider */}
        <div className="md:hidden">
          <div
            {...handlers} // enable swipe gestures
            ref={scrollContainerRef}
            className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide scroll-smooth"
            style={{ scrollbarWidth: 'none' }}
          >
            {featuredJobs.map((job) => (
              <div key={job.id} className="min-w-[85%] snap-start">
                <JobCard {...job} />
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
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
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