import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Calendar, ArrowLeft } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

async function getBlogs() {
  try {
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .eq('status', 'published')
      .order('date', { ascending: false });

    if (error) {
      console.error('Error fetching blogs:', error);
      return [];
    }

    return data || [];
  } catch (err) {
    console.error('Unexpected error:', err);
    return [];
  }
}

export default async function BlogPage() {
  const blogs = await getBlogs();

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-fami-blue py-6 md:py-8">
        <div className="container mx-auto px-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft size={20} />
            Volver al inicio
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Nuestro Blog
          </h1>
          <p className="text-white/80 text-lg max-w-2xl">
            Artículos de interés sobre salud ocupacional, bienestar y cuidado integral para ti y tu familia.
          </p>
        </div>
      </div>

      {/* Blog Grid */}
      <div className="container mx-auto px-4 py-16">
        {blogs.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">No hay artículos disponibles por el momento.</p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-fami-blue text-white rounded-lg hover:bg-fami-secondary transition-colors"
            >
              Volver al inicio
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <Link
                key={blog.id}
                href={`/blog/${blog.id}`}
                className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all border border-gray-100"
              >
                <div className="relative aspect-[16/10] bg-gray-200 overflow-hidden">
                  {blog.image ? (
                    <Image
                      src={blog.image}
                      alt={blog.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      unoptimized
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-400">
                      Sin imagen
                    </div>
                  )}
                  {blog.category && (
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                      <span className="text-xs font-bold text-fami-blue uppercase tracking-wide">
                        {blog.category}
                      </span>
                    </div>
                  )}
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
                  {blog.author && (
                    <p className="text-xs text-gray-400 mb-4">
                      Por: <span className="font-medium text-gray-600">{blog.author}</span>
                    </p>
                  )}
                  <span className="inline-flex items-center gap-1 text-fami-secondary text-sm font-medium group-hover:gap-2 transition-all">
                    Leer artículo <ArrowRight size={16} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
