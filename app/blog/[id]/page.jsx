import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, Facebook, Twitter, Linkedin, Share2, Phone, Mail, MapPin } from 'lucide-react';
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
        <div className="flex flex-col lg:flex-row gap-8">

          {/* Article Content - Left Side */}
          <article className="flex-1">
            {/* Header */}
            <header className="mb-8">
              {/* Date and Category Row */}
              <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
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
                      className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-800 hover:text-white flex items-center justify-center transition-all"
                    >
                      <Twitter size={14} />
                    </a>
                    <a
                      href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`https://famii-mu.vercel.app/blog/${blogItem.id}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-full bg-gray-100 hover:bg-blue-600 hover:text-white flex items-center justify-center transition-all"
                    >
                      <Facebook size={14} />
                    </a>
                    <a
                      href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(`https://famii-mu.vercel.app/blog/${blogItem.id}`)}&title=${encodeURIComponent(blogItem.title)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-full bg-gray-100 hover:bg-blue-700 hover:text-white flex items-center justify-center transition-all"
                    >
                      <Linkedin size={14} />
                    </a>
                    <a
                      href={`https://wa.me/?text=${encodeURIComponent(blogItem.title + ' - https://famii-mu.vercel.app/blog/' + blogItem.id)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-full bg-gray-100 hover:bg-green-500 hover:text-white flex items-center justify-center transition-all"
                    >
                      <Share2 size={14} />
                    </a>
                  </div>
                </div>
              </div>

              {/* Title */}
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-4">
                {blogItem.title}
              </h1>

              {/* Divider */}
              <div className="w-16 h-1 bg-fami-orange mb-6"></div>
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
              <div className="mt-8 pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-500">
                  Por: <span className="font-semibold text-gray-700">{blogItem.author}</span>
                </p>
              </div>
            )}
          </article>

          {/* Sidebar - Right Side */}
          <aside className="lg:w-72 flex-shrink-0">
            <div className="sticky top-24 space-y-6">

              {/* Contact Section */}
              <div className="bg-fami-blue rounded-xl p-5 text-white">
                <h3 className="text-lg font-bold mb-4">Contáctanos</h3>
                <p className="text-white/80 text-sm mb-4">
                  ¿Tienes preguntas? Estamos aquí para ayudarte.
                </p>
                <div className="space-y-3 text-sm">
                  <a href="tel:+573001234567" className="flex items-center gap-2 text-white/90 hover:text-white transition-colors">
                    <Phone size={16} />
                    <span>+57 300 123 4567</span>
                  </a>
                  <a href="mailto:info@fami.com" className="flex items-center gap-2 text-white/90 hover:text-white transition-colors">
                    <Mail size={16} />
                    <span>info@fami.com</span>
                  </a>
                  <div className="flex items-start gap-2 text-white/90">
                    <MapPin size={16} className="flex-shrink-0 mt-0.5" />
                    <span>Cali, Colombia</span>
                  </div>
                </div>
                <Link
                  href="/contacto"
                  className="mt-4 block w-full bg-white text-fami-blue text-center py-2 rounded-lg font-semibold hover:bg-fami-orange hover:text-white transition-colors text-sm"
                >
                  Ir a Contacto
                </Link>
              </div>

              {/* Related Articles */}
              {relatedBlogs.length > 0 && (
                <div className="bg-gray-50 rounded-xl p-5">
                  <h3 className="text-base font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                    Artículos relacionados
                  </h3>
                  <div className="space-y-4">
                    {relatedBlogs.map((blog) => (
                      <Link
                        key={blog.id}
                        href={`/blog/${blog.id}`}
                        className="group flex gap-3"
                      >
                        <div className="relative w-12 h-12 rounded overflow-hidden flex-shrink-0 bg-gray-200">
                          {blog.image ? (
                            <Image
                              src={blog.image}
                              alt={blog.title}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-300"
                              unoptimized
                            />
                          ) : (
                            <div className="flex items-center justify-center h-full text-gray-400 text-[10px]">
                              IMG
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium text-gray-700 group-hover:text-fami-blue transition-colors line-clamp-2">
                            {blog.title}
                          </h4>
                          <p className="text-xs text-gray-400 mt-1">{blog.date}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                  <Link
                    href="/blog"
                    className="mt-4 block text-fami-blue hover:text-fami-orange font-medium text-sm transition-colors text-center"
                  >
                    Ver todos →
                  </Link>
                </div>
              )}

            </div>
          </aside>

        </div>
      </div>
    </div>
  );
}
