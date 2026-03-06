'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import JobCard from '@/components/jobs/JobCard';

// Sample job data (will come from API later)
const jobsData: Record<string, any> = {
  '1': {
    id: '1',
    title: 'Senior Frontend Developer',
    company: 'Google',
    location: 'San Francisco, USA',
    logo: '/images/companies/dropbox.svg',
    employmentType: 'Full Time',
    salary: '$120k - $150k/year',
    categories: ['Technology', 'Design'],
    postedDate: '2 days ago',
    description: `We are looking for a talented Senior Frontend Developer to join our growing team. You will be responsible for building the next generation of our web applications using modern technologies and best practices.

In this role, you will work closely with designers, product managers, and other engineers to create exceptional user experiences. You'll have the opportunity to work on challenging problems and see your work impact millions of users worldwide.`,
    responsibilities: [
      'Build responsive and performant web applications using React, Next.js, and TypeScript',
      'Collaborate with design team to implement pixel-perfect UIs',
      'Write clean, maintainable, and well-tested code',
      'Participate in code reviews and mentor junior developers',
      'Optimize applications for maximum speed and scalability',
      'Stay up-to-date with emerging technologies and industry trends',
    ],
    requirements: [
      '5+ years of experience in frontend development',
      'Expert knowledge of React, TypeScript, and modern JavaScript',
      'Experience with Next.js, Tailwind CSS, and component libraries',
      'Strong understanding of web performance optimization',
      'Excellent problem-solving and communication skills',
      'Experience with version control (Git) and CI/CD pipelines',
      'Bachelor\'s degree in Computer Science or equivalent experience',
    ],
    benefits: [
      'Competitive salary and equity package',
      'Health, dental, and vision insurance',
      'Flexible work schedule and remote options',
      '401(k) matching and retirement planning',
      'Professional development budget',
      'Unlimited PTO and paid parental leave',
      'Modern office with free meals and snacks',
    ],
  },
  '2': {
    id: '2',
    title: 'Product Designer',
    company: 'Facebook',
    location: 'New York, USA',
    logo: '/images/companies/revolut.svg',
    employmentType: 'Full Time',
    salary: '$100k - $130k/year',
    categories: ['Design', 'Business'],
    postedDate: '5 days ago',
    description: 'Join our design team to create beautiful and intuitive products used by millions.',
    responsibilities: [
      'Design user interfaces and experiences for web and mobile',
      'Create wireframes, prototypes, and high-fidelity mockups',
      'Collaborate with product and engineering teams',
      'Conduct user research and usability testing',
    ],
    requirements: [
      '3+ years of product design experience',
      'Proficiency in Figma, Sketch, or similar tools',
      'Strong portfolio demonstrating design skills',
      'Understanding of design systems and component libraries',
    ],
    benefits: [
      'Competitive compensation',
      'Health insurance',
      'Remote work options',
      'Learning and development budget',
    ],
  },
  // Add more jobs as needed
};

const relatedJobs = [
  {
    id: '3',
    title: 'Backend Engineer',
    company: 'Amazon',
    location: 'Seattle, USA',
    logo: '/images/companies/pitch.svg',
    description: 'Build scalable backend systems that power our global platform.',
    employmentType: 'Full Time',
    categories: ['Technology'],
  },
  {
    id: '4',
    title: 'UX Designer',
    company: 'Spotify',
    location: 'Remote',
    logo: '/images/companies/blinkist.svg',
    description: 'Create amazing user experiences for our music platform.',
    employmentType: 'Remote',
    categories: ['Design'],
  },
  {
    id: '5',
    title: 'Full Stack Developer',
    company: 'Netflix',
    location: 'Los Angeles, USA',
    logo: '/images/companies/canva.svg',
    description: 'Work on exciting projects using cutting-edge technologies.',
    employmentType: 'Full Time',
    categories: ['Technology'],
  },
];

export default function JobDetailPage() {
  const params = useParams();
  const router = useRouter();
  const jobId = params.id as string;
  const job = jobsData[jobId];

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    resumeUrl: '',
    coverNote: '',
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

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
                The job you are looking for does not exist or has been removed.
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
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

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      // Reset form
      setFormData({
        name: '',
        email: '',
        resumeUrl: '',
        coverNote: '',
      });
    }, 1500);
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        

        <div className="container-custom py-12 pt-18">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* Job Header */}
              <div className="border border-gray-100 p-8">
                <div className="flex items-start gap-6 mb-6">
                  <div className="w-20 h-20 relative flex-shrink-0">
                    <Image
                      src={job.logo}
                      alt={`${job.company} logo`}
                      fill
                      className="object-contain"
                    />
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
                        {job.postedDate}
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
                        {job.employmentType}
                      </span>
                      {job.categories.map((category: string, index: number) => (
                        <span
                          key={index}
                          className="px-3 py-1 text-sm font-medium"
                          style={{
                            backgroundColor: index === 0 ? '#FFB836' : '#56CDAD',
                            color: '#FFFFFF',
                          }}
                        >
                          {category}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-100">
                  <p className="text-2xl font-bold" style={{ color: '#25324B' }}>
                    {job.salary}
                  </p>
                </div>
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

              {/* Requirements */}
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

              {/* Benefits */}
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

              {/* Application Form */}
              <div className="border border-gray-100 p-8">
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
                    {job.company} is a leading technology company committed to innovation and excellence.
                  </p>
                  <Button variant="outline" fullWidth>
                    View Company Profile
                  </Button>
                </div>

                {/* Related Jobs */}
                <div>
                  <h3 className="text-xl font-bold mb-4" style={{ color: '#25324B' }}>
                    Related Jobs
                  </h3>
                  <div className="space-y-4">
                    {relatedJobs.map((relatedJob) => (
                      <JobCard key={relatedJob.id} {...relatedJob} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}