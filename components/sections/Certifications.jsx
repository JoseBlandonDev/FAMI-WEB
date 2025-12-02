"use client";

import React from 'react';
import Image from 'next/image';
import { Award, ChevronLeft, ChevronRight } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

const Certifications = ({ certifications = [] }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'start', slidesToScroll: 1 },
    [Autoplay({ delay: 5000, stopOnInteraction: false })]
  );

  const scrollPrev = () => emblaApi && emblaApi.scrollPrev();
  const scrollNext = () => emblaApi && emblaApi.scrollNext();

  if (!certifications || certifications.length === 0) return null;

  const isCarousel = certifications.length > 3;

  const Card = ({ cert }) => (
    <div className="flex flex-col items-center h-full">
      {/* Certificate Card */}
      <div className="relative w-full aspect-[3/4] max-w-[250px] bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-xl transition-all hover:-translate-y-1">
        {/* Certificate Image */}
        <div className="relative w-full h-full">
          {cert.image ? (
            <Image
              src={cert.image}
              alt={cert.name}
              fill
              className="object-cover"
              unoptimized
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-amber-50 to-amber-100">
              <div className="text-center p-4">
                <Award size={64} className="text-amber-400 mx-auto mb-4" />
                <div className="text-amber-600 font-serif text-lg italic">Reconocimiento</div>
              </div>
            </div>
          )}
        </div>
        
        {/* Overlay with details */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
           <p className="text-white text-center text-sm">{cert.description}</p>
        </div>
      </div>
      
      {/* Name */}
      <h3 className="mt-6 text-center text-gray-800 font-bold text-lg px-2">
        {cert.name}
      </h3>
      {cert.description && !isCarousel && (
         <p className="mt-2 text-center text-gray-500 text-sm max-w-[250px]">
           {cert.description}
         </p>
      )}
    </div>
  );

  return (
    <section className="py-20 bg-fami-gray">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-fami-blue text-center mb-4">
          ALIANZAS Y RECONOCIMIENTOS
        </h2>
        <div className="w-24 h-1 bg-fami-orange mx-auto mb-16 rounded-full"></div>

        {isCarousel ? (
          <div className="relative max-w-6xl mx-auto px-12">
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex -ml-8 py-4">
                {certifications.map((cert) => (
                  <div key={cert.id} className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%] pl-8 min-w-0">
                    <Card cert={cert} />
                  </div>
                ))}
              </div>
            </div>
            
            <button
              onClick={scrollPrev}
              className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center text-fami-blue hover:text-fami-orange transition-colors z-10"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={scrollNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center text-fami-blue hover:text-fami-orange transition-colors z-10"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-5xl mx-auto">
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
