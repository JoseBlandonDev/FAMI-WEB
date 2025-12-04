"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Calendar } from 'lucide-react';

const BlogSection = ({ blogs = [] }) => {
  if (!blogs || blogs.length === 0) return null;

  // Filter published blogs
  const publishedBlogs = blogs.filter(b => b.status === 'published').slice(0, 3);

  if (publishedBlogs.length === 0) return null;

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-fami-blue mb-2">
              Nuestro Blog
            </h2>
            <p className="text-gray-500 text-sm">
              Artículos de interés sobre salud y bienestar.
            </p>
          </div>
          <Link
            href="/blog"
            className="hidden md:flex items-center gap-2 text-fami-blue hover:text-fami-secondary font-medium"
          >
            Ver todos
            <ArrowRight size={18} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {publishedBlogs.map((blog) => (
            <Link
              key={blog.id}
              href={`/blog/${blog.id}`}
              className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all"
            >
              <div className="relative aspect-[16/10] bg-gray-200 overflow-hidden">
                {blog.image ? (
                  <Image
                    src={blog.image}
                    alt={blog.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    unoptimized
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400">Sin imagen</div>
                )}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                  <span className="text-xs font-bold text-fami-blue uppercase tracking-wide">
                    {blog.category}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 text-xs text-gray-400 mb-3">
                  <Calendar size={14} />
                  {blog.date}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-fami-blue transition-colors">
                  {blog.title}
                </h3>
                <p className="text-gray-500 text-sm line-clamp-3 mb-4">
                  {blog.excerpt}
                </p>
                <span className="inline-flex items-center gap-1 text-fami-secondary text-sm font-medium group-hover:gap-2 transition-all">
                  Leer artículo <ArrowRight size={16} />
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-10 md:hidden">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 rounded-full text-fami-blue font-medium"
          >
            Ver todos los artículos
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;

