'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, ChevronRight } from 'lucide-react';

const especialidades = [
  { id: 1, nombre: 'Medicina General', descripcion: 'Atención primaria y diagnóstico general' },
  { id: 2, nombre: 'Medicina Interna', descripcion: 'Diagnóstico y tratamiento de enfermedades en adultos' },
  { id: 3, nombre: 'Pediatría', descripcion: 'Atención médica especializada para niños' },
  { id: 4, nombre: 'Ginecología y Obstetricia', descripcion: 'Salud de la mujer y atención prenatal' },
  { id: 5, nombre: 'Cardiología', descripcion: 'Diagnóstico y tratamiento de enfermedades del corazón' },
  { id: 6, nombre: 'Dermatología', descripcion: 'Tratamiento de enfermedades de la piel' },
  { id: 7, nombre: 'Oftalmología', descripcion: 'Cuidado y tratamiento de los ojos' },
  { id: 8, nombre: 'Otorrinolaringología', descripcion: 'Oído, nariz y garganta' },
  { id: 9, nombre: 'Traumatología y Ortopedia', descripcion: 'Lesiones y enfermedades del sistema musculoesquelético' },
  { id: 10, nombre: 'Neurología', descripcion: 'Trastornos del sistema nervioso' },
  { id: 11, nombre: 'Psiquiatría', descripcion: 'Salud mental y trastornos psiquiátricos' },
  { id: 12, nombre: 'Psicología', descripcion: 'Evaluación y terapia psicológica' },
  { id: 13, nombre: 'Nutrición y Dietética', descripcion: 'Planes alimenticios y nutrición clínica' },
  { id: 14, nombre: 'Fisioterapia', descripcion: 'Rehabilitación física y terapia' },
  { id: 15, nombre: 'Odontología', descripcion: 'Salud bucal y tratamientos dentales' },
  { id: 16, nombre: 'Urología', descripcion: 'Sistema urinario y salud masculina' },
  { id: 17, nombre: 'Gastroenterología', descripcion: 'Sistema digestivo y enfermedades gastrointestinales' },
  { id: 18, nombre: 'Neumología', descripcion: 'Enfermedades respiratorias y pulmonares' },
  { id: 19, nombre: 'Endocrinología', descripcion: 'Trastornos hormonales y metabólicos' },
  { id: 20, nombre: 'Reumatología', descripcion: 'Enfermedades articulares y autoinmunes' },
  { id: 21, nombre: 'Nefrología', descripcion: 'Enfermedades renales' },
  { id: 22, nombre: 'Cirugía General', descripcion: 'Procedimientos quirúrgicos generales' },
  { id: 23, nombre: 'Medicina del Trabajo', descripcion: 'Salud ocupacional y prevención laboral' },
  { id: 24, nombre: 'Medicina Familiar', descripcion: 'Atención integral para toda la familia' },
];

export default function EspecialidadesPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredEspecialidades = useMemo(() => {
    if (!searchTerm.trim()) return especialidades;
    return especialidades.filter(esp =>
      esp.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

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
        {filteredEspecialidades.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No se encontraron especialidades con "{searchTerm}"
            </p>
            <button
              onClick={() => setSearchTerm('')}
              className="mt-4 text-fami-blue hover:text-fami-orange transition-colors font-medium"
            >
              Ver todas las especialidades
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {filteredEspecialidades.map((especialidad) => (
              <Link
                key={especialidad.id}
                href={`/especialidades/${especialidad.id}`}
                className="group bg-white border border-gray-200 rounded-lg p-6 hover:border-fami-blue hover:shadow-md transition-all text-center min-h-[120px] flex items-center justify-center"
              >
                <span className="text-gray-700 group-hover:text-fami-blue font-medium transition-colors">
                  {especialidad.nombre}
                </span>
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
