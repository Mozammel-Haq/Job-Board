import Header from '@/components/layout/Header';
import HeroSection from '@/components/home/HeroSection';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        
        {/* Temporary spacing */}
        <div className="h-screen bg-gray-100 flex items-center justify-center">
          <p className="text-2xl font-bold" style={{ color: '#25324B' }}>
            Next Section Coming Soon...
          </p>
        </div>
      </main>
    </>
  );
}