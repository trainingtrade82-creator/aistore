import Header from '@/components/landing/header';
import Footer from '@/components/landing/footer';

export default function SupportPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow container py-12">
        <h1 className="text-4xl font-bold mb-8">Support</h1>
        <div className="space-y-4">
          <p>Find answers to common questions in our FAQ or contact our support team directly.</p>
          <p>A help center and contact form will be available here.</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
