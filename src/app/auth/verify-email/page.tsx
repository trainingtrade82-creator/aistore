
'use client';

import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { MailCheck, Loader2 } from 'lucide-react';
import { getAuth, signOut, sendEmailVerification } from 'firebase/auth';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { app } from '@/firebase/clientApp';

export default function VerifyEmailPage() {
  const { user } = useAuth();
  const router = useRouter();
  const auth = getAuth(app);
  const { toast } = useToast();
  const [isSending, setIsSending] = useState(false);

  // If user is already verified and lands here, send them to the dashboard.
  useEffect(() => {
    if (user && user.emailVerified) {
      router.push('/dashboard');
    }
  }, [user, router]);

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/login');
  };

  const handleResendVerification = async () => {
    if (!user) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'You must be logged in to resend a verification email.',
      });
      return;
    }

    setIsSending(true);
    console.log('Attempting to resend verification for user:', user);

    try {
      await sendEmailVerification(user);
      console.log('Firebase sendEmailVerification call successful.');
      toast({
        title: 'Email Sent',
        description: 'A new verification link has been sent to your email.',
      });
    } catch (error: any) {
      console.error('Error sending verification email:', error);
      toast({
        variant: 'destructive',
        title: 'Error Sending Email',
        description: error.message || 'An unknown error occurred. Please try again.',
      });
    } finally {
      setIsSending(false);
    }
  };

  // This prevents the flicker of the page for users who are already verified
  if (!user || user.emailVerified) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-secondary/40 p-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
            <MailCheck className="h-10 w-10" />
          </div>
          <CardTitle className="mt-4 text-2xl">Verify Your Email</CardTitle>
          <CardDescription className="mt-2">
            We've sent a verification link to{' '}
            <strong className="text-primary">{user?.email || 'your email'}</strong>. Please
            click the link in the email to complete your registration.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-md border bg-secondary/50 p-3 text-sm text-secondary-foreground">
            <p>Can't find the email? Please check your Spam or Junk folder. It might take a minute to arrive.</p>
          </div>
          <Button onClick={handleResendVerification} disabled={isSending} className="w-full">
            {isSending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending...
              </>
            ) : (
              'Resend Verification Email'
            )}
          </Button>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button variant="link" onClick={handleLogout}>
            Logout
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
