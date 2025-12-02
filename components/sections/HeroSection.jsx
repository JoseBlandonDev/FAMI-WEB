"use client";

import React, { useCallback, useState } from 'react';
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
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 8000 })]);
  const [searchQuery, setSearchQuery] = useState('');

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

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
              <div className="container mx-auto px-4 py-8 md:py-12">
                <div className="relative min-h-[400px] md:min-h-[450px] lg:min-h-[480px] rounded-2xl overflow-hidden">
                  {/* Background Image */}
                  <div className="absolute inset-0">
                    <Image
                      src={slide.image || defaultSlide.image}
                      alt={slide.title || 'FAMI Salud'}
                      fill
                      className="object-cover object-center"
                      priority
                      unoptimized
                    />
                  </div>

                  {/* Content Overlay - Only show if there's any text content */}
                  {(slide.subtitle || slide.title || slide.ctaText) && (
                    <div className="relative h-full flex items-center p-8 md:p-12">
                      <div className="max-w-lg bg-white/90 backdrop-blur-sm p-6 md:p-8 rounded-xl shadow-lg">
                        {/* Subtitle - only if provided */}
                        {slide.subtitle && (
                          <span className="text-gray-500 text-sm md:text-base mb-2 block">
                            {slide.subtitle}
                          </span>
                        )}

                        {/* Title - only if provided */}
                        {slide.title && (
                          <>
                            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-fami-blue leading-tight mb-4">
                              {slide.title}
                            </h1>
                            <div className="w-16 h-1 bg-fami-orange mb-6"></div>
                          </>
                        )}

                        {/* CTA Button - only if provided */}
                        {slide.ctaText && slide.ctaLink && (
                          <Link
                            href={slide.ctaLink}
                            className="inline-block bg-fami-orange text-white px-6 py-3 rounded-lg font-semibold hover:bg-fami-orange/90 transition-colors"
                          >
                            {slide.ctaText}
                          </Link>
                        )}
                      </div>
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
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-fami-blue/10 hover:bg-fami-blue/20 text-fami-blue transition-all"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={scrollNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-fami-blue/10 hover:bg-fami-blue/20 text-fami-blue transition-all"
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}

      {/* Search Bar & Service Categories */}
      <div className="container mx-auto px-4 pb-8">
        {/* Search Input */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Escriba aquí el nombre de los servicios"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-5 py-4 pr-14 border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-fami-blue focus:border-transparent shadow-sm"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-fami-blue text-white rounded-lg hover:bg-fami-blue/90 transition-colors">
              <Search size={20} />
            </button>
          </div>
        </div>

        {/* Service Category Cards */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-6">
          {serviceCategories.map((category) => {
            const Icon = category.icon;
            return (
              <Link
                key={category.id}
                href={category.href}
                className="flex items-center gap-3 px-6 py-4 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md hover:border-fami-blue transition-all group min-w-[200px] md:min-w-[250px]"
              >
                <div className="w-12 h-12 rounded-full bg-fami-blue/10 flex items-center justify-center group-hover:bg-fami-blue/20 transition-colors">
                  <Icon size={24} className={category.color} />
                </div>
                <span className="font-semibold text-gray-800 group-hover:text-fami-blue transition-colors">
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
