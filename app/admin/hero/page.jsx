"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Upload, Trash2, Plus, Save, ArrowLeft, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function AdminHero() {
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    fetchSlides();
  }, []);

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
        title: row.title,
        subtitle: row.subtitle,
        image: row.image_url,
        ctaText: row.cta_text,
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
      // 1. Upload to Supabase Storage
      const filename = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.]/g, '')}`;
      
      const { data, error } = await supabase
        .storage
        .from('hero-images')
        .upload(filename, file, {
          upsert: false
        });

      if (error) throw error;

      // 2. Get Public URL
      const { data: { publicUrl } } = supabase
        .storage
        .from('hero-images')
        .getPublicUrl(filename);

      // 3. Update State
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
      id: Date.now(), // Temporary ID for UI
      title: "Nuevo Slide",
      subtitle: "Subtítulo",
      image: "", 
      ctaText: "Ver más",
      ctaLink: "#",
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
      // Strategy: Delete all and re-insert to maintain order and clean state
      // This is simple and effective for this use case.
      
      const dbSlides = slides.map((slide, index) => ({
        title: slide.title,
        subtitle: slide.subtitle,
        image_url: slide.image,
        cta_text: slide.ctaText,
        cta_link: slide.ctaLink,
        order_index: index
      }));

      // 1. Delete all existing slides
      // (Supabase doesn't support TRUNCATE via client easily, so we delete where ID > 0)
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
      // Reload to get real IDs from DB
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
            <p className="text-gray-600 text-sm">Administra las imágenes del slider principal</p>
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
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Image Preview */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Imagen del Slide
                  </label>
                  <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden border-2 border-dashed border-gray-300">
                    {slide.image ? (
                      <Image
                        src={slide.image}
                        alt={slide.title}
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
                  <p className="text-xs text-gray-500 mt-2">
                    Recomendado: 1920x800px, formato PNG o JPG
                  </p>
                </div>

                {/* Form Fields */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Subtítulo
                    </label>
                    <input
                      type="text"
                      value={slide.subtitle || ''}
                      onChange={(e) => handleInputChange(slide.id, 'subtitle', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-fami-blue"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Título Principal
                    </label>
                    <input
                      type="text"
                      value={slide.title || ''}
                      onChange={(e) => handleInputChange(slide.id, 'title', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-fami-blue"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Texto del Botón
                    </label>
                    <input
                      type="text"
                      value={slide.ctaText || ''}
                      onChange={(e) => handleInputChange(slide.id, 'ctaText', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-fami-blue"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Link del Botón
                    </label>
                    <input
                      type="text"
                      value={slide.ctaLink || ''}
                      onChange={(e) => handleInputChange(slide.id, 'ctaLink', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-fami-blue"
                    />
                  </div>
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
