import Logo from './Logo';
import Button from '@/components/ui/Button';

export default function Footer() {
  return (
    <footer className="bg-background-dark text-white">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Brand Column */}
          <div className="md:col-span-1">
            <div className="mb-4">
              <Logo />
            </div>
            <p className="text-sm opacity-80 leading-relaxed">
              Great platform for the job seeker that passionate about startups. Find your dream job easier.
            </p>
          </div>

          {/* About Column */}
          <div>
            <h3 className="font-semibold mb-4">About</h3>
            <ul className="space-y-3 text-sm opacity-80">
              <li><a href="#" className="hover:opacity-100 transition-opacity">Companies</a></li>
              <li><a href="#" className="hover:opacity-100 transition-opacity">Pricing</a></li>
              <li><a href="#" className="hover:opacity-100 transition-opacity">Terms</a></li>
              <li><a href="#" className="hover:opacity-100 transition-opacity">Advice</a></li>
              <li><a href="#" className="hover:opacity-100 transition-opacity">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Resources Column */}
          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-3 text-sm opacity-80">
              <li><a href="#" className="hover:opacity-100 transition-opacity">Help Docs</a></li>
              <li><a href="#" className="hover:opacity-100 transition-opacity">Guide</a></li>
              <li><a href="#" className="hover:opacity-100 transition-opacity">Updates</a></li>
              <li><a href="#" className="hover:opacity-100 transition-opacity">Contact Us</a></li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div>
            <h3 className="font-semibold mb-4">Get job notifications</h3>
            <p className="text-sm opacity-80 mb-4">
              The latest job news, articles, sent to your inbox weekly.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Email Address"
                className="flex-1 px-4 py-2 text-sm bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Button variant="primary" size="sm">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 text-sm opacity-60 text-center">
          2021 @ QuickHire. All rights reserved.
        </div>
      </div>
    </footer>
  );
}