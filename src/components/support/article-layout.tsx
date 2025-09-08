
'use client'

import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface ArticleLayoutProps {
    icon: LucideIcon;
    title: string;
    intro: string;
    topics: { title: string; content: React.ReactNode }[];
}

export default function ArticleLayout({ icon: Icon, title, intro, topics }: ArticleLayoutProps) {
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
                           {topic.content}
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
