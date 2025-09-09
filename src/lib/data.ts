
import type { LucideIcon } from 'lucide-react';
import { Briefcase, PenSquare, School, Smile, Zap, FileText, Bot, Share2, Star, Heart } from 'lucide-react';

export type Category = {
  name: string;
  description: string;
  icon: LucideIcon;
  image: string;
  aiHint: string;
};

export const categories: Category[] = [];

export type PricingPlan = {
  name: string;
  price: string;
  description: string;
  features: string[];
  isPopular: boolean;
  cta: string;
};

export const pricingPlans: PricingPlan[] = [];

export type Testimonial = {
  name: string;
  title: string;
  quote: string;
  avatar: string;
};

export const testimonials: Testimonial[] = [];

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

export const aiTools: AiTool[] = [];
