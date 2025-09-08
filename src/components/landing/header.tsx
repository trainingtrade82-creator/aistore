'use client';

import Link from 'next/link';
import { Aperture } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Header() {
  const navLinks = [
    { name: 'Features', href: '#features' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Testimonials', href: '#testimonials' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Aperture className="h-6 w-6 text-primary" />
            <span className="font-bold">AI Store</span>
          </Link>
          <nav className="hidden items-center gap-6 text-sm md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-foreground/60 transition-colors hover:text-foreground/80"
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <Button variant="ghost">Log in</Button>
          <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
            Sign Up
          </Button>
        </div>
      </div>
    </header>
  );
}
