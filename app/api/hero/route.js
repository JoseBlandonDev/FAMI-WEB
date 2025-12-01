import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('slides')
      .select('*')
      .order('order_index', { ascending: true }); // Using order_index for consistent sorting

    if (error) throw error;

    // Map snake_case to camelCase
    const slides = data.map(row => ({
      id: row.id,
      title: row.title,
      subtitle: row.subtitle,
      image: row.image_url,
      ctaText: row.cta_text,
      ctaLink: row.cta_link
    }));

    return NextResponse.json(slides);
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json([], { status: 500 });
  }
}

export async function POST(request) {
  try {
    const slides = await request.json();
    
    // Process each slide
    // Strategy: Delete all and re-insert is simple but requires handling IDs carefully.
    // Better Strategy for Supabase: Upsert.
    
    // First, let's map camelCase back to snake_case
    const dbSlides = slides.map((slide, index) => ({
      // If ID is a timestamp (from frontend 'Date.now()'), we shouldn't send it if we want Postgres to auto-increment,
      // BUT if we want to update existing rows, we need the real ID.
      // Since the frontend generates Date.now() IDs for new ones, we can just treat them as "new" 
      // if they don't match an existing DB ID range, or just let Supabase handle it if we made ID a bigint.
      // However, usually it's cleaner to:
      // 1. Delete all records.
      // 2. Insert new records.
      // This ensures ordering is exactly what the user sees.
      
      title: slide.title,
      subtitle: slide.subtitle,
      image_url: slide.image,
      cta_text: slide.ctaText,
      cta_link: slide.ctaLink,
      order_index: index
    }));

    // Transaction-like behavior: Delete all, then insert.
    // Note: In a real high-traffic app this causes a split second of empty data.
    // For this use case, it's fine.
    
    const { error: deleteError } = await supabase
      .from('slides')
      .delete()
      .neq('id', 0); // Delete all where ID is not 0 (effectively all)

    if (deleteError) throw deleteError;

    const { error: insertError } = await supabase
      .from('slides')
      .insert(dbSlides);

    if (insertError) throw insertError;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
