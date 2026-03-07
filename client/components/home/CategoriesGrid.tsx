'use client';

import { useState, useEffect } from 'react';
import CategoryCard from './CategoryCard';
import Link from 'next/link';
import { api } from '@/lib/api';

const categoryIcons: Record<string, string> = {
  'Design': '/images/categories/design.svg',
  'Sales': '/images/categories/sales.svg',
  'Marketing': '/images/categories/marketing.svg',
  'Finance': '/images/categories/finance.svg',
  'Technology': '/images/categories/technology.svg',
  'Engineering': '/images/categories/engineering.svg',
  'Business': '/images/categories/business.svg',
  'Human Resource': '/images/categories/human-resource.svg',
};

const defaultIcon = '/images/categories/design.svg';

export default function CategoriesGrid() {
  const [dynamicCategories, setDynamicCategories] = useState<{ title: string; count: number; icon: string; featured: boolean }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const filters = await api.getJobFilters();
        const mapped = filters.categories.map((cat, index) => ({
          title: cat.name,
          count: cat.count,
          icon: categoryIcons[cat.name] || defaultIcon,
          featured: cat.name === 'Marketing' // logic for featured if needed
        }));
        setDynamicCategories(mapped);
      } catch (error) {
        console.error('Failed to fetch category counts:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCounts();
  }, []);
  return (
    <section id='categories' className="py-20" style={{ backgroundColor: '#F8F8FD' }}>
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
          {loading ? (
            Array(8).fill(0).map((_, i) => (
              <div key={i} className="h-40 bg-gray-100 animate-pulse rounded-lg"></div>
            ))
          ) : dynamicCategories.length > 0 ? (
            dynamicCategories.map((category) => (
              <CategoryCard
                key={category.title}
                icon={category.icon}
                title={category.title}
                jobCount={category.count}
                featured={category.featured}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-10 text-gray-400 italic">No categories available</div>
          )}
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