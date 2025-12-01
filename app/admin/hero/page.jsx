"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Upload, Trash2, Plus, Save, ArrowLeft, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function AdminHero() {
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchSlides();
  }, []);

  const fetchSlides = async () => {
    try {
      const response = await fetch('/api/hero');
      const data = await response.json();
      setSlides(data);
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

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();

      if (data.success) {
        setSlides(slides.map(slide =>
          slide.id === slideId ? { ...slide, image: data.url } : slide
        ));
      } else {
        alert('Error al subir imagen');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Error al subir imagen');
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
      title: "Nuevo Slide",
      subtitle: "Subtítulo",
      image: "/images/hero/placeholder.png", // Ensure this exists or handle missing
      ctaText: "Ver más",
      ctaLink: "#"
    };
    setSlides([...slides, newSlide]);
  };

  const deleteSlide = (slideId) => {
    if (confirm('¿Estás seguro de eliminar este slide?')) {
      setSlides(slides.filter(slide => slide.id !== slideId));
    }
  };

  const saveChanges = async () => {
    setSaving(true);
    try {
      const response = await fetch('/api/hero', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(slides),
      });
      
      if (response.ok) {
        alert('Cambios guardados correctamente');
      } else {
        alert('Error al guardar cambios');
      }
    } catch (error) {
      console.error('Error saving slides:', error);
      alert('Error al guardar cambios');
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
                    {slide.image && (
                      <Image
                        src={slide.image}
                        alt={slide.title}
                        fill
                        className="object-cover"
                        unoptimized // To allow arbitrary uploads without config
                      />
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
                      value={slide.subtitle}
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
                      value={slide.title}
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
                      value={slide.ctaText}
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
                      value={slide.ctaLink}
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
