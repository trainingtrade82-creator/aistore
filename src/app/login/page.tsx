'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, isSignInWithEmailLink, signInWithEmailLink, sendSignInLinkToEmail } from 'firebase/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { actionCodeSettings } from '@/firebase/clientApp';

const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }).optional(),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isEmailLinkSent, setIsEmailLinkSent] = useState(false);
  const auth = getAuth();

  useEffect(() => {
    const processEmailLink = async () => {
      if (isSignInWithEmailLink(auth, window.location.href)) {
        setIsLoading(true);
        let email = window.localStorage.getItem('emailForSignIn');
        if (!email) {
          email = window.prompt('Please provide your email for confirmation');
        }
        if (email) {
            try {
                await signInWithEmailLink(auth, email, window.location.href);
                window.localStorage.removeItem('emailForSignIn');
                router.push('/dashboard');
            } catch (error: any) {
                 toast({
                    variant: 'destructive',
                    title: 'Login Failed',
                    description: 'The sign-in link is invalid or has expired. Please try again.',
                });
            } finally {
                setIsLoading(false);
            }
        } else {
             toast({
                variant: 'destructive',
                title: 'Login Failed',
                description: 'Email is required to complete sign-in.',
            });
            setIsLoading(false);
        }
      }
    };
    processEmailLink();
  }, [auth, router, toast]);


  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '' },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    try {
      await sendSignInLinkToEmail(auth, data.email, actionCodeSettings);
      window.localStorage.setItem('emailForSignIn', data.email);
      setIsEmailLinkSent(true);
      toast({
        title: 'Check your email',
        description: `A sign-in link has been sent to ${data.email}.`,
      });
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Failed to send link',
        description: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      router.push('/dashboard');
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Google Sign-In Failed',
        description: error.message,
      });
    } finally {
      setIsGoogleLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-secondary/40 p-4">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Welcome Back</CardTitle>
          <CardDescription>
            {isEmailLinkSent ? 'Check your email for the sign-in link.' : 'Enter your email to receive a secure sign-in link.'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!isEmailLinkSent && (
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="m@example.com" {...form.register('email')} />
                {form.formState.errors.email && <p className="text-sm text-destructive">{form.formState.errors.email.message}</p>}
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Send Sign-In Link
                </Button>
            </form>
          )}

          {isEmailLinkSent && (
             <div className="text-center">
                <p>Waiting for you to click the link in your email...</p>
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
              <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div>
          <Button variant="outline" className="w-full" onClick={handleGoogleSignIn} disabled={isGoogleLoading || isLoading}>
            {isGoogleLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 126 23.4 172.9 62.3l-66.5 64.6C305.5 99.6 280.5 80 248 80c-82.3 0-148.2 66.3-148.2 147.4s65.9 147.4 148.2 147.4c87.7 0 129.2-61.2 135-95.2H248v-65.7h239.5c1.4 9.3 2.5 19.1 2.5 29.5z"></path></svg>}
            Google
          </Button>
          <p className="mt-4 text-center text-sm text-muted-foreground">
            Don't have an account?{' '}
            <Link href="/signup" className="font-semibold text-primary hover:underline">
              Sign up
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
