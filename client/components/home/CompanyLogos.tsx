import Image from 'next/image';

const companies = [
  { name: 'Vodafone', logo: '/images/companies/vodafone.svg' },
  { name: 'Intel', logo: '/images/companies/intel.svg' },
  { name: 'Tesla', logo: '/images/companies/tesla.svg' },
  { name: 'AMD', logo: '/images/companies/amd.svg' },
  { name: 'Talkit', logo: '/images/companies/talkit.svg' },
];

export default function CompanyLogos() {
  return (
    <section className="py-12 pb-16 bg-white">
      <div className="container-custom">
        
        {/* Heading */}
        <h2 
          className="text-lg font-normal mb-10  text-[var(--c-text-dark)]"
        >
          Companies we helped grow
        </h2>

        {/* Logos Grid */}
        <div className="flex flex-wrap lg:justify-between justify-center  gap-x-12 gap-y-8 md:gap-x-16 w-full">
          {companies.map((company) => (
            <div
              key={company.name}
              className="relative h-8 w-28 md:w-32 text-[var(--c-text-dark)] transition-all duration-300 opacity-70 hover:opacity-100"
            >
              <Image
                src={company.logo}
                alt={`${company.name} logo`}
                fill
                className="object-contain w-full h-full"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}