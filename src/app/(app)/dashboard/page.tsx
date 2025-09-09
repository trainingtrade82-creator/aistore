
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Mail, PenSquare, Inbox, Sparkles, Wand2, Loader2, RefreshCw, CornerDownLeft, Send, Lock } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { signInWithPopup, User } from 'firebase/auth';
import { auth, googleProvider } from '@/firebase/clientApp';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';


const tones = ['Formal', 'Friendly', 'Persuasive', 'Concise', 'Assertive'];

const templates = [
    'Job Application', 
    'Meeting Request', 
    'Complaint', 
    'Sales Pitch', 
    'Thank You', 
    'Apology'
];

const mockEmails = [
    {
        id: '1',
        sender: 'John Doe',
        avatar: 'https://picsum.photos/100/100?random=10',
        subject: 'Project Update & Next Steps',
        snippet: 'Hi team, just a quick update on the Q3 project. We have successfully completed the first milestone...',
        body: `
<p>Hi team,</p>
<p>Just a quick update on the Q3 project. We have successfully completed the first milestone. The client is happy with the progress.</p>
<p>Let's schedule a meeting for tomorrow to discuss the next steps.</p>
<p>Best,<br>John</p>
        `,
        date: '2 hours ago',
    },
    {
        id: '2',
        sender: 'Jane Smith',
        avatar: 'https://picsum.photos/100/100?random=11',
        subject: 'Re: Your Application for Senior Developer',
        snippet: 'Dear applicant, thank you for your interest in the Senior Developer role. We were impressed with your profile...',
        body: `
<p>Dear applicant,</p>
<p>Thank you for your interest in the Senior Developer role. We were impressed with your profile and would like to invite you for an interview.</p>
<p>Please let us know your availability for next week.</p>
<p>Regards,<br>Jane Smith<br>HR Manager</p>
        `,
        date: 'Yesterday',
    },
     {
        id: '3',
        sender: 'Innovate Weekly',
        avatar: 'https://picsum.photos/100/100?random=12',
        subject: 'Top 5 AI Trends to Watch in 2024',
        snippet: 'From generative video to autonomous agents, see what\'s next in the world of AI. Don\'t miss our exclusive report...',
        body: `
<p>Hi there,</p>
<p>From generative video to autonomous agents, see what's next in the world of AI. Don't miss our exclusive report on the top 5 trends shaping our future.</p>
<p>Read more on our blog!</p>
<p>The Innovate Team</p>
        `,
        date: '3 days ago',
    }
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


type Email = typeof mockEmails[0];

const EmailList = ({ emails, onSelectEmail, selectedEmailId }: { emails: Email[], onSelectEmail: (email: Email) => void, selectedEmailId: string | null }) => (
    <div className="flex flex-col h-full bg-background">
         <div className="p-4 border-b">
            <h2 className="text-xl font-semibold">Inbox</h2>
        </div>
        <div className="overflow-y-auto">
            {emails.map(email => (
                <div 
                    key={email.id} 
                    onClick={() => onSelectEmail(email)}
                    className={`flex items-start gap-4 p-4 cursor-pointer border-l-4 ${selectedEmailId === email.id ? 'border-primary bg-primary/10' : 'border-transparent hover:bg-secondary/50'}`}
                >
                    <Avatar>
                        <AvatarImage src={email.avatar} data-ai-hint="person avatar" />
                        <AvatarFallback>{email.sender.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="overflow-hidden">
                        <div className="flex justify-between items-baseline">
                            <p className="font-semibold truncate">{email.sender}</p>
                            <p className="text-xs text-muted-foreground ml-2 flex-shrink-0">{email.date}</p>
                        </div>
                        <p className="text-sm font-medium truncate">{email.subject}</p>
                        <p className="text-sm text-muted-foreground truncate">{email.snippet}</p>
                    </div>
                </div>
            ))}
        </div>
    </div>
);


const EmailView = ({ email, onGenerateReply, isGenerating }: { email: Email | null; onGenerateReply: () => void; isGenerating: boolean }) => {
    if (!email) {
        return (
            <div className="flex flex-col items-center justify-center h-full text-muted-foreground bg-secondary/40">
                <Inbox className="w-16 h-16 mb-4" />
                <p>Select an email to read</p>
            </div>
        );
    }
    return (
        <div className="flex flex-col h-full bg-background">
            <div className="p-4 border-b">
                <h2 className="text-xl font-bold">{email.subject}</h2>
                <div className="flex items-center gap-3 mt-2">
                    <Avatar className="w-8 h-8">
                        <AvatarImage src={email.avatar} data-ai-hint="person avatar" />
                        <AvatarFallback>{email.sender.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="font-semibold">{email.sender}</p>
                        <p className="text-xs text-muted-foreground">to me</p>
                    </div>
                </div>
            </div>
            <div className="flex-grow p-4 overflow-y-auto" dangerouslySetInnerHTML={{ __html: email.body }}></div>
            <div className="p-4 border-t bg-background">
                <div className="flex flex-col gap-4">
                    <Textarea placeholder={`Reply to ${email.sender}...`} />
                    <div className="flex justify-between items-center">
                         <div className="flex gap-2">
                           <Button onClick={onGenerateReply} disabled={isGenerating}>
                             {isGenerating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                             Generate Reply
                           </Button>
                           <Button variant="ghost" disabled={isGenerating}><RefreshCw className="mr-2 h-4 w-4" /> Regenerate</Button>
                        </div>
                        <div className="flex gap-2">
                            <Button variant="outline"><CornerDownLeft className="mr-2 h-4 w-4" /> Reply</Button>
                            <Button><Send className="mr-2 h-4 w-4" /> Send</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default function EmailWriterPage() {
  const [generatedEmail, setGeneratedEmail] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [emails, setEmails] = useState<Email[]>([]);
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);

  useEffect(() => {
    // We check if the user object exists to determine if we should "fetch" emails.
    if (user) {
      // In a real app, you would make an API call here to fetch emails.
      // For now, we'll use mock data.
      setEmails(mockEmails);
      if (mockEmails.length > 0) {
          setSelectedEmail(mockEmails[0]);
      }
    } else {
        // If the user logs out or was never logged in, clear the emails.
        setEmails([]);
        setSelectedEmail(null);
    }
  }, [user]);


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
  
    const handleGoogleConnect = async () => {
        setIsGoogleLoading(true);
        try {
            await signInWithPopup(auth, googleProvider);
            toast({
                title: "Connected!",
                description: "Your Google account has been successfully connected."
            })
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
                    <TabsTrigger value="reply"><Inbox className="mr-2 h-4 w-4"/> Reply to Email</TabsTrigger>
                </TabsList>
                
                <TabsContent value="compose" className="mt-6">
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
                    {user ? (
                        <Card className="min-h-[600px] h-[70vh] overflow-hidden">
                           <div className="grid grid-cols-1 md:grid-cols-3 h-full">
                                <div className="md:col-span-1 border-r h-full overflow-hidden flex flex-col">
                                    <EmailList 
                                        emails={emails} 
                                        onSelectEmail={setSelectedEmail}
                                        selectedEmailId={selectedEmail?.id ?? null}
                                    />
                                </div>
                                <div className="md:col-span-2 h-full overflow-hidden flex flex-col">
                                     <EmailView 
                                        email={selectedEmail}
                                        onGenerateReply={() => { /* Placeholder */ }}
                                        isGenerating={isGenerating}
                                     />
                                </div>
                           </div>
                        </Card>
                    ) : (
                         <Card>
                            <CardHeader>
                                <CardTitle>Reply to an Email</CardTitle>
                                <CardDescription>Connect your inbox to let AI draft replies instantly.</CardDescription>
                            </CardHeader>
                            <CardContent className="text-center p-12">
                                <Inbox className="mx-auto h-12 w-12 text-foreground/30" />
                                <p className="mt-4 text-foreground/60">Connect your Gmail account to start replying with AI.</p>
                                <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
                                    <Button variant="outline" onClick={handleGoogleConnect} disabled={isGoogleLoading}>
                                        {isGoogleLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <GoogleIcon />}
                                        Connect Gmail
                                    </Button>
                                    <Button variant="outline" disabled>
                                        <Lock className="mr-2 h-4 w-4" />
                                        Connect Outlook (Soon)
                                    </Button>
                                </div>
                            </CardContent>
                         </Card>
                    )}
                </TabsContent>
            </Tabs>
        </div>
    </div>
  );
}

    