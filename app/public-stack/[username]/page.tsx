'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import ReferralCard from '@/components/referral-card';
import { Share2, ExternalLink, Users, TrendingUp } from 'lucide-react';
import { SocialMetaTags } from '@/components/seo/metadata';
import { ProfileStructuredData } from '@/components/seo/structured-data';
import { toast } from 'sonner';

// Define types for referral links
interface ReferralLink {
  id: string;
  name: string;
  category: string;
  url: string;
  clicks: number;
  conversions: number;
  status: string;
  dateCreated: string;
  logoColor: string;
  displayOrder: number;
}

// Define types for user profile
interface UserProfile {
  id: string;
  username: string;
  name?: string;
  bio?: string;
  avatarUrl?: string;
  bannerUrl?: string;
  logoUrl?: string;
  primaryColor?: string;
  referralLinks: ReferralLink[];
}

export default function UserPublicStackPage() {
  const params = useParams<{ username: string }>();
  const username = params.username as string;
  
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch user profile and referral links
  useEffect(() => {
    async function fetchUserProfile() {
      try {
        setIsLoading(true);
        
        // Fetch user profile
        const response = await fetch(`/api/public-profile/${username}`);
        
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('User profile not found');
          }
          throw new Error('Failed to fetch user profile');
        }
        
        const userData = await response.json();
        setUser(userData);
        
      } catch (err) {
        console.error('Error fetching user profile:', err);
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    }
    
    if (username) {
      fetchUserProfile();
    }
  }, [username]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-6 max-w-md w-full text-center">
          <h2 className="text-xl font-semibold mb-2">Error</h2>
          <p className="text-red-200 mb-4">{error}</p>
          <Button onClick={() => window.location.reload()} variant="outline">
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>No user data found</p>
      </div>
    );
  }

  // Calculate total clicks and conversions
  const totalClicks = user.referralLinks.reduce((sum, link) => sum + (link.clicks || 0), 0);
  const totalConversions = user.referralLinks.reduce((sum, link) => sum + (link.conversions || 0), 0);
  const conversionRate = totalClicks > 0 ? (totalConversions / totalClicks) * 100 : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      {/* Social Meta Tags */}
      <SocialMetaTags 
        username={user.username}
        name={user.name}
        bio={user.bio}
        avatarUrl={user.avatarUrl}
      />
      
      {/* Structured Data */}
      <ProfileStructuredData 
        username={user.username}
        name={user.name}
        bio={user.bio}
        avatarUrl={user.avatarUrl}
        links={user.referralLinks}
      />

      {/* Header */}
      <header className="relative">
        {user.bannerUrl && (
          <div 
            className="h-48 w-full bg-cover bg-center"
            style={{ backgroundImage: `url(${user.bannerUrl})` }}
          />
        )}
        
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            {user.avatarUrl && (
              <div className="relative -mt-16">
                <img
                  src={user.avatarUrl}
                  alt={`${user.name || user.username}'s avatar`}
                  className="h-32 w-32 rounded-full border-4 border-gray-800 bg-gray-800"
                />
              </div>
            )}
            
            <div className="flex-1">
              <h1 className="text-3xl font-bold">{user.name || user.username}</h1>
              {user.bio && <p className="text-gray-300 mt-2">{user.bio}</p>}
              
              <div className="flex items-center gap-4 mt-4 text-sm text-gray-400">
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>{user.referralLinks.length} links</span>
                </div>
                <div className="flex items-center gap-1">
                  <TrendingUp className="h-4 w-4" />
                  <span>{totalClicks} clicks</span>
                </div>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline" className="gap-2">
                <Share2 className="h-4 w-4" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
            <p className="text-gray-400 text-sm">Total Links</p>
            <p className="text-3xl font-bold">{user.referralLinks.length}</p>
          </div>
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
            <p className="text-gray-400 text-sm">Total Clicks</p>
            <p className="text-3xl font-bold">{totalClicks}</p>
          </div>
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
            <p className="text-gray-400 text-sm">Conversion Rate</p>
            <p className="text-3xl font-bold">{conversionRate.toFixed(1)}%</p>
          </div>
        </div>

        {/* Referral Links */}
        <div className="grid grid-cols-1 gap-4">
          {user.referralLinks
            .sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0))
            .map((link) => (
              <ReferralCard key={link.id} link={link} username={user.username} />
            ))}
            
          {user.referralLinks.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-400">No referral links found</p>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-8 mt-12">
        <div className="container mx-auto px-4 text-center text-gray-400 text-sm">
          <p>Powered by RefStack</p>
        </div>
      </footer>
    </div>
  );
}
