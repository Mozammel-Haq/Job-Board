import JobListItem from '@/components/jobs/JobListItem';
import Image from 'next/image';
import Link from 'next/link';

const latestJobs = [
  {
    id: '9',
    title: 'Social Media Assistant',
    company: 'Nomad',
    location: 'Paris, France',
    logo: '/images/companies/nomad.svg',
    employmentType: 'Full-Time',
    categories: ['Marketing', 'Design'],
  },
  {
    id: '10',
    title: 'Social Media Assistant',
    company: 'Netlify',
    location: 'Paris, France',
    logo: '/images/companies/netlify.svg',
    employmentType: 'Full-Time',
    categories: ['Marketing', 'Design'],
  },
  {
    id: '11',
    title: 'Brand Designer',
    company: 'Dropbox',
    location: 'San Fransisco, USA',
    logo: '/images/companies/dropbox.svg',
    employmentType: 'Full-Time',
    categories: ['Design'],
  },
  {
    id: '12',
    title: 'Brand Designer',
    company: 'Maze',
    location: 'San Fransisco, USA',
    logo: '/images/companies/maze.svg',
    employmentType: 'Full-Time',
    categories: ['Marketing', 'Design'],
  },
  {
    id: '13',
    title: 'Interactive Developer',
    company: 'Terraform',
    location: 'Hamburg, Germany',
    logo: '/images/companies/terraform.svg',
    employmentType: 'Full-Time',
    categories: ['Marketing', 'Design'],
  },
  {
    id: '14',
    title: 'Interactive Developer',
    company: 'Udacity',
    location: 'Hamburg, Germany',
    logo: '/images/companies/udacity.svg',
    employmentType: 'Full-Time',
    categories: ['Marketing', 'Design'],
  },
  {
    id: '15',
    title: 'HR Manager',
    company: 'Packer',
    location: 'Lucern, Switzerland',
    logo: '/images/companies/packer.svg',
    employmentType: 'Full-Time',
    categories: ['Marketing', 'Management'],
  },
  {
    id: '16',
    title: 'HR Manager',
    company: 'Webflow',
    location: 'Lucern, Switzerland',
    logo: '/images/companies/webflow.svg',
    employmentType: 'Full-Time',
    categories: ['Marketing', 'Design'],
  },
];

export default function LatestJobs() {
  return (
    <section className="relative py-20 overflow-hidden bg-[#F8F8FD]">

      {/* Pattern Background */}
      <div className="absolute right-0 top-0 w-[60%] h-full pointer-events-none">
        <Image
          src="/images/Pattern.svg"
          alt=""
          fill
          className="object-cover object-right opacity-40"
        />
      </div>

      {/* Top-Left Clip Shape */}
      <div
        className="absolute -top-18 -left-18 w-80 h-80 bg-white"
        style={{
          clipPath: 'polygon(0 0, 100% 0, 0 70%)'
        }}
      />

      {/* Bottom-Right Clip Shape */}
      <div
        className="absolute -bottom-18 -right-18 w-96 h-96 bg-white"
        style={{
          clipPath: 'polygon(100% 30%, 100% 100%, 0 100%)'
        }}
      />

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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {latestJobs.map((job) => (
            <JobListItem key={job.id} {...job} />
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