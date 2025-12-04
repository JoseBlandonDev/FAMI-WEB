"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Upload, Trash2, Plus, Save, ArrowLeft, Loader2, Link as LinkIcon } from 'lucide-react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

// Páginas base disponibles para redirección
const paginasBase = [
  { value: '', label: 'Sin redirección' },
  { value: '/', label: 'Inicio' },
  { value: '/especialidades', label: 'Todas las Especialidades' },
  { value: '/servicios', label: 'Servicios' },
  { value: '/nosotros', label: 'Nosotros' },
  { value: '/contacto', label: 'Contacto' },
  { value: '/localizacion', label: 'Localización' },
  { value: '/noticias', label: 'Noticias' },
  { value: '/encuestas', label: 'Encuestas' },
  { value: '/certificaciones', label: 'Certificaciones' },
];

export default function AdminHero() {
  const [slides, setSlides] = useState([]);
  const [especialidades, setEspecialidades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    fetchSlides();
    fetchEspecialidades();
  }, []);

  const fetchEspecialidades = async () => {
    try {
      const { data, error } = await supabase
        .from('especialidades')
        .select('id, nombre')
        .eq('activo', true)
        .order('nombre', { ascending: true });

      if (error) throw error;
      setEspecialidades(data || []);
    } catch (error) {
      console.error('Error fetching especialidades:', error);
    }
  };

  const fetchSlides = async () => {
    try {
      const { data, error } = await supabase
        .from('slides')
        .select('*')
        .order('order_index', { ascending: true });

      if (error) throw error;

      // Map snake_case to camelCase
      const formattedSlides = data.map(row => ({
        id: row.id,
        image: row.image_url,
        ctaLink: row.cta_link
      }));

      setSlides(formattedSlides);
    } catch (error) {
      console.error('Error fetching slides:', error);
      alert('Error al cargar los slides');
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (slideId, event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      const filename = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.]/g, '')}`;
      
      const { data, error } = await supabase
        .storage
        .from('hero-images')
        .upload(filename, file, {
          upsert: false
        });

      if (error) throw error;

      const { data: { publicUrl } } = supabase
        .storage
        .from('hero-images')
        .getPublicUrl(filename);

      setSlides(slides.map(slide =>
        slide.id === slideId ? { ...slide, image: publicUrl } : slide
      ));

    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Error al subir imagen: ' + error.message);
    }
  };

  const handleInputChange = (slideId, field, value) => {
    setSlides(slides.map(slide =>
      slide.id === slideId ? { ...slide, [field]: value } : slide
    ));
  };

  const addNewSlide = () => {
    const newSlide = {
      id: Date.now(), 
      image: "", 
      ctaLink: "",
      isNew: true
    };
    setSlides([...slides, newSlide]);
  };

  const deleteSlide = (slideId) => {
    if (confirm('¿Estás seguro de eliminar este slide?')) {
      setSlides(slides.filter(slide => slide.id !== slideId));
    }
  };

  const saveChanges = async () => {
    if (!user) {
      alert('Debes iniciar sesión para guardar.');
      return;
    }

    setSaving(true);
    try {
      // Prepare data for DB
      // FIX: Only send columns that actually exist in the DB
      const dbSlides = slides.map((slide, index) => ({
        image_url: slide.image,
        cta_link: slide.ctaLink || null, // Send null if empty
        order_index: index
      }));

      // 1. Delete all existing slides
      const { error: deleteError } = await supabase
        .from('slides')
        .delete()
        .neq('id', 0); 
      
      if (deleteError) throw deleteError;

      // 2. Insert new slides
      if (dbSlides.length > 0) {
        const { error: insertError } = await supabase
          .from('slides')
          .insert(dbSlides);
        
        if (insertError) throw insertError;
      }

      alert('Cambios guardados correctamente');
      fetchSlides(); 

    } catch (error) {
      console.error('Error saving slides:', error);
      alert('Error al guardar cambios: ' + error.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-fami-blue" />
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Link href="/admin" className="text-gray-500 hover:text-gray-700">
            <ArrowLeft size={24} />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Hero / Slider</h1>
            <p className="text-gray-600 text-sm">Gestiona las imágenes del carrusel principal</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button
            onClick={addNewSlide}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Plus size={20} />
            Agregar Slide
          </button>
          <button
            onClick={saveChanges}
            disabled={saving}
            className="flex items-center gap-2 px-4 py-2 bg-fami-blue text-white rounded-lg hover:bg-fami-blue/90 transition-colors disabled:opacity-50"
          >
            {saving ? <Loader2 size={20} className="animate-spin" /> : <Save size={20} />}
            {saving ? 'Guardando...' : 'Guardar Cambios'}
          </button>
        </div>
      </div>

      {/* Slides List */}
      <div className="space-y-6">
        {slides.map((slide, index) => (
          <div key={slide.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-4 bg-gray-50 border-b flex items-center justify-between">
              <span className="font-medium text-gray-700">Slide {index + 1}</span>
              <button
                onClick={() => deleteSlide(slide.id)}
                className="text-red-500 hover:text-red-700 p-2"
              >
                <Trash2 size={20} />
              </button>
            </div>

            <div className="p-6">
              <div className="flex flex-col md:flex-row gap-6">
                {/* Image Preview */}
                <div className="w-full md:w-2/3">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Imagen del Banner (1200 x 470 px)
                  </label>
                  <div className="relative aspect-[2.55/1] bg-gray-100 rounded-lg overflow-hidden border-2 border-dashed border-gray-300">
                    {slide.image ? (
                      <Image
                        src={slide.image}
                        alt="Slide"
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
                        <Upload className="text-gray-300" size={48} />
                      </div>
                    )}
                    <label className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer bg-black/50 opacity-0 hover:opacity-100 transition-opacity">
                      <Upload size={32} className="text-white mb-2" />
                      <span className="text-white text-sm">Cambiar imagen</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleImageUpload(slide.id, e)}
                      />
                    </label>
                  </div>
                </div>

                {/* Link Select */}
                <div className="w-full md:w-1/3">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Página de redirección (Opcional)
                  </label>
                  <div className="relative">
                    <LinkIcon size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    <select
                      value={slide.ctaLink || ''}
                      onChange={(e) => handleInputChange(slide.id, 'ctaLink', e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-fami-blue appearance-none bg-white cursor-pointer"
                    >
                      <optgroup label="Páginas principales">
                        {paginasBase.map((pagina) => (
                          <option key={pagina.value} value={pagina.value}>
                            {pagina.label}
                          </option>
                        ))}
                      </optgroup>
                      {especialidades.length > 0 && (
                        <optgroup label="Especialidades">
                          {especialidades.map((esp) => (
                            <option key={esp.id} value={`/especialidades/${esp.id}`}>
                              {esp.nombre}
                            </option>
                          ))}
                        </optgroup>
                      )}
                    </select>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Selecciona la página a donde redirigirá el banner al hacer clic.
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {slides.length === 0 && (
        <div className="bg-white rounded-xl p-12 text-center">
          <p className="text-gray-500 mb-4">No hay slides configurados</p>
          <button
            onClick={addNewSlide}
            className="inline-flex items-center gap-2 px-4 py-2 bg-fami-blue text-white rounded-lg hover:bg-fami-blue/90 transition-colors"
          >
            <Plus size={20} />
            Agregar primer slide
          </button>
        </div>
      )}
    </div>
  );
}
