import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { z } from 'zod';
import { checkPlanFeature } from '@/lib/subscription';

// Schema for domain verification updates
const verificationSchema = z.object({
  verified: z.boolean().optional(),
  dnsVerified: z.boolean().optional(),
  sslProvisioned: z.boolean().optional(),
  status: z.enum(['pending', 'active', 'error']).optional(),
  errorMessage: z.string().optional().nullable(),
});

// Get a specific domain
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = params;

    const domain = await prisma.customDomain.findUnique({
      where: { id }
    });

    if (!domain) {
      return NextResponse.json({ error: 'Domain not found' }, { status: 404 });
    }

    // Check if the domain belongs to the user
    if (domain.userId !== session.user.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    return NextResponse.json(domain);
  } catch (error) {
    console.error('Error fetching domain:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// Update a domain
export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = params;
    const body = await request.json();

    // Validate update data
    const validationResult = verificationSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json({ 
        error: 'Invalid update data',
        details: validationResult.error.errors 
      }, { status: 400 });
    }

    // Check if domain exists and belongs to user
    const domain = await prisma.customDomain.findUnique({
      where: { id }
    });

    if (!domain) {
      return NextResponse.json({ error: 'Domain not found' }, { status: 404 });
    }

    if (domain.userId !== session.user.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    // Update domain verification status
    const updatedDomain = await prisma.customDomain.update({
      where: { id },
      data: validationResult.data
    });

    return NextResponse.json(updatedDomain);
  } catch (error) {
    console.error('Error updating domain:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// Delete a domain
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = params;

    // Check if domain exists and belongs to user
    const domain = await prisma.customDomain.findUnique({
      where: { id }
    });

    if (!domain) {
      return NextResponse.json({ error: 'Domain not found' }, { status: 404 });
    }

    if (domain.userId !== session.user.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    // Delete the domain
    await prisma.customDomain.delete({
      where: { id }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting domain:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
