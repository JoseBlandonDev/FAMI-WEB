"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Twitter, Youtube, Instagram, ArrowRight, Calendar } from 'lucide-react';

const socialLinks = [
  { icon: Facebook, href: 'https://facebook.com/fami', label: 'Facebook' },
  { icon: Youtube, href: 'https://youtube.com/fami', label: 'YouTube' },
  { icon: Twitter, href: 'https://twitter.com/fami', label: 'Twitter' },
  { icon: Instagram, href: 'https://instagram.com/fami', label: 'Instagram' },
];

const NewsSection = ({ news = [] }) => {
  if (!news || news.length === 0) return null;

  // Get featured news or the first one
  const featuredNews = news.find(item => item.featured) || news[0];
  // Get the rest of the news (limit to 3)
  const otherNews = news.filter(item => item.id !== featuredNews.id).slice(0, 3);

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-12">
          <div className="mb-6 md:mb-0 md:w-1/3">
            <h2 className="text-3xl md:text-4xl font-bold text-fami-blue mb-2">
              Noticias
            </h2>
            <h3 className="text-3xl md:text-4xl font-bold text-fami-blue">
              FAMI
            </h3>
            <p className="text-gray-500 text-sm mt-2">
              Mantente informado con las últimas novedades<br />
              y eventos de nuestra fundación.
            </p>

            {/* Social Icons */}
            <div className="flex gap-2 mt-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-fami-blue text-white hover:bg-fami-orange transition-colors"
                  aria-label={social.label}
                >
                  <social.icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Featured News with Highlight */}
          <div className="flex flex-col md:flex-row gap-6 md:w-2/3">
            {/* Featured Image */}
            <div className="relative w-full md:w-1/2 aspect-video md:aspect-square rounded-xl overflow-hidden bg-gray-100">
              {featuredNews.image ? (
                <Image
                  src={featuredNews.image}
                  alt={featuredNews.title}
                  fill
                  className="object-cover"
                  unoptimized
                />
              ) : (
                <div className="absolute inset-0 bg-gray-200 flex items-center justify-center text-gray-400">
                  Sin imagen
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <span className="text-white font-medium line-clamp-2">{featuredNews.title}</span>
              </div>
            </div>

            {/* Highlight Card */}
            <div className="bg-fami-blue rounded-xl p-6 md:w-1/2 text-white flex flex-col justify-center">
              <h4 className="font-bold text-lg mb-2 line-clamp-3">
                {featuredNews.title}
              </h4>
              <p className="text-white/70 text-xs mb-4 flex items-center gap-1">
                <Calendar size={12} />
                {featuredNews.date}
              </p>
              <p className="text-white/90 text-sm mb-6 line-clamp-4">
                {featuredNews.excerpt || featuredNews.content}
              </p>
              <Link
                href={`/noticias/${featuredNews.id}`}
                className="inline-flex items-center gap-2 text-fami-orange hover:text-orange-400 transition-colors text-sm font-medium mt-auto"
              >
                Ver más...
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {otherNews.map((item) => (
            <div key={item.id} className="bg-fami-gray rounded-xl overflow-hidden group hover:shadow-lg transition-shadow">
              {/* Image */}
              <div className="relative aspect-video bg-gray-200 overflow-hidden">
                {item.image ? (
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    unoptimized
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400 text-sm">Sin imagen</div>
                )}
              </div>

              {/* Content */}
              <div className="p-5">
                <h4 className="font-bold text-fami-blue mb-2 line-clamp-2">{item.title}</h4>
                <p className="text-gray-400 text-xs mb-3 flex items-center gap-1">
                  <Calendar size={12} />
                  {item.date}
                </p>
                <p className="text-gray-500 text-sm mb-4 line-clamp-3">{item.excerpt}</p>
                <Link
                  href={`/noticias/${item.id}`}
                  className="inline-flex items-center gap-2 text-fami-blue hover:text-fami-orange transition-colors text-sm font-medium"
                >
                  Ver más...
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* View More Button */}
        <div className="text-center mt-10">
          <Link
            href="/noticias"
            className="inline-flex items-center gap-2 px-6 py-3 bg-fami-blue text-white rounded-full hover:bg-fami-blue/90 transition-colors font-medium"
          >
            Ver más noticias
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
