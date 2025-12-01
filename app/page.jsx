import React from 'react';
import HeroSection from '@/components/sections/HeroSection';
import ServicesCards from '@/components/sections/ServicesCards';
import ServiceSearch from '@/components/sections/ServiceSearch';
import Certifications from '@/components/sections/Certifications';
import NewsSection from '@/components/sections/NewsSection';
import VideoSection from '@/components/sections/VideoSection';
import ContactCTA from '@/components/sections/ContactCTA';
import { promises as fs } from 'fs';
import path from 'path';

async function getHeroSlides() {
  const filePath = path.join(process.cwd(), 'data', 'hero-slides.json');
  try {
    const fileContents = await fs.readFile(filePath, 'utf8');
    return JSON.parse(fileContents);
  } catch (error) {
    // Default fallback if no file
    return [
      {
        id: 1,
        title: "MEJORA TU PRODUCTIVIDAD.",
        subtitle: "Salud ocupacional",
        // Using a generic placeholder or the existing one, but note it might look different in new layout
        image: "/images/hero/doctor-hero.png", 
        ctaText: "Ver más",
        ctaLink: "/salud-ocupacional"
      }
    ];
  }
}

export default async function Home() {
  const slides = await getHeroSlides();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section with Slider */}
      <HeroSection slides={slides} />

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
