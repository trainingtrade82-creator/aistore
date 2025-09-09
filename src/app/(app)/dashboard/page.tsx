
'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { aiTools, categories } from '@/lib/data';
import Link from 'next/link';
import { Loader2 } from 'lucide-react';

function AuthProtection({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    const checkAuth = () => {
      if (user === undefined) {
        // Still checking, do nothing
        return;
      }
      
      if (user === null) {
        // No user found, redirect to login
        router.push('/login');
        return;
      }
      
      setLoading(false);
    };

    // A small delay to prevent a flicker while auth state resolves
    const timer = setTimeout(checkAuth, 100);

    return () => clearTimeout(timer);
  }, [user, router]);

  if (loading) {
    return (
        <div className="flex h-screen w-full items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
    );
  }

  // Only render children if user is authenticated
  if (user) {
    return <>{children}</>;
  }

  return null; // Render nothing while redirecting
}

function DashboardContent() {
  return (
    <div className="p-4 sm:p-6">
      <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4">Dashboard</h1>
      <p className="text-lg text-muted-foreground mb-8">
        Welcome back! Explore your tools and continue creating.
      </p>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Quick Start</CardTitle>
            <CardDescription>Jump right back into your favorite tools.</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {aiTools.slice(0, 5).map(tool => (
              <Link href={`/ai-tools/${tool.id}`} key={tool.id}>
                <div className="flex flex-col items-center text-center p-4 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors cursor-pointer h-full">
                  <tool.icon className="w-8 h-8 text-primary mb-2" />
                  <span className="text-sm font-medium">{tool.name}</span>
                </div>
              </Link>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>All AI Tools</CardTitle>
              <CardDescription>Browse all 50+ available tools.</CardDescription>
            </div>
            <Button asChild>
              <Link href="/ai-tools">View All</Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {categories.map(category => (
                <div key={category.name}>
                  <h3 className="text-lg font-semibold mb-2 flex items-center">
                    <category.icon className="w-5 h-5 mr-2 text-primary" />
                    {category.name}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {aiTools.filter(t => t.category === category.name).slice(0, 4).map(tool => (
                      <Link href={`/ai-tools/${tool.id}`} key={tool.id}>
                        <Card className="h-full hover:shadow-md transition-shadow">
                          <CardContent className="p-4 flex items-center gap-4">
                            <tool.icon className="w-6 h-6 text-muted-foreground" />
                            <div>
                              <p className="font-semibold">{tool.name}</p>
                              <p className="text-xs text-muted-foreground">{tool.shortDescription}</p>
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <AuthProtection>
      <DashboardContent />
    </AuthProtection>
  )
}
