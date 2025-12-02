import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, ChevronRight, Facebook, Twitter, Linkedin, Share2 } from 'lucide-react';
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
      .limit(4);

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
  const resolvedParams = await params;
  const id = resolvedParams.id;

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
      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-fami-blue transition-colors">
              FAMI
            </Link>
            <ChevronRight size={14} />
            <Link href="/blog" className="hover:text-fami-blue transition-colors">
              Blog
            </Link>
            <ChevronRight size={14} />
            <span className="text-gray-700 truncate max-w-xs">{blogItem.title}</span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-10">

          {/* Article Content - Left Side */}
          <article className="flex-1 lg:max-w-3xl">
            {/* Header */}
            <header className="mb-8">
              {/* Date and Category Row */}
              <div className="flex items-center justify-between mb-6">
                <time className="text-gray-500 text-sm">
                  {blogItem.date}
                </time>
                <div className="flex items-center gap-4">
                  {blogItem.category && (
                    <span className="text-fami-orange font-semibold text-sm uppercase tracking-wide">
                      {blogItem.category}
                    </span>
                  )}
                  {/* Social Share Buttons */}
                  <div className="flex items-center gap-2">
                    <a
                      href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(blogItem.title)}&url=${encodeURIComponent(`https://famii-mu.vercel.app/blog/${blogItem.id}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 rounded-full bg-gray-200 hover:bg-gray-800 hover:text-white flex items-center justify-center transition-all"
                    >
                      <Twitter size={16} />
                    </a>
                    <a
                      href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`https://famii-mu.vercel.app/blog/${blogItem.id}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 rounded-full bg-gray-200 hover:bg-blue-600 hover:text-white flex items-center justify-center transition-all"
                    >
                      <Facebook size={16} />
                    </a>
                    <a
                      href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(`https://famii-mu.vercel.app/blog/${blogItem.id}`)}&title=${encodeURIComponent(blogItem.title)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 rounded-full bg-gray-200 hover:bg-blue-700 hover:text-white flex items-center justify-center transition-all"
                    >
                      <Linkedin size={16} />
                    </a>
                    <a
                      href={`https://wa.me/?text=${encodeURIComponent(blogItem.title + ' - https://famii-mu.vercel.app/blog/' + blogItem.id)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 rounded-full bg-gray-200 hover:bg-green-500 hover:text-white flex items-center justify-center transition-all"
                    >
                      <Share2 size={16} />
                    </a>
                  </div>
                </div>
              </div>

              {/* Title */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6">
                {blogItem.title}
              </h1>

              {/* Divider */}
              <div className="w-20 h-1 bg-fami-orange mb-8"></div>
            </header>

            {/* Featured Image */}
            {blogItem.image && (
              <div className="relative aspect-video mb-8 rounded-lg overflow-hidden shadow-lg">
                <Image
                  src={blogItem.image}
                  alt={blogItem.title}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
            )}

            {/* Excerpt/Lead */}
            {blogItem.excerpt && (
              <p className="text-lg text-gray-700 leading-relaxed mb-6 font-medium">
                {blogItem.excerpt}
              </p>
            )}

            {/* Content */}
            <div className="prose prose-lg max-w-none text-gray-700">
              {blogItem.content ? (
                blogItem.content.split('\n').map((paragraph, index) => (
                  paragraph.trim() && (
                    <p key={index} className="mb-5 leading-relaxed text-gray-600">
                      {paragraph}
                    </p>
                  )
                ))
              ) : (
                <p className="text-gray-500">Este artículo no tiene contenido adicional.</p>
              )}
            </div>

            {/* Author */}
            {blogItem.author && (
              <div className="mt-10 pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-500">
                  <span className="font-semibold text-gray-700">{blogItem.author}</span>
                </p>
              </div>
            )}
          </article>

          {/* Sidebar - Right Side */}
          <aside className="lg:w-80 flex-shrink-0">
            <div className="sticky top-24">
              <h3 className="text-xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-fami-orange">
                Artículos relacionados
              </h3>

              {/* Current Article Card */}
              <div className="mb-6">
                <div className="text-gray-600 text-sm leading-relaxed mb-4">
                  {blogItem.title}
                </div>
              </div>

              {/* Related Articles */}
              <div className="space-y-6">
                {relatedBlogs.map((blog) => (
                  <Link
                    key={blog.id}
                    href={`/blog/${blog.id}`}
                    className="group block"
                  >
                    <div className="relative aspect-[4/3] rounded-lg overflow-hidden mb-3 bg-gray-100">
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
                    <h4 className="text-sm font-medium text-gray-700 group-hover:text-fami-blue transition-colors line-clamp-2">
                      {blog.title}
                    </h4>
                    {blog.author && (
                      <p className="text-xs text-gray-400 mt-1">{blog.author}</p>
                    )}
                  </Link>
                ))}
              </div>

              {/* View All Link */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <Link
                  href="/blog"
                  className="text-fami-blue hover:text-fami-orange font-medium text-sm transition-colors"
                >
                  Ver todos los artículos →
                </Link>
              </div>
            </div>
          </aside>

        </div>
      </div>
    </div>
  );
}
