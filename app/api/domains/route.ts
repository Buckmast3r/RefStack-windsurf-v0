import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { z } from 'zod';
import { checkPlanFeature } from '@/lib/subscription';

// Schema for domain validation
const domainSchema = z.object({
  domain: z.string().min(3).refine((domain) => {
    // Basic domain validation (simplified version)
    const domainRegex = /^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]$/i;
    return domainRegex.test(domain);
  }, "Please enter a valid domain name")
});

// Get all domains for the current user
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check if user has access to custom domains feature
    const hasAccess = await checkPlanFeature(session.user.id, 'customDomains');
    if (!hasAccess) {
      return NextResponse.json({ 
        error: 'This feature requires a PRO or ENTERPRISE subscription' 
      }, { status: 403 });
    }

    const domains = await prisma.customDomain.findMany({
      where: {
        userId: session.user.id
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json(domains);
  } catch (error) {
    console.error('Error fetching domains:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// Add a new domain
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check if user has access to custom domains feature
    const hasAccess = await checkPlanFeature(session.user.id, 'customDomains');
    if (!hasAccess) {
      return NextResponse.json({ 
        error: 'This feature requires a PRO or ENTERPRISE subscription' 
      }, { status: 403 });
    }

    // Get request body
    const body = await request.json();
    
    // Validate domain
    const validationResult = domainSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json({ 
        error: 'Invalid domain format',
        details: validationResult.error.errors 
      }, { status: 400 });
    }

    const { domain } = validationResult.data;

    // Check if domain already exists
    const existingDomain = await prisma.customDomain.findUnique({
      where: {
        domain
      }
    });

    if (existingDomain) {
      return NextResponse.json({ 
        error: 'This domain is already in use' 
      }, { status: 400 });
    }

    // Count existing domains for user
    const domainsCount = await prisma.customDomain.count({
      where: {
        userId: session.user.id
      }
    });

    // Check if user has reached domain limit (based on plan)
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: {
        subscription: true
      }
    });

    // Default limit
    let domainLimit = 1;
    
    // Adjust limit based on plan
    if (user?.subscription?.plan === 'PRO') {
      domainLimit = 3;
    } else if (user?.subscription?.plan === 'ENTERPRISE') {
      domainLimit = 10; // Or unlimited
    }

    if (domainsCount >= domainLimit) {
      return NextResponse.json({ 
        error: `You've reached your limit of ${domainLimit} custom domains. Upgrade your plan for more.` 
      }, { status: 403 });
    }

    // Create new domain
    const newDomain = await prisma.customDomain.create({
      data: {
        domain,
        userId: session.user.id,
        status: 'pending',
      }
    });

    return NextResponse.json(newDomain);
  } catch (error) {
    console.error('Error adding domain:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
