import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Calendar, ArrowLeft, Star } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

async function getNews() {
  try {
    const { data, error } = await supabase
      .from('news')
      .select('*')
      .order('date', { ascending: false });

    if (error) {
      console.error('Error fetching news:', error);
      return [];
    }

    return data || [];
  } catch (err) {
    console.error('Unexpected error:', err);
    return [];
  }
}

export default async function NoticiasPage() {
  const news = await getNews();
  const featuredNews = news.filter(n => n.featured);
  const regularNews = news.filter(n => !n.featured);

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
            Noticias <span className="text-fami-orange">FAMI</span>
          </h1>
          <p className="text-white/80 text-lg max-w-2xl">
            Mantente informado sobre nuestros eventos, jornadas de salud y todas las novedades de nuestra fundación.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {news.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">No hay noticias disponibles por el momento.</p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-fami-blue text-white rounded-lg hover:bg-fami-orange transition-colors"
            >
              Volver al inicio
            </Link>
          </div>
        ) : (
          <>
            {/* Featured News */}
            {featuredNews.length > 0 && (
              <div className="mb-16">
                <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-2">
                  <Star className="text-fami-orange" size={24} />
                  Noticias Destacadas
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {featuredNews.map((item) => (
                    <Link
                      key={item.id}
                      href={`/noticias/${item.id}`}
                      className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all"
                    >
                      <div className="relative aspect-[16/9] bg-gray-200">
                        {item.image ? (
                          <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                            unoptimized
                          />
                        ) : (
                          <div className="flex items-center justify-center h-full text-gray-400">
                            Sin imagen
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                        <div className="absolute top-4 left-4 bg-fami-orange text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                          <Star size={12} />
                          Destacada
                        </div>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                        <div className="flex items-center gap-2 text-white/80 text-sm mb-2">
                          <Calendar size={14} />
                          {item.date}
                        </div>
                        <h3 className="text-2xl font-bold mb-2 group-hover:text-fami-orange transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-white/80 line-clamp-2">
                          {item.excerpt || item.content}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Regular News Grid */}
            {regularNews.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-8">
                  Todas las Noticias
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {regularNews.map((item) => (
                    <Link
                      key={item.id}
                      href={`/noticias/${item.id}`}
                      className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all border border-gray-100"
                    >
                      <div className="relative aspect-video bg-gray-200 overflow-hidden">
                        {item.image ? (
                          <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                            unoptimized
                          />
                        ) : (
                          <div className="flex items-center justify-center h-full text-gray-400">
                            Sin imagen
                          </div>
                        )}
                        <div className="absolute top-3 left-3 w-10 h-10 bg-white/90 rounded-full p-1.5 shadow-sm">
                          <div className="relative w-full h-full">
                            <Image
                              src="/logos/fami-logo.png"
                              alt="Logo"
                              fill
                              className="object-contain"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="p-6">
                        <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                          <Calendar size={14} className="text-fami-orange" />
                          {item.date}
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-fami-blue transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-gray-500 text-sm line-clamp-3 mb-4">
                          {item.excerpt || item.content}
                        </p>
                        <span className="inline-flex items-center gap-1 text-fami-blue text-sm font-medium group-hover:text-fami-orange group-hover:gap-2 transition-all">
                          Leer más <ArrowRight size={16} />
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
