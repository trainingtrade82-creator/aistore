
'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function DashboardPage() {

  return (
    <div className="flex-grow p-4 sm:p-6 md:p-8">
      <div className="text-center mt-16">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">
          Welcome to your Dashboard
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-foreground/80 md:text-xl">
          Your favorite AI tools will appear here. Get started by exploring our AI Tool Store.
        </p>
         <div className="mt-8">
            <Button asChild size="lg">
                <Link href="/ai-tools">
                    Explore All AI Tools <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
            </Button>
        </div>
      </div>
    </div>
  );
}
