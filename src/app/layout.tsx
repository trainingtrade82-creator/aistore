import type { Metadata } from 'next';
import { Toaster } from '@/components/ui/toaster';
import './globals.css';
import { Roboto } from 'next/font/google';
import { AuthContextProvider } from '@/context/AuthContext';

const roboto = Roboto({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '700'],
  variable: '--font-sans',
});


export const metadata: Metadata = {
  title: 'AI Store',
  description: 'Centralize 50+ AI tools under a single platform for various tasks.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${roboto.variable} antialiased font-sans`}>
        <AuthContextProvider>
          {children}
          <Toaster />
        </AuthContextProvider>
      </body>
    </html>
  );
}
