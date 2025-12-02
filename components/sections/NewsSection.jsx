"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Twitter, Youtube, Instagram, ArrowRight, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

const socialLinks = [
  { icon: Facebook, href: 'https://facebook.com/fami', label: 'Facebook' },
  { icon: Youtube, href: 'https://youtube.com/fami', label: 'YouTube' },
  { icon: Twitter, href: 'https://twitter.com/fami', label: 'Twitter' },
  { icon: Instagram, href: 'https://instagram.com/fami', label: 'Instagram' },
];

const NewsSection = ({ news = [] }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'start', slidesToScroll: 1 },
    [Autoplay({ delay: 6000, stopOnInteraction: false })]
  );

  const scrollPrev = () => emblaApi && emblaApi.scrollPrev();
  const scrollNext = () => emblaApi && emblaApi.scrollNext();

  if (!news || news.length === 0) return null;

  const NewsCard = ({ item }) => (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden h-full flex flex-col group">
      {/* Image */}
      <div className="relative aspect-video bg-gray-100 overflow-hidden">
        {item.image ? (
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            unoptimized
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400 bg-gray-50">Sin imagen</div>
        )}
        
        {/* Logo Overlay */}
        <div className="absolute top-3 left-3 w-10 h-10 bg-white/90 rounded-full p-1.5 shadow-sm">
           <div className="relative w-full h-full">
             <Image 
               src="/logos/fami-logo.png" 
               alt="Logo" 
               fill 
               className="object-contain" 
             />
           </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        {/* Date */}
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-3 font-medium">
          <Calendar size={14} className="text-fami-orange" />
          {item.date}
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2 leading-tight group-hover:text-fami-blue transition-colors">
          {item.title}
        </h3>

        {/* Excerpt */}
        <p className="text-gray-600 text-sm mb-6 line-clamp-3 leading-relaxed flex-1">
          {item.excerpt || item.content}
        </p>

        {/* Button */}
        <Link
          href={`/noticias/${item.id}`}
          className="inline-flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-fami-blue text-white rounded-lg hover:bg-fami-orange transition-all font-medium text-sm group-hover:shadow-md"
        >
          Ver más
          <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center lg:items-start">
          
          {/* Left Column: Title & Description */}
          <div className="lg:w-1/3 text-center lg:text-left space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold text-fami-blue leading-tight">
              Noticias <span className="text-fami-orange">FAMI</span>
            </h2>
            
            <p className="text-gray-600 text-lg leading-relaxed">
              Mantente al día con nuestros eventos, jornadas de salud y novedades. 
              En FAMI siempre estamos en movimiento por el bienestar de nuestra comunidad.
            </p>

            <div className="pt-4">
              <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Síguenos</p>
              <div className="flex gap-4 justify-center lg:justify-start">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-fami-blue shadow-md hover:bg-fami-blue hover:text-white hover:shadow-lg transition-all transform hover:-translate-y-1"
                    aria-label={social.label}
                  >
                    <social.icon size={20} />
                  </a>
                ))}
              </div>
            </div>

            {/* Custom Carousel Navigation */}
             <div className="hidden lg:flex gap-4 mt-8">
                <button 
                  onClick={scrollPrev}
                  className="w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:border-fami-blue hover:text-fami-blue transition-colors"
                >
                  <ChevronLeft size={24} />
                </button>
                <button 
                  onClick={scrollNext}
                  className="w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:border-fami-blue hover:text-fami-blue transition-colors"
                >
                  <ChevronRight size={24} />
                </button>
             </div>
          </div>

          {/* Right Column: Carousel */}
          <div className="lg:w-2/3 w-full relative">
            <div className="overflow-hidden px-2 -mx-2 py-4 -my-4" ref={emblaRef}>
              <div className="flex -ml-6">
                {news.map((item) => (
                  <div key={item.id} className="flex-[0_0_100%] md:flex-[0_0_50%] pl-6 min-w-0">
                    <NewsCard item={item} />
                  </div>
                ))}
              </div>
            </div>
            
            {/* Mobile Navigation */}
             <div className="flex lg:hidden justify-center gap-4 mt-8">
                <button 
                  onClick={scrollPrev}
                  className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-fami-blue"
                >
                  <ChevronLeft size={20} />
                </button>
                <button 
                  onClick={scrollNext}
                  className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-fami-blue"
                >
                  <ChevronRight size={20} />
                </button>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default NewsSection;
