
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Mail, PenSquare, Inbox, Sparkles, Wand2, Loader2, Lock, ListChecks, Bot, Send, Minimize2 } from 'lucide-react';
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';


const tones = ['Formal', 'Friendly', 'Persuasive', 'Concise', 'Assertive'];

const templates = [
    'Job Application', 
    'Meeting Request', 
    'Complaint', 
    'Sales Pitch', 
    'Thank You', 
    'Apology'
];


export default function EmailWriterPage() {
  const [generatedEmail, setGeneratedEmail] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();
  
  const handleGenerate = async () => {
    setIsGenerating(true);
    // Placeholder for AI generation logic
    await new Promise(resolve => setTimeout(resolve, 1000));
    setGeneratedEmail(
`Subject: Meeting Request: Exploring a Potential Collaboration

Hi Jane,

I hope this email finds you well.

My name is John Doe, and I'm reaching out from Innovate Corp. We specialize in providing cutting-edge solutions for project management, and I was particularly impressed with your work at Tech Solutions Inc.

I would love to schedule a brief 15-minute call with you next week to explore how we might be able to help streamline your team's workflow.

Please let me know what time works best for you.

Best regards,

John Doe
Founder, Innovate Corp`
    );
    setIsGenerating(false);
  };
  
  return (
    <div className="flex-grow bg-secondary/40">
        <div className="container mx-auto p-4 sm:p-6 lg:p-8">
            <header className="mb-8">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg">
                        <Mail className="w-10 h-10 text-primary" />
                    </div>
                    <div>
                        <h1 className="text-3xl sm:text-4xl font-bold font-headline">Email Writer</h1>
                        <p className="text-lg text-foreground/80 mt-1">Write and reply to emails smarter, faster, and more professionally.</p>
                    </div>
                </div>
            </header>

            <Tabs defaultValue="compose" className="w-full">
                <TabsList className="grid w-full grid-cols-2 md:w-[400px]">
                    <TabsTrigger value="compose"><PenSquare className="mr-2 h-4 w-4" /> Write New Email</TabsTrigger>
                    <TabsTrigger value="reply" disabled><Lock className="mr-2 h-4 w-4" /> Reply to Email</TabsTrigger>
                </TabsList>
                
                <TabsContent value="compose" className="mt-6">
                    <Card>
                        <CardHeader className="bg-secondary/50 rounded-t-lg border-b">
                            <CardTitle>Compose a New Email</CardTitle>
                            <CardDescription>Provide the context, choose a tone, and let the AI draft the perfect email for you.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6 pt-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="context">Context / Prompt</Label>
                                    <Textarea 
                                        id="context"
                                        placeholder="e.g., Write an email to my boss asking for a raise, mentioning my recent successful projects."
                                        className="min-h-[150px]"
                                    />
                                </div>
                                <div className="space-y-6">
                                     <div className="space-y-2">
                                        <Label htmlFor="tone">Tone</Label>
                                        <Select>
                                            <SelectTrigger id="tone">
                                                <SelectValue placeholder="Select a tone" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {tones.map(tone => <SelectItem key={tone} value={tone}>{tone}</SelectItem>)}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="template">Use a Template (Optional)</Label>
                                        <Select>
                                            <SelectTrigger id="template">
                                                <SelectValue placeholder="Select a template" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {templates.map(template => <SelectItem key={template} value={template}>{template}</SelectItem>)}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            </div>
                           
                            <div className="text-center">
                                <Button size="lg" onClick={handleGenerate} disabled={isGenerating} className="shadow-lg">
                                    {isGenerating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                                    Generate Email
                                </Button>
                            </div>

                            {generatedEmail && (
                                <div className="pt-6">
                                    <h3 className="text-xl font-semibold mb-4 font-headline flex items-center gap-2">
                                        <Wand2 className="text-primary" />
                                        Generated Email
                                    </h3>
                                    <Card className="bg-secondary/50 p-4 shadow-inner">
                                         <pre className="whitespace-pre-wrap font-sans text-sm">{generatedEmail}</pre>
                                    </Card>
                                    <div className="mt-4 flex gap-2">
                                        <Button variant="outline">Copy</Button>
                                        <Button variant="secondary">Save Draft</Button>
                                    </div>
                                </div>
                            )}

                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="reply" className="mt-6">
                     <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Sparkles className="text-primary" />
                                Smarter Inbox: Coming Soon!
                            </CardTitle>
                            <CardDescription>Our team is working hard to integrate with your favorite email clients.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <h4 className="font-semibold text-foreground">Upcoming Features:</h4>
                             <ul className="space-y-3 text-sm text-foreground/80">
                                <li className="flex items-start gap-3">
                                    <ListChecks className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                                    <span>**AI-Powered Categorization**: Automatically sort your emails into categories like Important, Promotions, and Spam.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <Bot className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                                    <span>**One-Click Replies**: Generate context-aware replies that match the tone of the original email.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <Minimize2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                                    <span>**Email Summaries**: Instantly shorten long email threads into concise summaries.</span>
                                </li>
                                 <li className="flex items-start gap-3">
                                    <Send className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                                    <span>**Draft & Send**: Create drafts or send emails directly from the AI interface.</span>
                                </li>
                            </ul>
                            <div className="pt-4 text-center">
                                <p className="text-sm text-muted-foreground">We're working hard to get this verified and released!</p>
                            </div>
                        </CardContent>
                     </Card>
                </TabsContent>
            </Tabs>
        </div>
    </div>
  );
}
