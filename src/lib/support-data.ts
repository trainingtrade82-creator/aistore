
import { LifeBuoy, CreditCard, Settings, Bug, Shield, Mail, BookOpen, MessageSquare, Twitter } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export const helpCategories = [
  {
    title: 'Getting Started',
    description: 'Account setup, login, first steps.',
    icon: BookOpen,
    slug: 'getting-started'
  },
  {
    title: 'Plans & Billing',
    description: 'Free vs Pro vs Exclusive, payments, refunds.',
    icon: CreditCard,
    slug: 'plans-billing'
  },
  {
    title: 'AI Tools',
    description: 'How to use each tool, limits, troubleshooting.',
    icon: Settings,
    slug: 'ai-tools'
  },
  {
    title: 'Technical Issues',
    description: 'Bugs, errors, performance problems.',
    icon: Bug,
    slug: 'technical-issues'
  },
  {
    title: 'Security & Privacy',
    description: 'Data usage, encryption, trust.',
    icon: Shield,
    slug: 'security-privacy'
  },
  {
    title: 'Contact Support',
    description: 'Email / chat.',
    icon: Mail,
    slug: 'contact-support'
  },
];

export const faqs = [
  {
    question: "What’s included in the Free Plan?",
    answer: "The Free Plan gives you access to 30 AI tools with limited usage. It’s perfect for testing the platform and exploring what AI Store can do. Advanced features like file uploads, premium AIs, and priority speed are only available in Pro or Exclusive.",
  },
  {
    question: "How many AI tools are available in total?",
    answer: "AI Store currently offers 50 AI tools across categories like education, writing, business, productivity, and fun. Pro and Exclusive members unlock all of them.",
  },
  {
    question: "What’s the difference between Pro (₹500) and Exclusive (₹700)?",
    answer: "The Pro Plan unlocks all 50 AI tools, full responses, file uploads, 5,000 queries/month, and priority processing. The Exclusive Plan includes everything in Pro, plus premium business AIs, 20,000 queries/month, a custom AI agent builder, early access to new tools, and premium support.",
  },
  {
    question: "Do you support UPI payments in India?",
    answer: "Yes ✅ — we support UPI, debit/credit cards, and PayPal for international users.",
  },
  {
    question: "Can I cancel my subscription anytime?",
    answer: "Yes. You can cancel anytime from your account dashboard. You’ll still have access until the end of your billing cycle.",
  },
  {
    question: "Do unused queries roll over to the next month?",
    answer: "No. Query limits reset every month. This keeps the system fair and balanced for all users.",
  },
  {
    question: "Is my data safe?",
    answer: "Yes. We never sell or misuse your data. All conversations are encrypted, and sensitive information (like payment details) is handled securely via trusted providers like Stripe.",
  },
  {
    question: "Can I upgrade from Free to Pro or Exclusive later?",
    answer: "Absolutely. You can upgrade instantly from your dashboard — your plan will change right away.",
  },
  {
    question: "Do you offer refunds?",
    answer: "We do not offer refunds for monthly plans once billed. However, you can cancel anytime and will not be charged for the next cycle.",
  },
  {
    question: "Do I need to install anything?",
    answer: "No installation required. AI Store is 100% web-based and works on desktop, tablet, and mobile. Just log in and start using the tools.",
  },
  {
    question: "Are the AI tools unlimited to use?",
    answer: "Free has limited access. Pro offers up to 5,000 queries/month (enough for most users). Exclusive offers 20,000 queries/month (virtually unlimited for power users).",
  },
  {
    question: "Who can use AI Store?",
    answer: "Anyone — students, professionals, freelancers, entrepreneurs, or just curious learners. Our AIs are designed for everyday needs, from studying and writing to business and personal growth.",
  },
];


type SupportTopic = {
    title: string;
    content: string;
}

type SupportArticle = {
    slug: string;
    icon: LucideIcon;
    title: string;
    intro: string;
    topics: SupportTopic[];
}

export const supportArticles: SupportArticle[] = [
    {
        slug: 'getting-started',
        icon: BookOpen,
        title: 'Getting Started with AI Store',
        intro: 'Welcome to AI Store! Follow these steps to set up your account and start exploring 50+ powerful AI tools.',
        topics: [
            { title: 'Create an Account', content: '<p>Go to [Sign Up].</p><p>Enter your email + password OR use Google login.</p><p>Verify your email.</p>' },
            { title: 'Choose a Plan', content: '<p>Start free with 30 AI tools.</p><p>Upgrade anytime to Pro (₹500) or Exclusive (₹700).</p>' },
            { title: 'Accessing AI Tools', content: '<p>Log in → Navigate to *AI Tools* page.</p><p>Select a tool → Read its description → Click **Use Now**.</p>' },
            { title: 'Managing Your Account', content: '<p>Update profile.</p><p>Change password.</p><p>View plan details.</p>' },
        ]
    },
    {
        slug: 'plans-billing',
        icon: CreditCard,
        title: 'Plans, Payments & Billing',
        intro: 'Here’s everything you need to know about subscriptions and payments.',
        topics: [
            { title: 'Plans Overview', content: '<p>Free → 30 tools, limited queries.</p><p>Pro → All 50 tools, 5,000 queries/month, file uploads.</p><p>Exclusive → All tools, premium AIs, 20,000 queries, early access.</p>' },
            { title: 'Accepted Payment Methods', content: '<p>India: UPI, Debit/Credit Cards.</p><p>Global: Stripe, PayPal.</p>' },
            { title: 'Billing Cycle', content: '<p>Monthly, auto-renewed.</p><p>Cancel anytime.</p>' },
            { title: 'Refund Policy', content: '<p>No refunds after billing.</p><p>Cancel before next cycle to avoid charges.</p>' },
        ]
    },
    {
        slug: 'ai-tools',
        icon: Settings,
        title: 'Using AI Tools',
        intro: 'AI Store offers 50+ AI tools across categories. Here’s how to get the best out of them.',
        topics: [
            { title: 'How to Use', content: '<p>Select a tool → Read description → Click **Use Now**.</p><p>Input your query → Get instant results.</p>' },
            { title: 'Limits', content: '<p>Free: Limited access.</p><p>Pro: 5,000 queries/month.</p><p>Exclusive: 20,000 queries/month.</p>' },
            { title: 'Common Tool Categories', content: '<p>Writing & Content (blogs, resumes, social media).</p><p>Education (math solver, coding helper, study buddy).</p><p>Productivity (meeting notes, summaries, task manager).</p><p>Business (pitch deck maker, financial analysis, strategy AI).</p><p>Fun (chess AI, story generator, meme maker).</p>' },
        ]
    },
    {
        slug: 'technical-issues',
        icon: Bug,
        title: 'Fixing Technical Issues',
        intro: 'Run into problems? Here are quick solutions.',
        topics: [
            { title: 'Login Issues', content: '<p>Reset your password.</p><p>Clear browser cache.</p><p>Try a different browser.</p>' },
            { title: 'Tool Not Loading', content: '<p>Check internet connection.</p><p>Refresh the page.</p><p>Make sure you’re within query limits.</p>' },
            { title: 'Slow Responses', content: '<p>Free users: Standard processing.</p><p>Pro/Exclusive: Faster speed. (Upgrade for priority.)</p>' },
            { title: 'Still Stuck?', content: '<p>Contact Support → provide screenshots/error messages.</p>' },
        ]
    },
    {
        slug: 'security-privacy',
        icon: Shield,
        title: 'Security & Privacy at AI Store',
        intro: 'Your trust matters. Here’s how we keep your data safe.',
        topics: [
            { title: 'Data Usage', content: '<p>We don’t sell or misuse your data.</p><p>Only used to improve your experience.</p>' },
            { title: 'Encryption', content: '<p>All chats encrypted in transit (SSL).</p><p>Payments handled securely via Stripe/UPI.</p>' },
            { title: 'Privacy Controls', content: '<p>Delete your account anytime.</p><p>Manage saved history in your dashboard.</p>' },
        ]
    },
    {
        slug: 'contact-support',
        icon: Mail,
        title: 'Contact Support',
        intro: 'Need help? Reach us anytime.',
        topics: [
            { title: 'Options', content: '<p>📧 **Email:** support@aistore.com</p><p>💬 **Live Chat:** Coming soon</p><p>🐦 **Twitter/X:** @AIStoreHelp (optional)</p>' },
            { title: 'Support Hours', content: '<p>Monday–Friday: 9 AM – 9 PM IST</p><p>Response time: Within 24 hours</p>' },
            { title: 'Before contacting us, check FAQs and Guides — your answer might already be there.', content: '' },
        ]
    }
];
