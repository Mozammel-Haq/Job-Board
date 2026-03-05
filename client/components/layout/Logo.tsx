import Image from 'next/image';
import Link from 'next/link';

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
      <Image 
        src="/images/logo.svg" 
        alt="QuickHire Logo" 
        width={32} 
        height={32}
        className="min-w-[152px]"
      />
    </Link>
  );
}