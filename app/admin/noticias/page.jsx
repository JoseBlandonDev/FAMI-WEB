"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { Plus, Search, Edit, Trash2, Eye, Calendar, Save, X, Upload, Star } from 'lucide-react';

const initialNews = [
  {
    id: 1,
    title: 'FAMI recibe reconocimiento como mejor empresa de salud',
    excerpt: 'Una vez más FAMI es reconocida como una de las mejores empresas para trabajar en el país.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    image: '/images/news/news-1.jpg',
    date: '2025-11-28',
    featured: true,
    views: 567
  },
  {
    id: 2,
    title: 'Nueva campaña de vacunación en todas las sedes',
    excerpt: 'FAMI lanza nueva campaña de vacunación gratuita para la comunidad.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    image: '/images/news/news-2.jpg',
    date: '2025-11-25',
    featured: false,
    views: 234
  },
  {
    id: 3,
    title: 'Apertura de nueva sede en Cali',
    excerpt: 'FAMI expande su presencia con una nueva sede en el Valle del Cauca.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    image: '/images/news/news-3.jpg',
    date: '2025-11-20',
    featured: false,
    views: 891
  },
];

export default function AdminNoticias() {
  const [news, setNews] = useState(initialNews);
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingNews, setEditingNews] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    image: '',
    featured: false
  });

  const filteredNews = news.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEdit = (item) => {
    setEditingNews(item);
    setFormData({
      title: item.title,
      excerpt: item.excerpt,
      content: item.content,
      image: item.image,
      featured: item.featured
    });
    setShowModal(true);
  };

  const handleNew = () => {
    setEditingNews(null);
    setFormData({
      title: '',
      excerpt: '',
      content: '',
      image: '',
      featured: false
    });
    setShowModal(true);
  };

  const handleSave = () => {
    if (editingNews) {
      setNews(news.map(item =>
        item.id === editingNews.id
          ? { ...item, ...formData, date: new Date().toISOString().split('T')[0] }
          : item
      ));
    } else {
      const newItem = {
        id: Date.now(),
        ...formData,
        date: new Date().toISOString().split('T')[0],
        views: 0
      };
      setNews([newItem, ...news]);
    }
    setShowModal(false);
    setEditingNews(null);
  };

  const handleDelete = (id) => {
    if (confirm('¿Estás seguro de eliminar esta noticia?')) {
      setNews(news.filter(item => item.id !== id));
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleFeatured = (id) => {
    setNews(news.map(item =>
      item.id === id ? { ...item, featured: !item.featured } : item
    ));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Noticias</h1>
          <p className="text-gray-500 mt-1">Administra las noticias del sitio</p>
        </div>
        <button
          onClick={handleNew}
          className="flex items-center gap-2 px-4 py-2 bg-fami-blue text-white rounded-lg hover:bg-fami-blue/90 transition-colors"
        >
          <Plus size={20} />
          Nueva Noticia
        </button>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="relative">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar noticias..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-fami-blue focus:border-transparent"
          />
        </div>
      </div>

      {/* News List */}
      <div className="space-y-4">
        {filteredNews.map((item) => (
          <div key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="flex flex-col md:flex-row">
              {/* Image */}
              <div className="relative w-full md:w-64 h-48 md:h-auto bg-gray-100 flex-shrink-0">
                {item.image && (
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                )}
                {item.featured && (
                  <div className="absolute top-3 left-3">
                    <span className="flex items-center gap-1 px-2 py-1 bg-yellow-400 text-yellow-900 text-xs rounded-full font-medium">
                      <Star size={12} fill="currentColor" />
                      Destacada
                    </span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="flex-1 p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                    <p className="text-gray-500 mt-2">{item.excerpt}</p>
                    <div className="flex items-center gap-4 mt-4 text-sm text-gray-400">
                      <span className="flex items-center gap-1">
                        <Calendar size={14} />
                        {item.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Eye size={14} />
                        {item.views} vistas
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleFeatured(item.id)}
                      className={`p-2 rounded-lg transition-colors ${
                        item.featured
                          ? 'text-yellow-500 bg-yellow-50 hover:bg-yellow-100'
                          : 'text-gray-400 hover:text-yellow-500 hover:bg-yellow-50'
                      }`}
                      title={item.featured ? 'Quitar destacada' : 'Marcar como destacada'}
                    >
                      <Star size={18} fill={item.featured ? 'currentColor' : 'none'} />
                    </button>
                    <button
                      onClick={() => handleEdit(item)}
                      className="p-2 text-gray-400 hover:text-fami-blue hover:bg-fami-blue/10 rounded-lg transition-colors"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredNews.length === 0 && (
        <div className="bg-white rounded-xl p-12 text-center">
          <p className="text-gray-500 mb-4">No hay noticias que coincidan con tu búsqueda</p>
          <button
            onClick={handleNew}
            className="inline-flex items-center gap-2 px-4 py-2 bg-fami-blue text-white rounded-lg hover:bg-fami-blue/90 transition-colors"
          >
            <Plus size={20} />
            Crear primera noticia
          </button>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-900">
                {editingNews ? 'Editar Noticia' : 'Nueva Noticia'}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-lg"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6 space-y-4">
              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Imagen
                </label>
                <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden border-2 border-dashed border-gray-300">
                  {formData.image && (
                    <Image
                      src={formData.image}
                      alt="Preview"
                      fill
                      className="object-cover"
                    />
                  )}
                  <label className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer bg-black/50 opacity-0 hover:opacity-100 transition-opacity">
                    <Upload size={32} className="text-white mb-2" />
                    <span className="text-white text-sm">Subir imagen</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                  </label>
                </div>
              </div>

              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Título</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-fami-blue"
                  placeholder="Título de la noticia"
                />
              </div>

              {/* Excerpt */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Extracto</label>
                <textarea
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  rows={2}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-fami-blue resize-none"
                  placeholder="Breve descripción de la noticia"
                />
              </div>

              {/* Content */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contenido</label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  rows={6}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-fami-blue resize-none"
                  placeholder="Contenido completo de la noticia..."
                />
              </div>

              {/* Featured */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="featured"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="w-4 h-4 text-fami-blue focus:ring-fami-blue border-gray-300 rounded"
                />
                <label htmlFor="featured" className="text-sm text-gray-700">
                  Marcar como noticia destacada
                </label>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-100">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-4 py-2 bg-fami-blue text-white rounded-lg hover:bg-fami-blue/90 transition-colors"
              >
                <Save size={18} />
                {editingNews ? 'Guardar Cambios' : 'Crear Noticia'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
