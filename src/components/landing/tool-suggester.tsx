'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { suggestAiTools, type SuggestAiToolsOutput } from '@/ai/flows/suggest-ai-tools';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Wand2, Loader2, AlertCircle, Award } from 'lucide-react';
import { Skeleton } from '../ui/skeleton';

const FormSchema = z.object({
  taskDescription: z.string().min(15, {
    message: 'Please describe your task in at least 15 characters to get the best suggestions.',
  }),
});

export default function ToolSuggester() {
  const [suggestions, setSuggestions] = useState<SuggestAiToolsOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      taskDescription: '',
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsLoading(true);
    setError(null);
    setSuggestions(null);
    try {
      const result = await suggestAiTools(data);
      setSuggestions(result);
    } catch (e) {
      setError("We encountered an issue while generating suggestions. Please try again later.");
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="py-20 sm:py-32 bg-secondary/50 flex items-center justify-center">
      <div className="container max-w-4xl px-4 md:px-6">
        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <Wand2 className="mx-auto h-12 w-12 text-primary" />
            <CardTitle className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline mt-4">
              Find the Perfect AI Tool
            </CardTitle>
            <CardDescription className="mt-2 text-foreground/80 md:text-lg">
              Describe what you want to accomplish, and our AI will recommend the best tools for the job.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="taskDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder="e.g., 'I need to create a marketing presentation for a new product launch.'"
                          className="min-h-[120px] resize-none text-base"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full bg-accent text-accent-foreground hover:bg-accent/90" size="lg" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Thinking...
                    </>
                  ) : (
                    'Get Suggestions'
                  )}
                </Button>
              </form>
            </Form>
            <div className="mt-8">
              {isLoading && (
                 <div className="space-y-4">
                    <Skeleton className="h-24 w-full" />
                    <Skeleton className="h-24 w-full" />
                    <Skeleton className="h-24 w-full" />
                 </div>
              )}
              {error && (
                <div className="flex items-center justify-center rounded-md border border-destructive/50 bg-destructive/10 p-4 text-destructive">
                  <AlertCircle className="mr-3 h-5 w-5" />
                  <p>{error}</p>
                </div>
              )}
              {suggestions && (
                <div className="space-y-4">
                  <h3 className="text-2xl font-semibold text-center">Here are your top suggestions:</h3>
                  {suggestions.map((tool) => (
                    <Card key={tool.rank} className="flex flex-col sm:flex-row items-start gap-4 p-4 transition-shadow hover:shadow-md">
                      <div className="flex items-center justify-center bg-primary/10 text-primary rounded-lg p-3">
                         <Award className="w-8 h-8" />
                         <span className="text-2xl font-bold ml-2">#{tool.rank}</span>
                      </div>
                      <div className="flex-grow">
                        <h4 className="font-bold text-lg">{tool.toolName}</h4>
                        <p className="text-foreground/80">{tool.description}</p>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
