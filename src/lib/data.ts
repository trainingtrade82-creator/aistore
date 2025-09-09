
import type { LucideIcon } from 'lucide-react';
import { Briefcase, PenSquare, School, Smile, Zap, FileText, Bot, Share2, Star, Heart, Mail } from 'lucide-react';

export type Category = {
  name: string;
  description: string;
  icon: LucideIcon;
  image: string;
  aiHint: string;
};

export const categories: Category[] = [
    {
        name: 'Writing',
        description: 'Craft compelling content, from emails to essays.',
        icon: PenSquare,
        image: 'https://picsum.photos/600/400?random=10',
        aiHint: 'writing tools illustration'
    },
    {
        name: 'Education',
        description: 'Tools to help you learn, study, and ace your exams.',
        icon: School,
        image: 'https://picsum.photos/600/400?random=11',
        aiHint: 'education tools illustration'
    },
    {
        name: 'Business',
        description: 'Boost your productivity and growth with AI-powered business tools.',
        icon: Briefcase,
        image: 'https://picsum.photos/600/400?random=12',
        aiHint: 'business tools illustration'
    },
    {
        name: 'Productivity',
        description: 'Work smarter, not harder, with AI to automate your tasks.',
        icon: Zap,
        image: 'https://picsum.photos/600/400?random=13',
        aiHint: 'productivity tools illustration'
    },
    {
        name: 'Lifestyle',
        description: 'Fun and creative tools for your daily life.',
        icon: Smile,
        image: 'https://picsum.photos/600/400?random=14',
        aiHint: 'lifestyle tools illustration'
    }
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
    description: 'For anyone to get started with AI.',
    features: [
      'Access to 30 basic AI tools',
      '15 generations/month',
      'Standard processing speed',
      'Copy to clipboard only',
    ],
    isPopular: false,
    cta: 'Start for Free',
  },
  {
    name: 'Pro',
    price: '₹500',
    description: 'For professionals and power users.',
    features: [
      'Access to all 50+ AI tools',
      '5,000 queries/month',
      'Gmail/SMTP Integration',
      'Save and export results',
      'A/B test variations',
      'Priority processing speed',
    ],
    isPopular: true,
    cta: 'Upgrade to Pro',
  },
  {
    name: 'Exclusive',
    price: '₹700',
    description: 'For businesses and teams.',
    features: [
      'Everything in Pro',
      '20,000 queries/month',
      'Bulk mail merge features',
      'Advanced analytics',
      'Custom AI agent builder',
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
        name: 'Priya Sharma',
        title: 'Content Creator',
        quote: 'AI Store has revolutionized my workflow. I can generate high-quality content in a fraction of the time.',
        avatar: 'https://picsum.photos/100/100?random=1'
    },
    {
        name: 'Rahul Verma',
        title: 'Startup Founder',
        quote: 'The business tools are a game-changer. I get market insights and financial analysis that would have cost thousands.',
        avatar: 'https://picsum.photos/100/100?random=2'
    },
    {
        name: 'Ananya Gupta',
        title: 'Student',
        quote: 'The education tools are like having a personal tutor. I understand complex topics much better now.',
        avatar: 'https://picsum.photos/100/100?random=3'
    },
    {
        name: 'Amit Singh',
        title: 'Marketing Manager',
        quote: 'We use AI Store for everything from ad copy to social media campaigns. It\'s an indispensable tool for our team.',
        avatar: 'https://picsum.photos/100/100?random=4'
    }
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
    id: 'email-writer',
    name: 'Email Writer / Reply Generator',
    icon: Mail,
    tier: 'Pro',
    category: 'Writing',
    shortDescription: 'Draft, polish, and send professional emails in seconds.',
    description: 'Write professional emails in seconds — create, polish, or auto-reply with one click. Save templates, schedule sends, and integrate with Gmail.',
    features: [
        'Compose from scratch',
        'AI-powered reply generation',
        'Multiple tone selections',
        'A/B test variations',
        'Save and use templates',
        'Schedule and send directly via Gmail',
    ],
    rating: 4.8,
    images: [
        'https://picsum.photos/1280/720?random=20',
        'https://picsum.photos/1280/720?random=21',
        'https://picsum.photos/1280/720?random=22',
    ]
  }
];
