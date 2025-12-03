"use client";

import React, { useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';
import { Play, ChevronLeft, ChevronRight } from 'lucide-react';

const VideoSection = ({ videos = [] }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    containScroll: 'trimSnaps',
    slidesToScroll: 1,
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  if (!videos || videos.length === 0) return null;

  // Determine featured video
  const featuredVideo = videos.find(v => v.featured) || videos[0];
  const carouselVideos = videos.filter(v => v.id !== featuredVideo.id);

  return (
    <section className="py-16 bg-fami-blue">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Featured Video */}
          <div className="relative aspect-video rounded-xl overflow-hidden bg-fami-blue/50 group shadow-2xl">
            {/* Thumbnail */}
            {featuredVideo.thumbnail ? (
              <Image
                src={featuredVideo.thumbnail}
                alt={featuredVideo.title}
                fill
                className="object-cover"
                unoptimized
              />
            ) : (
              <div className="absolute inset-0 bg-gray-800 flex items-center justify-center text-white/30">
                Sin miniatura
              </div>
            )}
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />

            {/* Play Button */}
            <a
              href={featuredVideo.video_url || featuredVideo.videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="w-20 h-20 rounded-full bg-white/90 flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                <Play size={32} className="text-fami-blue ml-1" fill="currentColor" />
              </div>
            </a>

            {/* Title Badge */}
            <div className="absolute top-4 left-4 bg-fami-orange px-4 py-2 rounded-md shadow-md">
              <span className="text-white font-bold text-lg">{featuredVideo.title}</span>
            </div>

            {/* Description */}
            {featuredVideo.description && (
              <div className="absolute bottom-4 left-4 right-4 bg-black/50 p-4 rounded-lg backdrop-blur-sm">
                <p className="text-white/90 text-sm line-clamp-2">{featuredVideo.description}</p>
              </div>
            )}
          </div>

          {/* Video Carousel */}
          {carouselVideos.length > 0 && (
            <div className="relative">
              <div className="overflow-hidden px-1" ref={emblaRef}>
                <div className="flex gap-4">
                  {carouselVideos.map((video) => (
                    <div
                      key={video.id}
                      className="flex-[0_0_calc(50%-8px)] min-w-0"
                    >
                      <a
                        href={video.video_url || video.videoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block relative aspect-video rounded-xl overflow-hidden bg-fami-cyan/30 group shadow-md hover:shadow-xl transition-all hover:-translate-y-1"
                      >
                        {/* Thumbnail */}
                        {video.thumbnail ? (
                          <Image
                            src={video.thumbnail}
                            alt={video.title}
                            fill
                            className="object-cover"
                            unoptimized
                          />
                        ) : (
                          <div className="absolute inset-0 bg-gray-800" />
                        )}
                        
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />

                        {/* Play Icon */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-12 h-12 rounded-full bg-white/80 flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
                            <Play size={20} className="text-fami-blue ml-0.5" fill="currentColor" />
                          </div>
                        </div>

                        {/* Title */}
                        <div className="absolute bottom-3 left-3 right-3">
                          <span className="text-white text-sm font-medium line-clamp-2 shadow-sm drop-shadow-md">
                            {video.title}
                          </span>
                        </div>
                      </a>
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation */}
              <button
                onClick={scrollPrev}
                className="absolute -left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center text-fami-blue hover:bg-fami-orange hover:text-white transition-colors"
                aria-label="Anterior"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={scrollNext}
                className="absolute -right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center text-fami-blue hover:bg-fami-orange hover:text-white transition-colors"
                aria-label="Siguiente"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
