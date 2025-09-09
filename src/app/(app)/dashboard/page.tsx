
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Mail, PenSquare, Inbox, Sparkles, Wand2 } from 'lucide-react';
import React, { useState } from 'react';

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

  const handleGenerate = () => {
    // Placeholder for AI generation logic
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
  };

  return (
    <div className="flex-grow p-4 sm:p-6 md:p-8 bg-secondary/40">
        <div className="max-w-7xl mx-auto">
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
                    <TabsTrigger value="compose"><PenSquare className="mr-2" /> Write New Email</TabsTrigger>
                    <TabsTrigger value="reply" disabled><Inbox className="mr-2" /> Reply to Email (Soon)</TabsTrigger>
                </TabsList>
                
                <TabsContent value="compose">
                    <Card>
                        <CardHeader>
                            <CardTitle>Compose a New Email</CardTitle>
                            <CardDescription>Provide the context, choose a tone, and let the AI draft the perfect email for you.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
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
                                <Button size="lg" onClick={handleGenerate}>
                                    <Sparkles className="mr-2" />
                                    Generate Email
                                </Button>
                            </div>

                            {generatedEmail && (
                                <div className="pt-6">
                                    <h3 className="text-xl font-semibold mb-4 font-headline flex items-center gap-2">
                                        <Wand2 className="text-primary" />
                                        Generated Email
                                    </h3>
                                    <Card className="bg-background p-4">
                                         <pre className="whitespace-pre-wrap font-sans text-sm">{generatedEmail}</pre>
                                    </Card>
                                    <div className="mt-4 flex gap-2">
                                        <Button variant="outline">Copy</Button>
                                        <Button variant="secondary">Save Draft</Button>
                                        <Button disabled>Send via Gmail (Connect)</Button>
                                    </div>
                                </div>
                            )}

                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="reply">
                     <Card>
                        <CardHeader>
                            <CardTitle>Reply to an Email</CardTitle>
                            <CardDescription>Connect your inbox to let AI draft replies instantly. This feature is coming soon!</CardDescription>
                        </CardHeader>
                        <CardContent className="text-center p-12">
                             <Inbox className="mx-auto h-12 w-12 text-foreground/30" />
                             <p className="mt-4 text-foreground/60">Connect your Gmail or Outlook to start replying with AI.</p>
                             <div className="mt-6 flex gap-4 justify-center">
                                 <Button variant="outline" disabled>Connect Gmail</Button>
                                 <Button variant="outline" disabled>Connect Outlook</Button>
                             </div>
                        </CardContent>
                     </Card>
                </TabsContent>
            </Tabs>
        </div>
    </div>
  );
}
