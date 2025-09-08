
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getAuth, createUserWithEmailAndPassword, updateProfile, sendEmailVerification } from 'firebase/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { app } from '@/firebase/clientApp';
import { Separator } from '@/components/ui/separator';

const GoogleIcon = () => (
    <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
        <path
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            fill="#4285F4"
        />
        <path
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            fill="#34A853"
        />
        <path
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
            fill="#FBBC05"
        />
        <path
            d="M12 5.16c1.61 0 3.06.55 4.2 1.69l3.15-3.15C17.45 1.99 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            fill="#EA4335"
        />
        <path d="M1 1h22v22H1z" fill="none" />
    </svg>
);


export default function SignupPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setGoogleIsLoading] = useState(false);
  const auth = getAuth(app);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 6) {
        toast({
            variant: 'destructive',
            title: 'Password is too weak',
            description: 'Password must be at least 6 characters long.',
        });
        return;
    }
    setIsLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await updateProfile(user, { displayName: name });
      
      if(auth.currentUser){
          await sendEmailVerification(auth.currentUser);
          toast({
            title: 'Account Created',
            description: 'A verification email has been sent to your inbox. Please verify to log in.',
          });
          router.push('/auth/verify-email');
      }

    } catch (error: any) {
      console.error("Firebase Error:", error.code, error.message);
      if (error.code === 'auth/email-already-in-use') {
        toast({
          variant: 'destructive',
          title: 'Email Already Registered',
          description: (
            <span>
              This email is already in use. Please{' '}
              <Link href="/login" className="underline">
                log in
              </Link>{' '}
              instead.
            </span>
          ),
        });
      } else {
        toast({
          variant: 'destructive',
          title: 'Signup Failed',
          description: error.message.replace('Firebase: ', '').split(' (')[0],
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    setGoogleIsLoading(true);
    const provider = new (await import('firebase/auth')).GoogleAuthProvider();
    try {
      await (await import('firebase/auth')).signInWithPopup(auth, provider);
      toast({
        title: 'Account Created',
        description: 'Welcome to AI Store!',
      });
      router.push('/dashboard');
    } catch (error: any) {
      console.error('Firebase Error:', error.code, error.message);
      toast({
        variant: 'destructive',
        title: 'Google Sign-Up Failed',
        description: error.message.replace('Firebase: ', '').split(' (')[0],
      });
    } finally {
      setGoogleIsLoading(false);
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
                    disabled={isLoading || isGoogleLoading}
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
                disabled={isLoading || isGoogleLoading}
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
                disabled={isLoading || isGoogleLoading}
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button type="submit" className="w-full" disabled={isLoading || isGoogleLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Create Account
            </Button>
             <div className="relative w-full">
                <Separator />
                <span className="absolute left-1/2 -translate-x-1/2 -top-3 bg-card px-2 text-sm text-muted-foreground">OR</span>
            </div>
            <Button variant="outline" className="w-full" onClick={handleGoogleSignUp} disabled={isLoading || isGoogleLoading} type="button">
              {isGoogleLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <GoogleIcon />}
              Continue with Google
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
