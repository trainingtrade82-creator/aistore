
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MailCheck, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { sendEmailVerification, getAuth } from 'firebase/auth';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import { app } from '@/firebase/clientApp';

export default function VerifyEmailPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const auth = getAuth(app);

  const handleResendVerification = async () => {
    if (!user) {
      toast({
        variant: 'destructive',
        title: 'Not Logged In',
        description: 'You need to be logged in to resend a verification email.',
      });
      return;
    }

    setIsLoading(true);
    try {
      await sendEmailVerification(user);
      toast({
        title: 'Verification Email Sent',
        description: 'A new verification link has been sent to your email address.',
      });

      // Developer workaround for testing
      if (process.env.NODE_ENV === 'development') {
          const actionCodeSettings = {
            url: `${window.location.origin}/login`,
            handleCodeInApp: true,
          };
          // In a real app, you would not log this. This is for testing.
          // To test, you would need to construct the link manually with the user's email and an oobCode you would get from a custom flow.
          // For now, this just shows the action is being triggered.
          console.log('--- DEVELOPMENT ONLY ---');
          console.log('Verification email action triggered. In a real scenario, an email would be sent.');
          console.log('To complete verification, check your email inbox (and spam folder).');
      }

    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error Sending Email',
        description: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-secondary/40 p-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
            <MailCheck className="h-10 w-10" />
          </div>
          <CardTitle className="mt-4 text-2xl">Confirm your email</CardTitle>
          <CardDescription className="mt-2 text-lg text-foreground/80">
            We sent a verification link to your email address. Please click the link to continue.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
           <Button onClick={handleResendVerification} disabled={isLoading} className="w-full">
            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            Resend Verification Email
          </Button>
          <p className="text-sm text-muted-foreground">
            <b>Didn't receive the email?</b> Check your spam folder or click the button above to send it again.
          </p>
          <p className="mt-4 text-sm text-muted-foreground">
            Once verified, you can{' '}
            <Link href="/login" className="font-semibold text-primary hover:underline">
              log in to your account
            </Link>
            .
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
