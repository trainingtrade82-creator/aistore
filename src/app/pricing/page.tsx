import Header from '@/components/landing/header';
import Footer from '@/components/landing/footer';
import Pricing from '@/components/landing/pricing';

export default function PricingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        <Pricing />
      </main>
      <Footer />
    </div>
  );
}
