import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Navigation } from '@/components/Navigation';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'BizOps Intelligence - Business Enhancement Insights',
  description: 'Discover targeted business enhancements and product ideas from analyzed social discussions',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navigation />
        <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
          {children}
        </main>
      </body>
    </html>
  );
}