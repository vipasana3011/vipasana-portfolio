import type { Metadata } from 'next';
import { Cormorant_Garamond, Plus_Jakarta_Sans, Cinzel } from 'next/font/google';
import './globals.css';
import { CustomCursor } from '@/components/ui/CustomCursor';
import { Preloader } from '@/components/ui/Preloader';
import { FloatingBlobsScene } from '@/components/3d/FloatingBlobsScene';
import { GoogleAnalytics } from '@/components/analytics/GoogleAnalytics';
import { SectionTracker } from '@/components/analytics/SectionTracker';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-jakarta',
  display: 'swap',
});

const cinzel = Cinzel({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-cinzel',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Vipasana — Digital Media Specialist & Web Developer',
  description:
    'Luxury portfolio of Vipasana — Digital Media Specialist, Social Media Manager, Web Developer & Creative Designer.',
  keywords: [
    'Vipasana',
    'Portfolio',
    'Digital Media Specialist',
    'Web Developer',
    'Social Media Manager',
    'Three.js',
    'Next.js',
    'Luxury Design',
  ],
  icons: {
    icon: '/favicon.png',
    apple: '/favicon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${jakarta.variable} ${cinzel.variable} scroll-smooth`}
    >
      <body className="relative bg-[#fff8fa] dark:bg-[#0b0609] text-neutral-900 dark:text-[#fff4f7] antialiased selection:bg-rose-500 selection:text-white">
        <GoogleAnalytics />
        <SectionTracker />
        <Preloader />
        <CustomCursor />
        <FloatingBlobsScene />
        {children}
      </body>
    </html>
  );
}
