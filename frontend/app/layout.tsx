import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Navbar from '../components/Navbar';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'LuxeCart - Advanced Modern E-Commerce',
  description: 'Premium electronics and gadgets with 3D product viewing capabilities.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans`}>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow pt-20">
            {children}
          </main>
          <footer className="py-8 text-center text-gray-400 border-t border-white/10 mt-auto glass-panel">
            <p>&copy; {new Date().getFullYear()} LuxeCart. All rights reserved.</p>
          </footer>
        </div>
      </body>
    </html>
  );
}
