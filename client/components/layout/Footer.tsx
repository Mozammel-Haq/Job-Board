import Link from 'next/link';
import Logo from './Logo';

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#202430' }}>
      <div className="container-custom py-16">
        
        {/* Desktop Layout: 4 columns */}
        <div className="hidden lg:grid lg:grid-cols-4 gap-12 mb-12">
          
          {/* Brand Column */}
          <div>
            <div className="mb-6">
              <Logo variant='alt'/>
            </div>
            <p className="text-base leading-relaxed" style={{ color: '#D6DDEB' }}>
              Great platform for the job seeker that passionate about startups. Find your dream job easier.
            </p>
          </div>

          {/* About Column */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6">
              About
            </h3>
            <ul className="space-y-4">
              {['Companies', 'Pricing', 'Terms', 'Advice', 'Privacy Policy'].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="text-base transition-colors hover:text-white"
                    style={{ color: '#D6DDEB' }}
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Column */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6">
              Resources
            </h3>
            <ul className="space-y-4">
              {['Help Docs', 'Guide', 'Updates', 'Contact Us'].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="text-base transition-colors hover:text-white"
                    style={{ color: '#D6DDEB' }}
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Column */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Get job notifications
            </h3>
            <p className="text-base mb-6" style={{ color: '#D6DDEB' }}>
              The latest job news, articles, sent to your inbox weekly.
            </p>
            
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Email Address"
                className="flex-1 px-4 py-3 text-base bg-white focus:outline-none focus:ring-2 focus:ring-primary"
                style={{ color: '#25324B' }}
              />
              <button
                className="px-6 py-3 text-base font-bold text-white transition-all hover:opacity-90 whitespace-nowrap"
                style={{ backgroundColor: '#4640DE' }}
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Layout: Stacked sections */}
        <div className="lg:hidden space-y-12 mb-12">
          
          {/* Brand Section */}
          <div>
            <div className="mb-6">
              <Logo variant='alt'/>
            </div>
            <p className="text-base leading-relaxed" style={{ color: '#D6DDEB' }}>
              Great platform for the job seeker that passionate about startups. Find your dream job easier.
            </p>
          </div>

          {/* About + Resources: 2 columns */}
          <div className="grid grid-cols-2 gap-8">
            
            {/* About Column */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-6">
                About
              </h3>
              <ul className="space-y-4">
                {['Companies', 'Pricing', 'Terms', 'Advice', 'Privacy Policy'].map((item) => (
                  <li key={item}>
                    <Link
                      href="#"
                      className="text-base transition-colors hover:text-white"
                      style={{ color: '#D6DDEB' }}
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources Column */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-6">
                Resources
              </h3>
              <ul className="space-y-4">
                {['Help Docs', 'Guide', 'Updates', 'Contact Us'].map((item) => (
                  <li key={item}>
                    <Link
                      href="#"
                      className="text-base transition-colors hover:text-white"
                      style={{ color: '#D6DDEB' }}
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Newsletter Section */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Get job notifications
            </h3>
            <p className="text-base mb-6" style={{ color: '#D6DDEB' }}>
              The latest job news, articles, sent to your inbox weekly.
            </p>
            
            <div className="space-y-3">
              <input
                type="email"
                placeholder="Email Address"
                className="w-full px-4 py-3 text-base bg-white focus:outline-none focus:ring-2 focus:ring-primary"
                style={{ color: '#25324B' }}
              />
              <button
                className="w-full px-6 py-3 text-base font-bold text-white transition-all hover:opacity-90"
                style={{ backgroundColor: '#4640DE' }}
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Footer Bottom - Same for both */}
        <div className="pt-8 border-t" style={{ borderColor: '#373F51' }}>
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            
            {/* Copyright */}
            <p className="text-base order-2 lg:order-1" style={{ color: '#6B7280' }}>
              2021 @ QuickHire. All rights reserved.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-4 order-1 lg:order-2">
              
              {/* Facebook */}
              <Link
                href="#"
                className="w-10 h-10 flex items-center justify-center rounded-full transition-opacity hover:opacity-80"
                style={{ backgroundColor: '#373F51' }}
                aria-label="Facebook"
              >
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </Link>

              {/* Instagram */}
              <Link
                href="#"
                className="w-10 h-10 flex items-center justify-center rounded-full transition-opacity hover:opacity-80"
                style={{ backgroundColor: '#373F51' }}
                aria-label="Instagram"
              >
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </Link>

              {/* Dribbble */}
              <Link
                href="#"
                className="w-10 h-10 flex items-center justify-center rounded-full transition-opacity hover:opacity-80"
                style={{ backgroundColor: '#373F51' }}
                aria-label="Dribbble"
              >
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 24C5.385 24 0 18.615 0 12S5.385 0 12 0s12 5.385 12 12-5.385 12-12 12zm10.12-10.358c-.35-.11-3.17-.953-6.384-.438 1.34 3.684 1.887 6.684 1.992 7.308 2.3-1.555 3.936-4.02 4.395-6.87zm-6.115 7.808c-.153-.9-.75-4.032-2.19-7.77l-.066.02c-5.79 2.015-7.86 6.025-8.04 6.4 1.73 1.358 3.92 2.166 6.29 2.166 1.42 0 2.77-.29 4-.814zm-11.62-2.58c.232-.4 3.045-5.055 8.332-6.765.135-.045.27-.084.405-.12-.26-.585-.54-1.167-.832-1.74C7.17 11.775 2.206 11.71 1.756 11.7l-.004.312c0 2.633.998 5.037 2.634 6.855zm-2.42-8.955c.46.008 4.683.026 9.477-1.248-1.698-3.018-3.53-5.558-3.8-5.928-2.868 1.35-5.01 3.99-5.676 7.17zM9.6 2.052c.282.38 2.145 2.914 3.822 6 3.645-1.365 5.19-3.44 5.373-3.702-1.81-1.61-4.19-2.586-6.795-2.586-.825 0-1.63.1-2.4.285zm10.335 3.483c-.218.29-1.935 2.493-5.724 4.04.24.49.47.985.68 1.486.08.18.15.36.22.53 3.41-.43 6.8.26 7.14.33-.02-2.42-.88-4.64-2.31-6.38z"/>
                </svg>
              </Link>

              {/* LinkedIn */}
              <Link
                href="#"
                className="w-10 h-10 flex items-center justify-center rounded-full transition-opacity hover:opacity-80"
                style={{ backgroundColor: '#373F51' }}
                aria-label="LinkedIn"
              >
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </Link>

              {/* Twitter */}
              <Link
                href="#"
                className="w-10 h-10 flex items-center justify-center rounded-full transition-opacity hover:opacity-80"
                style={{ backgroundColor: '#373F51' }}
                aria-label="Twitter"
              >
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}