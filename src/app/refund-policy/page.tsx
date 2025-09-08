
import Header from '@/components/landing/header';
import Footer from '@/components/landing/footer';

export default function RefundPolicyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow py-16 sm:py-24">
        <div className="container max-w-4xl mx-auto px-4">
          <header className="mb-12 text-center">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">Refund & Cancellation Policy</h1>
            <p className="mt-4 text-lg text-foreground/80">Effective Date: October 26, 2023</p>
          </header>
          <div className="prose prose-lg max-w-none text-foreground/90 mx-auto">
            <p>At AI Store, we aim to provide reliable and valuable AI tools for all our users. Please read our Refund & Cancellation Policy carefully before subscribing.</p>

            <h2>1. Free Plan</h2>
            <ul>
                <li>AI Store offers a <strong>Free Plan</strong> with 30 AI tools.</li>
                <li>This allows you to test our platform before purchasing a paid plan.</li>
                <li>Since a free option is available, we encourage all users to try it first.</li>
            </ul>

            <h2>2. Paid Subscriptions (Pro & Exclusive)</h2>
            <ul>
                <li>All subscriptions are billed <strong>monthly</strong> on a recurring basis.</li>
                <li>Payments are <strong>non-refundable</strong> once billed.</li>
                <li>You can <strong>cancel anytime</strong> to stop future charges.</li>
                <li>After cancellation, your subscription will remain active until the end of the billing cycle.</li>
            </ul>
            
            <h2>3. Cancellation Policy</h2>
            <ul>
                <li>You can cancel your subscription anytime from your <strong>account dashboard</strong>.</li>
                <li>Once canceled, you won’t be charged again.</li>
                <li>Your plan benefits will remain active until the billing cycle ends.</li>
            </ul>

            <h2>4. Refund Policy</h2>
            <p>We generally do <strong>not provide refunds</strong> for:</p>
            <ul>
                <li>Partially used subscription periods.</li>
                <li>Failure to cancel before renewal.</li>
                <li>Dissatisfaction with features (Free Plan allows testing before purchase).</li>
            </ul>
            <p>Refunds may only be issued in <strong>exceptional cases</strong>, such as:</p>
            <ul>
                <li>Duplicate payments.</li>
                <li>Technical errors on our side preventing service access.</li>
                <li>Legal requirements in your region.</li>
            </ul>

            <h2>5. Contact Us</h2>
            <p>For billing or refund-related issues, contact us at: <a href="mailto:billing@aistore.com" className="text-primary hover:underline">billing@aistore.com</a></p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
