import React from 'react';
import HeroSection from '@/components/sections/HeroSection';
import ServicesCards from '@/components/sections/ServicesCards';
import ServiceSearch from '@/components/sections/ServiceSearch';
import Certifications from '@/components/sections/Certifications';
import NewsSection from '@/components/sections/NewsSection';
import BlogSection from '@/components/sections/BlogSection';
import VideoSection from '@/components/sections/VideoSection';
import ContactCTA from '@/components/sections/ContactCTA';
import { supabase } from '@/lib/supabase';

// Force dynamic rendering to ensure fresh data
export const dynamic = 'force-dynamic';
export const revalidate = 0;

async function getHomePageData() {
  try {
    // Parallel fetching for performance
    const [
      { data: slides },
      { data: services },
      { data: news },
      { data: blogs },
      { data: certifications },
      { data: videos }
    ] = await Promise.all([
      supabase.from('slides').select('*').order('order_index', { ascending: true }),
      supabase.from('services').select('*').order('id', { ascending: true }),
      supabase.from('news').select('*').order('date', { ascending: false }).limit(4),
      supabase.from('blogs').select('*').eq('status', 'published').order('date', { ascending: false }).limit(3),
      supabase.from('certifications').select('*').order('id', { ascending: true }),
      supabase.from('videos').select('*').order('id', { ascending: true })
    ]);

    return {
      slides: slides || [],
      services: services || [],
      news: news || [],
      blogs: blogs || [],
      certifications: certifications || [],
      videos: videos || []
    };
  } catch (error) {
    console.error('Error fetching home data:', error);
    return {
      slides: [], services: [], news: [], blogs: [], certifications: [], videos: []
    };
  }
}

export default async function Home() {
  const data = await getHomePageData();

  // Map snake_case to camelCase for HeroSection if needed (but we updated Admin to save snake_case... wait, no)
  // Let's check what HeroSection expects. It expects camelCase props usually.
  // The Admin saved snake_case to DB?
  // In `app/admin/hero/page.jsx`, I did:
  // `const dbSlides = slides.map(...)` keys: title, subtitle, image_url...
  // So DB has snake_case.
  // HeroSection expects: `slide.image`, `slide.title`.
  // So I need to map here.

  const heroSlides = data.slides.map(s => ({
    id: s.id,
    title: s.title,
    subtitle: s.subtitle,
    image: s.image_url,
    ctaText: s.cta_text,
    ctaLink: s.cta_link
  }));

  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection slides={heroSlides} />
      <ServicesCards services={data.services} />
      <ServiceSearch />
      <Certifications certifications={data.certifications} />
      <NewsSection news={data.news} />
      <BlogSection blogs={data.blogs} />
      <VideoSection videos={data.videos} />
      <ContactCTA />
    </div>
  );
}
