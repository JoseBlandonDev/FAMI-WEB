import { NextResponse } from 'next/server';
import path from 'path';
import { writeFile } from 'fs/promises';

export async function POST(request) {
  const data = await request.formData();
  const file = data.get('file');

  if (!file) {
    return NextResponse.json({ success: false }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // Clean filename
  const filename = Date.now() + '_' + file.name.replace(/[^a-zA-Z0-9.]/g, "_");
  const uploadDir = path.join(process.cwd(), "public/uploads/hero");
  const filepath = path.join(uploadDir, filename);

  try {
    await writeFile(filepath, buffer);
    const url = `/uploads/hero/${filename}`;
    return NextResponse.json({ success: true, url });
  } catch (error) {
    console.error('Error saving file:', error);
    return NextResponse.json({ success: false, error: 'Error saving file' }, { status: 500 });
  }
}

