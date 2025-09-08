
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MailCheck } from 'lucide-react';
import Link from 'next/link';

export default function VerifyEmailPage() {
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
          </d_change>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Didn't receive the email? Check your spam folder or wait a few minutes.
          </p>
          <p className="mt-4 text-sm text-muted-foreground">
            Once verified, you can <Link href="/login" className="font-semibold text-primary hover:underline">log in to your account</Link>.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
