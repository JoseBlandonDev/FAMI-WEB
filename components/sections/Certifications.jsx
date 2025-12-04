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
      {/* Decorative flame watermark - Left side */}
      <svg
        className="absolute left-0 top-0 h-full w-48 md:w-64"
        viewBox="0 0 200 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMinYMid slice"
      >
        {/* Outer flame - lighter */}
        <path
          d="M-100 500 Q-50 400, -20 300 Q10 200, -30 100 Q-70 0, -50 -50 L-150 -50 L-150 550 Z"
          fill="#4a5499"
          opacity="0.6"
        />
        {/* Inner flame - slightly lighter */}
        <path
          d="M-80 500 Q-30 380, 10 280 Q50 180, 20 80 Q-10 -20, 30 -80 L-120 -80 L-120 550 Z"
          fill="#545ea8"
          opacity="0.5"
        />
      </svg>

      {/* Decorative flame watermark - Right bottom */}
      <svg
        className="absolute right-0 bottom-0 w-48 md:w-72 h-64 md:h-80"
        viewBox="0 0 300 350"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMaxYMax slice"
      >
        {/* Right flame 1 */}
        <path
          d="M350 400 Q300 320, 280 250 Q260 180, 290 120 Q320 60, 300 0 L400 0 L400 400 Z"
          fill="#4a5499"
          opacity="0.4"
        />
        {/* Right flame 2 - smaller */}
        <path
          d="M380 400 Q340 340, 330 290 Q320 240, 340 190 Q360 140, 350 90 L420 90 L420 400 Z"
          fill="#545ea8"
          opacity="0.3"
        />
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
