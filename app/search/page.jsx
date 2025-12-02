"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Search, Loader2, FileText, Newspaper, Stethoscope, ArrowLeft } from 'lucide-react';
import { supabase } from '@/lib/supabase';

function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';

  const [searchQuery, setSearchQuery] = useState(query);
  const [results, setResults] = useState({
    especialidades: [],
    noticias: [],
    blogs: []
  });
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    if (query) {
      setSearchQuery(query);
      performSearch(query);
    }
  }, [query]);

  const performSearch = async (term) => {
    if (!term.trim()) return;

    setLoading(true);
    setHasSearched(true);

    try {
      const searchTerm = term.toLowerCase().trim();

      // Search in especialidades
      const { data: especialidades } = await supabase
        .from('especialidades')
        .select('id, nombre, descripcion_corta, imagen')
        .eq('activo', true)
        .or(`nombre.ilike.%${searchTerm}%,descripcion_corta.ilike.%${searchTerm}%`)
        .limit(10);

      // Search in news
      const { data: noticias } = await supabase
        .from('news')
        .select('id, title, excerpt, image, date')
        .or(`title.ilike.%${searchTerm}%,excerpt.ilike.%${searchTerm}%`)
        .order('date', { ascending: false })
        .limit(10);

      // Search in blogs
      const { data: blogs } = await supabase
        .from('blogs')
        .select('id, title, excerpt, image, date')
        .eq('status', 'published')
        .or(`title.ilike.%${searchTerm}%,excerpt.ilike.%${searchTerm}%`)
        .order('date', { ascending: false })
        .limit(10);

      setResults({
        especialidades: especialidades || [],
        noticias: noticias || [],
        blogs: blogs || []
      });
    } catch (error) {
      console.error('Error searching:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Update URL with search query
      window.history.pushState({}, '', `/search?q=${encodeURIComponent(searchQuery)}`);
      performSearch(searchQuery);
    }
  };

  const totalResults = results.especialidades.length + results.noticias.length + results.blogs.length;

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-fami-blue py-8 md:py-12">
        <div className="container mx-auto px-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4 transition-colors"
          >
            <ArrowLeft size={20} />
            Volver al inicio
          </Link>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-6">
            Buscar en FAMI
          </h1>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="max-w-2xl">
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar especialidades, noticias, blogs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-5 py-4 pr-14 rounded-xl bg-white text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-fami-orange shadow-lg"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-fami-orange text-white rounded-lg hover:bg-fami-orange/90 transition-colors"
              >
                <Search size={24} />
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Results */}
      <div className="container mx-auto px-4 py-8 md:py-12">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="animate-spin text-fami-blue" size={40} />
            <span className="ml-3 text-gray-600">Buscando...</span>
          </div>
        ) : hasSearched ? (
          <>
            {/* Results Summary */}
            <div className="mb-8">
              <p className="text-gray-600">
                {totalResults === 0 ? (
                  <>No se encontraron resultados para "<span className="font-semibold text-gray-900">{query}</span>"</>
                ) : (
                  <>Se encontraron <span className="font-semibold text-fami-blue">{totalResults}</span> resultados para "<span className="font-semibold text-gray-900">{query}</span>"</>
                )}
              </p>
            </div>

            {/* Especialidades Results */}
            {results.especialidades.length > 0 && (
              <div className="mb-10">
                <div className="flex items-center gap-2 mb-4">
                  <Stethoscope className="text-fami-blue" size={24} />
                  <h2 className="text-xl font-bold text-gray-900">Especialidades ({results.especialidades.length})</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {results.especialidades.map((item) => (
                    <Link
                      key={item.id}
                      href={`/especialidades/${item.id}`}
                      className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all border border-gray-100 group"
                    >
                      <div className="relative h-32 bg-fami-purple/20">
                        {item.imagen ? (
                          <Image
                            src={item.imagen}
                            alt={item.nombre}
                            fill
                            className="object-cover"
                            unoptimized
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <Stethoscope size={32} className="text-fami-blue/30" />
                          </div>
                        )}
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-gray-900 group-hover:text-fami-blue transition-colors">
                          {item.nombre}
                        </h3>
                        {item.descripcion_corta && (
                          <p className="text-sm text-gray-500 mt-1 line-clamp-2">{item.descripcion_corta}</p>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Noticias Results */}
            {results.noticias.length > 0 && (
              <div className="mb-10">
                <div className="flex items-center gap-2 mb-4">
                  <Newspaper className="text-fami-blue" size={24} />
                  <h2 className="text-xl font-bold text-gray-900">Noticias ({results.noticias.length})</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {results.noticias.map((item) => (
                    <Link
                      key={item.id}
                      href={`/noticias/${item.id}`}
                      className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all border border-gray-100 group"
                    >
                      <div className="relative h-32 bg-gray-100">
                        {item.image && (
                          <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            className="object-cover"
                            unoptimized
                          />
                        )}
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-gray-900 group-hover:text-fami-blue transition-colors line-clamp-2">
                          {item.title}
                        </h3>
                        {item.excerpt && (
                          <p className="text-sm text-gray-500 mt-1 line-clamp-2">{item.excerpt}</p>
                        )}
                        {item.date && (
                          <p className="text-xs text-gray-400 mt-2">
                            {new Date(item.date).toLocaleDateString('es-CO')}
                          </p>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Blogs Results */}
            {results.blogs.length > 0 && (
              <div className="mb-10">
                <div className="flex items-center gap-2 mb-4">
                  <FileText className="text-fami-blue" size={24} />
                  <h2 className="text-xl font-bold text-gray-900">Blog ({results.blogs.length})</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {results.blogs.map((item) => (
                    <Link
                      key={item.id}
                      href={`/blog/${item.id}`}
                      className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all border border-gray-100 group"
                    >
                      <div className="relative h-32 bg-gray-100">
                        {item.image && (
                          <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            className="object-cover"
                            unoptimized
                          />
                        )}
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-gray-900 group-hover:text-fami-blue transition-colors line-clamp-2">
                          {item.title}
                        </h3>
                        {item.excerpt && (
                          <p className="text-sm text-gray-500 mt-1 line-clamp-2">{item.excerpt}</p>
                        )}
                        {item.date && (
                          <p className="text-xs text-gray-400 mt-2">
                            {new Date(item.date).toLocaleDateString('es-CO')}
                          </p>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* No Results */}
            {totalResults === 0 && (
              <div className="text-center py-12">
                <Search size={64} className="mx-auto text-gray-300 mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                  No encontramos resultados
                </h3>
                <p className="text-gray-500 max-w-md mx-auto">
                  Intenta con otras palabras clave o revisa la ortografía de tu búsqueda.
                </p>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <Search size={64} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              Realiza una búsqueda
            </h3>
            <p className="text-gray-500">
              Busca especialidades, noticias y artículos del blog.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// Loading fallback component
function SearchLoading() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-fami-blue py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="h-6 w-32 bg-white/20 rounded mb-4"></div>
          <div className="h-10 w-64 bg-white/20 rounded mb-6"></div>
          <div className="max-w-2xl h-14 bg-white/20 rounded-xl"></div>
        </div>
      </div>
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="flex items-center justify-center py-20">
          <Loader2 className="animate-spin text-fami-blue" size={40} />
          <span className="ml-3 text-gray-600">Cargando...</span>
        </div>
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<SearchLoading />}>
      <SearchContent />
    </Suspense>
  );
}
