
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { UploadCloud, FileText, Video, Link as LinkIcon, Download, Mail, ClipboardList, Loader2, Sparkles, Check, Users, Calendar, Lock } from 'lucide-react';
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

const mockTranscript = `
[00:00:01] Sarah: Okay everyone, thanks for joining the Q3 planning session. Let's kick things off with the marketing update. Alex, over to you.

[00:00:15] Alex: Thanks, Sarah. So, for marketing, our main goal is to increase lead generation by 20%. The plan is to launch the new ad campaign by the first week of July. We'll need the final creative assets from the design team by June 25th.

[00:00:45] Ben: June 25th is a tight deadline for us, Alex. We're still working on the branding guide. Can we push it to the 30th?

[00:01:02] Alex: The launch date is critical. If we delay, we miss the summer sales window. Let's make the 25th a hard deadline.

[00:01:20] Sarah: I agree with Alex. Ben, let's sync up after this call to see how we can free up resources for you. Decision: The creative assets deadline is confirmed for June 25th.

[00:01:45] Sarah: Next up, product roadmap. Maria, what's new?

[00:02:00] Maria: Hi all. We're planning to roll out the new dashboard feature in August. The main action item for the engineering team is to complete the final round of testing by July 30th.
`;


export default function MeetingNotesAiPage() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isProcessed, setIsProcessed] = useState(false);
  const [fileName, setFileName] = useState('');
  const { toast } = useToast();
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
          setFileName(file.name);
      }
  }

  const handleProcess = async () => {
    if (!fileName) {
        toast({
            variant: 'destructive',
            title: 'No file selected',
            description: 'Please upload a file to transcribe and summarize.',
        });
        return;
    }
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsProcessing(false);
    setIsProcessed(true);
  };
  
  const handleReset = () => {
      setIsProcessed(false);
      setIsProcessing(false);
      setFileName('');
  }

  if (isProcessed) {
    return (
        <div className="flex-grow bg-secondary/40">
            <div className="container mx-auto p-4 sm:p-6 lg:p-8">
                <header className="mb-8">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-primary/10 rounded-lg">
                            <ClipboardList className="w-10 h-10 text-primary" />
                        </div>
                        <div>
                            <h1 className="text-3xl sm:text-4xl font-bold font-headline">Meeting Notes AI</h1>
                            <p className="text-lg text-foreground/80 mt-1">Your meeting, transcribed and summarized.</p>
                        </div>
                    </div>
                     <Button onClick={handleReset} variant="outline">Start New Transcription</Button>
                </header>
                 <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                    <div className="lg:col-span-3">
                         <Card>
                             <CardHeader>
                                 <CardTitle>Full Transcript</CardTitle>
                                 <CardDescription>{fileName}</CardDescription>
                             </CardHeader>
                             <CardContent>
                                <Textarea readOnly value={mockTranscript} className="h-[500px] bg-secondary/50 font-mono text-xs" />
                             </CardContent>
                         </Card>
                    </div>
                    <div className="lg:col-span-2">
                         <Card className="sticky top-24">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2"><Sparkles className="text-primary"/> AI Summary</CardTitle>
                                <CardDescription>Key points and action items from your meeting.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div>
                                    <h4 className="font-semibold flex items-center gap-2 mb-2"><Check className="text-green-500" /> Key Decisions</h4>
                                    <ul className="list-disc list-inside text-foreground/80 space-y-1">
                                        <li>Creative assets deadline is confirmed for June 25th.</li>
                                    </ul>
                                </div>
                                 <div>
                                    <h4 className="font-semibold flex items-center gap-2 mb-2"><Users className="text-blue-500" /> Action Items</h4>
                                    <ul className="list-disc list-inside text-foreground/80 space-y-1">
                                        <li>**Alex:** Launch new ad campaign in the first week of July.</li>
                                        <li>**Ben & Design Team:** Provide final creative assets by June 25th.</li>
                                        <li>**Maria & Eng Team:** Complete final testing for dashboard feature by July 30th.</li>
                                        <li>**Sarah & Ben:** Sync up after the call to discuss resources.</li>
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="font-semibold flex items-center gap-2 mb-2"><Calendar className="text-red-500" /> Deadlines</h4>
                                     <ul className="list-disc list-inside text-foreground/80 space-y-1">
                                        <li>**June 25th:** Final creative assets due.</li>
                                        <li>**July 30th:** Final testing for new dashboard complete.</li>
                                    </ul>
                                </div>
                                <div className="flex flex-col gap-2">
                                     <Button><Download className="mr-2 h-4 w-4"/> Download Notes (PDF)</Button>
                                     <Button variant="outline"><Mail className="mr-2 h-4 w-4"/> Email Summary to Team</Button>
                                </div>
                            </CardContent>
                         </Card>
                    </div>
                 </div>
            </div>
        </div>
    )
  }

  return (
    <div className="flex-grow bg-secondary/40">
        <div className="container mx-auto p-4 sm:p-6 lg:p-8">
            <header className="mb-8">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg">
                        <ClipboardList className="w-10 h-10 text-primary" />
                    </div>
                    <div>
                        <h1 className="text-3xl sm:text-4xl font-bold font-headline">Meeting Notes AI</h1>
                        <p className="text-lg text-foreground/80 mt-1">Transcribe, summarize, and organize every discussion effortlessly.</p>
                    </div>
                </div>
            </header>

            <Tabs defaultValue="upload" className="w-full">
                <TabsList className="grid w-full grid-cols-3 md:w-[600px]">
                    <TabsTrigger value="upload"><UploadCloud className="mr-2 h-4 w-4" /> Upload Recording</TabsTrigger>
                    <TabsTrigger value="connect"><LinkIcon className="mr-2 h-4 w-4" /> Connect to Meeting</TabsTrigger>
                    <TabsTrigger value="live" disabled><Lock className="mr-2 h-4 w-4" /> Live Transcription (Exclusive)</TabsTrigger>
                </TabsList>
                
                <TabsContent value="upload" className="mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Upload Recording</CardTitle>
                            <CardDescription>Upload an audio or video file to get started. Supports MP3, WAV, and MP4 formats.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6 pt-6">
                           <div className="flex flex-col items-center justify-center w-full p-8 border-2 border-dashed rounded-lg">
                                <UploadCloud className="w-16 h-16 text-muted-foreground mb-4"/>
                               <p className="text-muted-foreground mb-2">Drag & drop files here, or</p>
                                <Button asChild variant="outline">
                                   <label htmlFor="file-upload">
                                        Choose File
                                        <input id="file-upload" type="file" className="sr-only" onChange={handleFileChange} accept=".mp3,.wav,.mp4"/>
                                    </label>
                                </Button>
                               {fileName && <p className="mt-4 font-medium text-sm">Selected: {fileName}</p>}
                           </div>
                           <div className="space-y-2">
                                <Label htmlFor="language">Language</Label>
                                <Select defaultValue="en-us">
                                    <SelectTrigger id="language">
                                        <SelectValue placeholder="Select language" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="en-us">English (US)</SelectItem>
                                        <SelectItem value="en-gb">English (UK)</SelectItem>
                                        <SelectItem value="es-es">Spanish</SelectItem>
                                        <SelectItem value="fr-fr">French</SelectItem>
                                        <SelectItem value="de-de">German</SelectItem>
                                        {/* Add more languages as needed */}
                                    </SelectContent>
                                </Select>
                            </div>
                           
                            <div className="text-center">
                                <Button size="lg" onClick={handleProcess} disabled={isProcessing} className="shadow-lg">
                                    {isProcessing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                                    Transcribe & Summarize
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="connect" className="mt-6">
                     <Card>
                        <CardHeader>
                            <CardTitle>Connect to a Live Meeting</CardTitle>
                            <CardDescription>Integrate directly with your calendar to have the AI join your meetings.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4 pt-6">
                            <Button className="w-full" size="lg" variant="outline">
                                <img src="https://www.google.com/images/icons/product/meet-48.png" alt="Google Meet" className="w-6 h-6 mr-2" />
                                Connect Google Meet
                            </Button>
                             <Button className="w-full" size="lg" variant="outline">
                                <img src="https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RWp6bA?ver=5c5f" alt="Zoom" className="w-6 h-6 mr-2" />
                                Connect Zoom
                            </Button>
                             <Button className="w-full" size="lg" variant="outline">
                                <img src="https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RW14I1w?ver=b23c" alt="MS Teams" className="w-6 h-6 mr-2" />
                                Connect Microsoft Teams
                            </Button>
                             <p className="text-sm text-center text-muted-foreground pt-4">Requires calendar permissions to see upcoming meetings.</p>
                        </CardContent>
                     </Card>
                </TabsContent>
            </Tabs>
        </div>
    </div>
  );
}
