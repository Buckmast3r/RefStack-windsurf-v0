'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';
import { Menu, X, User, LogOut, Settings, LayoutDashboard } from 'lucide-react';
import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

type NavItem = {
  name: string;
  href: string;
  external?: boolean;
};

const mainNavItems: NavItem[] = [
  { name: 'Features', href: '/features' },
  { name: 'Pricing', href: '/pricing' },
  { name: 'Integrations', href: '/integrations' },
  { name: 'Blog', href: '/blog' },
  { name: 'Guides', href: '/guides' },
];

const footerNavItems: NavItem[] = [
  { name: 'About', href: '/about' },
  { name: 'Careers', href: '/careers' },
  { name: 'Contact', href: '/contact' },
  { name: 'API', href: '/api' },
];

const legalNavItems: NavItem[] = [
  { name: 'Privacy', href: '/privacy' },
  { name: 'Terms', href: '/terms' },
  { name: 'Cookies', href: '/cookies' },
];

export function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, status } = useSession();

  // Don't show header on auth pages
  if (pathname && ['/login', '/register'].includes(pathname)) {
    return null;
  }

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push('/login');
  };

  const getUserInitials = (name?: string | null, email?: string | null) => {
    if (name) {
      return name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .substring(0, 2);
    }
    return email ? email.substring(0, 2).toUpperCase() : 'US';
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <span className="inline-block font-bold text-xl">RefStack</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            {mainNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  pathname === item.href ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          
          {status === 'authenticated' ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={session.user?.image || ''} alt={session.user?.name || 'User'} />
                    <AvatarFallback>
                      {getUserInitials(session.user?.name, session.user?.email)}
                    </AvatarFallback>
                  </Avatar>
                  <span className="sr-only">Toggle user menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="flex items-center gap-2 p-2">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={session.user?.image || ''} alt={session.user?.name || 'User'} />
                    <AvatarFallback>
                      {getUserInitials(session.user?.name, session.user?.email)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <p className="font-medium">{session.user?.name || 'User'}</p>
                    <p className="text-xs text-muted-foreground truncate max-w-[180px]">
                      {session.user?.email}
                    </p>
                  </div>
                </div>
                <DropdownMenuItem onClick={() => router.push('/dashboard')}>
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  <span>Dashboard</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push('/settings')}>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleSignOut}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/login">Log in</Link>
              </Button>
              <Button size="sm" asChild>
                <Link href="/register">Get started</Link>
              </Button>
            </>
          )}
          
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t">
          <div className="container py-4 space-y-4">
            <div className="grid gap-2">
              {mainNavItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block px-2 py-1.5 text-sm rounded-md ${
                    pathname === item.href
                      ? 'bg-accent text-accent-foreground'
                      : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              
              {status === 'authenticated' && (
                <>
                  <div className="border-t border-border my-2"></div>
                  <Link
                    href="/dashboard"
                    className={`block px-2 py-1.5 text-sm rounded-md ${
                      pathname === '/dashboard'
                        ? 'bg-accent text-accent-foreground'
                        : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/settings"
                    className={`block px-2 py-1.5 text-sm rounded-md ${
                      pathname === '/settings'
                        ? 'bg-accent text-accent-foreground'
                        : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Settings
                  </Link>
                  <button
                    onClick={() => {
                      handleSignOut();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full text-left px-2 py-1.5 text-sm rounded-md text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  >
                    Sign out
                  </button>
                </>
              )}
            </div>
            
            {status !== 'authenticated' && (
              <div className="flex flex-col gap-2 pt-2">
                <Button asChild className="w-full">
                  <Link href="/login" onClick={() => setMobileMenuOpen(false)}>Log in</Link>
                </Button>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/register" onClick={() => setMobileMenuOpen(false)}>Sign up</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
