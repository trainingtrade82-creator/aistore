import Hero from '@/components/landing/hero';
import CategoryShowcase from '@/components/landing/category-showcase';
import Pricing from '@/components/landing/pricing';
import SuccessStories from '@/components/landing/testimonials';

export default function Home() {
  return (
    <>
      <Hero />
      <CategoryShowcase />
      <Pricing showTable={false} />
      <SuccessStories />
    </>
  );
}
