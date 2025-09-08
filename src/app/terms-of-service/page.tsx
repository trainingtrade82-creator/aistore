
import Link from 'next/link';
import Header from '@/components/landing/header';
import Footer from '@/components/landing/footer';

export default function TermsOfServicePage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow py-16 sm:py-24">
        <div className="container max-w-4xl mx-auto px-4">
          <header className="mb-12 text-center">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">Terms of Service</h1>
            <p className="mt-4 text-lg text-foreground/80">Effective Date: October 26, 2023</p>
          </header>
          <div className="prose prose-lg max-w-none text-foreground/90 mx-auto">
            <p>Welcome to AI Store. By accessing or using our website, services, and AI tools, you agree to these Terms of Service. Please read them carefully.</p>

            <h2>1. Acceptance of Terms</h2>
            <p>By creating an account or using AI Store, you agree to comply with these Terms. If you do not agree, you must not use our services.</p>

            <h2>2. Services Provided</h2>
            <p>AI Store offers access to 50+ AI tools across education, business, writing, productivity, and entertainment. Features vary based on your chosen plan (Free, Pro, Exclusive).</p>

            <h2>3. Account Responsibilities</h2>
            <ul>
              <li>You must provide accurate information when creating an account.</li>
              <li>You are responsible for keeping your login credentials secure.</li>
              <li>You must be at least <strong>13 years old</strong> to use AI Store.</li>
            </ul>

            <h2>4. Subscription & Billing</h2>
            <ul>
              <li>Plans are billed monthly on a recurring basis.</li>
              <li>You may cancel anytime through your account dashboard.</li>
              <li>Refunds are handled under our <Link href="/refund-policy" className="text-primary hover:underline">Refund & Cancellation Policy</Link>.</li>
            </ul>

            <h2>5. Acceptable Use</h2>
            <p>You agree <strong>not</strong> to:</p>
            <ul>
                <li>Use AI Store for illegal or harmful purposes.</li>
                <li>Generate or distribute harmful, misleading, or offensive content.</li>
                <li>Attempt to hack, overload, or disrupt the platform.</li>
                <li>Share your account credentials with others.</li>
            </ul>
            <p>Violation may result in account suspension or termination.</p>

            <h2>6. Intellectual Property</h2>
            <ul>
                <li>All content, design, and AI tools on AI Store are our intellectual property.</li>
                <li>You may use them for personal or business purposes, but not resell or redistribute them without permission.</li>
            </ul>

            <h2>7. AI Output Disclaimer</h2>
            <ul>
                <li>AI responses are generated automatically and may not always be accurate or reliable.</li>
                <li>You are responsible for verifying important information.</li>
                <li>AI Store is <strong>not liable</strong> for losses or damages caused by reliance on AI outputs.</li>
            </ul>

            <h2>8. Limitation of Liability</h2>
            <ul>
                <li>AI Store is provided “as is” without warranties of any kind.</li>
                <li>We are not responsible for downtime, technical issues, or third-party service interruptions.</li>
                <li>Our liability is limited to the maximum extent permitted by law.</li>
            </ul>

            <h2>9. Privacy & Data</h2>
            <p>Your data is handled under our <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link>. By using AI Store, you consent to our data practices.</p>

            <h2>10. Cookies & Tracking</h2>
            <ul>
                <li>AI Store uses cookies to improve your browsing experience.</li>
                <li>Cookies help us remember your login, analyze site usage, and personalize your experience.</li>
                <li>By using AI Store, you consent to our use of cookies.</li>
                <li>You can disable cookies in your browser settings, but some features may not work properly.</li>
            </ul>

            <h2>11. Changes to Terms</h2>
            <p>We may update these Terms from time to time. Continued use of AI Store means you accept the updated Terms.</p>

            <h2>12. Contact Us</h2>
            <p>For questions about these Terms, contact us at: <a href="mailto:legal@aistore.com" className="text-primary hover:underline">legal@aistore.com</a></p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
