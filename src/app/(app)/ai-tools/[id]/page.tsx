
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { aiTools } from '@/lib/data';
import { ChevronRight, Star, CheckCircle, Heart, Share2, Lock, Sparkles, Wand2 } from 'lucide-react';

export default function ToolDetailPage({ params }: { params: { id: string } }) {
  const tool = aiTools.find(t => t.id === params.id);

  if (!tool) {
    notFound();
  }

  return (
    <div className="flex-grow py-8 sm:py-12 bg-secondary/40">
      <div className="container px-4 md:px-6">
        {/* Breadcrumbs */}
        <div className="flex items-center text-sm text-foreground/70 mb-6">
          <Link href="/ai-tools" className="hover:text-primary">AI Tools</Link>
          <ChevronRight className="h-4 w-4 mx-1" />
          <span>{tool.name}</span>
        </div>

        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          {/* Left Column: Details */}
          <div className="md:col-span-2">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                    <tool.icon className="w-12 h-12 text-primary" />
                </div>
                <div>
                  <h1 className="text-3xl sm:text-4xl font-bold font-headline">{tool.name}</h1>
                  <p className="text-lg text-foreground/80 mt-1">{tool.shortDescription}</p>
                   <div className="flex flex-wrap items-center gap-4 mt-3">
                    <div className="flex items-center gap-1">
                      <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                      <span className="font-semibold">{tool.rating}</span>
                      <span className="text-sm text-foreground/60">(100+ ratings)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Preview Section */}
            <div className="mb-8">
              <Carousel className="w-full">
                <CarouselContent>
                  {tool.images.map((src, index) => (
                    <CarouselItem key={index}>
                      <Card className="overflow-hidden border-2">
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
                <CarouselPrevious className="ml-12 sm:ml-16"/>
                <CarouselNext className="mr-12 sm:mr-16" />
              </Carousel>
            </div>

            {/* Description Section */}
            <Card className="p-6 mb-8">
              <h2 className="text-2xl font-semibold mb-4 font-headline flex items-center gap-2"><Sparkles className="w-6 h-6 text-primary" /> What this AI does</h2>
              <p className="text-lg text-foreground/90">{tool.description}</p>
            </Card>

            {/* Key Features */}
            <Card className="p-6 mb-8">
              <h2 className="text-2xl font-semibold mb-4 font-headline flex items-center gap-2"><Wand2 className="w-6 h-6 text-primary" /> Key Features</h2>
              <ul className="space-y-3">
                {tool.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                    <span className="text-lg text-foreground/90">{feature}</span>
                  </li>
                ))}
              </ul>
            </Card>

          </div>
          
          {/* Right Column: Actions */}
          <div className="md:col-span-1">
            <Card className="sticky top-24 p-6 shadow-lg">
              <div className="flex flex-col gap-4">
                  <Button size="lg" asChild className="w-full">
                     <Link href="/dashboard">Start Writing</Link>
                  </Button>
                <div className="flex flex-col sm:flex-row gap-2">
                  <Button variant="outline" className="w-full flex-1">
                    <Heart className="mr-2 h-4 w-4" />
                    Save to Favorites
                  </Button>
                </div>
                 <Button variant="outline" className="w-full flex-1">
                    <Share2 className="mr-2 h-4 w-4" />
                    Share
                  </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
    return aiTools.map((tool) => ({
      id: tool.id,
    }));
}
