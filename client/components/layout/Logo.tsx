import Image from 'next/image';
import Link from 'next/link';

type LogoProps = {
  variant?: 'default' | 'alt'; // choose which logo to show
  collapsed?: boolean;
};

export default function Logo({ variant = 'default', collapsed = false }: LogoProps) {
  // Define logo sources based on variant
  const logos = {
    default: '/images/logo.svg',
    alt: '/images/logo-alt.svg', 
  };

  const altTexts = {
    default: 'QuickHire Logo',
    alt: 'QuickHire Alternative Logo',
  };

  return (
    <Link
      href="/"
      className={`flex items-center gap-2 hover:opacity-80 transition-opacity ${collapsed ? 'justify-center' : ''}`}
    >
      <div className={`relative ${collapsed ? 'w-7 h-10 overflow-hidden' : 'w-[152px] h-8'}`}>
        <Image
          src={logos[variant]}
          alt={altTexts[variant]}
          width={152}
          height={32}
          className={`transition-all duration-300 ${collapsed ? 'max-w-none -translate-x-1' : ''}`}
          style={{ 
            objectFit: 'contain',
            objectPosition: 'left'
          }}
        />
      </div>
    </Link>
  );
}
