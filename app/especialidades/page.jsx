"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, ChevronRight } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function EspecialidadesPage() {
  const [especialidades, setEspecialidades] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEspecialidades();
  }, []);

  const fetchEspecialidades = async () => {
    try {
      const { data, error } = await supabase
        .from('especialidades')
        .select('*')
        .eq('activo', true)
        .order('nombre', { ascending: true });

      if (error) throw error;
      setEspecialidades(data || []);
    } catch (error) {
      console.error('Error fetching especialidades:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredEspecialidades = especialidades.filter(item =>
    item.nombre?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.descripcion_corta?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-fami-blue transition-colors">
              FAMI
            </Link>
            <ChevronRight size={14} />
            <span className="text-gray-700">Especialidades</span>
          </nav>
        </div>
      </div>

      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Especialidades</h1>
          <div className="w-16 h-1 bg-fami-orange mt-3 rounded-full"></div>
        </div>
      </div>

      {/* Search Section */}
      <div className="bg-fami-blue py-10">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-white text-center mb-6">
            Buscar una Especialidad
          </h2>
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Escriba aquí el nombre de la especialidad..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-6 py-4 pr-14 bg-white/10 border-b-2 border-white/30 text-white placeholder-white/60 focus:outline-none focus:border-white transition-colors text-lg"
              />
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60" size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Especialidades Grid */}
      <div className="container mx-auto px-4 py-12">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl shadow-sm overflow-hidden animate-pulse">
                <div className="h-48 bg-gray-200"></div>
                <div className="p-4">
                  <div className="h-5 bg-gray-200 rounded w-3/4"></div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredEspecialidades.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredEspecialidades.map((especialidad) => (
              <Link
                key={especialidad.id}
                href={`/especialidades/${especialidad.id}`}
                className="group bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-lg hover:border-fami-blue/30 transition-all duration-300"
              >
                {/* Image */}
                <div className="relative h-48 bg-gray-100 overflow-hidden">
                  {especialidad.imagen ? (
                    <Image
                      src={especialidad.imagen}
                      alt={especialidad.nombre}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      unoptimized
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-400 bg-gradient-to-br from-gray-100 to-gray-200">
                      <span className="text-sm">Sin imagen</span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 group-hover:text-fami-blue transition-colors text-center">
                    {especialidad.nombre?.toLowerCase()}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-gray-400 mb-4">
              <Search size={48} className="mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No se encontraron especialidades
            </h3>
            <p className="text-gray-500">
              {searchQuery
                ? `No hay resultados para "${searchQuery}"`
                : 'No hay especialidades disponibles en este momento'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
