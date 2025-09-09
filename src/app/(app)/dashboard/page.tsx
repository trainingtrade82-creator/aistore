
'use client';

import {
  Activity,
  ArrowRight,
  CreditCard,
  LayoutGrid,
  Loader2,
  Mail,
  PlusCircle,
  Sparkles,
  Star,
  Users,
  ClipboardList,
  CheckCircle
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';

const pinnedTools = [
  { name: 'Email Writer', icon: Mail, href: '/dashboard' },
  { name: 'Meeting Notes AI', icon: ClipboardList, href: '/meeting-notes-ai' },
  { name: 'Resume Builder', icon: Users, href: '#' },
];

const quickActions = [
    { name: 'Write Email', icon: Mail },
    { name: 'Summarize Meeting', icon: ClipboardList },
    { name: 'Generate Report', icon: LayoutGrid },
    { name: 'Analyze Data', icon: Sparkles },
]

const recentActivities = [
  {
    description: 'Generated a sales pitch email',
    time: '10:45 AM',
    icon: Mail,
  },
  {
    description: 'Uploaded "Q3 Planning Session" for transcription',
    time: 'Yesterday',
    icon: ClipboardList,
  },
  {
    description: 'Generated a new blog post draft',
    time: '2 days ago',
    icon: LayoutGrid,
  },
];

const chartData = [
  { month: 'January', desktop: 186, mobile: 80 },
  { month: 'February', desktop: 305, mobile: 200 },
  { month: 'March', desktop: 237, mobile: 120 },
  { month: 'April', desktop: 73, mobile: 190 },
  { month: 'May', desktop: 209, mobile: 130 },
  { month: 'June', desktop: 214, mobile: 140 },
];

const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: 'hsl(var(--primary))',
  },
  mobile: {
    label: 'Mobile',
    color: 'hsl(var(--secondary))',
  },
} satisfies ChartConfig;

export default function DashboardPage() {
    const { user } = useAuth();
    const displayName = user?.displayName?.split(' ')[0] || 'User';

    if (!user) {
        return (
            <div className="flex h-screen w-full items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }
  
  return (
    <div className="flex-grow bg-secondary/40 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight font-headline">
              Good Morning, {displayName} 👋
            </h1>
            <p className="text-muted-foreground">
              Here's your personal AI control center.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-lg py-1 px-4 border-accent text-accent">
              <Sparkles className="mr-2 h-4 w-4" /> Exclusive Plan
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="grid auto-rows-min grid-cols-1 gap-8 lg:col-span-2">
            
            {/* Pinned Tools */}
            <Card>
              <CardHeader>
                <CardTitle>Pinned Tools</CardTitle>
                <CardDescription>
                  Your favorite AI tools for quick access.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                {pinnedTools.map((tool) => (
                  <Card key={tool.name} className="flex flex-col items-center justify-center p-4 text-center hover:shadow-md transition-shadow">
                     <div className="mb-4 rounded-full bg-primary/10 p-3 text-primary">
                        <tool.icon className="h-8 w-8" />
                    </div>
                    <h3 className="font-semibold">{tool.name}</h3>
                    <Button asChild variant="ghost" size="sm" className="mt-2">
                        <Link href={tool.href}>Use Tool</Link>
                    </Button>
                  </Card>
                ))}
                 <Card className="flex flex-col items-center justify-center p-4 text-center border-dashed hover:border-primary hover:shadow-md transition-all">
                     <PlusCircle className="h-8 w-8 text-muted-foreground mb-2" />
                    <h3 className="font-semibold text-muted-foreground">Add Tool</h3>
                     <Button asChild variant="link" size="sm" className="mt-1">
                        <Link href="/ai-tools">Browse Tools</Link>
                    </Button>
                  </Card>
              </CardContent>
            </Card>
            
            {/* Quick Actions & Usage */}
             <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                 <Card>
                    <CardHeader>
                        <CardTitle>Quick Actions</CardTitle>
                        <CardDescription>Get started with a common task.</CardDescription>
                    </CardHeader>
                     <CardContent className="grid grid-cols-2 gap-4">
                        {quickActions.map(action => (
                            <Button key={action.name} variant="outline" className="h-16 flex-col gap-1">
                                <action.icon className="h-6 w-6 text-primary" />
                                <span>{action.name}</span>
                            </Button>
                        ))}
                    </CardContent>
                </Card>

                 <Card>
                    <CardHeader>
                        <CardTitle>Usage & Analytics</CardTitle>
                        <CardDescription>Your AI activity this month.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer config={chartConfig} className="h-[150px] w-full">
                            <BarChart accessibilityLayer data={chartData}>
                                <CartesianGrid vertical={false} />
                                <XAxis dataKey="month" tickLine={false} tickMargin={10} axisLine={false} tickFormatter={(value) => value.slice(0, 3)} />
                                <ChartTooltip content={<ChartTooltipContent />} />
                                <ChartLegend content={<ChartLegendContent />} />
                                <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
                            </BarChart>
                        </ChartContainer>
                    </CardContent>
                </Card>
             </div>
          </div>
          
          {/* Right Sidebar */}
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Current Plan</CardTitle>
                <CardDescription>
                  You have access to all premium features.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                        <span className="font-medium">Monthly Usage</span>
                        <span className="text-muted-foreground">4,512 / 20,000 queries</span>
                    </div>
                    <Progress value={22} />
                </div>
                 <Button className="w-full" variant="outline" disabled>
                    <CheckCircle className="mr-2 h-4 w-4" /> You're on the best plan!
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Pick up where you left off.</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {recentActivities.map((activity, i) => (
                    <li key={i} className="flex items-start gap-4">
                      <div className="rounded-full bg-secondary p-2">
                        <activity.icon className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{activity.description}</p>
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

    