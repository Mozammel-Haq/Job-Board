'use client';

import { useState, useEffect } from 'react';
import Logo from './Logo';
import Button from '@/components/ui/Button';
import Link from 'next/link';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // change header background when user scrolls down
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`${scrolled ? 'bg-white shadow-md' : 'md:bg-transparent bg-white'} fixed top-0 z-50 w-full`}> 
      <nav className="container-custom">
        <div className="flex items-center justify-between h-20">
          
          <div className="flex gap-20 items-center">
                      {/* Logo */}
          <Logo />

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link 
              href="/jobs" 
              className="font-medium transition-colors hover:text-primary"
              style={{ color: '#515B6F' }}
            >
              Find Jobs
            </Link>
            <Link 
              href="/companies" 
              className="font-medium transition-colors hover:text-primary"
              style={{ color: '#515B6F' }}
            >
              Browse Companies
            </Link>
          </div>
          </div>


          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Button variant="ghost" size="sm">
              Login
            </Button>
            <Button variant="primary" size="sm">
              Sign Up
            </Button>
          </div>

          {/* Mobile Menu Button */}
<button
  className="md:hidden p-2 w-[48px] h-[48px] flex items-center justify-center rounded-full border border-[#D6DDEB] transition-colors"
  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
  aria-label="Toggle menu"
>
  <svg
    width="20"
    height="14"
    viewBox="0 0 20 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {mobileMenuOpen ? (
      // X (Close) Icon
      <>
        <path
          d="M2 2L15 14"
          stroke="#25324B"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M15 2L2 14"
          stroke="#25324B"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </>
    ) : (
      // Hamburger Icon with different line widths
      <>
        <line
          x1="1"
          y1="2"
          x2="19"
          y2="2"
          stroke="#25324B"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <line
          x1="1"
          y1="7"
          x2="14"
          y2="7"
          stroke="#25324B"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <line
          x1="1"
          y1="12"
          x2="10"
          y2="12"
          stroke="#25324B"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </>
    )}
  </svg>
</button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-gray-100 bg-[#F8F8FD]">
  <div className="flex flex-col gap-2 items-center">
    <Link
      href="#jobs"
      className="font-medium py-2 transition-colors hover:text-primary text-center"
      style={{ color: '#515B6F' }}
      onClick={() => setMobileMenuOpen(false)}
    >
      Find Jobs
    </Link>
    <Link
      href="#companies"
      className="font-medium transition-colors hover:text-primary text-center"
      style={{ color: '#515B6F' }}
      onClick={() => setMobileMenuOpen(false)}
    >
      Browse Companies
    </Link>

    <div className="flex flex-col gap-3 pt-4 border-t border-gray-100">
      <Button variant="ghost" size="md" fullWidth>
        Login
      </Button>
      <Button variant="primary" size="md" fullWidth>
        Sign Up
      </Button>
    </div>
  </div>
</div>
        )}
      </nav>
    </header>
  );
}