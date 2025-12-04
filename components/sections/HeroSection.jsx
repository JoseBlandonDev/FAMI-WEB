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
      <div className="overflow-hidden relative bg-gray-50 pt-6 pb-4" ref={emblaRef}>
        <div className="flex">
          {displaySlides.map((slide, index) => (
            <div className="flex-[0_0_100%] min-w-0" key={slide.id || index}>
              {/* Hero container - Reduced padding */}
              <div className="container mx-auto px-2 sm:px-4">
                <div className="relative w-full max-w-5xl mx-auto aspect-[2.55/1] overflow-hidden shadow-md hover:shadow-lg transition-shadow bg-white">
                  
                  {/* Conditional Link Wrapping */}
                  {slide.ctaLink ? (
                    <Link href={slide.ctaLink} className="block w-full h-full relative cursor-pointer">
                       <Image
                        src={slide.image || defaultSlide.image}
                        alt="FAMI Banner"
                        fill
                        className="object-contain"
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
                        className="object-contain"
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

        {/* Navigation Arrows - Larger and more prominent */}
        {displaySlides.length > 1 && (
          <>
            <button
              onClick={scrollPrev}
              className="absolute left-2 sm:left-[5%] md:left-[10%] top-1/2 -translate-y-1/2 z-10 w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-full bg-white shadow-lg border border-gray-100 text-fami-blue hover:bg-fami-orange hover:text-white hover:border-fami-orange transition-all duration-300 group"
            >
              <ChevronLeft size={32} className="group-hover:scale-110 transition-transform" />
            </button>
            <button
              onClick={scrollNext}
              className="absolute right-2 sm:right-[5%] md:right-[10%] top-1/2 -translate-y-1/2 z-10 w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-full bg-white shadow-lg border border-gray-100 text-fami-blue hover:bg-fami-orange hover:text-white hover:border-fami-orange transition-all duration-300 group"
            >
              <ChevronRight size={32} className="group-hover:scale-110 transition-transform" />
            </button>
          </>
        )}
      </div>

      {/* Search Bar - Below Hero Banner */}
      <div className="bg-gray-50 pt-4 pb-6">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <form onSubmit={handleSearch} className="relative flex items-center">
              <div className="relative w-full group">
                <input
                  type="text"
                  placeholder="¿Qué estás buscando hoy? (Especialidades, noticias...)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-6 pr-14 py-3.5 bg-white border-2 border-fami-blue/80 focus:border-fami-blue rounded-full shadow-sm text-gray-700 placeholder-gray-400 outline-none transition-all duration-300 hover:shadow-md"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-fami-blue text-white rounded-full hover:bg-fami-orange transition-colors shadow-sm group-hover:scale-105 duration-200"
                  aria-label="Buscar"
                >
                  <Search size={20} />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Service Category Cards - Below Banner */}
      <div className="container mx-auto px-2 sm:px-4 py-12">
        <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 md:gap-8">
          {serviceCategories.map((category) => {
            const Icon = category.icon;
            return (
              <Link
                key={category.id}
                href={category.href}
                className="flex flex-col items-center justify-center gap-3 px-8 py-6 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-lg hover:border-fami-blue/30 transition-all group sm:min-w-[220px]"
              >
                <div className="w-14 h-14 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-fami-blue group-hover:text-white transition-all duration-300">
                  <Icon size={28} className={`text-fami-blue group-hover:text-white transition-colors`} />
                </div>
                <span className="font-bold text-base text-gray-800 group-hover:text-fami-blue transition-colors text-center">
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
