
import Link from 'next/link';
import { Aperture, Twitter, Github, Linkedin } from 'lucide-react';

export default function Footer() {
  const navLinks = [
    { name: 'Features', href: '/features' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Testimonials', href: '/testimonials' },
    { name: 'Success Stories', href: '/success-stories' },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Refund Policy', href: '/refund-policy' },
    { name: 'Terms of Service', href: '/terms-of-service' },
  ];

  const socialLinks = [
    { name: 'Twitter', icon: Twitter, href: '#' },
    { name: 'GitHub', icon: Github, href: '#' },
    { name: 'LinkedIn', icon: Linkedin, href: '#' },
  ];

  return (
    <footer className="bg-secondary/70 border-t">
      <div className="container py-12 px-4 md:px-6">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <Aperture className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold">AI Store</span>
            </Link>
            <p className="text-foreground/70 max-w-xs">
              Your one-stop platform for the best AI tools, curated for excellence.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 md:col-span-2 md:grid-cols-3">
            <div>
              <h3 className="font-semibold mb-4">Platform</h3>
              <ul className="space-y-2">
                {navLinks.slice(0, 4).map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-foreground/70 hover:text-primary transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                {navLinks.slice(4).map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-foreground/70 hover:text-primary transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Connect</h3>
              <div className="flex space-x-4">
                {socialLinks.map((link) => (
                  <Link key={link.name} href={link.href} className="text-foreground/70 hover:text-primary transition-colors">
                    <link.icon className="h-6 w-6" />
                    <span className="sr-only">{link.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center text-sm text-foreground/60">
          <p>&copy; {new Date().getFullYear()} AI Store. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
