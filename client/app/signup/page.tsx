'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Logo from '@/components/layout/Logo';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { api } from '@/lib/api';

export default function SignupPage() {
    const router = useRouter();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        agreeToTerms: false,
    });

    const [formErrors, setFormErrors] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));

        if (formErrors[name]) {
            setFormErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validateForm = () => {
        const errors: Record<string, string> = {};

        if (!formData.name.trim()) {
            errors.name = 'Name is required';
        } else if (formData.name.trim().length < 2) {
            errors.name = 'Name must be at least 2 characters';
        }

        if (!formData.email.trim()) {
            errors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            errors.email = 'Please enter a valid email address';
        }

        if (!formData.password) {
            errors.password = 'Password is required';
        } else if (formData.password.length < 8) {
            errors.password = 'Password must be at least 8 characters';
        }

        if (!formData.confirmPassword) {
            errors.confirmPassword = 'Please confirm your password';
        } else if (formData.password !== formData.confirmPassword) {
            errors.confirmPassword = 'Passwords do not match';
        }

        if (!formData.agreeToTerms) {
            errors.agreeToTerms = 'You must agree to the terms and conditions';
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!validateForm()) {
    return;
  }

  setIsSubmitting(true);

  try {
    await api.register({
      name: formData.name,
      email: formData.email,
      password: formData.password,
      password_confirmation: formData.confirmPassword,
    });

    // Redirect to login
    router.push('/login?registered=true');
  } catch (error: any) {
    console.error('Registration error:', error);
    
    if (error.errors) {
      setFormErrors(error.errors);
    } else {
      setFormErrors({ email: error.message || 'Registration failed. Please try again.' });
    }
  } finally {
    setIsSubmitting(false);
  }
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

            {/* Left Illustration */}
            <div
                className="hidden lg:block lg:w-1/2 relative"
                style={{ backgroundColor: '#F8F8FD' }}
            >
                <div className="absolute inset-0 flex items-center justify-center p-12">
                    <div className="relative w-full h-full max-w-2xl">
                        {/* Illustration */}

                        <Image
                            src="/images/reg-illustration-img.png"
                            alt="Signup illustration"
                            fill
                            className="object-contain"
                        />

                    </div>
                </div>
            </div>

            {/* Right Form */}
            <div className="w-full lg:w-[60%] flex items-center justify-center p-8 relative z-10">
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
                            Create Account
                        </h1>

                        <p className="text-lg" style={{ color: '#515B6F' }}>
                            Get started with QuickHire
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-8">

                        {/* Input Group 1 */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                            <Input
                                label="Full Name"
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                placeholder="Your Name"
                                error={formErrors.name}
                            />

                            <Input
                                label="Email Address"
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder="you@example.com"
                                error={formErrors.email}
                            />

                        </div>

                        {/* Input Group 2 */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                            <Input
                                label="Password"
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                placeholder="Minimum 8 characters"
                                error={formErrors.password}
                            />

                            <Input
                                label="Confirm Password"
                                type="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleInputChange}
                                placeholder="Re-enter your password"
                                error={formErrors.confirmPassword}
                            />

                        </div>

                        {/* Terms */}
                        <div>
                            <label className="flex items-start cursor-pointer group">
                                <input
                                    type="checkbox"
                                    name="agreeToTerms"
                                    checked={formData.agreeToTerms}
                                    onChange={handleInputChange}
                                    className="w-4 h-4 mt-1 accent-primary cursor-pointer flex-shrink-0"
                                />

                                <span
                                    className="ml-3 text-base group-hover:text-primary transition-colors"
                                    style={{ color: '#515B6F' }}
                                >
                                    I agree to the{' '}
                                    <Link
                                        href="/terms"
                                        className="font-semibold"
                                        style={{ color: '#4640DE' }}
                                    >
                                        Terms & Conditions
                                    </Link>{' '}
                                    and{' '}
                                    <Link
                                        href="/privacy"
                                        className="font-semibold"
                                        style={{ color: '#4640DE' }}
                                    >
                                        Privacy Policy
                                    </Link>
                                </span>
                            </label>

                            {formErrors.agreeToTerms && (
                                <p className="mt-1 text-sm text-red-500">
                                    {formErrors.agreeToTerms}
                                </p>
                            )}
                        </div>

                        <Button
                            type="submit"
                            variant="primary"
                            size="lg"
                            fullWidth
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Creating account...' : 'Create Account'}
                        </Button>

                    </form>
                </div>
            </div>
        </div>
    );
}