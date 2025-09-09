
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { UploadCloud, FileText, Video, Link as LinkIcon, Download, Mail, ClipboardList, Loader2, Sparkles, Check, Users, Calendar, Lock, Image as ImageIcon, Send, File as FileIcon } from 'lucide-react';
import React, { useState, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';

const mockTranscript = `
[00:00:01] Sarah: Okay everyone, thanks for joining the Q3 planning session. Let's kick things off with the marketing update. Alex, over to you.

[00:00:15] Alex: Thanks, Sarah. So, for marketing, our main goal is to increase lead generation by 20%. The plan is to launch the new ad campaign by the first week of July. We'll need the final creative assets from the design team by June 25th.

[00:00:45] Ben: June 25th is a tight deadline for us, Alex. We're still working on the branding guide. Can we push it to the 30th?

[00:01:02] Alex: The launch date is critical. If we delay, we miss the summer sales window. Let's make the 25th a hard deadline.

[00:01:20] Sarah: I agree with Alex. Ben, let's sync up after this call to see how we can free up resources for you. Decision: The creative assets deadline is confirmed for June 25th.

[00:01:45] Sarah: Next up, product roadmap. Maria, what's new?

[00:02:00] Maria: Hi all. We're planning to roll out the new dashboard feature in August. The main action item for the engineering team is to complete the final round of testing by July 30th.
`;

const mockImageDescription = "This is a high-resolution photograph of a bustling city street at dusk. The sky is a gradient of deep orange and purple, with city lights beginning to twinkle. The architecture is a mix of modern skyscrapers with glass facades and older, ornate buildings. There are yellow taxis and red double-decker buses creating streaks of light due to a long exposure. Pedestrians are blurred, suggesting movement and the fast pace of city life.";
const mockPdfSummary = "This document is a 12-page financial report for Q3 2023. Key findings include a 15% increase in revenue year-over-year, driven by strong performance in the North American market. However, profit margins have slightly decreased due to rising operational costs. The report recommends a strategic review of supply chain expenses to mitigate this trend.";


type FileType = 'audio/video' | 'pdf' | 'image' | null;

export default function MeetingNotesAiPage() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isProcessed, setIsProcessed] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [fileType, setFileType] = useState<FileType>(null);
  const [filePreview, setFilePreview] = useState<string>('');
  const [isDragging, setIsDragging] = useState(false);
  const { toast } = useToast();
  
  const handleFile = (selectedFile: File) => {
    if (selectedFile) {
        setFile(selectedFile);
        const reader = new FileReader();
        if (selectedFile.type.startsWith('image/')) {
            setFileType('image');
            reader.readAsDataURL(selectedFile);
            reader.onload = () => setFilePreview(reader.result as string);
        } else if (selectedFile.type === 'application/pdf') {
            setFileType('pdf');
            setFilePreview('');
        } else if (selectedFile.type.startsWith('audio/') || selectedFile.type.startsWith('video/')) {
            setFileType('audio/video');
            setFilePreview('');
        } else {
            toast({
                variant: 'destructive',
                title: 'Unsupported File Type',
                description: 'Please upload a supported file: audio, video, PDF, or image.',
            });
            setFile(null);
            setFileType(null);
            setFilePreview('');
        }
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFile = e.target.files?.[0];
      if (selectedFile) {
          handleFile(selectedFile);
      }
  }

  const handleDragEvents = (e: React.DragEvent<HTMLDivElement>, isEntering: boolean) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(isEntering);
  };
  
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    handleDragEvents(e, false);
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) {
      handleFile(droppedFile);
    }
  };


  const handleProcess = async () => {
    if (!file) {
        toast({
            variant: 'destructive',
            title: 'No file selected',
            description: 'Please upload a file to analyze.',
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
      setFile(null);
      setFileType(null);
      setFilePreview('');
  }

  const renderResults = () => {
    switch (fileType) {
        case 'audio/video':
            return (
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                    <div className="lg:col-span-3">
                        <Card>
                            <CardHeader>
                                <CardTitle>Full Transcript</CardTitle>
                                <CardDescription>{file?.name}</CardDescription>
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
            );
        case 'image':
            return (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                     <Card>
                        <CardHeader>
                            <CardTitle>Uploaded Image</CardTitle>
                            <CardDescription>{file?.name}</CardDescription>
                        </CardHeader>
                         <CardContent>
                             {filePreview && <Image src={filePreview} alt="Uploaded preview" width={1280} height={720} className="rounded-lg aspect-video object-contain border bg-secondary/50" />}
                         </CardContent>
                     </Card>
                     <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><Sparkles className="text-primary"/> AI Image Analysis</CardTitle>
                            <CardDescription>A detailed description of the uploaded image.</CardDescription>
                        </CardHeader>
                         <CardContent>
                            <Textarea readOnly value={mockImageDescription} className="h-[400px] bg-secondary/50 text-base" />
                             <div className="flex gap-2 mt-4">
                                <Button><Download className="mr-2 h-4 w-4"/> Download Description</Button>
                             </div>
                         </CardContent>
                     </Card>
                </div>
            );
        case 'pdf':
            return (
                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                     <Card className="flex flex-col">
                        <CardHeader>
                            <CardTitle>AI Summary</CardTitle>
                            <CardDescription>{file?.name}</CardDescription>
                        </CardHeader>
                         <CardContent className="flex-grow">
                             <Textarea readOnly value={mockPdfSummary} className="h-[400px] bg-secondary/50 text-base" />
                         </CardContent>
                     </Card>
                     <Card className="flex flex-col">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><Sparkles className="text-primary"/> Chat with your PDF</CardTitle>
                            <CardDescription>Ask questions about the document.</CardDescription>
                        </CardHeader>
                         <CardContent className="flex flex-col flex-grow">
                             <div className="flex-grow p-4 bg-secondary/50 rounded-lg space-y-4 border mb-4 h-[300px] overflow-y-auto">
                                <div className="p-3 rounded-lg bg-primary text-primary-foreground self-start max-w-xs">What are the main risks mentioned?</div>
                                <div className="p-3 rounded-lg bg-background self-end max-w-xs ml-auto border">The main risks identified are supply chain disruptions and increased competition in the European market.</div>
                             </div>
                              <div className="relative">
                                <Textarea placeholder="Ask a question..." className="pr-12" />
                                <Button size="icon" className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8"><Send className="h-4 w-4"/></Button>
                            </div>
                         </CardContent>
                     </Card>
                 </div>
            );
        default:
            return <p>Unsupported file type. Please start over.</p>;
    }
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
                            <h1 className="text-3xl sm:text-4xl font-bold font-headline">Analysis Complete</h1>
                            <p className="text-lg text-foreground/80 mt-1">Here are the AI-generated results for your file.</p>
                        </div>
                    </div>
                     <Button onClick={handleReset} variant="outline">Analyze Another File</Button>
                </header>
                {renderResults()}
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
                        <h1 className="text-3xl sm:text-4xl font-bold font-headline">Document & Media AI</h1>
                        <p className="text-lg text-foreground/80 mt-1">Transcribe, summarize, and analyze any file effortlessly.</p>
                    </div>
                </div>
            </header>

            <Tabs defaultValue="upload" className="w-full">
                <TabsList className="grid w-full grid-cols-3 md:w-[600px]">
                    <TabsTrigger value="upload"><UploadCloud className="mr-2 h-4 w-4" /> Upload File</TabsTrigger>
                    <TabsTrigger value="connect"><LinkIcon className="mr-2 h-4 w-4" /> Connect to Meeting</TabsTrigger>
                    <TabsTrigger value="live" disabled><Lock className="mr-2 h-4 w-4" /> Live Transcription (Exclusive)</TabsTrigger>
                </TabsList>
                
                <TabsContent value="upload" className="mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Upload File</CardTitle>
                            <CardDescription>Upload an audio, video, PDF, or image file to get started. Supports MP3, WAV, MP4, PDF, PNG, and JPG formats.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6 pt-6">
                           <div 
                                onDragEnter={(e) => handleDragEvents(e, true)}
                                onDragLeave={(e) => handleDragEvents(e, false)}
                                onDragOver={(e) => e.preventDefault()}
                                onDrop={handleDrop}
                                className={`flex flex-col items-center justify-center w-full p-8 border-2 border-dashed rounded-lg transition-colors ${isDragging ? 'border-primary bg-primary/10' : 'border-border'}`}
                            >
                                <UploadCloud className="w-16 h-16 text-muted-foreground mb-4"/>
                               <p className="text-muted-foreground mb-2">Drag & drop a single file here, or</p>
                                <Button asChild variant="outline">
                                   <label htmlFor="file-upload">
                                        Choose File
                                        <input id="file-upload" type="file" className="sr-only" onChange={handleFileChange} accept=".mp3,.wav,.mp4,.pdf,.png,.jpg,.jpeg"/>
                                    </label>
                                </Button>
                                {file && (
                                    <div className="mt-4 font-medium text-sm flex items-center gap-2">
                                        {fileType === 'image' && <ImageIcon className="h-5 w-5 text-muted-foreground" />}
                                        {fileType === 'pdf' && <FileIcon className="h-5 w-5 text-muted-foreground" />}
                                        {fileType === 'audio/video' && <Video className="h-5 w-5 text-muted-foreground" />}
                                        Selected: {file.name}
                                    </div>
                                )}
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
                                <Button size="lg" onClick={handleProcess} disabled={isProcessing || !file} className="shadow-lg">
                                    {isProcessing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                                    Analyze File
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

    