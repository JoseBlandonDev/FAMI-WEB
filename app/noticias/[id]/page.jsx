import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, Facebook, Twitter, Linkedin, Share2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

async function getNewsItem(id) {
  if (!id || isNaN(Number(id))) {
    return null;
  }

  try {
    const { data, error } = await supabase
      .from('news')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error(`Error fetching news ${id}:`, error.message);
      return null;
    }

    return data;
  } catch (err) {
    console.error('Unexpected error:', err);
    return null;
  }
}

async function getRelatedNews(currentId) {
  try {
    const { data } = await supabase
      .from('news')
      .select('*')
      .neq('id', currentId)
      .order('date', { ascending: false })
      .limit(4);

    return data || [];
  } catch (err) {
    return [];
  }
}

export default async function NewsDetailPage({ params }) {
  const resolvedParams = await params;
  const id = resolvedParams.id;

  if (!id) {
    notFound();
  }

  const newsItem = await getNewsItem(id);

  if (!newsItem) {
    notFound();
  }

  const relatedNews = await getRelatedNews(newsItem.id);

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
            <Link href="/noticias" className="hover:text-fami-blue transition-colors">
              Noticias
            </Link>
            <ChevronRight size={14} />
            <span className="text-gray-700 truncate max-w-xs">{newsItem.title}</span>
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
                  {newsItem.date}
                </time>
                <div className="flex items-center gap-4">
                  <span className="text-fami-orange font-semibold text-sm uppercase tracking-wide">
                    Noticias FAMI
                  </span>
                  {/* Social Share Buttons */}
                  <div className="flex items-center gap-2">
                    <a
                      href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(newsItem.title)}&url=${encodeURIComponent(`https://famii-mu.vercel.app/noticias/${newsItem.id}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 rounded-full bg-gray-200 hover:bg-gray-800 hover:text-white flex items-center justify-center transition-all"
                    >
                      <Twitter size={16} />
                    </a>
                    <a
                      href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`https://famii-mu.vercel.app/noticias/${newsItem.id}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 rounded-full bg-gray-200 hover:bg-blue-600 hover:text-white flex items-center justify-center transition-all"
                    >
                      <Facebook size={16} />
                    </a>
                    <a
                      href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(`https://famii-mu.vercel.app/noticias/${newsItem.id}`)}&title=${encodeURIComponent(newsItem.title)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 rounded-full bg-gray-200 hover:bg-blue-700 hover:text-white flex items-center justify-center transition-all"
                    >
                      <Linkedin size={16} />
                    </a>
                    <a
                      href={`https://wa.me/?text=${encodeURIComponent(newsItem.title + ' - https://famii-mu.vercel.app/noticias/' + newsItem.id)}`}
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
                {newsItem.title}
              </h1>

              {/* Divider */}
              <div className="w-20 h-1 bg-fami-orange mb-8"></div>
            </header>

            {/* Featured Image */}
            {newsItem.image && (
              <div className="relative aspect-video mb-8 rounded-lg overflow-hidden shadow-lg">
                <Image
                  src={newsItem.image}
                  alt={newsItem.title}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
            )}

            {/* Excerpt/Lead */}
            {newsItem.excerpt && (
              <p className="text-lg text-gray-700 leading-relaxed mb-6 font-medium">
                {newsItem.excerpt}
              </p>
            )}

            {/* Content */}
            <div className="prose prose-lg max-w-none text-gray-700">
              {newsItem.content ? (
                newsItem.content.split('\n').map((paragraph, index) => (
                  paragraph.trim() && (
                    <p key={index} className="mb-5 leading-relaxed text-gray-600">
                      {paragraph}
                    </p>
                  )
                ))
              ) : (
                <p className="text-gray-500">Esta noticia no tiene contenido adicional.</p>
              )}
            </div>
          </article>

          {/* Sidebar - Right Side */}
          <aside className="lg:w-80 flex-shrink-0">
            <div className="sticky top-24">
              <h3 className="text-xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-fami-orange">
                Noticias relacionadas
              </h3>

              {/* Current Article Reference */}
              <div className="mb-6">
                <div className="text-gray-600 text-sm leading-relaxed mb-4">
                  {newsItem.title}
                </div>
              </div>

              {/* Related News */}
              <div className="space-y-6">
                {relatedNews.map((news) => (
                  <Link
                    key={news.id}
                    href={`/noticias/${news.id}`}
                    className="group block"
                  >
                    <div className="relative aspect-[4/3] rounded-lg overflow-hidden mb-3 bg-gray-100">
                      {news.image ? (
                        <Image
                          src={news.image}
                          alt={news.title}
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
                      {news.title}
                    </h4>
                    <p className="text-xs text-gray-400 mt-1">{news.date}</p>
                  </Link>
                ))}
              </div>

              {/* View All Link */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <Link
                  href="/noticias"
                  className="text-fami-blue hover:text-fami-orange font-medium text-sm transition-colors"
                >
                  Ver todas las noticias →
                </Link>
              </div>
            </div>
          </aside>

        </div>
      </div>
    </div>
  );
}
