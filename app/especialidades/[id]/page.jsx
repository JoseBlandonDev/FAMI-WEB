import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, Phone, Clock, MapPin, CheckCircle, ArrowLeft } from 'lucide-react';
import { notFound } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

async function getEspecialidad(id) {
  if (!id || isNaN(Number(id))) {
    return null;
  }

  try {
    const { data, error } = await supabase
      .from('especialidades')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error(`Error fetching especialidad ${id}:`, error.message);
      return null;
    }

    return data;
  } catch (err) {
    console.error('Unexpected error:', err);
    return null;
  }
}

async function getOtrasEspecialidades(currentId) {
  try {
    const { data } = await supabase
      .from('especialidades')
      .select('id, nombre')
      .eq('activo', true)
      .neq('id', currentId)
      .order('nombre', { ascending: true })
      .limit(6);

    return data || [];
  } catch (err) {
    return [];
  }
}

export default async function EspecialidadDetailPage({ params }) {
  const resolvedParams = await params;
  const id = resolvedParams.id;

  if (!id) {
    notFound();
  }

  const especialidad = await getEspecialidad(id);

  if (!especialidad) {
    notFound();
  }

  const otrasEspecialidades = await getOtrasEspecialidades(id);

  // Parse servicios if it's a string
  const servicios = especialidad.servicios
    ? especialidad.servicios.split(',').map(s => s.trim()).filter(Boolean)
    : [];

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
            <Link href="/especialidades" className="hover:text-fami-blue transition-colors">
              Especialidades
            </Link>
            <ChevronRight size={14} />
            <span className="text-gray-700 truncate max-w-xs">{especialidad.nombre}</span>
          </nav>
        </div>
      </div>

      {/* Header */}
      <div className="bg-fami-blue py-12 md:py-16">
        <div className="container mx-auto px-4">
          <Link
            href="/especialidades"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4 transition-colors"
          >
            <ArrowLeft size={20} />
            Volver a especialidades
          </Link>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
            {especialidad.nombre}
          </h1>
          {especialidad.descripcion_corta && (
            <p className="text-white/80 text-lg mt-4 max-w-2xl">
              {especialidad.descripcion_corta}
            </p>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Content */}
          <div className="flex-1 lg:max-w-3xl">
            {/* Image */}
            {especialidad.imagen && (
              <div className="relative aspect-video rounded-xl overflow-hidden shadow-lg mb-8">
                <Image
                  src={especialidad.imagen}
                  alt={especialidad.nombre}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
            )}

            {/* Description */}
            <div className="bg-white rounded-xl p-8 shadow-sm mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Acerca de esta especialidad
              </h2>
              {especialidad.descripcion ? (
                <div
                  className="prose prose-lg max-w-none text-gray-600"
                  dangerouslySetInnerHTML={{ __html: especialidad.descripcion }}
                />
              ) : (
                <p className="text-gray-600 leading-relaxed">
                  {especialidad.descripcion_corta || 'Información no disponible.'}
                </p>
              )}
            </div>

            {/* Services */}
            {servicios.length > 0 && (
              <div className="bg-white rounded-xl p-8 shadow-sm mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Servicios que ofrecemos
                </h2>
                <ul className="space-y-4">
                  {servicios.map((servicio, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="text-fami-orange flex-shrink-0 mt-0.5" size={20} />
                      <span className="text-gray-600">{servicio}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Contact CTA */}
            <div className="bg-gradient-to-r from-fami-blue to-fami-blue/90 rounded-xl p-8 text-white">
              <h3 className="text-xl font-bold mb-4">
                ¿Necesitas una cita en {especialidad.nombre}?
              </h3>
              <p className="text-white/80 mb-6">
                Contáctanos para agendar tu consulta con nuestros especialistas.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/contacto"
                  className="inline-flex items-center gap-2 bg-white text-fami-blue px-6 py-3 rounded-lg font-semibold hover:bg-fami-orange hover:text-white transition-colors"
                >
                  <Phone size={18} />
                  Contactar
                </Link>
                <Link
                  href="/localizacion"
                  className="inline-flex items-center gap-2 bg-white/20 text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/30 transition-colors"
                >
                  <MapPin size={18} />
                  Ubicación
                </Link>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:w-80 flex-shrink-0">
            <div className="sticky top-24">
              {/* Schedule Info */}
              <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Clock className="text-fami-orange" size={20} />
                  Horario de atención
                </h3>
                <ul className="space-y-2 text-gray-600 text-sm">
                  <li className="flex justify-between">
                    <span>Lunes - Viernes</span>
                    <span className="font-medium">7:00 AM - 6:00 PM</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Sábados</span>
                    <span className="font-medium">8:00 AM - 12:00 PM</span>
                  </li>
                </ul>
              </div>

              {/* Other Specialties */}
              {otrasEspecialidades.length > 0 && (
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 pb-3 border-b-2 border-fami-orange">
                    Otras especialidades
                  </h3>
                  <div className="space-y-3">
                    {otrasEspecialidades.map((esp) => (
                      <Link
                        key={esp.id}
                        href={`/especialidades/${esp.id}`}
                        className="block p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                      >
                        <span className="text-sm font-medium text-gray-700 group-hover:text-fami-blue transition-colors">
                          {esp.nombre}
                        </span>
                      </Link>
                    ))}
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <Link
                      href="/especialidades"
                      className="text-fami-blue hover:text-fami-orange font-medium text-sm transition-colors"
                    >
                      Ver todas las especialidades →
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </aside>
        </div>
      </div>

      {/* Styles for rich text content */}
      <style jsx global>{`
        .prose img {
          max-width: 100%;
          height: auto;
          border-radius: 8px;
          margin: 16px 0;
        }
        .prose h1, .prose h2, .prose h3 {
          color: #1f2937;
          margin-top: 1.5em;
          margin-bottom: 0.5em;
        }
        .prose p {
          margin-bottom: 1em;
          line-height: 1.7;
        }
        .prose ul, .prose ol {
          margin: 1em 0;
          padding-left: 1.5em;
        }
        .prose li {
          margin-bottom: 0.5em;
        }
      `}</style>
    </div>
  );
}
