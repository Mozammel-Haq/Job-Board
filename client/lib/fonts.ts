import localFont from 'next/font/local';

export const epilogue = localFont({
  src: [
    {
      path: '../public/fonts/Epilogue-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/Epilogue-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/fonts/Epilogue-SemiBold.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../public/fonts/Epilogue-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-epilogue',
});

export const clashDisplay = localFont({
  src: [
    {
      path: '../public/fonts/ClashDisplay-Semibold.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../public/fonts/ClashDisplay-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-clash-display',
});