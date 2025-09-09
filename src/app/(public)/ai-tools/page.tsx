
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { aiTools, categories } from '@/lib/data';
import type { AiTool } from '@/lib/data';
import { ArrowRight } from 'lucide-react';

const tierColorMap = {
  Free: 'bg-green-600 hover:bg-green-700',
  Pro: 'bg-blue-600 hover:bg-blue-700',
  Exclusive: 'bg-purple-600 hover:bg-purple-700',
};

const ToolCard = ({ tool }: { tool: AiTool }) => (
    <Link href={`/ai-tools/${tool.id}`} className="block h-full">
        <Card className="group flex flex-col h-full overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <CardHeader>
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg">
                        <tool.icon className="w-8 h-8 text-primary" />
                    </div>
                    <div className="flex-grow">
                         <CardTitle className="text-xl font-bold">{tool.name}</CardTitle>
                    </div>
                     <Badge className={`text-sm text-white ${tierColorMap[tool.tier]}`}>{tool.tier}</Badge>
                </div>
            </CardHeader>
            <CardContent className="flex flex-col flex-grow">
                <CardDescription className="flex-grow">{tool.shortDescription}</CardDescription>
                <div className="mt-4">
                     <Button variant="outline" className="w-full">Use <ArrowRight className="ml-2 h-4 w-4" /></Button>
                </div>
            </CardContent>
        </Card>
    </Link>
)


export default function AiToolsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredTools = aiTools.filter(tool => {
    const matchesCategory = selectedCategory === 'All' || tool.category === selectedCategory;
    const matchesSearch = tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          tool.shortDescription.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="container py-12 px-4 md:px-6">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl font-headline">
          Explore AI Tools
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-foreground/80 md:text-xl">
          Discover a world of AI possibilities. Find the perfect tool for any task, all in one place.
        </p>
      </div>

      <div className="mb-8 flex flex-col md:flex-row items-center gap-4">
        <Input
          placeholder="Search AI tools..."
          className="flex-grow"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="flex gap-2 flex-wrap justify-center">
          <Button
            variant={selectedCategory === 'All' ? 'default' : 'outline'}
            onClick={() => setSelectedCategory('All')}
          >
            All
          </Button>
          {categories.map(category => (
            <Button
              key={category.name}
              variant={selectedCategory === category.name ? 'default' : 'outline'}
              onClick={() => setSelectedCategory(category.name)}
            >
              {category.name}
            </Button>
          ))}
        </div>
      </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTools.map(tool => (
                <ToolCard key={tool.id} tool={tool} />
            ))}
        </div>

      {filteredTools.length === 0 && (
        <div className="text-center py-16 text-foreground/60">
          <p className="text-lg">No tools found.</p>
          <p>Try a different search term or category.</p>
        </div>
      )}
    </div>
  );
}
