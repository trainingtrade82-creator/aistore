
import type { LucideIcon } from 'lucide-react';
import { Briefcase, PenSquare, School, Smile, Zap, FileText, Bot, Share2, Star, Heart, Mail, Image, Film, Mic } from 'lucide-react';

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
  },
  {
    id: 'blog-writer',
    name: 'Blog Post Writer',
    icon: FileText,
    category: 'Writing',
    shortDescription: 'Generate long-form articles and blog posts from a simple prompt.',
    description: 'Create high-quality, SEO-friendly blog posts and articles in minutes. Just provide a topic and keywords, and let the AI handle the rest.',
    features: [
        'Generates full-length articles',
        'SEO keyword optimization',
        'Multiple writing styles',
        'Includes meta descriptions',
    ],
    rating: 4.7,
    images: [
        'https://picsum.photos/1280/720?random=23',
    ]
  },
  {
    id: 'image-generator',
    name: 'Image Generator',
    icon: Image,
    category: 'Lifestyle',
    shortDescription: 'Create stunning visuals and art from text descriptions.',
    description: 'Turn your ideas into beautiful images. Describe what you want to see, and our AI will generate unique, high-resolution artwork for you.',
    features: [
        'Text-to-image generation',
        'Multiple art styles',
        'High-resolution output',
        'Commercial use license',
    ],
    rating: 4.9,
    images: [
        'https://picsum.photos/1280/720?random=24',
    ]
  },
   {
    id: 'resume-builder',
    name: 'Resume Builder',
    icon: Briefcase,
    category: 'Productivity',
    shortDescription: 'Build a professional resume in minutes with AI assistance.',
    description: 'Create a job-winning resume effortlessly. Our AI helps you craft compelling bullet points and choose the right template for your industry.',
    features: [
        'AI-powered content suggestions',
        'Professional templates',
        'PDF and Word export',
        'Cover letter generator',
    ],
    rating: 4.6,
    images: [
        'https://picsum.photos/1280/720?random=25',
    ]
  },
  {
    id: 'podcast-script-writer',
    name: 'Podcast Script Writer',
    icon: Mic,
    category: 'Writing',
    shortDescription: 'Generate engaging scripts for your podcast episodes.',
    description: 'Never run out of ideas for your podcast. Generate complete scripts, talking points, and interview questions on any topic.',
    features: [
        'Creates full episode scripts',
        'Generates show notes',
        'Suggests segment ideas',
        'Supports multiple speakers',
    ],
    rating: 4.5,
    images: [
        'https://picsum.photos/1280/720?random=26',
    ]
  },
  {
    id: 'video-script-writer',
    name: 'Video Script Writer',
    icon: Film,
    category: 'Writing',
    shortDescription: 'Create compelling scripts for YouTube, TikTok, and Reels.',
    description: 'Go viral with AI-powered video scripts. Get hooks, talking points, and calls-to-action tailored for short-form or long-form video content.',
    features: [
        'Optimized for social media platforms',
        'Generates hooks and CTAs',
        'Scene and shot suggestions',
        'Supports various video formats',
    ],
    rating: 4.7,
    images: [
        'https://picsum.photos/1280/720?random=27',
    ]
  }
];
