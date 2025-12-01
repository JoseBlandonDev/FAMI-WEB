"use client";

import React, { useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const HeroSection = ({ slides }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 6000 })]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  if (!slides || slides.length === 0) return null;

  return (
    <section className="relative w-full h-[350px] md:h-[450px] bg-gray-900 group">
      <div className="overflow-hidden h-full" ref={emblaRef}>
        <div className="flex h-full">
          {slides.map((slide) => (
            <div className="flex-[0_0_100%] min-w-0 relative h-full" key={slide.id}>
              {slide.image && (
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  className="object-cover"
                  priority
                  unoptimized
                />
              )}
              <div className="absolute inset-0 bg-black/40" />
              <div className="absolute inset-0 flex items-center justify-center text-center px-4">
                <div className="max-w-4xl animate-fadeIn">
                  {slide.subtitle && (
                    <span className="text-fami-orange font-bold uppercase tracking-wider mb-2 block text-xs md:text-sm">
                      {slide.subtitle}
                    </span>
                  )}
                  <h1 className="text-2xl md:text-4xl font-bold text-white mb-6 leading-tight drop-shadow-lg">
                    {slide.title}
                  </h1>
                  {slide.ctaText && (
                    <Link
                      href={slide.ctaLink || "#"}
                      className="inline-block px-6 py-3 bg-fami-orange text-white font-bold rounded-lg hover:bg-orange-600 transition-transform hover:scale-105 shadow-lg text-sm md:text-base"
                    >
                      {slide.ctaText}
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={scrollPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white transition-all opacity-0 group-hover:opacity-100"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={scrollNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white transition-all opacity-0 group-hover:opacity-100"
      >
        <ChevronRight size={24} />
      </button>
    </section>
  );
};

export default HeroSection;
