"use client";

import React, { useCallback } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Award } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

const Certifications = ({ certifications = [] }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'start', slidesToScroll: 1 },
    [Autoplay({ delay: 4000, stopOnInteraction: false })]
  );

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  if (!certifications || certifications.length === 0) return null;

  const isCarousel = certifications.length > 3;

  const Card = ({ cert }) => (
    <div className="flex flex-col items-center h-full p-4 group">
      {/* Image Container */}
      <div className="relative w-full h-48 bg-white rounded-2xl border border-gray-100 shadow-sm group-hover:shadow-lg group-hover:border-fami-blue/20 transition-all duration-300 flex items-center justify-center p-6 overflow-hidden">
        {cert.image ? (
          <div className="relative w-full h-full transition-transform duration-500 group-hover:scale-110">
            <Image
              src={cert.image}
              alt={cert.name}
              fill
              className="object-contain"
              unoptimized
            />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-gray-300">
            <Award size={48} className="mb-2" />
            <span className="text-xs font-medium">Sin imagen</span>
          </div>
        )}
      </div>
      
      {/* Content */}
      <div className="mt-6 text-center w-full">
        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-fami-light transition-colors">
          {cert.name}
        </h3>
        {cert.description && (
          <p className="text-sm text-white/70 leading-relaxed px-2">
            {cert.description}
          </p>
        )}
      </div>
    </div>
  );

  return (
    <section className="py-20 bg-fami-blue relative overflow-hidden">
      {/* Decorative rounded wave watermark - Left */}
      <svg
        className="absolute left-0 top-0 h-full w-auto opacity-20"
        viewBox="0 0 250 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMinYMin slice"
      >
        <ellipse cx="-50" cy="150" rx="180" ry="200" fill="#545ea8" />
        <ellipse cx="-80" cy="450" rx="150" ry="180" fill="#6670b8" />
      </svg>

      {/* Decorative rounded wave watermark - Right Bottom */}
      <svg
        className="absolute right-0 bottom-0 h-2/3 w-auto opacity-15"
        viewBox="0 0 300 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMaxYMax slice"
      >
        <ellipse cx="280" cy="350" rx="120" ry="150" fill="#545ea8" />
        <ellipse cx="320" cy="280" rx="100" ry="130" fill="#6670b8" />
      </svg>

      {/* Additional rounded accent - Bottom Right */}
      <svg
        className="absolute right-32 bottom-0 h-1/3 w-auto opacity-10"
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <ellipse cx="150" cy="180" rx="80" ry="100" fill="#7080c8" />
      </svg>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-display">
            ALIANZAS Y RECONOCIMIENTOS
          </h2>
          <div className="w-24 h-1 bg-white/50 mx-auto rounded-full mb-6"></div>
          <p className="text-white/80 max-w-2xl mx-auto text-lg">
            Trabajamos de la mano con organizaciones líderes para brindar el mejor servicio y fortalecer nuestra comunidad.
          </p>
        </div>

        {isCarousel ? (
          <div className="relative max-w-7xl mx-auto group/slider">
            <div className="overflow-hidden px-4" ref={emblaRef}>
              <div className="flex -ml-4">
                {certifications.map((cert) => (
                  <div key={cert.id} className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%] xl:flex-[0_0_25%] pl-4 min-w-0">
                    <Card cert={cert} />
                  </div>
                ))}
              </div>
            </div>
            
            {/* Navigation Buttons */}
            <button
              onClick={scrollPrev}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-12 h-12 bg-white border border-gray-100 text-fami-blue hover:text-white hover:bg-fami-blue rounded-full shadow-lg flex items-center justify-center transition-all opacity-0 group-hover/slider:opacity-100 focus:opacity-100 z-20"
              aria-label="Anterior"
            >
              <ChevronLeft size={24} strokeWidth={2.5} />
            </button>
            <button
              onClick={scrollNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-12 h-12 bg-white border border-gray-100 text-fami-blue hover:text-white hover:bg-fami-blue rounded-full shadow-lg flex items-center justify-center transition-all opacity-0 group-hover/slider:opacity-100 focus:opacity-100 z-20"
              aria-label="Siguiente"
            >
              <ChevronRight size={24} strokeWidth={2.5} />
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {certifications.map((cert) => (
              <Card key={cert.id} cert={cert} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Certifications;
