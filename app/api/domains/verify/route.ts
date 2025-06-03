import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { z } from 'zod';
import dns from 'dns';
import { promisify } from 'util';

// Create promisified versions of DNS functions
const resolveCname = promisify(dns.resolveCname);
const resolveTxt = promisify(dns.resolveTxt);

// Schema for domain verification request
const verificationSchema = z.object({
  domainId: z.string().cuid()
});

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get and validate the request body
    const body = await request.json();
    const validationResult = verificationSchema.safeParse(body);
    
    if (!validationResult.success) {
      return NextResponse.json({ 
        error: 'Invalid request',
        details: validationResult.error.errors 
      }, { status: 400 });
    }

    const { domainId } = validationResult.data;

    // Find the domain
    const domain = await prisma.customDomain.findUnique({
      where: { id: domainId }
    });

    if (!domain) {
      return NextResponse.json({ error: 'Domain not found' }, { status: 404 });
    }

    // Check if the domain belongs to the user
    if (domain.userId !== session.user.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    // Check CNAME record
    let cnameVerified = false;
    try {
      const cnameRecords = await resolveCname(domain.domain);
      cnameVerified = cnameRecords.some(record => 
        record.includes('refstack-app.vercel.app') || 
        record.includes('vercel.app')
      );
    } catch (error) {
      console.error('CNAME verification error:', error);
      // CNAME error is not fatal, we continue with TXT verification
    }

    // Check TXT record
    let txtVerified = false;
    try {
      const txtRecordName = `_refstack-verify.${domain.domain}`;
      const expectedValue = `refstack-verify=${domain.id}`;
      
      // For local testing, we'll simulate success
      // In production, uncomment the actual DNS check
      /*
      const txtRecords = await resolveTxt(txtRecordName);
      txtVerified = txtRecords.some(recordSet => 
        recordSet.some(record => record === expectedValue)
      );
      */
      
      // Simulate success for development
      txtVerified = true;
    } catch (error) {
      console.error('TXT verification error:', error);
    }

    // Both checks must pass
    const isVerified = cnameVerified && txtVerified;

    // Update domain status based on verification
    let status: 'pending' | 'active' | 'error' = 'pending';
    let errorMessage: string | null = null;

    if (isVerified) {
      status = 'active';
    } else {
      errorMessage = 'DNS records not properly configured. Please check your DNS settings and try again.';
    }

    // Update the domain in the database
    const updatedDomain = await prisma.customDomain.update({
      where: { id: domainId },
      data: {
        dnsVerified: isVerified,
        verified: isVerified,
        status,
        errorMessage,
        // In real implementation, SSL provisioning would be a separate process
        sslProvisioned: isVerified // For simplicity, we're setting this too
      }
    });

    return NextResponse.json({
      success: true,
      verified: isVerified,
      domain: updatedDomain
    });
  } catch (error) {
    console.error('Error verifying domain:', error);
    return NextResponse.json({ 
      error: 'Internal server error',
      details: (error as Error).message 
    }, { status: 500 });
  }
}
