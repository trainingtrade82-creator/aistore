'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { getAuth, sendEmailVerification } from 'firebase/auth';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Loader2, MailCheck, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function VerifyEmailPage() {
    const { user } = useAuth();
    const router = useRouter();
    const { toast } = useToast();
    const auth = getAuth();

    const [status, setStatus] = useState<'loading' | 'verified' | 'unverified'>('loading');
    const [isResending, setIsResending] = useState(false);

    const handleVerification = useCallback(async () => {
        if (user) {
            // Manually reload the user object to get the latest emailVerified status
            await user.reload();
            if (user.emailVerified) {
                setStatus('verified');
                toast({
                    title: 'Email Verified!',
                    description: 'Your email has been successfully verified. Redirecting you to the dashboard.',
                });
                setTimeout(() => router.push('/dashboard'), 2000);
                return true; // Verification complete
            } else {
                setStatus('unverified');
            }
        } else if (user === null) {
            // If there's no user, they shouldn't be here
            router.push('/login');
        }
        return false; // Verification not complete
    }, [user, router, toast]);

    useEffect(() => {
        const checkVerification = async () => {
            if (await handleVerification()) {
                return;
            }

            const interval = setInterval(async () => {
                if (auth.currentUser) {
                    await auth.currentUser.reload();
                    if (auth.currentUser.emailVerified) {
                        clearInterval(interval);
                        await handleVerification();
                    }
                }
            }, 3000);

            return () => clearInterval(interval);
        };

        checkVerification();

    }, [user, auth, handleVerification]);

    const handleResendVerificationEmail = async () => {
        setIsResending(true);
        if (auth.currentUser) {
            try {
                await sendEmailVerification(auth.currentUser);
                toast({
                    title: 'Verification Email Sent',
                    description: 'A new verification link has been sent to your email address.',
                });
            } catch (error: any) {
                console.error("Resend Verification Error:", error);
                toast({
                    variant: 'destructive',
                    title: 'Error',
                    description: 'Failed to resend verification email. Please try again later.',
                });
            } finally {
                setIsResending(false);
            }
        } else {
             toast({
                variant: 'destructive',
                title: 'Error',
                description: 'You must be logged in to resend a verification email.',
            });
            setIsResending(false);
        }
    };

    if (status === 'loading') {
        return (
            <div className="flex h-screen w-full items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }
    
    if (status === 'verified') {
        return (
             <div className="flex min-h-screen items-center justify-center bg-secondary/40 p-4">
                <Card className="w-full max-w-md text-center">
                    <CardHeader>
                         <MailCheck className="mx-auto h-12 w-12 text-green-500" />
                        <CardTitle className="mt-4 text-2xl">Email Verified!</CardTitle>
                        <CardDescription>Redirecting you to your dashboard...</CardDescription>
                    </CardHeader>
                </Card>
            </div>
        )
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-secondary/40 p-4">
            <Card className="w-full max-w-md text-center">
                <CardHeader>
                    <AlertTriangle className="mx-auto h-12 w-12 text-yellow-500" />
                    <CardTitle className="mt-4 text-2xl">Please Verify Your Email</CardTitle>
                    <CardDescription>
                       We've sent a verification link to <strong>{user?.email}</strong>. Click the link in the email to activate your account.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground">
                        Can't find the email? Please check your Spam or Junk folder. It might take a minute to arrive.
                    </p>
                </CardContent>
                <CardFooter className="flex flex-col gap-4">
                    <Button onClick={handleResendVerificationEmail} disabled={isResending} className="w-full">
                        {isResending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                        Resend Verification Email
                    </Button>
                    <Button variant="ghost" onClick={() => router.push('/login')}>Go back to Login</Button>
                </CardFooter>
            </Card>
        </div>
    );
}
