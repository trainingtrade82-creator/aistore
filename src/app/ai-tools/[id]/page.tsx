'use client';

import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/landing/header';
import Footer from '@/components/landing/footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { aiTools } from '@/lib/data';
import { ChevronRight, Star, CheckCircle, Heart, Share2 } from 'lucide-react';

const tierColorMap = {
  Free: 'bg-green-600 hover:bg-green-700',
  Pro: 'bg-blue-600 hover:bg-blue-700',
  Exclusive: 'bg-yellow-500 hover:bg-yellow-600 text-black',
};

export default function ToolDetailPage({ params }: { params: { id: string } }) {
  const tool = aiTools.find(t => t.id === params.id);

  if (!tool) {
    notFound();
  }

  const isLocked = tool.tier !== 'Free';

  return (
    <div className="flex flex-col min-h-screen bg-secondary/30">
      <Header />
      <main className="flex-grow py-12">
        <div className="container px-4 md:px-6">
          {/* Breadcrumbs */}
          <div className="flex items-center text-sm text-foreground/70 mb-6">
            <Link href="/ai-tools" className="hover:text-primary">AI Tools</Link>
            <ChevronRight className="h-4 w-4 mx-1" />
            <span>{tool.name}</span>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {/* Left Column: Details */}
            <div className="md:col-span-2">
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <tool.icon className="w-16 h-16 text-primary" />
                  <div>
                    <h1 className="text-4xl font-bold font-headline">{tool.name}</h1>
                    <div className="flex items-center gap-4 mt-2">
                      <Badge className={`text-sm text-primary-foreground ${tierColorMap[tool.tier]}`}>{tool.tier}</Badge>
                      <div className="flex items-center gap-1">
                        <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                        <span className="font-semibold">{tool.rating}</span>
                        <span className="text-sm text-foreground/60">(100+ ratings)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Screenshot Carousel */}
              <div className="mb-8">
                <Carousel className="w-full">
                  <CarouselContent>
                    {tool.images.map((src, index) => (
                      <CarouselItem key={index}>
                        <Card className="overflow-hidden">
                          <Image
                            src={src}
                            alt={`${tool.name} screenshot ${index + 1}`}
                            width={1280}
                            height={720}
                            className="aspect-video object-cover"
                            data-ai-hint="screenshot app"
                          />
                        </Card>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="ml-16"/>
                  <CarouselNext className="mr-16" />
                </Carousel>
              </div>

              {/* Description */}
              <div className="prose prose-lg max-w-none text-foreground/90 mb-8">
                <h2 className="text-2xl font-semibold mb-2 font-headline">Description</h2>
                <p>{tool.description}</p>
              </div>

              {/* Key Features */}
              <div>
                <h2 className="text-2xl font-semibold mb-4 font-headline">Key Features</h2>
                <ul className="space-y-3">
                  {tool.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                      <span className="text-lg text-foreground/90">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            {/* Right Column: Actions */}
            <div className="md:col-span-1">
              <Card className="sticky top-24 p-6 shadow-lg">
                <div className="flex flex-col gap-4">
                  {isLocked ? (
                    <Button size="lg" className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                      Upgrade to Unlock
                    </Button>
                  ) : (
                    <Button size="lg" className="w-full">
                      Use Tool
                    </Button>
                  )}
                  <div className="flex gap-2">
                    <Button variant="outline" className="w-full">
                      <Heart className="mr-2 h-4 w-4" />
                      Add to Favorites
                    </Button>
                    <Button variant="outline" className="w-full">
                      <Share2 className="mr-2 h-4 w-4" />
                      Share
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
