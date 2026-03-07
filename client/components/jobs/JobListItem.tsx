import Image from 'next/image';
import Link from 'next/link';
import { api } from '@/lib/api';

interface JobListItemProps {
  id: string;
  title: string;
  company: string;
  location: string;
  logo: string;
  employmentType: string;
  categories: string[];
}

export default function JobListItem({
  id,
  title,
  company,
  location,
  logo,
  employmentType,
  categories,
}: JobListItemProps) {
  return (
    <Link href={`/jobs/${id}`}>
      <div className="flex items-start gap-4 p-6 bg-white border border-gray-100 hover:border-primary hover:shadow-md transition-all duration-300 group">

        {/* Company Logo */}
        <div className="w-16 h-16 flex-shrink-0 relative">
          <Image
            src={api.getStorageUrl(logo)}
            alt={`${company} logo`}
            fill
            className="object-contain"
          />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Job Title */}
          <h3
            className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors"
            style={{
              color: '#25324B',
              fontFamily: 'var(--font-family-display)',
            }}
          >
            {title}
          </h3>

          {/* Company & Location */}
          <p className="text-base mb-3" style={{ color: '#515B6F' }}>
            {company} <span className="mx-2">•</span> {location}
          </p>

          {/* Badges */}
          <div className="flex flex-wrap gap-2">
            <span
              className="px-3 py-1 text-sm font-medium rounded-2xl"
              style={{
                backgroundColor: 'rgba(86, 205, 173, 0.18)',
                color: 'rgba(86, 205, 173, 1)',
              }}
            >
              {employmentType}
            </span>
            {categories.map((category, index) => (
              <span
                key={index}
                className="px-3 py-1 text-sm font-medium rounded-2xl border"
                style={{
                  borderColor: getCategoryBorderColor(category),
                  color: getCategoryTextColor(category),
                }}
              >
                {category}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}

function getCategoryBorderColor(category: string) {
  const colors: Record<string, string> = {
    Marketing: 'rgba(255, 184, 54, 0.55)',
    Design: 'rgba(70, 64, 222, 0.55)',
    Developer: 'rgba(70, 64, 222, 0.55)',
    Management: 'rgba(86, 205, 173, 0.55)',
  };

  return colors[category] || 'rgba(70, 64, 222, 0.55)';
}

function getCategoryTextColor(category: string) {
  const colors: Record<string, string> = {
    Marketing: 'rgba(255, 184, 54, 1)',
    Design: 'rgba(70, 64, 222, 1)',
    Developer: 'rgba(70, 64, 222, 1)',
    Management: 'rgba(86, 205, 173, 1)',
  };

  return colors[category] || 'rgba(70, 64, 222, 1)';
}