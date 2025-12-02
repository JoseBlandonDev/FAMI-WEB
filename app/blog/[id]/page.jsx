import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Calendar, Share2, User, Tag } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

async function getBlogItem(id) {
  if (!id || isNaN(Number(id))) {
    return null;
  }

  try {
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error(`Error fetching blog ${id}:`, error.message);
      return null;
    }

    return data;
  } catch (err) {
    console.error('Unexpected error:', err);
    return null;
  }
}

async function getRelatedBlogs(currentId, category) {
  try {
    let query = supabase
      .from('blogs')
      .select('*')
      .eq('status', 'published')
      .neq('id', currentId)
      .limit(3);

    if (category) {
      query = query.eq('category', category);
    }

    const { data } = await query.order('date', { ascending: false });
    return data || [];
  } catch (err) {
    return [];
  }
}

export default async function BlogDetailPage({ params }) {
  const { id } = params;

  if (!id) {
    notFound();
  }

  const blogItem = await getBlogItem(id);

  if (!blogItem) {
    notFound();
  }

  const relatedBlogs = await getRelatedBlogs(blogItem.id, blogItem.category);

  return (
    <div className="bg-white min-h-screen">
      {/* Header Image */}
      <div className="relative w-full h-[400px] md:h-[500px] bg-gray-900">
        {blogItem.image ? (
          <Image
            src={blogItem.image}
            alt={blogItem.title}
            fill
            className="object-cover opacity-60"
            unoptimized
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-white/20">
            Sin imagen de portada
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 container mx-auto px-4 pb-12 md:pb-20">
          <div className="max-w-4xl mx-auto">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-white/80 hover:text-fami-orange mb-6 transition-colors"
            >
              <ArrowLeft size={20} />
              Volver al blog
            </Link>

            {blogItem.category && (
              <div className="inline-flex items-center gap-2 bg-fami-orange/90 text-white px-3 py-1 rounded-full text-sm font-medium mb-4">
                <Tag size={14} />
                {blogItem.category}
              </div>
            )}

            <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight drop-shadow-lg mb-4">
              {blogItem.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-white/80">
              <div className="flex items-center gap-2">
                <Calendar size={18} className="text-fami-orange" />
                <span>{blogItem.date}</span>
              </div>
              {blogItem.author && (
                <div className="flex items-center gap-2">
                  <User size={18} className="text-fami-orange" />
                  <span>{blogItem.author}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 -mt-10 relative z-10">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-gray-100">

          {/* Share */}
          <div className="flex justify-between items-center mb-8 border-b border-gray-100 pb-4">
            {blogItem.excerpt && (
              <p className="text-gray-500 italic text-lg flex-1 pr-4">
                {blogItem.excerpt}
              </p>
            )}
            <button className="flex items-center gap-2 text-gray-500 hover:text-fami-blue transition-colors text-sm whitespace-nowrap">
              <Share2 size={16} />
              Compartir
            </button>
          </div>

          {/* Body */}
          <div className="prose prose-lg max-w-none text-gray-700">
            {blogItem.content ? (
              blogItem.content.split('\n').map((paragraph, index) => (
                paragraph.trim() && (
                  <p key={index} className="mb-4 leading-relaxed">
                    {paragraph}
                  </p>
                )
              ))
            ) : (
              <p className="text-gray-500">Este artículo no tiene contenido adicional.</p>
            )}
          </div>

          {/* Author Card */}
          {blogItem.author && (
            <div className="mt-12 pt-8 border-t border-gray-100">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-fami-blue/10 flex items-center justify-center">
                  <User size={28} className="text-fami-blue" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Escrito por</p>
                  <p className="text-lg font-bold text-gray-900">{blogItem.author}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Related Posts */}
        {relatedBlogs.length > 0 && (
          <div className="max-w-4xl mx-auto mt-16 mb-20">
            <h3 className="text-2xl font-bold text-gray-900 mb-8">
              Artículos relacionados
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedBlogs.map((blog) => (
                <Link
                  key={blog.id}
                  href={`/blog/${blog.id}`}
                  className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all border border-gray-100"
                >
                  <div className="relative aspect-video bg-gray-200 overflow-hidden">
                    {blog.image ? (
                      <Image
                        src={blog.image}
                        alt={blog.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        unoptimized
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-gray-400 text-sm">
                        Sin imagen
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h4 className="font-semibold text-gray-900 line-clamp-2 group-hover:text-fami-blue transition-colors">
                      {blog.title}
                    </h4>
                    <p className="text-xs text-gray-400 mt-2">{blog.date}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
