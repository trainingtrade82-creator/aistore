
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { getAuth, sendSignInLinkToEmail } from 'firebase/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { app } from '@/firebase/clientApp';

export default function SignupPage() {
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const auth = getAuth(app);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const actionCodeSettings = {
        url: `${window.location.origin}/auth/action`,
        handleCodeInApp: true,
    };

    try {
        await sendSignInLinkToEmail(auth, email, actionCodeSettings);
        window.localStorage.setItem('emailForSignIn', email);
        toast({
            title: 'Check your email',
            description: `We've sent a sign-up link to ${email}. Click it to complete your registration.`,
        });
        setEmail('');
    } catch (error: any) {
        console.error("Firebase Signup Error:", error.code, error.message);
        toast({
            variant: 'destructive',
            title: 'Signup Failed',
            description: error.message.replace('Firebase: ', '').split(' (')[0],
        });
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-secondary/40 p-4">
      <Card className="w-full max-w-sm">
        <form onSubmit={handleSignup}>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Create an Account</CardTitle>
            <CardDescription>
              Enter your email to get started with a magic link.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Sign Up with Email
            </Button>
            <CardDescription>
                Already have an account?{' '}
                <Link href="/login" className="text-primary hover:underline">
                    Log In
                </Link>
            </CardDescription>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
