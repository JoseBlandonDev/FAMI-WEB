"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { Upload, Trash2, Plus, Save, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const initialSlides = [
  {
    id: 1,
    title: "MEJORA TU PRODUCTIVIDAD.",
    subtitle: "Salud ocupacional",
    image: "/images/hero/doctor-hero.png",
    ctaText: "Ver más",
    ctaLink: "/salud-ocupacional"
  }
];

export default function AdminHero() {
  const [slides, setSlides] = useState(initialSlides);
  const [editingSlide, setEditingSlide] = useState(null);

  const handleImageUpload = (slideId, event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSlides(slides.map(slide =>
          slide.id === slideId ? { ...slide, image: reader.result } : slide
        ));
      };
      reader.readAsDataURL(file);
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
      image: "/images/hero/placeholder.png",
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

  const saveChanges = () => {
    // In a real app, this would save to a database or API
    alert('Cambios guardados correctamente');
    console.log('Saving slides:', slides);
  };

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
            className="flex items-center gap-2 px-4 py-2 bg-fami-blue text-white rounded-lg hover:bg-fami-blue/90 transition-colors"
          >
            <Save size={20} />
            Guardar Cambios
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
