import Image from 'next/image';
import Button from '@/components/ui/Button';

export default function CTABanner() {
  return (
<section className="container-custom relative py-10 overflow-hidden bg-[#4640DE] min-h-[750px] sm:min-h-0">

      {/* Top-Left Clip Shape */}
      <div
        className="absolute -top-18 -left-18 w-80 h-80 bg-white"
        style={{
          clipPath: 'polygon(0 0, 100% 0, 0 60%)'
        }}
      />

      {/* Bottom-Right Clip Shape */}
      <div
        className="absolute -bottom-18 -right-18 w-96 h-96 bg-white"
        style={{
          clipPath: 'polygon(100% 50%, 100% 100%, 0 100%)'
        }}
      />

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full lg:w-auto">

          {/* Left Content */}
          <div className="text-white lg:space-y-8  text-center lg:text-left pt-12 lg:pt-0 pb-0 md:pb-4 lg:pb-0">
            <div>
              <h2
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-white"
                style={{ fontFamily: 'var(--font-family-display)' }}
              >
                Start posting <br className='hidden lg:block' />
                jobs today
              </h2>

              <p className="text-lg md:text-xl mb-6 md:mb-8 opacity-90">
                Start posting jobs for only $10.
              </p>
            </div>

            <div>
              <Button
                variant="secondary"
                size="lg"
                className="bg-white font-bold px-8 py-4 hover:bg-opacity-90 w-[95%] lg:w-auto md:mb-2"
                style={{
                  color: '#4640DE',
                  backgroundColor: '#FFFFFF'
                }}
              >
                Sign Up For Free
              </Button>
            </div>
          </div>

          {/* Right Content - Dashboard Mockup */}
          <div className="relative h-[400px] md:h-[500px] md:block hidden">

            <div className="absolute -bottom-10 md:-bottom-14 lg:-bottom-10 -right-50 lg:-right-10 xl:-right-0 w-[120%] h-[120%] lg:w-[130%] lg:h-[130%]">
              <Image
                src="/images/dashboard-mockup.svg"
                alt="Dashboard mockup"
                fill
                className="object-contain object-bottom"
              />
            </div>

          </div>
          <div className="relative h-[245px] md:h-auto block lg:hidden">

            <div className="absolute -bottom-14 -right-70 xs:-right-100 w-[230%] h-[130%] sm:w-[200%] sm:h-[150%]">
              <Image
                src="/images/dashboard-mockup-mobile.svg"
                alt="Dashboard mockup"
                fill
                className="object-contain object-center"
              />
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}