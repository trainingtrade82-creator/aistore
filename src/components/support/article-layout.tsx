
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ArrowLeft, LucideIcon } from 'lucide-react';

type SupportTopic = {
    title: string;
    content: string;
};

type FaqItem = {
    question: string;
    answer: string;
};

type SupportArticle = {
    slug: string;
    icon: LucideIcon;
    title: string;
    intro: string;
    topics: SupportTopic[];
    faq: FaqItem[];
};

interface ArticleLayoutProps {
    article: SupportArticle;
}

export default function ArticleLayout({ article }: ArticleLayoutProps) {
    const { title, intro, topics, faq } = article;
    const Icon = article.icon;

    return (
        <div className="max-w-4xl mx-auto">
            <Button asChild variant="ghost" className="mb-8">
                <Link href="/support">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Support
                </Link>
            </Button>

            <header className="mb-12 text-center">
                <div className="inline-block bg-primary/10 text-primary p-4 rounded-full mb-4">
                    <Icon className="w-10 h-10" />
                </div>
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">{title}</h1>
                <p className="mt-4 text-lg text-foreground/80">{intro}</p>
            </header>

            <div className="space-y-8">
                {topics.map((topic, index) => (
                    <Card key={index}>
                        <CardHeader>
                            <CardTitle>{topic.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="prose prose-lg max-w-none text-foreground/90">
                           <div dangerouslySetInnerHTML={{ __html: topic.content }} />
                        </CardContent>
                    </Card>
                ))}
            </div>

            {faq && faq.length > 0 && (
                 <div className="mt-16">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline text-center mb-8">
                        Frequently Asked Questions
                    </h2>
                    <Accordion type="single" collapsible className="w-full">
                        {faq.map((item, index) => (
                            <AccordionItem value={`item-${index}`} key={index}>
                                <AccordionTrigger className="text-lg font-semibold text-left">
                                    {item.question}
                                </AccordionTrigger>
                                <AccordionContent className="text-base text-foreground/80 pt-2">
                                    {item.answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            )}
        </div>
    );
}
