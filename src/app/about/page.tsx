import Header from '@/components/landing/header';
import Footer from '@/components/landing/footer';

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow container py-12">
        <h1 className="text-4xl font-bold mb-8">About Us</h1>
        <div className="space-y-4">
          <p>Our mission is to centralize the world's best AI tools into a single, intuitive platform.</p>
          <p>This is where the company story, vision, and information about the founders will go.</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
