
'use client';

import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { MailCheck, Loader2 } from 'lucide-react';
import { getAuth, signOut } from 'firebase/auth';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { app } from '@/firebase/clientApp';

export default function VerifyEmailPage() {
  const { user } = useAuth();
  const router = useRouter();
  const auth = getAuth(app);
  const { toast } = useToast();

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
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Once you've verified, you can log in to your account.
          </p>
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
