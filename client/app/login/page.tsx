'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Logo from '@/components/layout/Logo';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};

    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      localStorage.setItem('auth_token', 'mock-token-12345');
      localStorage.setItem(
        'user',
        JSON.stringify({
          name: 'Admin User',
          email: formData.email,
        })
      );

      setIsSubmitting(false);
      router.push('/admin');
    }, 1500);
  };

  return (
    <div className="min-h-screen flex relative overflow-hidden">
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <Image
          src="/images/Pattern.svg"
          alt=""
          fill
          className="object-cover"
        />
      </div>

      {/* Left Side */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 relative z-10">
        <div className="w-full max-w-md">

          {/* Logo */}
          <div className="mb-8">
            <Logo />
          </div>

          {/* Header */}
          <div className="mb-8">
            <h1
              className="text-4xl font-bold mb-3"
              style={{
                color: '#25324B',
                fontFamily: 'var(--font-family-display)',
              }}
            >
              Welcome Back
            </h1>

            <p className="text-lg" style={{ color: '#515B6F' }}>
              Sign in to access your dashboard
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">

            <Input
              label="Email Address"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="you@example.com"
              error={formErrors.email}
            />

            <Input
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Enter your password"
              error={formErrors.password}
            />

            {/* Remember / Forgot */}
            <div className="flex items-center justify-between">

              <label className="flex items-center cursor-pointer group">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleInputChange}
                  className="w-4 h-4 accent-primary cursor-pointer"
                />

                <span
                  className="ml-2 text-base group-hover:text-primary transition-colors"
                  style={{ color: '#515B6F' }}
                >
                  Remember me
                </span>
              </label>

              <Link
                href="/forgot-password"
                className="text-base font-semibold transition-colors hover:opacity-80"
                style={{ color: '#4640DE' }}
              >
                Forgot password?
              </Link>

            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Signing in...' : 'Sign In'}
            </Button>

          </form>

          {/* Divider */}
          <div className="my-8 flex items-center">
            <div className="flex-1 border-t border-gray-200"></div>
            <span className="px-4 text-sm" style={{ color: '#7C8493' }}>
              OR
            </span>
            <div className="flex-1 border-t border-gray-200"></div>
          </div>

          {/* Google Login */}
          <div className="space-y-3 mb-8">

            <button
              type="button"
              className="w-full px-6 py-3 border border-gray-200 flex items-center justify-center gap-3 transition-all hover:border-primary hover:bg-background-secondary"
            >

              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>

              <span className="font-semibold cursor-pointer" style={{ color: '#25324B' }}>
                Sign in with Google
              </span>

            </button>

          </div>

          {/* Sign Up */}
          <p className="text-center text-base" style={{ color: '#515B6F' }}>
            Don&apos;t have an account?{' '}
            <Link
              href="/signup"
              className="font-semibold transition-colors hover:opacity-80"
              style={{ color: '#4640DE' }}
            >
              Sign Up
            </Link>
          </p>

        </div>
      </div>

      {/* Right Illustration */}
      <div
        className="hidden lg:block lg:w-1/2 relative"
        style={{ backgroundColor: '#F8F8FD' }}
      >
                <div className="absolute inset-0 flex items-center justify-center p-12">
                  <div className="relative w-full h-full max-w-2xl">
                    {/* Illustration */}
                    
                    <Image
                      src="/images/login-illustration-img.png"
                      alt="Login illustration"
                      fill
                      className="object-contain"
                    />
                   
                  </div>
                </div>
      </div>

    </div>
  );
}