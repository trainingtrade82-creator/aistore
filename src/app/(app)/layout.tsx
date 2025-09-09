
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
  SidebarInset,
} from '@/components/ui/sidebar';
import {
    LayoutGrid,
    Settings,
    User,
    Wand2,
    Aperture,
    Rocket,
    Save,
    Power,
    ClipboardList,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Loader2 } from 'lucide-react';
import { getAuth, signOut } from 'firebase/auth';

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuth();
  const router = useRouter();
  const auth = getAuth();

  useEffect(() => {
    if (user === null) {
      router.push('/login');
    }
  }, [user, router]);
  
  const handleSignOut = async () => {
    try {
        await signOut(auth);
        router.push('/');
    } catch (error) {
        console.error('Sign out error', error);
    }
  };

  if (user === undefined) {
    return (
        <div className="flex h-screen w-full items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
    );
  }

  if (user === null) {
    return null; // Don't render anything while redirecting
  }

  return (
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
                <SidebarMenuButton href="/meeting-notes-ai" left={<ClipboardList />}>
                    Meeting Notes
                </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
                <SidebarMenuButton href="/ai-tools" left={<Wand2 />}>
                    AI Tools
                </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
                <SidebarMenuButton href="/saved-projects" left={<Save />}>
                    Saved Projects
                </SidebarMenuButton>
            </SidebarMenuItem>
        </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
            <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton href="/settings" left={<Settings />}>
                        Settings
                    </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                    <SidebarMenuButton href="/profile" left={<User />}>
                        Profile
                    </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                    <SidebarMenuButton onClick={handleSignOut} left={<Power />}>
                        Sign Out
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
              <div className="flex items-center gap-3 p-2 mt-4 rounded-md transition-colors border">
                <Avatar className="h-9 w-9">
                    <AvatarImage src={user.photoURL ?? `https://picsum.photos/100/100?random=42`} />
                    <AvatarFallback>{user.displayName?.charAt(0) || 'U'}</AvatarFallback>
                </Avatar>
                <div className="overflow-hidden">
                    <p className="font-semibold text-sm truncate">{user.displayName || 'Guest User'}</p>
                    <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                </div>
            </div>
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
  );
}
