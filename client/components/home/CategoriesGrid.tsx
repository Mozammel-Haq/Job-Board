import CategoryCard from './CategoryCard';
import Link from 'next/link';

const categories = [
  { icon: '/images/categories/design.svg', title: 'Design', jobCount: 235, featured: false },
  { icon: '/images/categories/sales.svg', title: 'Sales', jobCount: 756, featured: false },
  { icon: '/images/categories/marketing.svg', title: 'Marketing', jobCount: 140, featured: true },
  { icon: '/images/categories/finance.svg', title: 'Finance', jobCount: 325, featured: false },
  { icon: '/images/categories/technology.svg', title: 'Technology', jobCount: 436, featured: false },
  { icon: '/images/categories/engineering.svg', title: 'Engineering', jobCount: 542, featured: false },
  { icon: '/images/categories/business.svg', title: 'Business', jobCount: 211, featured: false },
  { icon: '/images/categories/human-resource.svg', title: 'Human Resource', jobCount: 346, featured: false },
];

export default function CategoriesGrid() {
  return (
    <section className="py-20" style={{ backgroundColor: '#F8F8FD' }}>
      <div className="container-custom">
        
        {/* Section Header */}
        <div className="flex items-center justify-between mb-16">
          <h2 
            className="text-4xl md:text-5xl font-bold"
            style={{ 
              color: '#25324B',
              fontFamily: 'var(--font-family-display)'
            }}
          >
            Explore by{' '}
            <span style={{ color: '#26A4FF' }}>category</span>
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

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {categories.map((category) => (
            <CategoryCard
              key={category.title}
              icon={category.icon}
              title={category.title}
              jobCount={category.jobCount}
              featured={category.featured}
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