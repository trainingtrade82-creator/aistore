
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, updateProfile, onAuthStateChanged } from 'firebase/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { app } from '@/firebase/clientApp';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
  const { toast } = useToast();
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isVerificationEmailSent, setIsVerificationEmailSent] = useState(false);
  const auth = getAuth(app);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      // Send verification email only once after a user is created but not yet verified
      if (user && !user.emailVerified && !isVerificationEmailSent) {
        try {
          await sendEmailVerification(user);
          setIsVerificationEmailSent(true); // Mark as sent to prevent re-sending
          toast({
            title: 'Verification Email Sent',
            description: 'A verification link has been sent to your email. Please check your inbox.',
          });
        } catch (error) {
          console.error("Failed to send verification email:", error);
          toast({
            variant: 'destructive',
            title: 'Verification Error',
            description: 'Could not send verification email. Please try logging in and resending it.',
          });
        }
      }
    });
    return () => unsubscribe();
  }, [auth, toast, isVerificationEmailSent]);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setIsVerificationEmailSent(false); // Reset on new signup attempt

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Update the user's profile with their name
      await updateProfile(user, { displayName: name });
      
      toast({
        title: 'Account Created!',
        description: 'You will be sent a verification email shortly.',
      });

      // The useEffect will handle sending the verification email.
      // Now, redirect to the verification page.
      router.push('/auth/verify-email');

    } catch (error: any) {
        console.error("Firebase Signup Error:", error);
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
              Enter your details to get started.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
             <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
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
             <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                disabled={isLoading}
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Sign Up
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
