
export type Resource = {
  title: string;
  excerpt: string;
  image: string;
  category: 'Article' | 'Guide' | 'Case Study';
  date: string;
  href: string;
};

export const resourceCategories = ['All', 'Article', 'Guide', 'Case Study'];

export const resources: Resource[] = [
  {
    title: 'Top 10 Ways Students Can Use AI for Homework',
    excerpt: 'Discover how AI can help you ace your assignments, from research to writing and problem-solving.',
    image: 'https://picsum.photos/600/400?random=30',
    category: 'Article',
    date: 'Oct 12, 2023',
    href: '#',
  },
  {
    title: 'Getting Started with AI Store: A Beginner’s Guide',
    excerpt: 'Your complete walkthrough to navigating our platform and finding the perfect tools for your needs.',
    image: 'https://picsum.photos/600/400?random=31',
    category: 'Guide',
    date: 'Oct 10, 2023',
    href: '#',
  },
  {
    title: 'How a Freelancer Doubled Income Using AI Tools',
    excerpt: 'Learn how leveraging AI for content creation, project management, and client communication led to a massive productivity boost.',
    image: 'https://picsum.photos/600/400?random=32',
    category: 'Case Study',
    date: 'Oct 8, 2023',
    href: '#',
  },
  {
    title: 'The Future of Work: Why AI Will Replace Apps, Not People',
    excerpt: 'An in-depth look at how unified AI platforms are streamlining workflows and making specialized apps obsolete.',
    image: 'https://picsum.photos/600/400?random=33',
    category: 'Article',
    date: 'Oct 5, 2023',
    href: '#',
  },
    {
    title: 'How to Automate Small Business Tasks with AI',
    excerpt: 'A step-by-step guide to identifying and automating repetitive tasks in your business to save time and money.',
    image: 'https://picsum.photos/600/400?random=34',
    category: 'Guide',
    date: 'Oct 2, 2023',
    href: '#',
  },
  {
    title: 'How to Build a Professional Resume in 2 Minutes with AI',
    excerpt: 'Forget formatting headaches. See how our Resume Builder AI can create a stunning, ATS-friendly resume instantly.',
    image: 'https://picsum.photos/600/400?random=35',
    category: 'Article',
    date: 'Sep 28, 2023',
    href: '#',
  },
];
