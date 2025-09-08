
'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { MailCheck, Loader2 } from 'lucide-react';
import { getAuth, signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { app } from '@/firebase/clientApp';

export default function VerifyEmailPage() {
  const { user } = useAuth();
  const router = useRouter();
  const auth = getAuth(app);
  
  // If user is already verified and lands here, send them to the dashboard.
  useEffect(() => {
    if (user && user.emailVerified) {
      router.push('/dashboard');
    }
  }, [user, router]);

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/login');
  }

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
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
            <MailCheck className="h-10 w-10" />
          </div>
          <CardTitle className="mt-4 text-2xl">Verify Your Email</CardTitle>
          <CardDescription className="mt-2">
            We've sent a verification link to{' '}
            <strong className="text-primary">{user?.email || 'your email'}</strong>. Please
            click the link in the email to log in.
          </CardDescription>
           <CardDescription className="mt-4 bg-yellow-100 text-yellow-800 p-3 rounded-md border border-yellow-300">
              <strong>Can't find the email?</strong> Please check your Spam or Junk folder. It might take a minute to arrive.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Once you've verified, you'll be able to log in.
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
