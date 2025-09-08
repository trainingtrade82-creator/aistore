import Header from '@/components/landing/header';
import Footer from '@/components/landing/footer';

export default function AiToolsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow container py-12">
        <h1 className="text-4xl font-bold mb-8">AI Tools</h1>
        <p>A list of all 50+ AI tools will be displayed here.</p>
      </main>
      <Footer />
    </div>
  );
}
