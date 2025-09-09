
'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { getAuth, isSignInWithEmailLink, signInWithEmailLink } from 'firebase/auth';
import { app } from '@/firebase/clientApp';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

function EmailActionHandler() {
  const router = useRouter();
  const { toast } = useToast();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('Verifying your sign-in link...');

  useEffect(() => {
    const auth = getAuth(app);

    const handleSignIn = async () => {
      if (!isSignInWithEmailLink(auth, window.location.href)) {
        setStatus('error');
        setMessage('Invalid or expired sign-in link. Please request a new one.');
        return;
      }

      let email = window.localStorage.getItem('emailForSignIn');
      if (!email) {
        // User opened the link on a different device. To prevent session fixation
        // attacks, ask the user to provide the associated email again.
        email = window.prompt('Please provide your email for confirmation');
      }

      if (!email) {
         setStatus('error');
         setMessage('Email is required to complete sign-in. Please try again.');
         return;
      }

      try {
        await signInWithEmailLink(auth, email, window.location.href);
        window.localStorage.removeItem('emailForSignIn');
        setStatus('success');
        setMessage('You have been successfully signed in! Redirecting to your dashboard...');
        toast({
          title: 'Success',
          description: 'Welcome to AI Store!',
        });
        setTimeout(() => router.push('/dashboard'), 2000);
      } catch (error) {
        setStatus('error');
        setMessage('Invalid or expired sign-in link. Please request a new one.');
        console.error('Firebase Sign-In Error:', error);
      }
    };

    handleSignIn();
  }, [router, toast]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-secondary/40 p-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          {status === 'loading' && <Loader2 className="mx-auto h-12 w-12 animate-spin text-primary" />}
          {status === 'success' && <CheckCircle className="mx-auto h-12 w-12 text-green-500" />}
          {status === 'error' && <XCircle className="mx-auto h-12 w-12 text-destructive" />}
          <CardTitle className="mt-4 text-2xl">
            {status === 'loading' && 'Signing In...'}
            {status === 'success' && 'Success!'}
            {status === 'error' && 'Error'}
          </CardTitle>
          <CardDescription className="mt-2">{message}</CardDescription>
        </CardHeader>
        <CardContent>
          {(status === 'error') && (
            <Button asChild>
              <Link href="/login">Go to Login</Link>
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}


export default function ActionPage() {
    return (
        <Suspense fallback={<div className="flex h-screen w-full items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>}>
            <EmailActionHandler />
        </Suspense>
    )
}
