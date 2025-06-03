import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { writeFile } from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

// This would ideally be replaced with a cloud storage solution in production
const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads');

export async function POST(request: Request) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Process the form data
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const type = formData.get('type') as string;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    if (!type || !['avatar', 'banner', 'logo'].includes(type)) {
      return NextResponse.json({ error: 'Invalid file type' }, { status: 400 });
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'File type not allowed. Please upload an image file.' },
        { status: 400 }
      );
    }

    // Validate file size (max 2MB)
    const maxSize = 2 * 1024 * 1024; // 2MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'File size exceeds 2MB limit' },
        { status: 400 }
      );
    }

    // Create a unique filename
    const fileExt = file.name.split('.').pop();
    const fileName = `${type}_${session.user.id}_${uuidv4()}.${fileExt}`;
    const filePath = path.join(UPLOAD_DIR, fileName);

    // Write the file to disk
    const buffer = Buffer.from(await file.arrayBuffer());
    await writeFile(filePath, buffer);

    // Get the URL for the uploaded file
    const fileUrl = `/uploads/${fileName}`;

    return NextResponse.json({ 
      url: fileUrl,
      success: true 
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json(
      { error: 'Failed to upload file' },
      { status: 500 }
    );
  }
}
