import type { Metadata } from 'next';
import { Toaster } from '@/components/ui/toaster';
import { AuthContextProvider } from '@/context/AuthContext';
import './globals.css';
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })


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
      <body className={`font-sans ${inter.variable} antialiased`}>
        <AuthContextProvider>
          {children}
        </AuthContextProvider>
        <Toaster />
      </body>
    </html>
  );
}
