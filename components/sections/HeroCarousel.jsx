"use client";

import React, { useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  {
    id: 1,
    title: "Tu recurso más valioso es tu gente",
    subtitle: "Protégela, motívala y haz crecer tu organización.",
    category: "Salud Ocupacional",
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1932&auto=format&fit=crop", // Office/Team
    cta: "Conocer Planes",
    link: "/salud-ocupacional"
  },
  {
    id: 2,
    title: "Sembramos amor, cosechamos futuro",
    subtitle: "Juntos acompañamos cada etapa del crecimiento.",
    category: "Apoyos Pedagógicos",
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1740&auto=format&fit=crop", // Kids/Education
    cta: "Ver Servicios",
    link: "#" // Pending route
  },
  {
    id: 3,
    title: "Tu bienestar en las mejores manos",
    subtitle: "Prevención, diagnóstico y tratamiento con calidad humana.",
    category: "Servicios IPS",
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=1780&auto=format&fit=crop", // Doctors
    cta: "Agendar Cita",
    link: "/servicios-ips"
  },
  {
    id: 4,
    title: "Congreso 23 de Octubre",
    subtitle: "Innovación y desarrollo en salud comunitaria.",
    category: "Eventos",
    image: "https://images.unsplash.com/photo-1544531696-214af74a6f02?q=80&w=1769&auto=format&fit=crop", // Conference
    cta: "Inscribirse",
    link: "#"
  },
  {
    id: 5,
    title: "¡Estamos de aniversario!",
    subtitle: "Atención con calidez, profesionalismo y descuentos que cuidan tu bienestar.",
    category: "Ofertas Fami",
    image: "https://images.unsplash.com/photo-1631217868269-df75c5240474?q=80&w=1740&auto=format&fit=crop", // Celebration/Medical
    cta: "Ver Ofertas",
    link: "#"
  }
];

const HeroCarousel = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 6000 })]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <div className="relative w-full h-[500px] md:h-[600px] bg-gray-100 group">
      
      {/* Carousel Viewport */}
      <div className="overflow-hidden h-full" ref={emblaRef}>
        <div className="flex h-full">
          {slides.map((slide) => (
            <div className="flex-[0_0_100%] min-w-0 relative h-full" key={slide.id}>
              
              {/* Background Image */}
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                className="object-cover"
                priority={slide.id === 1}
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-fami-blue/90 to-fami-blue/40 mix-blend-multiply" />
              <div className="absolute inset-0 bg-black/20" />

              {/* Content */}
              <div className="absolute inset-0 flex items-center">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="max-w-3xl opacity-0 animate-fadeIn" style={{ animationFillMode: 'forwards', animationDelay: '300ms' }}>
                    <span className="inline-block py-1 px-3 rounded-full bg-fami-secondary text-white text-xs md:text-sm font-bold mb-4 uppercase tracking-wider">
                      {slide.category}
                    </span>
                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
                      {slide.title}
                    </h2>
                    <p className="text-lg md:text-xl text-gray-100 mb-8 font-medium leading-relaxed">
                      {slide.subtitle}
                    </p>
                    <Button variant="primary" className="text-lg px-8 py-3 shadow-lg hover:scale-105 transform transition-transform">
                      {slide.cta}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <button
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
        onClick={scrollPrev}
      >
        <ChevronLeft size={32} />
      </button>
      <button
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
        onClick={scrollNext}
      >
        <ChevronRight size={32} />
      </button>

    </div>
  );
};

export default HeroCarousel;

