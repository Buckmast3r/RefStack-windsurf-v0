import { notFound, redirect } from 'next/navigation';
import { Metadata } from 'next';
import prisma from '@/lib/prisma';
import { headers } from 'next/headers';

export const dynamic = 'force-dynamic';

interface PageParams {
  params: {
    shortCode: string;
  };
}

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const { shortCode } = params;

  try {
    // Find referral link by short code or custom slug
    const referralLink = await prisma.referralLink.findFirst({
      where: {
        OR: [
          { shortCode },
          { customSlug: shortCode },
        ],
        active: true,
      },
      include: {
        user: {
          select: {
            name: true,
            username: true,
          },
        },
      },
    });

    if (!referralLink) {
      return {
        title: 'Link Not Found | RefStack',
        description: 'The referral link you are looking for does not exist or has been deactivated.',
      };
    }

    return {
      title: `${referralLink.name} | Referral by ${referralLink.user.name || referralLink.user.username}`,
      description: referralLink.description || `Check out this referral link for ${referralLink.name}`,
      openGraph: {
        title: `${referralLink.name} | Referral by ${referralLink.user.name || referralLink.user.username}`,
        description: referralLink.description || `Check out this referral link for ${referralLink.name}`,
        type: 'website',
      },
      twitter: {
        card: 'summary',
        title: `${referralLink.name} | Referral by ${referralLink.user.name || referralLink.user.username}`,
        description: referralLink.description || `Check out this referral link for ${referralLink.name}`,
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Referral Link | RefStack',
      description: 'A referral link powered by RefStack',
    };
  }
}

export default async function ReferralRedirectPage({ params }: PageParams) {
  const { shortCode } = params;
  const headersList = await headers();
  
  try {
    // Find referral link by short code or custom slug
    const referralLink = await prisma.referralLink.findFirst({
      where: {
        OR: [
          { shortCode },
          { customSlug: shortCode },
        ],
        active: true,
      },
      select: {
        id: true,
        url: true,
        userId: true,
      },
    });

    if (!referralLink) {
      notFound();
    }

    // Collect click data
    const userAgent = headersList.get('user-agent') || '';
    const referer = headersList.get('referer') || '';
    const ipAddress = headersList.get('x-forwarded-for') || 
                      headersList.get('x-real-ip') || 
                      '0.0.0.0';
    
    // Get country/city info (would typically come from a geolocation service)
    // For this implementation, we'll just log the IP
    const country = null;
    const city = null;
    
    // Parse user agent (basic example - production would use a robust parser)
    let browser = null;
    let os = null;
    let device = null;
    
    if (userAgent) {
      if (userAgent.includes('Firefox')) browser = 'Firefox';
      else if (userAgent.includes('Chrome')) browser = 'Chrome';
      else if (userAgent.includes('Safari')) browser = 'Safari';
      else if (userAgent.includes('Edge')) browser = 'Edge';
      else if (userAgent.includes('MSIE') || userAgent.includes('Trident/')) browser = 'IE';
      else browser = 'Other';
      
      if (userAgent.includes('Windows')) os = 'Windows';
      else if (userAgent.includes('Mac')) os = 'MacOS';
      else if (userAgent.includes('Linux')) os = 'Linux';
      else if (userAgent.includes('Android')) os = 'Android';
      else if (userAgent.includes('iPhone') || userAgent.includes('iPad')) os = 'iOS';
      else os = 'Other';
      
      if (userAgent.includes('Mobile')) device = 'Mobile';
      else if (userAgent.includes('Tablet')) device = 'Tablet';
      else device = 'Desktop';
    }

    // Log the click (non-blocking to not delay the redirect)
    try {
      // Record click in database
      await prisma.click.create({
        data: {
          referralLinkId: referralLink.id,
          userId: null, // Anonymous click
          ip: ipAddress.toString().split(',')[0].trim(), // Get first IP if multiple
          userAgent,
          country,
          city,
          browser,
          os,
          device,
          referer,
        },
      });
      
      // Create an audit log entry
      await prisma.auditLog.create({
        data: {
          userId: referralLink.userId,
          action: 'CLICK',
          entity: 'REFERRAL_LINK',
          entityId: referralLink.id,
          metadata: {
            ip: ipAddress.toString().split(',')[0].trim(),
            browser,
            os,
            device,
          },
          ipAddress: ipAddress.toString().split(',')[0].trim(),
          userAgent,
        },
      });
    } catch (error) {
      // Log error but don't stop the redirect
      console.error('Error logging referral click:', error);
    }

    // Redirect to the target URL
    redirect(referralLink.url);
  } catch (error) {
    console.error('Error handling referral redirect:', error);
    notFound();
  }

  // This point should never be reached due to redirect() or notFound()
  return null;
}
