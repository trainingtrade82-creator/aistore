
import Header from '@/components/landing/header';
import Footer from '@/components/landing/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Zap, FolderUp, Briefcase, GraduationCap, Save, Lock, ArrowUpCircle, Sparkles } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: Sparkles,
    title: '50+ AI Tools in One Place',
    description: 'Access AIs for writing, education, productivity, business, and creativity. No need to buy multiple subscriptions.',
  },
  {
    icon: Zap,
    title: 'Smarter, Faster Responses',
    description: 'Get instant answers to complex queries, with priority servers for Pro & Exclusive users and AI optimized for all response lengths.',
  },
  {
    icon: FolderUp,
    title: 'File Upload & Document Analysis',
    description: 'A Pro & Exclusive feature. Upload PDFs, docs, or text files, and our AI will summarize, analyze, and explain them instantly.',
  },
  {
    icon: Briefcase,
    title: 'Business & Finance AI',
    description: 'Exclusive tools like a Pitch Deck Generator, Financial Report Analyzer, Market Research Assistant, and a Custom AI Agent Builder.',
  },
  {
    icon: GraduationCap,
    title: 'Education & Productivity Boost',
    description: 'Tools like a Math Solver, Coding Assistant, Study Buddy for exams, Task Manager, and an AI for meeting notes.',
  },
  {
    icon: Save,
    title: 'Save & Export Results',
    description: 'Save important AI chats directly to your account. Easily export them as PDF or plain text to share with your team.',
  },
  {
    icon: Lock,
    title: 'Secure & Private by Design',
    description: 'All chats are encrypted in transit. Payments are handled via trusted providers like UPI, Stripe, and PayPal. You control your data.',
  },
  {
    icon: ArrowUpCircle,
    title: 'Constantly Growing',
    description: 'New AI tools are added every month based on community feedback. Exclusive members get early access to try them first.',
  },
];


export default function FeaturesPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-secondary/40 py-20 md:py-24">
          <div className="container text-center px-4">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl font-headline">
              50+ AI Tools. One Subscription. Endless Possibilities.
            </h1>
            <p className="mt-6 max-w-3xl mx-auto text-foreground/80 text-lg md:text-xl">
              From writing to business strategy — everything you need, powered by AI.
            </p>
            <div className="mt-8">
              <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg transform transition-transform hover:scale-105">
                <Zap className="mr-2 h-5 w-5" /> Start Free
              </Button>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-20 sm:py-24">
          <div className="container px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="p-6 text-center flex flex-col items-center border-0 shadow-none">
                  <div className="mb-4 inline-block bg-primary/10 text-primary p-4 rounded-full">
                    <feature.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-foreground/70 flex-grow">{feature.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 bg-secondary/40">
            <div className="container text-center px-4">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline">
                   Your all-in-one AI workspace. Start free, upgrade anytime.
                </h2>
                <div className="mt-8">
                    <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg transform transition-transform hover:scale-105">
                        <ArrowRight className="mr-2 h-5 w-5" /> Get Started
                    </Button>
                </div>
            </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
