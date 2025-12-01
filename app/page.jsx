import React from 'react';
import HeroSection from '@/components/sections/HeroSection';
import ServicesCards from '@/components/sections/ServicesCards';
import ServiceSearch from '@/components/sections/ServiceSearch';
import Certifications from '@/components/sections/Certifications';
import NewsSection from '@/components/sections/NewsSection';
import VideoSection from '@/components/sections/VideoSection';
import ContactCTA from '@/components/sections/ContactCTA';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section with Slider */}
      <HeroSection />

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
