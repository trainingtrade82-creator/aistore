
import Header from '@/components/landing/header';
import Footer from '@/components/landing/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { testimonials } from '@/lib/data';
import { Star, Zap } from 'lucide-react';

export default function TestimonialsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-secondary/40 py-20 md:py-24">
          <div className="container text-center px-4">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl font-headline">
              Loved by Students, Professionals, and Businesses Worldwide
            </h1>
            <p className="mt-6 max-w-3xl mx-auto text-foreground/80 text-lg md:text-xl">
              Real feedback from real users who transformed their work with AI Store.
            </p>
          </div>
        </section>

        {/* Testimonials Grid */}
        <section className="py-20 sm:py-24">
          <div className="container px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="p-8 flex flex-col justify-center items-center text-center shadow-lg">
                  <Avatar className="w-24 h-24 mb-4">
                    <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                    <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <blockquote className="text-lg italic text-foreground/80 mb-4">
                    "{testimonial.quote}"
                  </blockquote>
                  <p className="font-bold text-lg">{testimonial.name}</p>
                  <p className="text-sm text-primary">{testimonial.title}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-secondary/40">
            <div className="container text-center px-4">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline">
                    Ready to write your own success story?
                </h2>
                <div className="mt-8">
                    <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg transform transition-transform hover:scale-105">
                        <Zap className="mr-2 h-5 w-5" /> Start Free Today
                    </Button>
                </div>
            </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
