"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import ReferralCard from "@/components/referral-card"
import RobotAvatar from "@/components/robot-avatar"
import Link from "next/link"
import Image from "next/image"
import { useParams } from "next/navigation"
import { Skeleton } from "@/components/ui/skeleton"
import { 
  Share2, 
  Download, 
  Settings, 
  Palette, 
  Eye, 
  Users, 
  TrendingUp, 
  ExternalLink,
  AlertCircle
} from "lucide-react"

// Define theme interface
interface Theme {
  name: string;
  gradient: string;
  cardBg: string;
  cardBorder: string;
  accent: string;
  textPrimary: string;
  textSecondary: string;
}

// Define referral link interface
interface ReferralLink {
  id: string;
  name: string;
  category?: string;
  url: string;
  clicks: number;
  conversions: number;
  status: string;
  createdAt: string;
  logoColor?: string;
  customLogo?: string;
  customColor?: string;
  shortCode: string;
  customSlug?: string;
  displayOrder?: number;
}

// Define user profile interface
interface UserProfile {
  id: string;
  username: string;
  name?: string;
  bio?: string;
  avatarUrl?: string;
  bannerUrl?: string;
  website?: string;
  company?: string;
  location?: string;
  customTheme?: string;
  customBranding?: {
    logo?: string;
    colors?: {
      primary?: string;
      secondary?: string;
      background?: string;
    };
    fonts?: {
      heading?: string;
      body?: string;
    };
  };
  isWhiteLabeled?: boolean;
  subscription?: {
    plan: string;
    status: string;
  };
}

export default function UserPublicStackPage() {
  const params = useParams();
  const username = params.username as string;
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTheme, setSelectedTheme] = useState("default");
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [referrals, setReferrals] = useState<ReferralLink[]>([]);

  // Theme configurations
  const themes: Record<string, Theme> = {
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
    custom: {
      name: "Custom Theme",
      gradient: "from-slate-950 via-slate-900 to-slate-950",
      cardBg: "bg-slate-950/40",
      cardBorder: "border-slate-800/50",
      accent: "bg-slate-600",
      textPrimary: "text-white",
      textSecondary: "text-slate-200/80",
    },
  };

  // Fetch user profile and referral links
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch user profile
        const profileRes = await fetch(`/api/public-profile/${username}`);
        
        if (!profileRes.ok) {
          if (profileRes.status === 404) {
            throw new Error("User not found");
          }
          throw new Error("Failed to fetch user profile");
        }
        
        const profileData = await profileRes.json();
        setUserProfile(profileData);
        
        // Set theme based on user preference if they're PRO
        if (profileData.subscription?.plan === "PRO" && profileData.customTheme) {
          setSelectedTheme(profileData.customTheme);
        }
        
        // Fetch public referral links
        const referralsRes = await fetch(`/api/public-referrals/${username}`);
        
        if (!referralsRes.ok) {
          throw new Error("Failed to fetch referral links");
        }
        
        const referralsData = await referralsRes.json();
        setReferrals(referralsData.links || []);
      } catch (err: any) {
        console.error("Error fetching data:", err);
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    
    if (username) {
      fetchUserData();
    }
  }, [username]);

  // Apply custom branding if user is PRO and has custom branding
  const getCustomStyles = () => {
    if (!userProfile?.customBranding) return {};

    const styles: Record<string, any> = {};
    const branding = userProfile.customBranding;

    if (branding.colors?.primary) {
      styles['--color-primary'] = branding.colors.primary;
    }
    if (branding.colors?.secondary) {
      styles['--color-secondary'] = branding.colors.secondary;
    }
    if (branding.colors?.background) {
      styles['--color-background'] = branding.colors.background;
    }
    if (branding.fonts?.heading) {
      styles['--font-heading'] = branding.fonts.heading;
    }
    if (branding.fonts?.body) {
      styles['--font-body'] = branding.fonts.body;
    }

    return styles;
  };

  // Get the current theme
  const currentTheme = themes[selectedTheme] || themes.default;
  
  // Apply custom theme properties if user has custom branding
  if (selectedTheme === 'custom' && userProfile?.customBranding?.colors) {
    const colors = userProfile.customBranding.colors;
    if (colors.primary) {
      currentTheme.accent = `bg-[${colors.primary}]`;
    }
    if (colors.secondary) {
      currentTheme.cardBorder = `border-[${colors.secondary}]`;
    }
    if (colors.background) {
      currentTheme.gradient = `from-[${colors.background}] to-[${colors.background}]`;
    }
  }

  // Filter to only show public referrals and sort by display order
  const publicReferrals = referrals
    .sort((a, b) => ((a.displayOrder || 0) - (b.displayOrder || 0)));

  // Calculate stats from public referrals
  const totalClicks = publicReferrals.reduce((sum, ref) => sum + ref.clicks, 0);
  const totalConversions = publicReferrals.reduce((sum, ref) => sum + ref.conversions, 0);
  const totalReferralCards = publicReferrals.length;
  const avgClicksPerCard = totalReferralCards > 0 ? Math.round(totalClicks / totalReferralCards) : 0;

  // Share function
  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: `${userProfile?.name || username}'s Referral Stack`,
          text: `Check out ${userProfile?.name || username}'s referral stack!`,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert("Link copied to clipboard!");
      }
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-4 md:p-8">
        <div className="max-w-4xl mx-auto py-12">
          <div className="flex flex-col items-center space-y-4 mb-8">
            <Skeleton className="h-24 w-24 rounded-full" />
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-4 w-48" />
          </div>
          <div className="bg-gray-800/50 rounded-xl border border-gray-700/50 backdrop-blur-md">
            <Skeleton className="h-40 w-full rounded-t-xl" />
            <div className="p-8">
              <div className="flex justify-between mb-6">
                <Skeleton className="h-8 w-40" />
                <Skeleton className="h-8 w-20" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Skeleton className="h-32 w-full rounded-xl" />
                <Skeleton className="h-32 w-full rounded-xl" />
                <Skeleton className="h-32 w-full rounded-xl" />
                <Skeleton className="h-32 w-full rounded-xl" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white flex items-center justify-center p-4">
        <div className="bg-gray-800/50 rounded-xl border border-gray-700/50 backdrop-blur-md p-8 max-w-md w-full text-center">
          <AlertCircle className="h-12 w-12 mx-auto mb-4 text-red-500" />
          <h1 className="text-2xl font-bold mb-2">Error</h1>
          <p className="text-gray-300 mb-6">{error}</p>
          <Button asChild>
            <Link href="/">Return Home</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen bg-gradient-to-br text-white p-4 md:p-8" 
      style={{
        ...getCustomStyles(),
        background: userProfile?.customBranding?.colors?.background 
          ? userProfile.customBranding.colors.background 
          : `linear-gradient(to bottom right, var(--tw-gradient-stops))`
      }}
    >
      <div className={`bg-gradient-to-br ${currentTheme.gradient} min-h-screen -m-4 md:-m-8 p-4 md:p-8`}>
        <div className="max-w-4xl mx-auto py-8 md:py-12">
          {/* Profile Header */}
          <div className="flex flex-col items-center space-y-4 mb-8">
            {userProfile?.avatarUrl ? (
              <Image
                src={userProfile.avatarUrl}
                alt={userProfile.name || username}
                width={96}
                height={96}
                className="rounded-full border-4 border-white/20"
              />
            ) : (
              <RobotAvatar size="xl" />
            )}
            <h1 className={`text-3xl md:text-4xl font-bold ${currentTheme.textPrimary}`}>
              {userProfile?.name || username}
            </h1>
            {userProfile?.bio && (
              <p className={`text-center max-w-lg ${currentTheme.textSecondary}`}>{userProfile.bio}</p>
            )}
            <div className="flex flex-wrap gap-2 justify-center">
              {userProfile?.website && (
                <a
                  href={userProfile.website.startsWith('http') ? userProfile.website : `https://${userProfile.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-1 ${currentTheme.textSecondary} hover:text-white transition-colors px-3 py-1 rounded-full ${currentTheme.cardBg} ${currentTheme.cardBorder} border text-sm`}
                >
                  <ExternalLink className="h-3 w-3" />
                  Website
                </a>
              )}
              <button
                onClick={handleShare}
                className={`flex items-center gap-1 ${currentTheme.textSecondary} hover:text-white transition-colors px-3 py-1 rounded-full ${currentTheme.cardBg} ${currentTheme.cardBorder} border text-sm`}
              >
                <Share2 className="h-3 w-3" />
                Share
              </button>
            </div>
          </div>

          {/* Main Content Container */}
          <div className={`bg-black/30 backdrop-blur-md rounded-xl border border-white/10 overflow-hidden`}>
            {/* Banner Image */}
            {userProfile?.bannerUrl && (
              <div className="h-40 md:h-48 relative overflow-hidden">
                <Image 
                  src={userProfile.bannerUrl} 
                  alt="Profile banner" 
                  fill 
                  className="object-cover"
                />
              </div>
            )}

            {/* Stats Section */}
            <div className={`p-6 md:p-8 ${userProfile?.bannerUrl ? 'border-t border-white/10' : ''}`}>
              <h2 className="text-xl font-semibold mb-4">My Referral Stats</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold mb-1">{totalClicks}</div>
                  <div className={`text-sm ${currentTheme.textSecondary} flex items-center justify-center gap-1`}>
                    <Eye className="h-4 w-4" />
                    Total Clicks
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
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold mb-1">{avgClicksPerCard}</div>
                  <div className={`text-sm ${currentTheme.textSecondary}`}>Avg. per Link</div>
                </div>
              </div>
            </div>

            {/* Referral Links Section */}
            <div className="p-6 md:p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">My Referral Stack</h2>
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
                      category={referral.category || ""}
                      company={referral.name}
                      logo={referral.customLogo || `/${referral.name.toLowerCase()}-logo.svg`}
                      logoColor={referral.customColor || referral.logoColor || "bg-blue-500"}
                      hasExternalLink={referral.status === "active"}
                      url={`/r/${referral.customSlug || referral.shortCode}`}
                    />
                  </div>
                ))}
                {publicReferrals.length === 0 && (
                  <div className="col-span-2 text-center py-12">
                    <p className={`text-xl ${currentTheme.textSecondary}`}>No referrals in public stack yet</p>
                    <p className={`${currentTheme.textSecondary} mt-2 opacity-60`}>
                      Add some referrals to your public stack from the dashboard
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Footer Section */}
            <div className={`p-6 md:p-8 border-t border-white/10 text-center ${currentTheme.textSecondary}`}>
              <p className="mb-4">
                💡 <strong>Pro Tip:</strong> Using my referral links helps support my content creation and doesn't cost
                you anything extra!
              </p>
              
              {/* Only show RefStack branding if not white-labeled */}
              {(!userProfile?.isWhiteLabeled && userProfile?.subscription?.plan !== "ENTERPRISE") && (
                <div className="flex justify-center items-center gap-2 text-sm opacity-75">
                  <span>Powered by</span>
                  <Link href="/" className="font-bold hover:text-white transition-colors">
                    RefStack.me
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Call to Action - Only show for non-users */}
          <div className="text-center mt-8">
            <Button
              className={`${currentTheme.accent} hover:opacity-90 text-white py-6 px-12 rounded-full shadow-[0_0_20px_rgba(59,130,246,0.5)] border border-blue-500/50 transition-all hover:shadow-[0_0_30px_rgba(59,130,246,0.7)]`}
              onClick={() => window.open("/register", "_blank")}
            >
              Build Your Own Referral Stack
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
