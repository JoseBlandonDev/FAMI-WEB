"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Facebook, Twitter, Youtube, Instagram, ArrowRight } from 'lucide-react';

const featuredNews = {
  id: 1,
  title: "Lorem Ipsum Dolor",
  image: "/images/news/featured-news.jpg"
};

const newsHighlight = {
  title: "Una vez más FAMI es es reconocida como una de las mejores empresas para trabajar en el país.",
  date: "14 de julio de 2023",
  content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.",
  link: "/noticias/1"
};

const newsItems = [
  {
    id: 2,
    title: "Lorem Ipsum Dolor",
    excerpt: "Una vez más FAMI es es reconocida como una de las mejores empresas para trabajar en el país.",
    date: "14 de julio de 2023",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.",
    image: "/images/news/news-1.jpg",
    link: "/noticias/2"
  },
  {
    id: 3,
    title: "Lorem Ipsum Dolor",
    excerpt: "Una vez más FAMI es es reconocida como una de las mejores empresas para trabajar en el país.",
    date: "14 de julio de 2023",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.",
    image: "/images/news/news-2.jpg",
    link: "/noticias/3"
  },
  {
    id: 4,
    title: "Lorem Ipsum Dolor",
    excerpt: "Una vez más FAMI es es reconocida como una de las mejores empresas para trabajar en el país.",
    date: "14 de julio de 2023",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.",
    image: "/images/news/news-3.jpg",
    link: "/noticias/4"
  }
];

const socialLinks = [
  { icon: Facebook, href: 'https://facebook.com/fami', label: 'Facebook' },
  { icon: Youtube, href: 'https://youtube.com/fami', label: 'YouTube' },
  { icon: Twitter, href: 'https://twitter.com/fami', label: 'Twitter' },
  { icon: Instagram, href: 'https://instagram.com/fami', label: 'Instagram' },
];

const NewsSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-12">
          <div className="mb-6 md:mb-0">
            <h2 className="text-3xl md:text-4xl font-bold text-fami-blue mb-2">
              Noticias
            </h2>
            <h3 className="text-3xl md:text-4xl font-bold text-fami-blue">
              FAMI
            </h3>
            <p className="text-gray-500 text-sm mt-2">
              Lorem ipsum dolor sit amet consectetur<br />
              adipiscing elit sed diam nonummy
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
              <Image
                src={featuredNews.image}
                alt={featuredNews.title}
                fill
                className="object-cover"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <span className="text-white font-medium">{featuredNews.title}</span>
              </div>
            </div>

            {/* Highlight Card */}
            <div className="bg-fami-blue rounded-xl p-6 md:w-1/2 text-white">
              <h4 className="font-bold text-lg mb-2">
                {newsHighlight.title}
              </h4>
              <p className="text-white/70 text-xs mb-4">
                {newsHighlight.date}
              </p>
              <p className="text-white/90 text-sm mb-6">
                {newsHighlight.content}
              </p>
              <Link
                href={newsHighlight.link}
                className="inline-flex items-center gap-2 text-fami-orange hover:text-orange-400 transition-colors text-sm font-medium"
              >
                Ver más...
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {newsItems.map((news) => (
            <div key={news.id} className="bg-fami-gray rounded-xl overflow-hidden group hover:shadow-lg transition-shadow">
              {/* Image */}
              <div className="relative aspect-video bg-gray-200 overflow-hidden">
                <Image
                  src={news.image}
                  alt={news.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </div>

              {/* Content */}
              <div className="p-5">
                <h4 className="font-bold text-fami-blue mb-2">{news.title}</h4>
                <p className="text-gray-600 text-sm mb-2">{news.excerpt}</p>
                <p className="text-gray-400 text-xs mb-3">{news.date}</p>
                <p className="text-gray-500 text-sm mb-4 line-clamp-2">{news.content}</p>
                <Link
                  href={news.link}
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
