
'use client';

import Image from 'next/image';
import Header from '@/components/landing/header';
import Footer from '@/components/landing/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Zap, HandHeart, Globe, Target, Eye, Lightbulb, Users, Award } from 'lucide-react';

const values = [
  {
    icon: Lightbulb,
    title: 'Innovation',
    description: 'We are committed to relentlessly building smarter, more intuitive AI tools that push the boundaries of what\'s possible.',
  },
  {
    icon: HandHeart,
    title: 'Accessibility',
    description: 'We believe in making powerful AI affordable and available to everyone, everywhere, regardless of their technical expertise.',
  },
  {
    icon: Award,
    title: 'Trust',
    description: 'We are dedicated to being transparent, secure, and user-first in everything we do. Your data and privacy are paramount.',
  },
  {
    icon: Zap,
    title: 'Execution',
    description: 'We know that great ideas are only as good as their implementation. We focus on delivering results that matter.',
  },
];

const teamMembers = [
    { name: 'Alex Johnson', role: 'Founder & CEO', avatar: 'https://picsum.photos/200/200?random=1' },
    { name: 'Samantha Lee', role: 'Co-Founder & CTO', avatar: 'https://picsum.photos/200/200?random=2' },
    { name: 'David Chen', role: 'Lead Designer', avatar: 'https://picsum.photos/200/200?random=3' },
    { name: 'Maria Garcia', role: 'Head of Engineering', avatar: 'https://picsum.photos/200/200?random=4' },
]


export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative bg-secondary/30 py-20 md:py-24">
            <div className="absolute inset-0">
                 <Image 
                    src="https://picsum.photos/1600/800"
                    alt="Network of AI nodes"
                    fill
                    className="object-cover opacity-10"
                    data-ai-hint="network nodes"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent"></div>
            </div>
          <div className="container relative text-center px-4">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl font-headline">
              We’re building the world’s AI marketplace for everyone.
            </h1>
            <p className="mt-6 max-w-3xl mx-auto text-foreground/80 text-lg md:text-xl">
              AI Store isn’t just another AI website — it’s a platform where **50+ powerful AI tools** come together under one subscription. Our mission is to make AI as essential and accessible as food — a daily necessity for learning, working, creating, and living smarter.
            </p>
          </div>
        </section>

        {/* Story, Mission & Vision Section */}
        <section className="py-20 sm:py-24">
          <div className="container max-w-5xl mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
              <div className="space-y-8">
                <div>
                    <h2 className="text-3xl font-bold text-primary mb-4 font-headline flex items-center gap-3"><Users className="w-8 h-8" /> Our Story</h2>
                    <p className="text-lg text-foreground/80">AI has always been scattered — one app for writing, another for studying, another for fun. People waste time and money juggling subscriptions. We started AI Store to solve this.</p>
                    <p className="text-lg text-foreground/80 mt-4">We built AI Store to unify AI into one platform. Instead of buying 10 different subscriptions, you get everything in one place — affordable, simple, and powerful.</p>
                </div>
              </div>
              <div className="space-y-8">
                <Card className="p-6 md:p-8 bg-secondary/50 border-primary/20 border-2 shadow-lg animate-fade-in">
                    <h3 className="text-2xl font-bold text-primary font-headline flex items-center gap-3"><Target className="w-7 h-7" /> Our Mission</h3>
                    <p className="mt-3 text-xl md:text-2xl font-semibold">"To put the power of AI in everyone’s hands, every day."</p>
                    <p className="mt-2 text-foreground/80">We believe AI should not be a luxury for a few, but a daily tool for everyone — students, creators, professionals, and businesses.</p>
                </Card>
                 <Card className="p-6 md:p-8 bg-secondary/50 border-primary/20 border-2 shadow-lg animate-fade-in animation-delay-200">
                    <h3 className="text-2xl font-bold text-primary font-headline flex items-center gap-3"><Eye className="w-7 h-7" /> Our Vision</h3>
                    <p className="mt-3 text-xl md:text-2xl font-semibold">"AI Store will be the global standard for how people access AI."</p>
                    <p className="mt-2 text-foreground/80">We see a future where AI Store becomes as natural as opening your browser — a single place where every AI you need is already there.</p>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 sm:py-24 bg-secondary/30">
            <div className="container px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline">
                        Our Core Values
                    </h2>
                    <p className="mt-4 max-w-2xl mx-auto text-foreground/80 md:text-xl">
                        The principles that guide our mission and shape our culture.
                    </p>
                </div>
                <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {values.map((value) => (
                        <Card key={value.title} className="p-8 text-center flex flex-col items-center">
                            <value.icon className="w-12 h-12 text-primary mb-4" />
                            <h3 className="text-2xl font-bold mb-2">{value.title}</h3>
                            <p className="text-foreground/70">{value.description}</p>
                        </Card>
                    ))}
                </div>
            </div>
        </section>


        {/* Team Section */}
        <section className="py-20 sm:py-24">
            <div className="container px-4">
                 <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline">
                       Meet the Team
                    </h2>
                    <p className="mt-4 max-w-2xl mx-auto text-foreground/80 md:text-xl">
                        Built by dreamers who believe execution is everything.
                    </p>
                </div>
                <div className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-8">
                    {teamMembers.map((member) => (
                        <div key={member.name} className="text-center">
                            <Image src={member.avatar} alt={member.name} width={120} height={120} className="rounded-full mx-auto mb-4 shadow-lg" />
                            <h4 className="text-lg font-bold">{member.name}</h4>
                            <p className="text-primary text-sm">{member.role}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-secondary/30">
            <div className="container text-center px-4">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline">
                    This is just the beginning.
                </h2>
                <p className="mt-4 max-w-xl mx-auto text-foreground/80 md:text-xl">
                     Join us and be part of the future of AI.
                </p>
                <div className="mt-8">
                    <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg transform transition-transform hover:scale-105">
                        <Zap className="mr-2 h-5 w-5" /> Try AI Store Free
                    </Button>
                </div>
            </div>
        </section>
        
      </main>
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
          opacity: 0;
        }
        .animation-delay-200 {
          animation-delay: 0.2s;
        }
      `}</style>
      <Footer />
    </div>
  );
}
