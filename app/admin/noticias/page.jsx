"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { Upload, Trash2, Plus, Save, ArrowLeft, Calendar } from 'lucide-react';
import Link from 'next/link';

const initialNews = [
  {
    id: 1,
    title: "Lorem Ipsum Dolor",
    excerpt: "Una vez más FAMI es es reconocida como una de las mejores empresas para trabajar en el país.",
    date: "2023-07-14",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    image: "/images/news/featured-news.jpg",
    featured: true
  },
  {
    id: 2,
    title: "Lorem Ipsum Dolor",
    excerpt: "Una vez más FAMI es es reconocida como una de las mejores empresas para trabajar en el país.",
    date: "2023-07-14",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    image: "/images/news/news-1.jpg",
    featured: false
  },
  {
    id: 3,
    title: "Lorem Ipsum Dolor",
    excerpt: "Una vez más FAMI es es reconocida como una de las mejores empresas para trabajar en el país.",
    date: "2023-07-14",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    image: "/images/news/news-2.jpg",
    featured: false
  }
];

export default function AdminNews() {
  const [news, setNews] = useState(initialNews);

  const handleImageUpload = (newsId, event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNews(news.map(item =>
          item.id === newsId ? { ...item, image: reader.result } : item
        ));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (newsId, field, value) => {
    setNews(news.map(item =>
      item.id === newsId ? { ...item, [field]: value } : item
    ));
  };

  const addNewNews = () => {
    const newItem = {
      id: Date.now(),
      title: "Nueva noticia",
      excerpt: "Descripción breve de la noticia",
      date: new Date().toISOString().split('T')[0],
      content: "",
      image: "/images/news/placeholder.jpg",
      featured: false
    };
    setNews([...news, newItem]);
  };

  const deleteNews = (newsId) => {
    if (confirm('¿Estás seguro de eliminar esta noticia?')) {
      setNews(news.filter(item => item.id !== newsId));
    }
  };

  const saveChanges = () => {
    alert('Cambios guardados correctamente');
    console.log('Saving news:', news);
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
            <h1 className="text-2xl font-bold text-gray-900">Noticias</h1>
            <p className="text-gray-600 text-sm">Administra las noticias y sus imágenes</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button
            onClick={addNewNews}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Plus size={20} />
            Agregar Noticia
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

      {/* News List */}
      <div className="space-y-6">
        {news.map((item) => (
          <div key={item.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-4 bg-gray-50 border-b flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="font-medium text-gray-700">{item.title}</span>
                {item.featured && (
                  <span className="px-2 py-1 bg-fami-orange text-white text-xs rounded-full">
                    Destacada
                  </span>
                )}
              </div>
              <button
                onClick={() => deleteNews(item.id)}
                className="text-red-500 hover:text-red-700 p-2"
              >
                <Trash2 size={20} />
              </button>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Image Preview */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Imagen
                  </label>
                  <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden border-2 border-dashed border-gray-300">
                    {item.image && (
                      <Image
                        src={item.image}
                        alt={item.title}
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
                        onChange={(e) => handleImageUpload(item.id, e)}
                      />
                    </label>
                  </div>
                </div>

                {/* Form Fields */}
                <div className="lg:col-span-2 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Título
                      </label>
                      <input
                        type="text"
                        value={item.title}
                        onChange={(e) => handleInputChange(item.id, 'title', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-fami-blue"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Fecha
                      </label>
                      <div className="relative">
                        <input
                          type="date"
                          value={item.date}
                          onChange={(e) => handleInputChange(item.id, 'date', e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-fami-blue"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Extracto
                    </label>
                    <input
                      type="text"
                      value={item.excerpt}
                      onChange={(e) => handleInputChange(item.id, 'excerpt', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-fami-blue"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Contenido
                    </label>
                    <textarea
                      value={item.content}
                      onChange={(e) => handleInputChange(item.id, 'content', e.target.value)}
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-fami-blue resize-none"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id={`featured-${item.id}`}
                      checked={item.featured}
                      onChange={(e) => handleInputChange(item.id, 'featured', e.target.checked)}
                      className="w-4 h-4 text-fami-blue focus:ring-fami-blue border-gray-300 rounded"
                    />
                    <label htmlFor={`featured-${item.id}`} className="text-sm text-gray-700">
                      Marcar como noticia destacada
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {news.length === 0 && (
        <div className="bg-white rounded-xl p-12 text-center">
          <p className="text-gray-500 mb-4">No hay noticias configuradas</p>
          <button
            onClick={addNewNews}
            className="inline-flex items-center gap-2 px-4 py-2 bg-fami-blue text-white rounded-lg hover:bg-fami-blue/90 transition-colors"
          >
            <Plus size={20} />
            Agregar primera noticia
          </button>
        </div>
      )}
    </div>
  );
}
