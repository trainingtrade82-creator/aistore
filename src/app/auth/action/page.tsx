
'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { getAuth, applyActionCode } from 'firebase/auth';
import { app } from '@/firebase/clientApp';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

function EmailActionHandler() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('Verifying your email...');

  const mode = searchParams.get('mode');
  const actionCode = searchParams.get('oobCode');

  useEffect(() => {
    if (!mode || !actionCode) {
        setStatus('error');
        setMessage('Invalid verification link. Please try again.');
        return;
    }

    const auth = getAuth(app);
    
    const handleAction = async () => {
      try {
        switch (mode) {
          case 'verifyEmail':
            await applyActionCode(auth, actionCode);
            setStatus('success');
            setMessage('Your email has been successfully verified! You can now log in.');
            toast({
              title: 'Success',
              description: 'Email verified! Please log in.',
            });
            // Optional: Redirect to login after a delay
            setTimeout(() => router.push('/login'), 3000);
            break;
          // You can add cases for 'resetPassword' or 'recoverEmail' here
          default:
            throw new Error('Invalid action mode.');
        }
      } catch (error) {
        setStatus('error');
        setMessage('Invalid or expired verification link. Please request a new one.');
        console.error('Firebase Action Error:', error);
      }
    };

    handleAction();
  }, [mode, actionCode, router, toast]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-secondary/40 p-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          {status === 'loading' && <Loader2 className="mx-auto h-12 w-12 animate-spin text-primary" />}
          {status === 'success' && <CheckCircle className="mx-auto h-12 w-12 text-green-500" />}
          {status === 'error' && <XCircle className="mx-auto h-12 w-12 text-destructive" />}
          <CardTitle className="mt-4 text-2xl">
            {status === 'loading' && 'Verifying...'}
            {status === 'success' && 'Success!'}
            {status === 'error' && 'Error'}
          </CardTitle>
          <CardDescription className="mt-2">{message}</CardDescription>
        </CardHeader>
        <CardContent>
          {status !== 'loading' && (
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
