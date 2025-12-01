import React from 'react';
import HeroSection from '@/components/sections/HeroSection';
import ServicesCards from '@/components/sections/ServicesCards';
import ServiceSearch from '@/components/sections/ServiceSearch';
import Certifications from '@/components/sections/Certifications';
import NewsSection from '@/components/sections/NewsSection';
import VideoSection from '@/components/sections/VideoSection';
import ContactCTA from '@/components/sections/ContactCTA';
import { supabase } from '@/lib/supabase';

// Force dynamic rendering since we are fetching from DB
export const dynamic = 'force-dynamic';

async function getHeroSlides() {
  try {
    const { data } = await supabase
      .from('slides')
      .select('*')
      .order('order_index', { ascending: true });
    
    if (!data || data.length === 0) return null;

    return data.map(row => ({
      id: row.id,
      title: row.title,
      subtitle: row.subtitle,
      image: row.image_url,
      ctaText: row.cta_text,
      ctaLink: row.cta_link
    }));
  } catch (error) {
    console.error('Database error:', error);
    return null; 
  }
}

export default async function Home() {
  const slides = await getHeroSlides();

  // Fallback if no slides found in DB
  const displaySlides = slides || [
    {
      id: 1,
      title: "MEJORA TU PRODUCTIVIDAD.",
      subtitle: "Salud ocupacional",
      image: "/images/hero/doctor-hero.png",
      ctaText: "Ver más",
      ctaLink: "/salud-ocupacional"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section with Slider */}
      <HeroSection slides={displaySlides} />

      {/* Service Cards (circular icons) */}
      <ServicesCards />

      {/* Service Search */}
      <ServiceSearch />

      {/* Certifications & Recognitions */}
      <Certifications />

      {/* News Section */}
      <NewsSection />

      {/* Video Section */}
      <VideoSection />

      {/* Contact CTA */}
      <ContactCTA />
    </div>
  );
}
