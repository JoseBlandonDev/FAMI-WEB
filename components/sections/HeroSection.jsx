"use client";

import React, { useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';

const heroSlides = [
  {
    id: 1,
    category: "Salud ocupacional",
    title: "MEJORA TU PRODUCTIVIDAD.",
    description: "Más allá de la prevención, fomentamos el equilibrio físico y emocional de los colaboradores de nuestro país creamos.",
    benefits: [
      "Exámenes de salud ocupacional",
      "Inteligencia emocional",
      "Descargas emocionales",
      "Prevención de riesgos laborales",
      "Pausas Activas"
    ],
    extraText: "Y lo mejor: beneficios extensibles para su familia.",
    image: "/images/hero/doctor-hero.png",
    bgImage: "/images/hero/hero-bg.jpg",
    ctaText: "Ver más",
    ctaLink: "/salud-ocupacional"
  }
];

const HeroSection = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 8000 })]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <section className="relative w-full">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {heroSlides.map((slide) => (
            <div
              key={slide.id}
              className="flex-[0_0_100%] min-w-0 relative"
            >
              {/* Background with gradient */}
              <div className="relative min-h-[600px] md:min-h-[650px] bg-gradient-to-r from-fami-blue via-fami-blue to-fami-cyan overflow-hidden">
                {/* Decorative curve */}
                <div className="absolute right-0 top-0 bottom-0 w-1/2 hidden lg:block">
                  <svg
                    className="absolute left-0 top-0 h-full"
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                    style={{ width: '150px' }}
                  >
                    <path
                      d="M100,0 C50,0 0,50 0,100 L100,100 Z"
                      fill="white"
                      opacity="0.1"
                    />
                  </svg>
                </div>

                <div className="container mx-auto px-4 h-full">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center min-h-[600px] md:min-h-[650px] py-12">
                    {/* Content */}
                    <div className="text-white z-10 pl-0 md:pl-8">
                      <span className="inline-block text-fami-orange text-sm md:text-base font-medium mb-2">
                        {slide.category}
                      </span>
                      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                        {slide.title}
                      </h1>
                      <p className="text-white/90 text-base md:text-lg mb-6 max-w-lg">
                        {slide.description}
                      </p>

                      {/* Benefits List */}
                      <ul className="space-y-2 mb-6">
                        {slide.benefits.map((benefit, index) => (
                          <li key={index} className="flex items-center gap-3 text-white/90">
                            <Check size={18} className="text-fami-orange flex-shrink-0" />
                            <span className="text-sm md:text-base">{benefit}</span>
                          </li>
                        ))}
                      </ul>

                      <p className="text-fami-orange font-medium mb-8 text-sm md:text-base">
                        {slide.extraText}
                      </p>

                      <Link
                        href={slide.ctaLink}
                        className="inline-block px-8 py-3 bg-fami-orange text-white font-medium rounded-md hover:bg-orange-600 transition-colors"
                      >
                        {slide.ctaText}
                      </Link>
                    </div>

                    {/* Image */}
                    <div className="relative h-[400px] md:h-[550px] hidden lg:flex items-end justify-center">
                      <div className="relative w-full h-full">
                        <Image
                          src={slide.image}
                          alt="Doctor FAMI"
                          fill
                          className="object-contain object-bottom"
                          priority
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={scrollPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white transition-all"
        aria-label="Anterior"
      >
        <ChevronLeft size={28} />
      </button>
      <button
        onClick={scrollNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white transition-all"
        aria-label="Siguiente"
      >
        <ChevronRight size={28} />
      </button>
    </section>
  );
};

export default HeroSection;
