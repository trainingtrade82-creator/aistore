
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Mail, PenSquare, Inbox, Sparkles, Wand2, Lock, Loader2 } from 'lucide-react';
import React, { useState } from 'react';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '@/firebase/clientApp';
import { useToast } from '@/hooks/use-toast';


const tones = ['Formal', 'Friendly', 'Persuasive', 'Concise', 'Assertive'];

const templates = [
    'Job Application', 
    'Meeting Request', 
    'Complaint', 
    'Sales Pitch', 
    'Thank You', 
    'Apology'
];

const GoogleIcon = () => (
    <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
        <path
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            fill="#4285F4"
        />
        <path
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            fill="#34A853"
        />
        <path
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
            fill="#FBBC05"
        />
        <path
            d="M12 5.16c1.61 0 3.06.55 4.2 1.69l3.15-3.15C17.45 1.99 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            fill="#EA4335"
        />
        <path d="M1 1h22v22H1z" fill="none" />
    </svg>
);

export default function EmailWriterPage() {
  const [generatedEmail, setGeneratedEmail] = useState('');
  const { toast } = useToast();
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);


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
  
    const handleGoogleConnect = async () => {
        setIsGoogleLoading(true);
        try {
            await signInWithPopup(auth, googleProvider);
            toast({
                title: "Connected!",
                description: "Your Google account has been successfully connected."
            })
            // Here you would typically store the user's new token securely
            // and update the UI to show the connected state.
        } catch (error: any) {
            console.error("Google Connect Error:", error);
            toast({
                variant: "destructive",
                title: "Connection Failed",
                description: "Could not connect your Google account. Please try again."
            });
        } finally {
            setIsGoogleLoading(false);
        }
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
                    <TabsTrigger value="reply"><Inbox className="mr-2 h-4 w-4"/> Reply to Email</TabsTrigger>
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
                                        className="min-h-[150px] rounded-lg"
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
                                <Button size="lg" onClick={handleGenerate} className="bg-gradient-to-r from-primary to-accent text-primary-foreground hover:from-primary/90 hover:to-accent/90 shadow-lg rounded-full transform transition-transform hover:scale-105">
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
                                    <Card className="bg-background p-4 shadow-inner">
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
                            <CardDescription>Connect your inbox to let AI draft replies instantly.</CardDescription>
                        </CardHeader>
                        <CardContent className="text-center p-12">
                             <Inbox className="mx-auto h-12 w-12 text-foreground/30" />
                             <p className="mt-4 text-foreground/60">Connect your Gmail or Outlook to start replying with AI.</p>
                             <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
                                <Button variant="outline" onClick={handleGoogleConnect} disabled={isGoogleLoading}>
                                    {isGoogleLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <GoogleIcon />}
                                    Connect Gmail
                                </Button>
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
