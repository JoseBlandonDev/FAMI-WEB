'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, ChevronRight, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function EspecialidadesPage() {
  const [especialidades, setEspecialidades] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
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

  const filteredEspecialidades = useMemo(() => {
    if (!searchTerm.trim()) return especialidades;
    return especialidades.filter(esp =>
      esp.nombre?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, especialidades]);

  return (
    <div className="bg-gray-50 min-h-screen">
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

      {/* Title */}
      <div className="bg-white pb-8 pt-6">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Especialidades
          </h1>
          <div className="w-16 h-1 bg-fami-orange mt-4"></div>
        </div>
      </div>

      {/* Search Section */}
      <div className="bg-fami-blue py-10">
        <div className="container mx-auto px-4">
          <h2 className="text-white text-xl md:text-2xl font-semibold text-center mb-6">
            Buscar una especialidad
          </h2>
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Escriba aquí el nombre de la especialidad..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-5 py-4 pr-14 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-fami-orange shadow-lg"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-fami-blue transition-colors">
                <Search size={24} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Specialties Grid */}
      <div className="container mx-auto px-4 py-12">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="animate-spin text-fami-blue" size={40} />
          </div>
        ) : filteredEspecialidades.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              {searchTerm
                ? `No se encontraron especialidades con "${searchTerm}"`
                : 'No hay especialidades disponibles'}
            </p>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="mt-4 text-fami-blue hover:text-fami-orange transition-colors font-medium"
              >
                Ver todas las especialidades
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {filteredEspecialidades.map((especialidad) => (
              <Link
                key={especialidad.id}
                href={`/especialidades/${especialidad.id}`}
                className="group bg-white border border-gray-200 rounded-lg overflow-hidden hover:border-fami-blue hover:shadow-md transition-all"
              >
                {especialidad.imagen && (
                  <div className="relative h-32 bg-gray-100">
                    <Image
                      src={especialidad.imagen}
                      alt={especialidad.nombre}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      unoptimized
                    />
                  </div>
                )}
                <div className="p-4 text-center">
                  <span className="text-gray-700 group-hover:text-fami-blue font-medium transition-colors">
                    {especialidad.nombre}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Results count */}
        {searchTerm && filteredEspecialidades.length > 0 && (
          <p className="text-center text-gray-500 mt-8">
            Mostrando {filteredEspecialidades.length} de {especialidades.length} especialidades
          </p>
        )}
      </div>
    </div>
  );
}
