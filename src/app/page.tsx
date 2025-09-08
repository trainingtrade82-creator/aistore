import Header from '@/components/landing/header';
import Hero from '@/components/landing/hero';
import CategoryShowcase from '@/components/landing/category-showcase';
import ToolSuggester from '@/components/landing/tool-suggester';
import Pricing from '@/components/landing/pricing';
import Testimonials from '@/components/landing/testimonials';
import Footer from '@/components/landing/footer';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        <Hero />
        <CategoryShowcase />
        <ToolSuggester />
        <Pricing />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
}
