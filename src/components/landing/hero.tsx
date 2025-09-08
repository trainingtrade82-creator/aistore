
'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';

export default function Hero() {
  return (
    <section className="relative bg-secondary/50">
      <div className="container px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-8 items-center min-h-[70vh] py-20 md:py-32">
          <div className="space-y-6 text-center md:text-left">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl font-headline animate-fade-in-up">
              Your Ultimate AI Tool
              <span className="text-primary"> Universe</span>
            </h1>
            <p className="max-w-[600px] text-foreground/80 md:text-xl animate-fade-in-up animation-delay-200">
              Discover, manage, and master over 50+ specialized AI tools. From writing to business, education to lifestyle—all in one seamless platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start animate-fade-in-up animation-delay-400">
              <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg transform transition-transform hover:scale-105">
                Start for Free <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="bg-background hover:bg-background/80 shadow-lg transform transition-transform hover:scale-105">
                Explore Tools
              </Button>
            </div>
          </div>
          <div className="relative hidden md:block">
            <div className="absolute inset-0 bg-primary/10 rounded-full blur-3xl"></div>
            <Image
              src="https://picsum.photos/500/500?random=1"
              alt="AI Tools Showcase"
              data-ai-hint="digital brain"
              className="relative rounded-full aspect-square object-cover shadow-2xl"
              width={500}
              height={500}
            />
          </div>
        </div>
      </div>
      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.5s ease-out forwards;
        }
        .animation-delay-200 {
          animation-delay: 0.2s;
        }
        .animation-delay-400 {
          animation-delay: 0.4s;
        }
        .animate-fade-in-up {
          opacity: 0;
          animation-fill-mode: forwards;
        }
      `}</style>
    </section>
  );
}
