import Image from 'next/image';
import Link from 'next/link';

type LogoProps = {
  variant?: 'default' | 'alt'; // choose which logo to show
};

export default function Logo({ variant = 'default' }: LogoProps) {
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
      className="flex items-center gap-2 hover:opacity-80 transition-opacity"
    >
      <Image
        src={logos[variant]}
        alt={altTexts[variant]}
        width={32}
        height={32}
        className="min-w-[152px]"
      />
    </Link>
  );
}