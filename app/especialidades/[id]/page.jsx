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
                  className="prose-content text-gray-600"
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
                <ul className="space-y-2 text-gray-600 text-sm mb-5">
                  <li className="flex justify-between">
                    <span>Lunes - Viernes</span>
                    <span className="font-medium">7:00 AM - 6:00 PM</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Sábados</span>
                    <span className="font-medium">8:00 AM - 12:00 PM</span>
                  </li>
                </ul>
                <a
                  href={`https://wa.me/573218227123?text=Hola, estoy interesado en la especialidad de ${encodeURIComponent(especialidad.nombre)}. Me gustaría obtener más información.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full bg-[#25D366] text-white py-3 px-4 rounded-lg font-semibold hover:bg-[#128C7E] transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Contáctanos
                </a>
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

    </div>
  );
}
