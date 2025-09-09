
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function ProfilePage() {
  return (
    <div className="flex-grow p-4 sm:p-6 md:p-8">
        <div className="text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">
                Profile
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-foreground/80 md:text-xl">
                View and edit your user profile.
            </p>
        </div>

        <Card className="max-w-md mx-auto mt-8">
            <CardHeader>
                <CardTitle>Coming Soon!</CardTitle>
                <CardDescription>
                    This feature is currently under development.
                </CardDescription>
            </CardHeader>
        </Card>
    </div>
  );
}
