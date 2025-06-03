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
  const [selectedTheme, setSelectedTheme] = useState<'default' | 'sunset' | 'forest' | 'midnight'>('default');
  
  // Theme configurations
  const themes = {
    default: {
      name: "Ocean Blue",
      gradient: "from-blue-950 via-indigo-950 to-purple-950",
      cardBg: "bg-blue-950/40",
      cardBorder: "border-blue-800/50",
      accent: "bg-blue-600",
      textPrimary: "text-white",
      textSecondary: "text-blue-200/80",
    },
    sunset: {
      name: "Sunset Glow",
      gradient: "from-orange-950 via-red-950 to-pink-950",
      cardBg: "bg-orange-950/40",
      cardBorder: "border-orange-800/50",
      accent: "bg-orange-600",
      textPrimary: "text-white",
      textSecondary: "text-orange-200/80",
    },
    forest: {
      name: "Forest Green",
      gradient: "from-green-950 via-emerald-950 to-teal-950",
      cardBg: "bg-green-950/40",
      cardBorder: "border-green-800/50",
      accent: "bg-green-600",
      textPrimary: "text-white",
      textSecondary: "text-green-200/80",
    },
    midnight: {
      name: "Midnight Purple",
      gradient: "from-purple-950 via-violet-950 to-indigo-950",
      cardBg: "bg-purple-950/40",
      cardBorder: "border-purple-800/50",
      accent: "bg-purple-600",
      textPrimary: "text-white",
      textSecondary: "text-purple-200/80",
    },
  };

  const currentTheme = themes[selectedTheme];

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
          throw new Error('Failed to load user profile');
        }
        
        const data = await response.json();
        setUser(data);
        
        // Set theme based on user preferences if available
        if (data.userPreference?.theme) {
          setSelectedTheme(data.userPreference.theme as 'default' | 'sunset' | 'forest' | 'midnight');
        }
      } catch (err: any) {
        console.error('Error fetching user profile:', err);
        setError(err.message || 'Failed to load user profile');
      } finally {
        setIsLoading(false);
      }
    }
    
    if (username) {
      fetchUserProfile();
    }
  }, [username]);

  // Handle share button click
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${user?.name || user?.username}'s Referral Stack`,
          text: `Check out ${user?.name || user?.username}'s referral stack on RefStack!`,
          url: window.location.href,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      // Fallback for browsers that don't support the Web Share API
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard!');
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-950 to-indigo-950 text-white py-12 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <div className="animate-pulse">
            <div className="h-24 w-24 bg-blue-800/30 rounded-full mx-auto mb-4"></div>
            <div className="h-8 w-48 bg-blue-800/30 rounded mx-auto mb-12"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-32 bg-blue-800/30 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-950 to-indigo-950 text-white py-12 px-4">
        <div className="max-w-xl mx-auto text-center">
          <h1 className="text-3xl font-bold mb-4">Profile Not Found</h1>
          <p className="text-xl mb-8">{error}</p>
          <Button
            variant="outline"
            className="border-white/20 hover:bg-white/10"
            onClick={() => window.location.href = '/'}
          >
            Return to Home
          </Button>
        </div>
      </div>
    );
  }

  // Calculate stats from referrals
  const publicReferrals = user?.referralLinks || [];
  const totalReferralCards = publicReferrals.length;
  const totalClicks = publicReferrals.reduce((sum, ref) => sum + ref.clicks, 0);
  const totalConversions = publicReferrals.reduce((sum, ref) => sum + ref.conversions, 0);
  const avgClicksPerCard = totalReferralCards > 0 ? Math.round(totalClicks / totalReferralCards) : 0;

  // Current URL for SEO tags
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

  return (
    <>
      {/* SEO Meta Tags - client-side only */}
      {user && (
        <>
          <SocialMetaTags
            title={`${user.name || '@' + user.username} | RefStack`}
            description={user.bio || `Check out ${user.username}'s referral links and recommendations on RefStack`}
            image={user.avatarUrl}
            url={currentUrl}
            type="profile"
          />
          <ProfileStructuredData
            name={user.name || user.username}
            username={user.username}
            description={user.bio}
            image={user.avatarUrl}
            url={currentUrl}
          />
        </>
      )}

      <div className={`min-h-screen bg-gradient-to-b ${currentTheme.gradient} text-white`}>
        <div className="max-w-5xl mx-auto py-12 px-4">
          {/* Share Button */}
          <div className="absolute top-4 right-4">
            <Button 
              variant="ghost" 
              size="icon"
              className="bg-white/10 hover:bg-white/20 rounded-full"
              onClick={handleShare}
            >
              <Share2 className="h-5 w-5" />
            </Button>
          </div>

          {/* Profile Section */}
          <div className="text-center mb-12">
            <div className="mb-6">
              {user?.avatarUrl ? (
                <img 
                  src={user.avatarUrl} 
                  alt={user.name || user.username} 
                  className="h-24 w-24 rounded-full mx-auto shadow-xl border-2 border-white/20"
                />
              ) : (
                <div className="h-24 w-24 bg-blue-800 rounded-full mx-auto flex items-center justify-center">
                  <span className="text-2xl font-bold">{user?.username.charAt(0).toUpperCase()}</span>
                </div>
              )}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              {user?.name || `@${user?.username}`}
            </h1>
            {user?.username && user?.name && (
              <p className="text-xl text-blue-200/80 mb-4">@{user.username}</p>
            )}
            {user?.bio && (
              <p className="max-w-2xl mx-auto text-lg mb-8">{user.bio}</p>
            )}
          </div>

          {/* Main Content Container */}
          <div className={`bg-black/20 backdrop-blur-sm rounded-3xl overflow-hidden border border-white/10 shadow-2xl mb-12`}>
            {/* Stats Section */}
            <div className={`${currentTheme.cardBg} border-b border-white/10 py-6 px-8`}>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold mb-1">{totalClicks}</div>
                  <div className={`text-sm ${currentTheme.textSecondary} flex items-center justify-center gap-1`}>
                    <ExternalLink className="h-4 w-4" />
                    Clicks
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold mb-1">{totalConversions}</div>
                  <div className={`text-sm ${currentTheme.textSecondary} flex items-center justify-center gap-1`}>
                    <TrendingUp className="h-4 w-4" />
                    Conversions
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold mb-1">{totalReferralCards}</div>
                  <div className={`text-sm ${currentTheme.textSecondary} flex items-center justify-center gap-1`}>
                    <Users className="h-4 w-4" />
                    Active Links
                  </div>
                </div>
              </div>
            </div>

            {/* Referral Links Section */}
            <div className="p-6 md:p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Referral Stack</h2>
                <div
                  className={`${currentTheme.cardBg} border ${currentTheme.cardBorder} rounded-full px-3 py-1 text-sm`}
                >
                  {publicReferrals.length} active links
                </div>
              </div>

              {/* Referral Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {publicReferrals.map((referral, index) => (
                  <div key={referral.id} className="relative">
                    {/* Display order indicator */}
                    <div
                      className={`absolute -top-2 -left-2 ${currentTheme.accent} text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center shadow-lg z-10`}
                    >
                      {index + 1}
                    </div>
                    <ReferralCard
                      category={referral.category}
                      company={referral.name}
                      logo={`/${referral.name.toLowerCase()}-logo.svg`}
                      logoColor={referral.logoColor}
                      hasExternalLink={referral.status === "active"}
                    />
                  </div>
                ))}
                {publicReferrals.length === 0 && (
                  <div className="col-span-2 text-center py-12">
                    <p className={`text-xl ${currentTheme.textSecondary}`}>No referrals in public stack yet</p>
                    <p className={`${currentTheme.textSecondary} mt-2 opacity-60`}>
                      This user hasn't added any referrals to their public stack
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Footer Section */}
            <div className={`p-6 md:p-8 border-t border-white/10 text-center ${currentTheme.textSecondary}`}>
              <p className="mb-4">
                💡 <strong>Pro Tip:</strong> Using these referral links helps support {user?.name || user?.username} and doesn't cost
                you anything extra!
              </p>
              <div className="flex justify-center items-center gap-2 text-sm opacity-75">
                <span>Powered by</span>
                <a href="/" className="font-bold hover:text-white transition-colors">
                  RefStack.me
                </a>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <Button
              className={`${currentTheme.accent} hover:opacity-90 text-white text-xl py-6 px-12 rounded-full shadow-[0_0_20px_rgba(59,130,246,0.5)] border border-blue-500/50 transition-all hover:shadow-[0_0_30px_rgba(59,130,246,0.7)]`}
              onClick={() => window.open("/register", "_blank")}
            >
              Build Your Own Referral Stack
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
