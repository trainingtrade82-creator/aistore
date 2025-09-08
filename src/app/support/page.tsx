
'use client';

import Header from '@/components/landing/header';
import Footer from '@/components/landing/footer';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { LifeBuoy, CreditCard, Settings, Bug, Shield, Mail, Search, BookOpen, MessageSquare, Twitter } from 'lucide-react';

const helpCategories = [
  {
    title: 'Getting Started',
    description: 'Account setup, login, first steps.',
    icon: BookOpen,
  },
  {
    title: 'Plans & Billing',
    description: 'Free vs Pro vs Exclusive, payments, refunds.',
    icon: CreditCard,
  },
  {
    title: 'AI Tools',
    description: 'How to use each tool, limits, troubleshooting.',
    icon: Settings,
  },
  {
    title: 'Technical Issues',
    description: 'Bugs, errors, performance problems.',
    icon: Bug,
  },
  {
    title: 'Security & Privacy',
    description: 'Data usage, encryption, trust.',
    icon: Shield,
  },
  {
    title: 'Contact Support',
    description: 'Email / chat.',
    icon: Mail,
  },
];

const faqs = [
  {
    question: "What’s included in the Free Plan?",
    answer: "The Free Plan gives you access to 30 AI tools with limited usage. It’s perfect for testing the platform and exploring what AI Store can do. Advanced features like file uploads, premium AIs, and priority speed are only available in Pro or Exclusive.",
  },
  {
    question: "How many AI tools are available in total?",
    answer: "AI Store currently offers 50 AI tools across categories like education, writing, business, productivity, and fun. Pro and Exclusive members unlock all of them.",
  },
  {
    question: "What’s the difference between Pro (₹500) and Exclusive (₹700)?",
    answer: "The Pro Plan unlocks all 50 AI tools, full responses, file uploads, 5,000 queries/month, and priority processing. The Exclusive Plan includes everything in Pro, plus premium business AIs, 20,000 queries/month, a custom AI agent builder, early access to new tools, and premium support.",
  },
  {
    question: "Do you support UPI payments in India?",
    answer: "Yes ✅ — we support UPI, debit/credit cards, and PayPal for international users.",
  },
  {
    question: "Can I cancel my subscription anytime?",
    answer: "Yes. You can cancel anytime from your account dashboard. You’ll still have access until the end of your billing cycle.",
  },
  {
    question: "Do unused queries roll over to the next month?",
    answer: "No. Query limits reset every month. This keeps the system fair and balanced for all users.",
  },
  {
    question: "Is my data safe?",
    answer: "Yes. We never sell or misuse your data. All conversations are encrypted, and sensitive information (like payment details) is handled securely via trusted providers like Stripe.",
  },
  {
    question: "Can I upgrade from Free to Pro or Exclusive later?",
    answer: "Absolutely. You can upgrade instantly from your dashboard — your plan will change right away.",
  },
  {
    question: "Do you offer refunds?",
    answer: "We do not offer refunds for monthly plans once billed. However, you can cancel anytime and will not be charged for the next cycle.",
  },
  {
    question: "Do I need to install anything?",
    answer: "No installation required. AI Store is 100% web-based and works on desktop, tablet, and mobile. Just log in and start using the tools.",
  },
  {
    question: "Are the AI tools unlimited to use?",
    answer: "Free has limited access. Pro offers up to 5,000 queries/month (enough for most users). Exclusive offers 20,000 queries/month (virtually unlimited for power users).",
  },
  {
    question: "Who can use AI Store?",
    answer: "Anyone — students, professionals, freelancers, entrepreneurs, or just curious learners. Our AIs are designed for everyday needs, from studying and writing to business and personal growth.",
  },
];


export default function SupportPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-secondary/40 py-20 md:py-24">
          <div className="container text-center px-4">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl font-headline">
              We’re here to help — anytime, anywhere.
            </h1>
            <p className="mt-6 max-w-3xl mx-auto text-foreground/80 text-lg md:text-xl">
              Find quick answers, explore FAQs, or reach out directly to our team.
            </p>
            <div className="mt-8 max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Search support articles..."
                  className="w-full pl-12 pr-4 py-6 rounded-full text-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Help Categories */}
        <section className="py-16 sm:py-24">
            <div className="container px-4">
                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {helpCategories.map((category) => (
                        <Card key={category.title} className="text-center p-6 hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer">
                            <div className="mb-4 inline-block bg-primary/10 text-primary p-4 rounded-full">
                                <category.icon className="w-8 h-8" />
                            </div>
                            <CardTitle className="text-xl font-semibold mb-2">{category.title}</CardTitle>
                            <CardDescription>{category.description}</CardDescription>
                        </Card>
                    ))}
                 </div>
            </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 sm:py-24 bg-secondary/40">
            <div className="container px-4 max-w-4xl mx-auto">
                <div className="text-center mb-12">
                     <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline">
                       Frequently Asked Questions
                    </h2>
                </div>
                <Accordion type="single" collapsible className="w-full">
                    {faqs.map((faq, index) => (
                        <AccordionItem value={`item-${index}`} key={index}>
                            <AccordionTrigger className="text-lg font-semibold text-left">{faq.question}</AccordionTrigger>
                            <AccordionContent className="text-base text-foreground/80 pt-2">
                                {faq.answer}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 sm:py-24">
            <div className="container px-4 max-w-5xl mx-auto">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="text-center md:text-left">
                         <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline">
                           Didn’t find what you’re looking for?
                        </h2>
                        <p className="mt-4 text-lg text-foreground/80 max-w-md mx-auto md:mx-0">
                           Our support team is ready to assist you. Reach out and we'll get back to you as soon as possible.
                        </p>
                         <div className="mt-8">
                            <Button size="lg">
                                <Mail className="mr-2 h-5 w-5" /> Submit a Request
                            </Button>
                        </div>
                    </div>
                    <div className="space-y-6">
                        <Card className="flex items-center p-4 gap-4">
                            <Mail className="w-8 h-8 text-primary"/>
                            <div>
                                <h4 className="font-semibold text-lg">Email Support</h4>
                                <p className="text-primary hover:underline cursor-pointer">support@aistore.com</p>
                            </div>
                        </Card>
                         <Card className="flex items-center p-4 gap-4 opacity-70 cursor-not-allowed">
                            <MessageSquare className="w-8 h-8 text-muted-foreground"/>
                            <div>
                                <h4 className="font-semibold text-lg text-muted-foreground">Live Chat (coming soon)</h4>
                                <p className="text-muted-foreground">Get instant answers</p>
                            </div>
                        </Card>
                         <Card className="flex items-center p-4 gap-4">
                            <Twitter className="w-8 h-8 text-blue-500"/>
                            <div>
                                <h4 className="font-semibold text-lg">Twitter / X</h4>
                                <p className="text-primary hover:underline cursor-pointer">@aistore_support</p>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
