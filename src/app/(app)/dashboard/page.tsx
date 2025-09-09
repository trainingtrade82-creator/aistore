
'use client';

import React from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { aiTools } from '@/lib/data';
import type { AiTool } from '@/lib/data';
import { ArrowRight, Star, Mail } from 'lucide-react';

const tierColorMap: { [key: string]: string } = {
  Free: 'bg-green-600 hover:bg-green-700',
  Pro: 'bg-blue-600 hover:bg-blue-700',
  Exclusive: 'bg-purple-600 hover:bg-purple-700',
};

const ToolCard = ({ tool }: { tool: AiTool }) => (
    <Link href={`/ai-tools/${tool.id}`} className="block h-full">
        <Card className="group flex flex-col h-full overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <CardHeader>
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg">
                        <tool.icon className="w-8 h-8 text-primary" />
                    </div>
                    <div className="flex-grow">
                         <CardTitle className="text-xl font-bold">{tool.name}</CardTitle>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="flex flex-col flex-grow">
                <CardDescription className="flex-grow">{tool.shortDescription}</CardDescription>
                <div className="mt-4 flex flex-col sm:flex-row gap-2">
                     <Button variant="outline" className="w-full flex-1">Use <ArrowRight className="ml-2 h-4 w-4" /></Button>
                     <Button variant="secondary" className="w-full flex-1"><Star className="mr-2 h-4 w-4" /> Add to Dashboard</Button>
                </div>
            </CardContent>
        </Card>
    </Link>
)

export default function DashboardPage() {
    const emailTool = aiTools.find(tool => tool.id === 'email-writer');

  return (
    <div className="flex-grow p-4 sm:p-6 md:p-8">
      <div className="text-center mb-12">
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
      
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-4 text-center">Featured Tool</h2>
        <div className="max-w-md mx-auto">
            {emailTool && <ToolCard tool={emailTool} />}
        </div>
      </div>
    </div>
  );
}
