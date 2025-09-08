
import Image from 'next/image';
import Header from '@/components/landing/header';
import Footer from '@/components/landing/footer';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Zap, TrendingUp, Wallet, CheckCircle } from 'lucide-react';

const caseStudies = [
  {
    person: 'Aarav, High School Student',
    image: 'https://picsum.photos/600/400?random=50',
    aiHint: 'student with books',
    challenge: 'Struggled with math & science concepts, wasted time searching on Google & YouTube.',
    solution: 'Used AI Store’s Math Solver & Study Buddy daily.',
    results: [
      { metric: 'Cut study time by 50%', icon: Zap },
      { metric: 'Improved exam scores by 20% in 2 months', icon: TrendingUp },
    ],
    quote: 'I finally understand concepts instead of just memorizing them. AI Store feels like having a personal tutor 24/7.',
  },
  {
    person: 'Meera, Freelance Writer',
    image: 'https://picsum.photos/600/400?random=51',
    aiHint: 'freelancer at laptop',
    challenge: 'Paid for multiple tools (Grammarly, Jasper, Canva captions). Managing costs & switching tools was a pain.',
    solution: 'Switched to AI Store Pro.',
    results: [
      { metric: 'Saved ₹4,000/month in software costs', icon: Wallet },
      { metric: 'Delivered 3x more content to clients', icon: Zap },
      { metric: 'Increased income by 40%', icon: TrendingUp },
    ],
    quote: 'AI Store became my one-stop writing assistant. I upgraded to Pro after just one week of using Free.',
  },
  {
    person: 'Rohan, Startup Founder',
    image: 'https://picsum.photos/600/400?random=52',
    aiHint: 'business meeting',
    challenge: 'Needed investor pitch deck & market research quickly.',
    solution: 'Used AI Store’s Pitch Deck Generator & Market Research AI in the Exclusive plan.',
    results: [
      { metric: 'Got first investor meeting in 10 days', icon: Zap },
      { metric: 'Saved 2 weeks of manual research', icon: CheckCircle },
    ],
    quote: 'If you’re a founder, the Exclusive plan is a must-have. It gives you tools that literally win investors.',
  },
  {
    person: 'Sophia, Marketing Consultant (US)',
    image: 'https://picsum.photos/600/400?random=53',
    aiHint: 'consultant on zoom',
    challenge: 'Struggled with global clients needing different content styles.',
    solution: 'Used AI Store’s Copywriting AI, Ad Campaign Writer, & Analysis Tools.',
    results: [
      { metric: 'Increased client retention by 35%', icon: TrendingUp },
      { metric: 'Managed campaigns for 5 countries with ease', icon: CheckCircle },
    ],
    quote: 'AI Store made me look like a global agency even though I’m just one person.',
  },
];

export default function SuccessStoriesPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-secondary/40 py-20 md:py-24">
          <div className="container text-center px-4">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl font-headline">
              From Students to CEOs — See How AI Store Delivers Results
            </h1>
            <p className="mt-6 max-w-3xl mx-auto text-foreground/80 text-lg md:text-xl">
              Real stories. Real outcomes. Powered by 50+ AI tools in one subscription.
            </p>
          </div>
        </section>

        {/* Case Studies Section */}
        <section className="py-20 sm:py-24">
          <div className="container px-4">
            <div className="space-y-20">
              {caseStudies.map((story, index) => (
                <Card key={index} className="overflow-hidden shadow-lg grid md:grid-cols-2 items-center">
                  <div className="relative aspect-video">
                    <Image 
                      src={story.image} 
                      alt={story.person}
                      data-ai-hint={story.aiHint}
                      fill
                      className="object-cover" 
                    />
                  </div>
                  <div className="p-8 md:p-12">
                    <h2 className="text-2xl font-bold font-headline mb-4">{story.person}</h2>
                    
                    <div className="mb-6">
                      <h3 className="font-semibold text-lg mb-2 text-primary">Challenge</h3>
                      <p className="text-foreground/80">{story.challenge}</p>
                    </div>

                    <div className="mb-6">
                      <h3 className="font-semibold text-lg mb-2 text-primary">Solution</h3>
                      <p className="text-foreground/80">{story.solution}</p>
                    </div>

                    <div className="mb-6">
                      <h3 className="font-semibold text-lg mb-2 text-primary">Results</h3>
                      <ul className="space-y-2">
                        {story.results.map((result, i) => (
                          <li key={i} className="flex items-center gap-3">
                            <result.icon className="w-5 h-5 text-green-500" />
                            <span className="text-foreground/90">{result.metric}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <blockquote className="border-l-4 border-primary pl-4 italic text-foreground/90">
                      {story.quote}
                    </blockquote>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-secondary/40">
          <div className="container text-center px-4">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline">
              What’s your success story going to be? Join AI Store today.
            </h2>
            <div className="mt-8">
              <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg transform transition-transform hover:scale-105">
                <Zap className="mr-2 h-5 w-5" /> Get Started Free
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
