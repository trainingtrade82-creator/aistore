'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { aiTools, categories } from '@/lib/data';
import type { AiTool } from '@/lib/data';

const tierColorMap = {
  Free: 'bg-green-600 hover:bg-green-700',
  Pro: 'bg-blue-600 hover:bg-blue-700',
  Exclusive: 'bg-yellow-500 hover:bg-yellow-600 text-black',
};

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
          50+ AIs designed for your work, study, and life — all in one place.
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredTools.map((tool: AiTool) => (
          <Link key={tool.id} href={`/ai-tools/${tool.id}`} passHref>
            <Card className="h-full flex flex-col overflow-hidden group transition-all duration-300 hover:shadow-xl hover:-translate-y-2 cursor-pointer">
              <CardHeader className="flex flex-row items-start justify-between gap-4">
                <div className="flex items-center gap-4">
                  <tool.icon className="w-10 h-10 text-primary" />
                  <CardTitle className="text-xl font-semibold">{tool.name}</CardTitle>
                </div>
                 <Badge className={`text-xs text-primary-foreground ${tierColorMap[tool.tier]}`}>{tool.tier}</Badge>
              </CardHeader>
              <CardContent className="flex-grow">
                <CardDescription>{tool.shortDescription}</CardDescription>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
      {filteredTools.length === 0 && (
        <div className="text-center py-16 text-foreground/60">
          <p className="text-lg">No tools found.</p>
          <p>Try adjusting your search or filter.</p>
        </div>
      )}
    </div>
  );
}
