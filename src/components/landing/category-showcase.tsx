import Image from 'next/image';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { categories } from '@/lib/data';

export default function CategoryShowcase() {
  return (
    <section id="features" className="py-20 sm:py-32">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">
            AI for Every Task
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-foreground/80 md:text-xl">
            Explore categories tailored to your specific needs, and find the perfect AI to get the job done.
          </p>
        </div>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.slice(0, 3).map((category) => (
            <Card key={category.name} className="overflow-hidden group transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
              <div className="aspect-video overflow-hidden">
                <Image
                  src={category.image}
                  alt={category.name}
                  data-ai-hint={category.aiHint}
                  width={600}
                  height={400}
                  className="object-cover object-center w-full h-full transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <category.icon className="w-8 h-8 text-primary" />
                  <CardTitle className="text-2xl font-semibold">{category.name}</CardTitle>
                </div>
                <CardDescription className="pt-2">{category.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            {categories.slice(3).map((category) => (
            <Card key={category.name} className="overflow-hidden group transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
              <div className="aspect-video overflow-hidden">
                <Image
                  src={category.image}
                  alt={category.name}
                  data-ai-hint={category.aiHint}
                  width={600}
                  height={400}
                  className="object-cover object-center w-full h-full transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <category.icon className="w-8 h-8 text-primary" />
                  <CardTitle className="text-2xl font-semibold">{category.name}</CardTitle>
                </div>
                <CardDescription className="pt-2">{category.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
