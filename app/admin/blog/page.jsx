"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { Plus, Search, Edit, Trash2, Eye, Calendar, Clock, Save, X, Upload } from 'lucide-react';

const initialBlogs = [
  {
    id: 1,
    title: 'Importancia de la salud ocupacional en empresas',
    excerpt: 'La salud ocupacional es fundamental para el bienestar de los trabajadores y la productividad empresarial.',
    content: 'Contenido completo del artículo...',
    author: 'Dr. Juan Pérez',
    category: 'Salud Ocupacional',
    image: '/images/blog/blog-1.jpg',
    date: '2025-11-28',
    status: 'published',
    views: 234
  },
  {
    id: 2,
    title: 'Beneficios de los apoyos pedagógicos',
    excerpt: 'Los apoyos pedagógicos ayudan al desarrollo integral de los niños en sus primeras etapas.',
    content: 'Contenido completo del artículo...',
    author: 'Lic. María García',
    category: 'Pedagogía',
    image: '/images/blog/blog-2.jpg',
    date: '2025-11-25',
    status: 'published',
    views: 189
  },
  {
    id: 3,
    title: 'Prevención de enfermedades laborales',
    excerpt: 'Conoce las mejores prácticas para prevenir enfermedades en el ambiente laboral.',
    content: 'Contenido completo del artículo...',
    author: 'Dr. Carlos Rodríguez',
    category: 'Prevención',
    image: '/images/blog/blog-3.jpg',
    date: '2025-11-20',
    status: 'draft',
    views: 0
  },
];

const categories = ['Salud Ocupacional', 'Pedagogía', 'Prevención', 'Bienestar', 'Noticias'];

export default function AdminBlog() {
  const [blogs, setBlogs] = useState(initialBlogs);
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    author: '',
    category: '',
    image: '',
    status: 'draft'
  });

  const filteredBlogs = blogs.filter(blog =>
    blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    blog.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEdit = (blog) => {
    setEditingBlog(blog);
    setFormData({
      title: blog.title,
      excerpt: blog.excerpt,
      content: blog.content,
      author: blog.author,
      category: blog.category,
      image: blog.image,
      status: blog.status
    });
    setShowModal(true);
  };

  const handleNew = () => {
    setEditingBlog(null);
    setFormData({
      title: '',
      excerpt: '',
      content: '',
      author: '',
      category: '',
      image: '',
      status: 'draft'
    });
    setShowModal(true);
  };

  const handleSave = () => {
    if (editingBlog) {
      setBlogs(blogs.map(blog =>
        blog.id === editingBlog.id
          ? { ...blog, ...formData, date: new Date().toISOString().split('T')[0] }
          : blog
      ));
    } else {
      const newBlog = {
        id: Date.now(),
        ...formData,
        date: new Date().toISOString().split('T')[0],
        views: 0
      };
      setBlogs([newBlog, ...blogs]);
    }
    setShowModal(false);
    setEditingBlog(null);
  };

  const handleDelete = (id) => {
    if (confirm('¿Estás seguro de eliminar este artículo?')) {
      setBlogs(blogs.filter(blog => blog.id !== id));
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Blog</h1>
          <p className="text-gray-500 mt-1">Administra los artículos del blog</p>
        </div>
        <button
          onClick={handleNew}
          className="flex items-center gap-2 px-4 py-2 bg-fami-blue text-white rounded-lg hover:bg-fami-blue/90 transition-colors"
        >
          <Plus size={20} />
          Nuevo Artículo
        </button>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar artículos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-fami-blue focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Blog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBlogs.map((blog) => (
          <div key={blog.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden group">
            {/* Image */}
            <div className="relative h-48 bg-gray-100">
              {blog.image && (
                <Image
                  src={blog.image}
                  alt={blog.title}
                  fill
                  className="object-cover"
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
              )}
              <div className="absolute top-3 right-3">
                <span className={`px-2 py-1 text-xs rounded-full ${
                  blog.status === 'published'
                    ? 'bg-green-100 text-green-600'
                    : 'bg-yellow-100 text-yellow-600'
                }`}>
                  {blog.status === 'published' ? 'Publicado' : 'Borrador'}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-5">
              <span className="text-xs text-fami-blue font-medium">{blog.category}</span>
              <h3 className="font-semibold text-gray-900 mt-1 line-clamp-2">{blog.title}</h3>
              <p className="text-sm text-gray-500 mt-2 line-clamp-2">{blog.excerpt}</p>

              <div className="flex items-center gap-4 mt-4 text-xs text-gray-400">
                <span className="flex items-center gap-1">
                  <Calendar size={14} />
                  {blog.date}
                </span>
                <span className="flex items-center gap-1">
                  <Eye size={14} />
                  {blog.views} vistas
                </span>
              </div>

              <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                <span className="text-sm text-gray-500">{blog.author}</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleEdit(blog)}
                    className="p-2 text-gray-400 hover:text-fami-blue hover:bg-fami-blue/10 rounded-lg transition-colors"
                  >
                    <Edit size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(blog.id)}
                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-900">
                {editingBlog ? 'Editar Artículo' : 'Nuevo Artículo'}
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
                  Imagen de portada
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
                  placeholder="Título del artículo"
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
                  placeholder="Breve descripción del artículo"
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
                  placeholder="Contenido completo del artículo..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Author */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Autor</label>
                  <input
                    type="text"
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-fami-blue"
                    placeholder="Nombre del autor"
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Categoría</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-fami-blue"
                  >
                    <option value="">Seleccionar categoría</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-fami-blue"
                >
                  <option value="draft">Borrador</option>
                  <option value="published">Publicado</option>
                </select>
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
                {editingBlog ? 'Guardar Cambios' : 'Crear Artículo'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
