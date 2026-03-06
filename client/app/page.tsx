import Header from '@/components/layout/Header';
import HeroSection from '@/components/home/HeroSection';
import CompanyLogos from '@/components/home/CompanyLogos';
import CategoriesGrid from '@/components/home/CategoriesGrid';
import CTABanner from '@/components/home/CTABanner';
import FeaturedJobs from '@/components/home/FeaturedJobs';
import LatestJobs from '@/components/home/LatestJobs';
import Footer from '@/components/layout/Footer';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <CompanyLogos/>
        <CategoriesGrid/>
        <CTABanner/>
        <FeaturedJobs/>
        <LatestJobs/>
      </main>
      <Footer/>
    </>
  );
}