import Image from 'next/image';
import Link from 'next/link';
import Badge from '@/components/ui/Badge';

interface JobCardProps {
  id: string;
  title: string;
  company: string;
  location: string;
  logo: string;
  description: string;
  employmentType: string;
  categories: string[];
}

export default function JobCard({
  id,
  title,
  company,
  location,
  logo,
  description,
  employmentType,
  categories,
}: JobCardProps) {
  return (
    <Link href={`/jobs/${id}`}>
      <div className="bg-white border border-gray-300 p-6 h-full transition-all duration-300 hover:shadow-lg hover:border-primary group">
        
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          {/* Logo */}
          <div className="w-12 h-12 relative flex-shrink-0">
            <Image
              src={logo}
              alt={`${company} logo`}
              fill
              className="object-contain"
            />
          </div>

          {/* Employment Type Badge */}
          <span
            className="px-3 py-1 text-sm font-medium border"
            style={{
              color: '#4640DE',
              borderColor: '#4640DE',
            }}
          >
            {employmentType}
          </span>
        </div>

        {/* Content */}
        <div className="space-y-3">
          {/* Job Title */}
          <h3
            className="text-xl font-semibold group-hover:text-primary transition-colors"
            style={{ 
              color: '#25324B',
              fontFamily: 'var(--font-family-display)'
            }}
          >
            {title}
          </h3>

          {/* Company & Location */}
          <p className="text-base" style={{ color: '#515B6F' }}>
            {company} <span className="mx-2">•</span> {location}
          </p>

          {/* Description */}
          <p
            className="text-base line-clamp-2"
            style={{ color: '#515B6F' }}
          >
            {description}
          </p>

          {/* Category Badges */}
          <div className="flex flex-wrap gap-2 pt-2">
            {categories.map((category, index) => (
              <span
                key={index}
                className="px-3 py-1 text-sm font-medium rounded-2xl"
                style={{
                  backgroundColor: getCategoryColor(category).bg,
                  color: getCategoryColor(category).text,
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

// Helper function for category colors
function getCategoryColor(category: string) {
  const colors: Record<string, { bg: string; text: string }> = {
    Marketing: { bg: 'rgba(255, 184, 54, 0.20)', text: 'rgba(255, 184, 54, 1)' },
    Design: { bg: 'rgba(86, 205, 173, 0.20)', text: 'rgba(86, 205, 173, 1)' },
    Business: { bg: 'rgba(70, 64, 222, 0.20)', text: 'rgba(70, 64, 222, 1)' },
    Technology: { bg: 'rgba(255, 101, 80, 0.20)', text: 'rgba(255, 101, 80, 1)' },
    Developer: { bg: 'rgba(70, 64, 222, 0.20)', text: 'rgba(70, 64, 222, 1)' },
    Management: { bg: 'rgba(86, 205, 173, 0.20)', text: 'rgba(86, 205, 173, 1)' },
  };

  return colors[category] || { bg: 'rgba(0,0,0,0.1)', text: 'rgba(0,0,0,0.8)' };
}