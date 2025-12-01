"use client";

import React, { useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';
import Link from 'next/link';
import { Play, ChevronLeft, ChevronRight } from 'lucide-react';

const featuredVideo = {
  id: 1,
  title: "FAMI en Video",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy nibh euismod.",
  thumbnail: "/images/videos/featured-video.jpg",
  videoUrl: "https://www.youtube.com/watch?v=example"
};

const videoItems = [
  {
    id: 2,
    title: "Lorem Ipsum Dolor",
    thumbnail: "/images/videos/video-1.jpg",
    videoUrl: "https://www.youtube.com/watch?v=example"
  },
  {
    id: 3,
    title: "Lorem Ipsum Dolor",
    thumbnail: "/images/videos/video-2.jpg",
    videoUrl: "https://www.youtube.com/watch?v=example"
  },
  {
    id: 4,
    title: "Lorem Ipsum Dolor",
    thumbnail: "/images/videos/video-3.jpg",
    videoUrl: "https://www.youtube.com/watch?v=example"
  }
];

const VideoSection = () => {
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

  return (
    <section className="py-16 bg-fami-blue">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Featured Video */}
          <div className="relative aspect-video rounded-xl overflow-hidden bg-fami-blue/50 group">
            {/* Thumbnail */}
            <Image
              src={featuredVideo.thumbnail}
              alt={featuredVideo.title}
              fill
              className="object-cover"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />

            {/* Play Button */}
            <a
              href={featuredVideo.videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="w-20 h-20 rounded-full bg-white/90 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Play size={32} className="text-fami-blue ml-1" fill="currentColor" />
              </div>
            </a>

            {/* Title Badge */}
            <div className="absolute top-4 left-4 bg-fami-orange px-4 py-2 rounded-md">
              <span className="text-white font-bold text-lg">{featuredVideo.title}</span>
            </div>

            {/* Description */}
            <div className="absolute bottom-4 left-4 right-4">
              <p className="text-white/90 text-sm">{featuredVideo.description}</p>
            </div>
          </div>

          {/* Video Carousel */}
          <div className="relative">
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex gap-4">
                {videoItems.map((video) => (
                  <div
                    key={video.id}
                    className="flex-[0_0_calc(50%-8px)] min-w-0"
                  >
                    <a
                      href={video.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block relative aspect-video rounded-xl overflow-hidden bg-fami-cyan/30 group"
                    >
                      {/* Thumbnail */}
                      <Image
                        src={video.thumbnail}
                        alt={video.title}
                        fill
                        className="object-cover"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />

                      {/* Play Icon */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-white/80 flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Play size={20} className="text-fami-blue ml-0.5" fill="currentColor" />
                        </div>
                      </div>

                      {/* Title */}
                      <div className="absolute bottom-3 left-3 right-3">
                        <span className="text-white text-sm font-medium">{video.title}</span>
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
        </div>

        {/* View Channel Button */}
        <div className="text-center mt-10">
          <Link
            href="https://youtube.com/fami"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-white hover:text-fami-orange transition-colors underline"
          >
            Visitar el canal de videos
          </Link>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
