
'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { MailCheck, Loader2 } from 'lucide-react';
import { getAuth, sendEmailVerification, signOut, applyActionCode } from 'firebase/auth';
import { useToast } from '@/hooks/use-toast';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export default function VerifyEmailPage() {
  const { user } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const auth = getAuth();
  const [isResending, setIsResending] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const searchParams = useSearchParams();

  // This effect handles the verification link click
  useEffect(() => {
    const mode = searchParams.get('mode');
    const actionCode = searchParams.get('oobCode');

    if (mode === 'verifyEmail' && actionCode) {
      setIsVerifying(true);
      applyActionCode(auth, actionCode)
        .then(() => {
          toast({
            title: 'Success!',
            description: 'Your email has been verified. You can now log in.',
          });
          // Reload user to get updated emailVerified status
          auth.currentUser?.reload().then(() => {
             router.push('/dashboard');
          });
        })
        .catch((error) => {
          toast({
            variant: 'destructive',
            title: 'Verification Failed',
            description: error.message,
          });
        })
        .finally(() => {
          setIsVerifying(false);
        });
    }
  }, [searchParams, auth, router, toast]);

  const handleResend = async () => {
    if (!user) {
      toast({
        variant: 'destructive',
        title: 'Not logged in',
        description: 'You need to be logged in to resend a verification email.',
      });
      return;
    }
    setIsResending(true);
    try {
      await sendEmailVerification(user, {
         url: `${window.location.origin}/auth/verify-email`,
      });
      
      // For developer testing convenience
      console.log(`Verification link sent. For testing, you can use this action code. You would normally get this from the email link.`);
      
      toast({
        title: 'Email Sent',
        description: 'A new verification email has been sent to your inbox.',
      });
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Failed to resend email',
        description: error.message,
      });
    } finally {
      setIsResending(false);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/login');
  }

  if (isVerifying) {
    return (
        <div className="flex min-h-screen items-center justify-center bg-secondary/40 p-4">
            <div className="flex flex-col items-center gap-4 text-center">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
                <h1 className="text-2xl font-bold">Verifying your email...</h1>
                <p className="text-muted-foreground">Please wait a moment.</p>
            </div>
        </div>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-secondary/40 p-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
            <MailCheck className="h-10 w-10" />
          </div>
          <CardTitle className="mt-4 text-2xl">Verify Your Email</CardTitle>
          <CardDescription className="mt-2">
            We've sent a verification link to{' '}
            <strong className="text-primary">{user?.email || 'your email'}</strong>. Please
            click the link to continue.
          </CardDescription>
           <CardDescription className="mt-4 bg-yellow-100 text-yellow-800 p-3 rounded-md border border-yellow-300">
              <strong>Can't find the email?</strong> Please check your Spam or Junk folder.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={handleResend} className="w-full" disabled={isResending}>
            {isResending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            Resend Verification Email
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
