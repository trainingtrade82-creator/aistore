
'use client';

import { useState } from 'react';
import Image from 'next/image';
import Header from '@/components/landing/header';
import Footer from '@/components/landing/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Zap } from 'lucide-react';
import { resources, resourceCategories } from '@/lib/resources-data';

const categoryColorMap: { [key: string]: string } = {
  Article: 'bg-blue-100 text-blue-800 border-blue-300',
  Guide: 'bg-green-100 text-green-800 border-green-300',
  'Case Study': 'bg-yellow-100 text-yellow-800 border-yellow-300',
};

export default function ResourcesPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredResources = selectedCategory === 'All'
    ? resources
    : resources.filter(r => r.category === selectedCategory);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-secondary/40 py-20 md:py-24">
          <div className="container text-center px-4">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl font-headline">
              Learn how to get the most out of AI.
            </h1>
            <p className="mt-6 max-w-3xl mx-auto text-foreground/80 text-lg md:text-xl">
              Guides, tutorials, and articles to help students, creators, and professionals use AI smarter every day.
            </p>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16 sm:py-24">
          <div className="container px-4 md:px-6">
            {/* Filter Buttons */}
            <div className="flex justify-center flex-wrap gap-2 mb-12">
              {resourceCategories.map(category => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  onClick={() => setSelectedCategory(category)}
                  className="rounded-full px-6"
                >
                  {category}
                </Button>
              ))}
            </div>

            {/* Resources Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredResources.map(resource => (
                <Card key={resource.title} className="overflow-hidden group transition-all duration-300 hover:shadow-xl hover:-translate-y-2 flex flex-col">
                  <div className="relative aspect-video">
                    <Image
                      src={resource.image}
                      alt={resource.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      data-ai-hint="abstract ai-themed"
                    />
                  </div>
                  <CardContent className="p-6 flex flex-col flex-grow">
                    <div className="flex justify-between items-center mb-2">
                       <Badge className={`font-medium ${categoryColorMap[resource.category]}`}>{resource.category}</Badge>
                       <p className="text-sm text-foreground/60">{resource.date}</p>
                    </div>
                    <h3 className="text-xl font-bold mb-2 flex-grow">{resource.title}</h3>
                    <p className="text-foreground/70 mb-4">{resource.excerpt}</p>
                    <Button variant="link" className="p-0 self-start">
                      Read More <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
             {filteredResources.length === 0 && (
                <div className="text-center py-16 text-foreground/60">
                    <p className="text-lg">No resources found in this category.</p>
                    <p>Try selecting another category.</p>
                </div>
            )}
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 bg-secondary/40">
            <div className="container text-center px-4">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline">
                    Stop reading about AI. Start using it today.
                </h2>
                <div className="mt-8">
                    <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg transform transition-transform hover:scale-105">
                        <Zap className="mr-2 h-5 w-5" /> Try AI Store Free
                    </Button>
                </div>
            </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
