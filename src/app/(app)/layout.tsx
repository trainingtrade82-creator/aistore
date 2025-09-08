
'use client';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarTrigger,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuBadge,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarInset,
} from '@/components/ui/sidebar';
import {
    LayoutGrid,
    LogOut,
    Settings,
    User,
    Wand2,
    Aperture,
    Loader2
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { getAuth, signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import React, { useEffect } from 'react';

function AuthProtection({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      if (user === undefined) {
        // Still checking
        setLoading(true);
      } else if (user === null) {
        // No user found, redirect to login
        setLoading(false);
        router.push('/login');
      } else {
        // User is logged in, check if email is verified
        await user.reload(); // Refresh user data to get latest verification status
        if (user.providerData.some(p => p.providerId === 'google.com') || user.emailVerified) {
          setLoading(false);
        } else {
          // User exists but email is not verified
          router.push('/auth/verify-email');
        }
      }
    };
    
    // A small delay to prevent flicker if user state is resolved quickly
    const timer = setTimeout(checkAuth, 100);

    return () => clearTimeout(timer);
  }, [user, router]);

  if (loading) {
    return (
        <div className="flex h-screen w-full items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
    );
  }

  // Only render children if user is authenticated and verified
  if (user && (user.providerData.some(p => p.providerId === 'google.com') || user.emailVerified)) {
    return <>{children}</>;
  }

  return null; // Render nothing while redirecting
}


export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuth();
  const router = useRouter();
  const auth = getAuth();

  const handleSignOut = async () => {
    await signOut(auth);
    router.push('/');
  };

  return (
    <AuthProtection>
        <SidebarProvider>
        <Sidebar>
            <SidebarHeader>
            <div className="flex items-center gap-2">
                <Aperture className="w-6 h-6 text-primary" />
                <h1 className="text-xl font-semibold">AI Store</h1>
            </div>
            </SidebarHeader>
            <SidebarContent>
            <SidebarMenu>
                <SidebarMenuItem>
                <SidebarMenuButton href="/dashboard" left={<LayoutGrid />}>
                    Dashboard
                </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                <SidebarMenuButton href="/ai-tools" left={<Wand2 />}>
                    AI Tools
                </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                    <SidebarMenuButton href="/settings" left={<Settings />}>
                        Settings
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
            </SidebarContent>
            <SidebarFooter>
                <div className="flex items-center gap-3 p-2 rounded-md transition-colors hover:bg-sidebar-accent">
                    <Avatar className="h-9 w-9">
                        <AvatarImage src={user?.photoURL || undefined} />
                        <AvatarFallback>{user?.displayName?.[0]}</AvatarFallback>
                    </Avatar>
                    <div className="overflow-hidden">
                        <p className="font-semibold text-sm truncate">{user?.displayName}</p>
                        <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
                    </div>
                </div>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton onClick={handleSignOut} left={<LogOut />}>
                            Logout
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
        <SidebarInset>
            <header className="flex items-center justify-between p-2 border-b md:hidden">
                <Link href="/dashboard" className="flex items-center gap-2">
                    <Aperture className="h-6 w-6 text-primary" />
                    <span className="font-semibold">AI Store</span>
                </Link>
                <SidebarTrigger />
            </header>
            <div className="overflow-auto">{children}</div>
        </SidebarInset>
        </SidebarProvider>
    </AuthProtection>
  );
}
