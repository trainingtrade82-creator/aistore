import type { LucideIcon } from 'lucide-react';
import { Briefcase, PenSquare, School, Smile, Zap } from 'lucide-react';

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
    image: '/productiv.png',
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
    price: '$0',
    description: 'Get started with our basic features.',
    features: ['Access to 5 AI tools', '10 requests per day', 'Basic support'],
    isPopular: false,
    cta: 'Get Started',
  },
  {
    name: 'Pro',
    price: '$29',
    description: 'Unlock the full potential of AI.',
    features: ['Access to 50+ AI tools', 'Unlimited requests', 'Priority support', 'Exclusive new tools'],
    isPopular: true,
    cta: 'Upgrade to Pro',
  },
  {
    name: 'Exclusive',
    price: '$99',
    description: 'For power users and teams.',
    features: ['All Pro features', 'Dedicated account manager', 'API access', 'Team collaboration'],
    isPopular: false,
    cta: 'Contact Sales',
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
    name: 'Sarah L.',
    title: 'Content Creator',
    quote: 'AI Store has revolutionized my workflow. The writing tools are a game-changer for brainstorming and editing. I\'m producing content faster than ever!',
    avatar: 'https://picsum.photos/100/100?random=6',
  },
  {
    name: 'Mark C.',
    title: 'Startup Founder',
    quote: 'The business and productivity tools are indispensable for my team. We\'ve automated so many tedious tasks, allowing us to focus on growth.',
    avatar: 'https://picsum.photos/100/100?random=7',
  },
  {
    name: 'Jessica P.',
    title: 'PhD Student',
    quote: 'As a student, the education tools are incredible. From summarizing research papers to generating study guides, AI Store is my secret weapon for academic success.',
    avatar: 'https://picsum.photos/100/100?random=8',
  },
  {
    name: 'David H.',
    title: 'Freelance Developer',
    quote: 'The Pro plan is worth every penny. Access to the latest AI tools and the API has given me a competitive edge in my projects.',
    avatar: 'https://picsum.photos/100/100?random=9',
  },
];
