
'use client';

import { notFound } from 'next/navigation';
import Header from '@/components/landing/header';
import Footer from '@/components/landing/footer';
import { supportArticles } from '@/lib/support-data';
import ArticleLayout from '@/components/support/article-layout';

export default function SupportArticlePage({ params }: { params: { slug: string } }) {
  const article = supportArticles.find(a => a.slug === params.slug);

  if (!article) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow py-12 sm:py-16">
        <div className="container px-4 md:px-6">
            <ArticleLayout 
                title={article.title}
                intro={article.intro}
                topics={article.topics}
                icon={article.icon}
            />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export async function generateStaticParams() {
  return supportArticles.map((article) => ({
    slug: article.slug,
  }));
}
