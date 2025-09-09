import Hero from '@/components/landing/hero';
import CategoryShowcase from '@/components/landing/category-showcase';
import ToolSuggester from '@/components/landing/tool-suggester';
import Pricing from '@/components/landing/pricing';
import SuccessStories from '@/components/landing/testimonials';

export default function Home() {
  return (
    <>
      <Hero />
      <CategoryShowcase />
      <ToolSuggester />
      <Pricing showTable={false} />
      <SuccessStories />
    </>
  );
}
