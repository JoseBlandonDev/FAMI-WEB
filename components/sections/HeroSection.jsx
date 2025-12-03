"use client";

import React, { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Search, Heart, GraduationCap, Stethoscope } from 'lucide-react';

const serviceCategories = [
  {
    id: 1,
    title: 'Salud ocupacional',
    icon: Heart,
    href: '/salud-ocupacional',
    color: 'text-fami-blue'
  },
  {
    id: 2,
    title: 'Apoyos pedagógicos',
    icon: GraduationCap,
    href: '/apoyos-pedagogicos',
    color: 'text-fami-blue'
  },
  {
    id: 3,
    title: 'Servicios de la IPS',
    icon: Stethoscope,
    href: '/servicios-ips',
    color: 'text-fami-blue'
  }
];

const HeroSection = ({ slides }) => {
  const router = useRouter();
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 8000 })]);
  const [searchQuery, setSearchQuery] = useState('');

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  // Default slide only if no slides from DB (placeholder)
  const defaultSlide = {
    id: 1,
    image: '/images/hero-placeholder.jpg'
  };

  const displaySlides = slides && slides.length > 0 ? slides : [defaultSlide];

  return (
    <section className="relative bg-white">
      {/* Hero Carousel */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {displaySlides.map((slide, index) => (
            <div className="flex-[0_0_100%] min-w-0" key={slide.id || index}>
              {/* Hero with background image */}
              <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-6">
                {/* 
                   Restored to show full image:
                   1. Using aspect ratio close to 1200/470 (~2.55) so it fits perfectly without fixed height cropping.
                   2. Using object-contain to ensure NOTHING is cut off.
                   3. Added max-w-5xl and mx-auto to limit width on large screens, making it effectively smaller/compact.
                   4. Removed rounded borders to match design requirement.
                */}
                <div className="relative w-full max-w-5xl mx-auto aspect-[2.55/1] overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  
                  {/* Conditional Link Wrapping */}
                  {slide.ctaLink ? (
                    <Link href={slide.ctaLink} className="block w-full h-full relative cursor-pointer">
                       <Image
                        src={slide.image || defaultSlide.image}
                        alt="FAMI Banner"
                        fill
                        className="object-contain" // Ensures full image visibility
                        priority
                        unoptimized
                      />
                    </Link>
                  ) : (
                    <div className="w-full h-full relative">
                      <Image
                        src={slide.image || defaultSlide.image}
                        alt="FAMI Banner"
                        fill
                        className="object-contain" // Ensures full image visibility
                        priority
                        unoptimized
                      />
                    </div>
                  )}

                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows (only if multiple slides) */}
      {displaySlides.length > 1 && (
        <>
          <button
            onClick={scrollPrev}
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10 w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-white/80 hover:bg-white text-fami-blue shadow-md transition-all"
          >
            <ChevronLeft size={20} className="sm:w-6 sm:h-6" />
          </button>
          <button
            onClick={scrollNext}
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10 w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-white/80 hover:bg-white text-fami-blue shadow-md transition-all"
          >
            <ChevronRight size={20} className="sm:w-6 sm:h-6" />
          </button>
        </>
      )}

      {/* Search Bar & Service Categories */}
      <div className="container mx-auto px-2 sm:px-4 pb-6 sm:pb-8">
        {/* Search Input */}
        <div className="max-w-4xl mx-auto mb-4 sm:mb-8">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              placeholder="Buscar especialidades, noticias, blogs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 sm:px-5 py-3 sm:py-4 pr-12 sm:pr-14 border border-gray-300 rounded-lg text-sm sm:text-base text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-fami-blue focus:border-transparent shadow-sm"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 sm:p-2 bg-fami-blue text-white rounded-lg hover:bg-fami-blue/90 transition-colors"
            >
              <Search size={18} className="sm:w-5 sm:h-5" />
            </button>
          </form>
        </div>

        {/* Service Category Cards */}
        <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4 md:gap-6">
          {serviceCategories.map((category) => {
            const Icon = category.icon;
            return (
              <Link
                key={category.id}
                href={category.href}
                className="flex items-center gap-3 px-4 sm:px-6 py-3 sm:py-4 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md hover:border-fami-blue transition-all group sm:min-w-[200px] md:min-w-[250px]"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-fami-blue/10 flex items-center justify-center group-hover:bg-fami-blue/20 transition-colors">
                  <Icon size={20} className={`sm:w-6 sm:h-6 ${category.color}`} />
                </div>
                <span className="font-semibold text-sm sm:text-base text-gray-800 group-hover:text-fami-blue transition-colors">
                  {category.title}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
