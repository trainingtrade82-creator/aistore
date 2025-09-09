
import { notFound } from 'next/navigation';
import { supportArticles } from '@/lib/support-data';
import ArticleLayout from '@/components/support/article-layout';
import type { Metadata } from 'next';

// This function generates the metadata for the page (title, description)
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const article = supportArticles.find(a => a.slug === params.slug);
  if (!article) {
    return {
      title: 'Article Not Found'
    }
  }
  return {
    title: `${article.title} | AI Store Support`
  }
}

export default function SupportArticlePage({ params }: { params: { slug: string } }) {
  const article = supportArticles.find(a => a.slug === params.slug);

  if (!article) {
    notFound();
  }

  return (
    <div className="py-12 sm:py-16">
      <div className="container px-4 md:px-6">
          <ArticleLayout article={article} />
      </div>
    </div>
  );
}

// This function pre-builds all the support article pages at build time
export async function generateStaticParams() {
  return supportArticles.map((article) => ({
    slug: article.slug,
  }));
}
