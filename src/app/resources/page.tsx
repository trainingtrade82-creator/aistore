import Header from '@/components/landing/header';
import Footer from '@/components/landing/footer';

export default function ResourcesPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow container py-12">
        <h1 className="text-4xl font-bold mb-8">Resources</h1>
        <div className="space-y-4">
          <p>Explore our blog, tutorials, and guides to get the most out of our AI tools.</p>
          <p>This is where content for SEO, like articles and tutorials, will be displayed.</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
