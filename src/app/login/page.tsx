
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getAuth, isSignInWithEmailLink, signInWithEmailLink, sendSignInLinkToEmail } from 'firebase/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { actionCodeSettings, app } from '@/firebase/clientApp';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailLinkSent, setIsEmailLinkSent] = useState(false);
  const [isVerifying, setIsVerifying] = useState(true);
  const auth = getAuth(app);

  useEffect(() => {
    const processSignIn = async () => {
      if (isSignInWithEmailLink(auth, window.location.href)) {
        let storedEmail = window.localStorage.getItem('emailForSignIn');
        if (!storedEmail) {
          storedEmail = window.prompt('Please provide your email for confirmation');
        }
        
        if (storedEmail) {
          try {
            await signInWithEmailLink(auth, storedEmail, window.location.href);
            window.localStorage.removeItem('emailForSignIn');
            router.push('/dashboard');
          } catch (error) {
            toast({
              variant: 'destructive',
              title: 'Login Failed',
              description: 'The sign-in link is invalid or has expired. Please try again.',
            });
            setIsVerifying(false);
          }
        } else {
          toast({
            variant: 'destructive',
            title: 'Login Failed',
            description: 'Email is required to complete sign-in.',
          });
          setIsVerifying(false);
        }
      } else {
        setIsVerifying(false);
      }
    };
    processSignIn();
  }, [auth, router, toast]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
        toast({ variant: 'destructive', title: 'Email is required' });
        return;
    }
    setIsLoading(true);
    try {
      await sendSignInLinkToEmail(auth, email, actionCodeSettings);
      window.localStorage.setItem('emailForSignIn', email);
      setIsEmailLinkSent(true);
      toast({
        title: 'Check your email',
        description: `A sign-in link has been sent to ${email}.`,
      });
    } catch (error: any) {
      console.error("Firebase Error:", error.code, error.message);
      toast({
        variant: 'destructive',
        title: 'Failed to send link',
        description: 'Please ensure you have enabled Email/Password and Email link sign-in providers in your Firebase console.',
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  if (isVerifying) {
    return (
        <div className="flex min-h-screen items-center justify-center bg-secondary/40 p-4">
            <div className="flex flex-col items-center gap-4 text-center">
                <Loader2 className="h-10 w-10 animate-spin" />
                <h1 className="text-xl font-medium">Verifying your link...</h1>
                <p className="text-muted-foreground">Please wait while we sign you in.</p>
            </div>
        </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-secondary/40 p-4">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Sign In / Sign Up</CardTitle>
          <CardDescription>
            {isEmailLinkSent 
              ? 'A sign-in link has been sent to your email.' 
              : 'Enter your email to receive a secure sign-in link. No password needed.'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!isEmailLinkSent ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="m@example.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Send Sign-In Link
              </Button>
            </form>
          ) : (
             <div className="text-center">
                <p className="text-foreground/80">Please check your inbox and click the link to complete the sign-in.</p>
                <Button variant="link" onClick={() => setIsEmailLinkSent(false)}>
                    Use a different email
                </Button>
             </div>
          )}
          
           <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Or</span>
            </div>
          </div>

          <Button variant="outline" className="w-full" disabled>
            <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 126 23.4 172.9 62.3l-66.5 64.6C305.5 99.6 280.5 80 248 80c-82.3 0-148.2 66.3-148.2 147.4s65.9 147.4 148.2 147.4c87.7 0 129.2-61.2 135-95.2H248v-65.7h239.5c1.4 9.3 2.5 19.1 2.5 29.5z"></path></svg>
            Continue with Google
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
