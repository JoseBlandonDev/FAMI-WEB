import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'data', 'hero-slides.json');

const defaultSlides = [
  {
    id: 1,
    title: "MEJORA TU PRODUCTIVIDAD.",
    subtitle: "Salud ocupacional",
    image: "/images/hero/doctor-hero.png",
    ctaText: "Ver más",
    ctaLink: "/salud-ocupacional"
  }
];

export async function GET() {
  try {
    const fileContents = await fs.readFile(dataFilePath, 'utf8');
    const data = JSON.parse(fileContents);
    return NextResponse.json(data);
  } catch (error) {
    // If file doesn't exist, return default and maybe create it? 
    // For now just return default.
    return NextResponse.json(defaultSlides);
  }
}

export async function POST(request) {
  try {
    const slides = await request.json();
    await fs.writeFile(dataFilePath, JSON.stringify(slides, null, 2));
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

