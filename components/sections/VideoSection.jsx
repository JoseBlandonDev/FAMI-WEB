"use client";

import React, { useState, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';
import { Play, ChevronLeft, ChevronRight, X } from 'lucide-react';

const VideoSection = ({ videos = [] }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    containScroll: 'trimSnaps',
    slidesToScroll: 1,
  });

  const [selectedVideo, setSelectedVideo] = useState(null);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  if (!videos || videos.length === 0) return null;

  // Helper to extract YouTube ID
  const getYouTubeId = (url) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  // Helper to get thumbnail (custom or YouTube default)
  const getThumbnail = (video) => {
    if (video.thumbnail) return video.thumbnail;
    const ytId = getYouTubeId(video.video_url || video.videoUrl);
    if (ytId) return `https://img.youtube.com/vi/${ytId}/maxresdefault.jpg`;
    return null;
  };

  const openVideoModal = (video, e) => {
    e.preventDefault();
    setSelectedVideo(video);
  };

  const closeVideoModal = () => {
    setSelectedVideo(null);
  };

  // Determine featured video
  const featuredVideo = videos.find(v => v.featured) || videos[0];
  const carouselVideos = videos.filter(v => v.id !== featuredVideo.id);

  return (
    <section className="py-16 bg-fami-blue">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-white text-center mb-12">Videos Destacados</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Featured Video */}
          <div className="flex flex-col gap-4">
            <div className="relative aspect-video rounded-xl overflow-hidden bg-black group shadow-2xl border border-white/10">
              {/* Thumbnail */}
              {getThumbnail(featuredVideo) ? (
                <Image
                  src={getThumbnail(featuredVideo)}
                  alt={featuredVideo.title}
                  fill
                  className="object-cover opacity-80 group-hover:opacity-60 transition-opacity"
                  unoptimized
                />
              ) : (
                <div className="absolute inset-0 bg-gray-900 flex items-center justify-center text-white/30">
                  <Play size={48} />
                </div>
              )}
              
              {/* Play Button */}
              <a
                href={featuredVideo.video_url || featuredVideo.videoUrl}
                onClick={(e) => openVideoModal(featuredVideo, e)}
                className="absolute inset-0 flex items-center justify-center cursor-pointer z-10"
              >
                <div className="w-20 h-20 rounded-full bg-fami-secondary text-white flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg hover:shadow-fami-secondary/50">
                  <Play size={32} className="ml-1" fill="currentColor" />
                </div>
              </a>

              {/* Title Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 to-transparent">
                 <h3 className="text-white font-bold text-xl md:text-2xl mb-2">{featuredVideo.title}</h3>
                 {featuredVideo.description && (
                   <p className="text-gray-300 text-sm line-clamp-2">{featuredVideo.description}</p>
                 )}
              </div>
            </div>
          </div>

          {/* Video Carousel */}
          <div className="flex flex-col justify-center h-full">
            {carouselVideos.length > 0 ? (
              <div className="relative px-8">
                <div className="overflow-hidden" ref={emblaRef}>
                  <div className="flex flex-col gap-4 h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                    {carouselVideos.map((video) => (
                      <div
                        key={video.id}
                        className="flex items-center gap-4 bg-white/10 p-3 rounded-lg hover:bg-white/20 transition-colors group cursor-pointer"
                        onClick={(e) => openVideoModal(video, e)}
                      >
                         {/* Thumbnail Mini */}
                        <div className="relative w-32 h-20 flex-shrink-0 bg-black rounded-md overflow-hidden">
                          {getThumbnail(video) && (
                            <Image
                              src={getThumbnail(video)}
                              alt={video.title}
                              fill
                              className="object-cover"
                              unoptimized
                            />
                          )}
                          <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/0 transition-colors">
                             <Play size={16} className="text-white opacity-80" fill="currentColor" />
                          </div>
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <h4 className="text-white font-medium text-sm line-clamp-2 group-hover:text-fami-secondary transition-colors">
                            {video.title}
                          </h4>
                          <p className="text-gray-400 text-xs mt-1 line-clamp-1">
                            {video.description || 'Ver video completo'}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
               <div className="flex items-center justify-center h-full text-white/50 bg-white/5 rounded-xl p-8">
                  <p>No hay más videos disponibles</p>
               </div>
            )}
          </div>
        </div>
      </div>

      {/* Video Modal Player */}
      {selectedVideo && (
        <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative w-full max-w-5xl aspect-video bg-black rounded-xl overflow-hidden shadow-2xl border border-white/10">
            <button
              onClick={closeVideoModal}
              className="absolute top-4 right-4 z-50 text-white hover:text-fami-secondary transition-colors bg-black/50 p-2 rounded-full"
            >
              <X size={32} />
            </button>
            
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${getYouTubeId(selectedVideo.video_url || selectedVideo.videoUrl)}?autoplay=1&rel=0`}
              title={selectedVideo.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            ></iframe>
          </div>
        </div>
      )}
    </section>
  );
};

export default VideoSection;
