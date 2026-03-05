import Image from 'next/image'
import Link from 'next/link'

interface CategoryCardProps {
  icon: string
  title: string
  jobCount: number
  featured?: boolean
}

export default function CategoryCard({
  icon,
  title,
  jobCount,
  featured = false
}: CategoryCardProps) {

  return (
    <Link
      href={`/jobs?category=${title.toLowerCase()}`}
      className={`
        flex items-center justify-between
        lg:flex-col lg:items-start lg:justify-start
        p-8 border transition-all duration-300 group
        ${featured
          ? 'border-transparent'
          : 'bg-white border-gray-200 hover:border-primary hover:shadow-lg'}
      `}
      style={{
        backgroundColor: featured ? '#4640DE' : '#FFFFFF'
      }}
    >

      {/* Icon */}
      <div
        className="w-12 h-12 flex items-center justify-center lg:mb-6"
        style={{ filter: featured ? 'brightness(0) invert(1)' : 'none' }}
      >
        <Image src={icon} alt={title} width={48} height={48} />
      </div>

      {/* Content */}
      <div className="flex-1 lg:w-full ml-10 lg:ml-0">

        <h3
          className="text-xl font-semibold mb-2"
          style={{ color: featured ? '#fff' : '#25324B' }}
        >
          {title}
        </h3>

        {/* Bottom row */}
        <div className="flex items-center justify-between">

          <span
            className="text-base"
            style={{ color: featured ? '#fff' : '#7C8493' }}
          >
            {jobCount} jobs available
          </span>

          <svg
            className="w-5 h-5 transition-transform group-hover:translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            style={{ color: featured ? '#fff' : '#25324B' }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>

        </div>

      </div>

    </Link>
  )
}