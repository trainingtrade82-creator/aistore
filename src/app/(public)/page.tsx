import Hero from '@/components/landing/hero';
import CategoryShowcase from '@/components/landing/category-showcase';
import SuccessStories from '@/components/landing/testimonials';

export default function Home() {
  return (
    <>
      <Hero />
      <CategoryShowcase />
      <SuccessStories />
    </>
  );
}
