
'use client';

import Header from '@/components/landing/header';
import Footer from '@/components/landing/footer';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Mail, Search } from 'lucide-react';
import { helpCategories, faqs } from '@/lib/support-data';
import Link from 'next/link';

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
                        <Link href={`/support/${category.slug}`} key={category.title}>
                            <Card className="text-center p-6 hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer h-full">
                                <div className="mb-4 inline-block bg-primary/10 text-primary p-4 rounded-full">
                                    <category.icon className="w-8 h-8" />
                                </div>
                                <CardTitle className="text-xl font-semibold mb-2">{category.title}</CardTitle>
                                <CardDescription>{category.description}</CardDescription>
                            </Card>
                        </Link>
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
            <div className="container px-4 text-center">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline">
                    Didn’t find what you’re looking for? We’ve got you covered.
                </h2>
                <p className="mt-4 text-lg text-foreground/80 max-w-md mx-auto">
                    Our support team is ready to assist you.
                </p>
                <div className="mt-8">
                    <Button size="lg" asChild>
                        <Link href="/support/contact-support">
                          <Mail className="mr-2 h-5 w-5" /> Contact Support
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
