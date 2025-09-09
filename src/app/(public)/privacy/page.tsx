
export default function PrivacyPolicyPage() {
  return (
    <div className="flex-grow py-16 sm:py-24">
      <div className="container max-w-4xl mx-auto px-4">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">Privacy Policy</h1>
          <p className="mt-4 text-lg text-foreground/80">Effective Date: October 26, 2023</p>
        </header>
        <div className="prose prose-lg max-w-none text-foreground/90 mx-auto">
          <p>At AI Store, your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your personal information when you use our website, services, and AI tools.</p>

          <h2>1. Information We Collect</h2>
          <p>When you use AI Store, we may collect:</p>
          <ul>
            <li><strong>Account Information:</strong> Name, email, and password.</li>
            <li><strong>Payment Information:</strong> UPI, card details, or PayPal (processed securely via third-party providers — we do not store full payment data).</li>
            <li><strong>Usage Data:</strong> AI tool queries, clicks, and session details for improving our services.</li>
            <li><strong>Device Information:</strong> Browser type, IP address, operating system.</li>
          </ul>

          <h2>2. How We Use Your Information</h2>
          <p>We use your data to:</p>
          <ul>
              <li>Provide access to AI tools and services.</li>
              <li>Process payments and manage subscriptions.</li>
              <li>Improve AI performance and user experience.</li>
              <li>Communicate updates, promotions, or support information.</li>
              <li>Detect fraud, abuse, or technical issues.</li>
          </ul>

          <h2>3. Data Security</h2>
          <ul>
              <li>All data is encrypted in transit (SSL).</li>
              <li>Payments are handled by trusted providers (Stripe, Razorpay, PayPal).</li>
              <li>Access to data is limited to authorized personnel only.</li>
          </ul>

          <h2>4. Sharing of Information</h2>
          <p>We do not sell or trade your personal data. We may share information only with:</p>
          <ul>
              <li><strong>Payment providers</strong> (Stripe, UPI, PayPal) to process transactions.</li>
              <li><strong>Service providers</strong> (cloud hosting, analytics) to run our platform.</li>
              <li><strong>Legal authorities</strong> if required by law.</li>
          </ul>

          <h2>5. Cookies & Tracking</h2>
          <p>We use cookies to:</p>
          <ul>
              <li>Remember your login session.</li>
              <li>Analyze site usage (Google Analytics or similar).</li>
              <li>Improve site functionality.</li>
          </ul>
          <p>You can disable cookies in your browser settings, but some features may not work properly.</p>

          <h2>6. Your Rights</h2>
          <p>You have the right to:</p>
          <ul>
              <li>Access and update your account details.</li>
              <li>Request account deletion at any time.</li>
              <li>Opt out of marketing emails by clicking “unsubscribe.”</li>
              <li>Ask how your data is used.</li>
          </ul>

          <h2>7. Data Retention</h2>
          <p>We keep your account data as long as your account is active. If you delete your account, we remove associated personal data, except where legally required.</p>

          <h2>8. Children’s Privacy</h2>
          <p>AI Store is not intended for children under 13. We do not knowingly collect information from minors.</p>

          <h2>9. Updates to this Policy</h2>
          <p>We may update this Privacy Policy from time to time. Changes will be posted on this page with a new effective date.</p>

          <h2>10. Contact Us</h2>
          <p>If you have questions about privacy, contact us at: <a href="mailto:privacy@aistore.com" className="text-primary hover:underline">privacy@aistore.com</a></p>
        </div>
      </div>
    </div>
  );
}
