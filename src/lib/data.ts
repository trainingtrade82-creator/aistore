
import type { LucideIcon } from 'lucide-react';
import { Briefcase, PenSquare, School, Smile, Zap, FileText, Bot, Share2, Star, Heart } from 'lucide-react';

export type Category = {
  name: string;
  description: string;
  icon: LucideIcon;
  image: string;
  aiHint: string;
};

export const categories: Category[] = [
  {
    name: 'Education',
    description: 'Enhance learning and teaching with AI-powered tools.',
    icon: School,
    image: '/education.png',
    aiHint: 'education learning',
  },
  {
    name: 'Writing',
    description: 'Supercharge your writing process, from brainstorming to final draft.',
    icon: PenSquare,
    image: '/writing.png',
    aiHint: 'writing book',
  },
  {
    name: 'Business',
    description: 'Optimize your business operations and strategy with AI.',
    icon: Briefcase,
    image: '/business.png',
    aiHint: 'business meeting',
  },
  {
    name: 'Productivity',
    description: 'Get more done in less time with smart productivity tools.',
    icon: Zap,
    image: '/productive.png',
    aiHint: 'productivity charts',
  },
  {
    name: 'Lifestyle',
    description: 'Improve your daily life, from fitness to finance, with AI.',
    icon: Smile,
    image: '/lifestyle.png',
    aiHint: 'lifestyle travel',
  },
];

export type PricingPlan = {
  name: string;
  price: string;
  description: string;
  features: string[];
  isPopular: boolean;
  cta: string;
};

export const pricingPlans: PricingPlan[] = [
  {
    name: 'Free',
    price: '₹0',
    description: 'Great for testing & casual use.',
    features: [
      'Access to 30 AI tools',
      'Limited access to features',
      'No file uploads or analysis',
      'Basic processing speed',
    ],
    isPopular: false,
    cta: 'Start Free',
  },
  {
    name: 'Pro',
    price: '₹500',
    description: 'For professionals and creators.',
    features: [
      'All 50 AI tools unlocked',
      '5,000 queries/month',
      'Upload & analyze documents',
      'Export & save results',
      'Full-length, smarter responses',
      'Priority processing speed',
    ],
    isPopular: true,
    cta: 'Upgrade to Pro',
  },
  {
    name: 'Exclusive',
    price: '₹700',
    description: 'For power users and teams.',
    features: [
      'Everything in Pro',
      'Access to premium exclusive AIs',
      '20,000 queries/month',
      'Build your own Custom AI Agent',
      'Early access to new tools',
      'Premium support',
    ],
    isPopular: false,
    cta: 'Go Exclusive',
  },
];

export type Testimonial = {
  name: string;
  title: string;
  quote: string;
  avatar: string;
};

export const testimonials: Testimonial[] = [
  {
    name: 'Aarav S.',
    title: 'Class 11 Student',
    quote: 'AI Store has made studying so much easier. The math solver and study buddy tools are game-changers. I can get instant explanations without waiting for a tutor.',
    avatar: 'https://picsum.photos/100/100?random=6',
  },
  {
    name: 'Meera P.',
    title: 'Freelance Writer',
    quote: 'As a content writer, I used to juggle 4-5 different tools. With AI Store’s Pro plan, I have everything in one place — blogs, social captions, and even client pitch emails.',
    avatar: 'https://picsum.photos/100/100?random=7',
  },
  {
    name: 'Rohan K.',
    title: 'Startup Founder',
    quote: 'The Exclusive Plan is a steal. The pitch deck generator saved me weeks of work while preparing for investors. Worth every rupee.',
    avatar: 'https://picsum.photos/100/100?random=8',
  },
  {
    name: 'Sophia M.',
    title: 'Marketing Consultant (US)',
    quote: 'I live outside India, and AI Store just works seamlessly. Billing through PayPal was smooth, and the tools are incredibly useful for my daily tasks.',
    avatar: 'https://picsum.photos/100/100?random=9',
  },
];

export type AiTool = {
  id: string;
  name: string;
  icon: LucideIcon;
  tier: 'Free' | 'Pro' | 'Exclusive';
  category: string;
  shortDescription: string;
  description: string;
  features: string[];
  rating: number;
  images: string[];
};

export const aiTools: AiTool[] = [
  {
    id: 'resume-builder-ai',
    name: 'Resume Builder AI',
    icon: FileText,
    tier: 'Pro',
    category: 'Business',
    shortDescription: 'Create a professional, ATS-friendly resume in seconds.',
    description: 'Tired of struggling with resume formatting? Our AI-powered Resume Builder takes the hassle out of job applications. Simply input your experience, and the AI will generate a clean, professional, and Applicant Tracking System (ATS)-friendly resume tailored to your target industry. It ensures your resume gets past the bots and into human hands.',
    features: [
      'Generates job-ready resumes instantly.',
      'Customizable for different industries and roles.',
      'ATS-friendly formatting to pass automated screening.',
      'Exports to PDF and DOCX formats.',
    ],
    rating: 4.8,
    images: [
      'https://picsum.photos/1280/720?random=10',
      'https://picsum.photos/1280/720?random=11',
      'https://picsum.photos/1280/720?random=12',
    ],
  },
  {
    id: 'tutor-bot',
    name: 'AI Tutor Bot',
    icon: Bot,
    tier: 'Free',
    category: 'Education',
    shortDescription: 'Your personal AI tutor for any subject, available 24/7.',
    description: 'Unlock your learning potential with the AI Tutor Bot. Whether you\'re stuck on a complex math problem, need to practice a new language, or want to understand a difficult scientific concept, our AI tutor is here to help. It provides step-by-step explanations, interactive exercises, and personalized feedback to help you master any subject at your own pace.',
    features: [
      'Supports a wide range of subjects, from math to history.',
      'Interactive, conversational learning experience.',
      'Personalized feedback and progress tracking.',
      'Available 24/7 for on-demand help.',
    ],
    rating: 4.9,
    images: [
      'https://picsum.photos/1280/720?random=13',
      'https://picsum.photos/1280/720?random=14',
      'https://picsum.photos/1280/720?random=15',
    ],
  },
    {
    id: 'content-summarizer',
    name: 'Content Summarizer',
    icon: PenSquare,
    tier: 'Pro',
    category: 'Writing',
    shortDescription: 'Summarize long articles, papers, and documents instantly.',
    description: 'Overwhelmed by information? The Content Summarizer uses advanced AI to distill long texts into concise, easy-to-digest summaries. Perfect for students, researchers, and professionals, it helps you quickly grasp the main points of any document, saving you hours of reading time without losing critical information.',
    features: [
      'Summarizes articles, research papers, and reports.',
      'Adjustable summary length.',
      'Highlights key sentences and concepts.',
      'Supports text, URLs, and document uploads.',
    ],
    rating: 4.7,
    images: [
      'https://picsum.photos/1280/720?random=16',
      'https://picsum.photos/1280/720?random=17',
      'https://picsum.photos/1280/720?random=18',
    ],
  },
  {
    id: 'meeting-assistant',
    name: 'AI Meeting Assistant',
    icon: Briefcase,
    tier: 'Exclusive',
    category: 'Business',
    shortDescription: 'Transcribe, summarize, and analyze your meetings.',
    description: 'Make every meeting productive with the AI Meeting Assistant. It joins your calls to provide real-time transcription, generate concise summaries with action items, and analyze discussion patterns. Free up your team to focus on the conversation, not on taking notes. Integrates with Zoom, Google Meet, and Microsoft Teams.',
    features: [
      'Real-time meeting transcription.',
      'Automated summaries and action item detection.',
      'Speaker identification and sentiment analysis.',
      'Secure and private by design.',
    ],
    rating: 4.9,
    images: [
      'https://picsum.photos/1280/720?random=19',
      'https://picsum.photos/1280/720?random=20',
      'https://picsum.photos/1280/720?random=21',
    ],
  },
   {
    id: 'smart-scheduler',
    name: 'Smart Scheduler',
    icon: Zap,
    tier: 'Free',
    category: 'Productivity',
    shortDescription: 'Find the perfect meeting time for everyone, effortlessly.',
    description: 'End the back-and-forth of scheduling. The Smart Scheduler AI coordinates with everyone\'s calendars to find the optimal time for a meeting. It handles time zones, preferences, and busy schedules automatically, so you can book meetings with a single click.',
    features: [
      'Integrates with Google Calendar and Outlook.',
      'Automatically finds mutual availability.',
      'Handles time zone conversions seamlessly.',
      'Allows attendees to vote on preferred times.',
    ],
    rating: 4.6,
    images: [
      'https://picsum.photos/1280/720?random=22',
      'https://picsum.photos/1280/720?random=23',
    ],
  },
  {
    id: 'travel-planner',
    name: 'AI Travel Planner',
    icon: Smile,
    tier: 'Pro',
    category: 'Lifestyle',
    shortDescription: 'Plan your perfect trip with personalized AI recommendations.',
    description: 'From weekend getaways to globetrotting adventures, aistore is your ultimate companion. It curates personalized itineraries based on your interests, budget, and travel style. Discover hidden gems, book flights and hotels, and organize all your reservations in one place.',
    features: [
      'Personalized itinerary generation.',
      'Flight and hotel booking suggestions.',
      'Restaurant and activity recommendations.',
      'Offline maps and travel document storage.',
    ],
    rating: 4.8,
    images: [
      'https://picsum.photos/1280/720?random=24',
      'https://picsum.photos/1280/720?random=25',
      'https://picsum.photos/1280/720?random=26',
    ],
  },
];
