"use client";

import React, { useState, useEffect, useRef, useMemo } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { Plus, Search, Edit, Trash2, Save, X, Loader2, ImagePlus } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import imageCompression from 'browser-image-compression';
import 'react-quill-new/dist/quill.snow.css';

// Dynamic import of React Quill (client-side only)
const ReactQuill = dynamic(() => import('react-quill-new'), {
  ssr: false,
  loading: () => <div className="h-64 bg-gray-100 animate-pulse rounded-lg" />,
});

export default function AdminEspecialidades() {
  const [especialidades, setEspecialidades] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const quillRef = useRef(null);

  const [formData, setFormData] = useState({
    nombre: '',
    subtitulo: '',
    descripcion: '',
    descripcion_corta: '',
    imagen: '',
    activo: true
  });

  // Quill modules configuration
  const modules = useMemo(() => ({
    toolbar: {
      container: [
        [{ 'header': [1, 2, 3, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'align': [] }],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'color': [] }, { 'background': [] }],
        ['link', 'image'],
        ['clean']
      ],
      handlers: {
        image: function() {
          const input = document.createElement('input');
          input.setAttribute('type', 'file');
          input.setAttribute('accept', 'image/*');
          input.click();

          input.onchange = async () => {
            const file = input.files[0];
            if (file) {
              try {
                // Compress image
                const options = {
                  maxSizeMB: 0.07,
                  maxWidthOrHeight: 800,
                  useWebWorker: true,
                  fileType: 'image/webp'
                };

                const compressedFile = await imageCompression(file, options);

                // Upload to Supabase
                const filename = `especialidades/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.]/g, '')}.webp`;
                const { error: uploadError } = await supabase.storage
                  .from('hero-images')
                  .upload(filename, compressedFile);

                if (uploadError) throw uploadError;

                const { data: { publicUrl } } = supabase.storage
                  .from('hero-images')
                  .getPublicUrl(filename);

                // Insert image into editor
                const quill = quillRef.current?.getEditor();
                if (quill) {
                  const range = quill.getSelection(true);
                  quill.insertEmbed(range.index, 'image', publicUrl);
                }
              } catch (error) {
                alert('Error al subir imagen: ' + error.message);
              }
            }
          };
        }
      }
    }
  }), []);

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'align',
    'list', 'bullet',
    'color', 'background',
    'link', 'image'
  ];

  useEffect(() => {
    fetchEspecialidades();
  }, []);

  const fetchEspecialidades = async () => {
    try {
      const { data, error } = await supabase
        .from('especialidades')
        .select('*')
        .order('nombre', { ascending: true });

      if (error) throw error;
      setEspecialidades(data || []);
    } catch (error) {
      console.error('Error fetching especialidades:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredItems = especialidades.filter(item =>
    item.nombre?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Función para extraer texto plano del HTML y crear un resumen
  const getResumen = (item) => {
    if (item.descripcion_corta) return item.descripcion_corta;
    if (!item.descripcion) return 'Sin descripción';

    // Remover tags HTML y obtener texto plano
    const textoPlano = item.descripcion
      .replace(/<[^>]*>/g, ' ')
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/\s+/g, ' ')
      .trim();

    // Limitar a 150 caracteres
    return textoPlano.length > 150
      ? textoPlano.substring(0, 150) + '...'
      : textoPlano;
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({
      nombre: item.nombre || '',
      subtitulo: item.subtitulo || '',
      descripcion: item.descripcion || '',
      descripcion_corta: item.descripcion_corta || '',
      imagen: item.imagen || '',
      activo: item.activo !== false
    });
    setShowModal(true);
  };

  const handleNew = () => {
    setEditingItem(null);
    setFormData({
      nombre: '',
      subtitulo: '',
      descripcion: '',
      descripcion_corta: '',
      imagen: '',
      activo: true
    });
    setShowModal(true);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadingImage(true);
    try {
      // Compress image to less than 70kb and convert to webp
      const options = {
        maxSizeMB: 0.07, // 70kb
        maxWidthOrHeight: 800,
        useWebWorker: true,
        fileType: 'image/webp'
      };

      const compressedFile = await imageCompression(file, options);

      const filename = `especialidades/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.]/g, '')}.webp`;
      const { error } = await supabase.storage
        .from('hero-images')
        .upload(filename, compressedFile);

      if (error) throw error;

      const { data: { publicUrl } } = supabase.storage
        .from('hero-images')
        .getPublicUrl(filename);

      setFormData(prev => ({ ...prev, imagen: publicUrl }));
    } catch (error) {
      alert('Error al subir imagen: ' + error.message);
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSave = async () => {
    if (!formData.nombre.trim()) {
      alert('El nombre es requerido');
      return;
    }

    setSaving(true);
    try {
      if (editingItem) {
        const { error } = await supabase
          .from('especialidades')
          .update(formData)
          .eq('id', editingItem.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('especialidades')
          .insert([formData]);
        if (error) throw error;
      }

      await fetchEspecialidades();
      setShowModal(false);
      setEditingItem(null);
    } catch (error) {
      alert('Error al guardar: ' + error.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('¿Estás seguro de eliminar esta especialidad?')) return;

    try {
      const { error } = await supabase
        .from('especialidades')
        .delete()
        .eq('id', id);
      if (error) throw error;

      setEspecialidades(especialidades.filter(e => e.id !== id));
    } catch (error) {
      alert('Error al eliminar: ' + error.message);
    }
  };

  if (loading) return <div className="p-8 text-center">Cargando especialidades...</div>;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Especialidades</h1>
          <p className="text-gray-500 mt-1">Administra las especialidades médicas</p>
        </div>
        <button
          onClick={handleNew}
          className="flex items-center gap-2 px-4 py-2 bg-fami-blue text-white rounded-lg hover:bg-fami-blue/90 transition-colors"
        >
          <Plus size={20} />
          Nueva Especialidad
        </button>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="relative">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar especialidades..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-fami-blue focus:border-transparent"
          />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <p className="text-sm text-gray-500">Total</p>
          <p className="text-2xl font-bold text-gray-900">{especialidades.length}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <p className="text-sm text-gray-500">Activas</p>
          <p className="text-2xl font-bold text-green-600">{especialidades.filter(e => e.activo !== false).length}</p>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden p-5">
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
              <h3 className="font-semibold text-gray-900 text-lg">{item.nombre}</h3>
              <span className={`px-2 py-1 text-xs rounded-full ${
                item.activo !== false
                  ? 'bg-green-100 text-green-600'
                  : 'bg-gray-100 text-gray-600'
              }`}>
                {item.activo !== false ? 'Activa' : 'Inactiva'}
              </span>
            </div>

            {/* Content */}
            <p className="text-sm text-gray-500 line-clamp-3 mb-4">
              {getResumen(item)}
            </p>

            <div className="flex items-center justify-end pt-4 border-t border-gray-100 gap-2">
              <button
                onClick={() => handleEdit(item)}
                className="flex items-center gap-1 px-3 py-1.5 text-sm text-fami-blue hover:bg-fami-blue/10 rounded-lg transition-colors"
              >
                <Edit size={16} />
                Editar
              </button>
              <button
                onClick={() => handleDelete(item.id)}
                className="flex items-center gap-1 px-3 py-1.5 text-sm text-red-500 hover:bg-red-50 rounded-lg transition-colors"
              >
                <Trash2 size={16} />
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredItems.length === 0 && !loading && (
        <div className="text-center py-12 text-gray-500">
          No se encontraron especialidades
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-900">
                {editingItem ? 'Editar Especialidad' : 'Nueva Especialidad'}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-lg"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Imagen de la especialidad
                </label>
                <div className="relative aspect-video max-w-md bg-gray-100 rounded-lg overflow-hidden border-2 border-dashed border-gray-300">
                  {formData.imagen && (
                    <Image
                      src={formData.imagen}
                      alt="Preview"
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  )}
                  <label className={`absolute inset-0 flex flex-col items-center justify-center cursor-pointer transition-opacity ${formData.imagen ? 'bg-black/50 opacity-0 hover:opacity-100' : ''}`}>
                    {uploadingImage ? (
                      <Loader2 className="animate-spin text-fami-blue" size={32} />
                    ) : (
                      <>
                        <ImagePlus size={32} className={formData.imagen ? 'text-white' : 'text-gray-400'} />
                        <span className={`text-sm mt-2 ${formData.imagen ? 'text-white' : 'text-gray-500'}`}>
                          {formData.imagen ? 'Cambiar imagen' : 'Subir imagen'}
                        </span>
                        <span className="text-xs text-gray-400 mt-1">Se optimizará a WebP (&lt;70kb)</span>
                      </>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload}
                      disabled={uploadingImage}
                    />
                  </label>
                </div>
              </div>

              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre de la especialidad *
                </label>
                <input
                  type="text"
                  value={formData.nombre}
                  onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-fami-blue"
                  placeholder="Ej: Medicina General"
                />
              </div>

              {/* Subtítulo */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Subtítulo
                </label>
                <input
                  type="text"
                  value={formData.subtitulo}
                  onChange={(e) => setFormData({ ...formData, subtitulo: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-fami-blue"
                  placeholder="Ej: Acerca de Medicina General"
                />
                <p className="text-xs text-gray-500 mt-1">Se mostrará como título de la sección de descripción</p>
              </div>

              {/* Short Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Descripción corta
                </label>
                <input
                  type="text"
                  value={formData.descripcion_corta}
                  onChange={(e) => setFormData({ ...formData, descripcion_corta: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-fami-blue"
                  placeholder="Breve descripción para mostrar en tarjetas"
                />
              </div>

              {/* Rich Text Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Descripción completa
                </label>
                <p className="text-xs text-gray-500 mb-2">
                  Puedes usar negrita, cursiva, listas, alinear texto e insertar imágenes (se optimizan automáticamente)
                </p>
                <div className="border border-gray-300 rounded-lg overflow-hidden">
                  <ReactQuill
                    ref={quillRef}
                    theme="snow"
                    value={formData.descripcion}
                    onChange={(value) => setFormData({ ...formData, descripcion: value })}
                    modules={modules}
                    formats={formats}
                    placeholder="Escribe la descripción de la especialidad..."
                    className="bg-white"
                    style={{ minHeight: '250px' }}
                  />
                </div>
              </div>

              {/* Active Status */}
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="activo"
                  checked={formData.activo}
                  onChange={(e) => setFormData({ ...formData, activo: e.target.checked })}
                  className="w-4 h-4 text-fami-blue rounded focus:ring-fami-blue"
                />
                <label htmlFor="activo" className="text-sm font-medium text-gray-700">
                  Especialidad activa (visible en el sitio)
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
                disabled={saving}
                className="flex items-center gap-2 px-4 py-2 bg-fami-blue text-white rounded-lg hover:bg-fami-blue/90 transition-colors disabled:opacity-50"
              >
                {saving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                {editingItem ? 'Guardar Cambios' : 'Crear Especialidad'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Custom styles for Quill */}
      <style jsx global>{`
        .ql-container {
          min-height: 200px;
          font-size: 14px;
        }
        .ql-editor {
          min-height: 200px;
        }
        .ql-toolbar {
          border-top-left-radius: 8px;
          border-top-right-radius: 8px;
          background: #f9fafb;
        }
        .ql-container {
          border-bottom-left-radius: 8px;
          border-bottom-right-radius: 8px;
        }
        .ql-editor img {
          max-width: 100%;
          height: auto;
          border-radius: 8px;
          margin: 10px 0;
        }
      `}</style>
    </div>
  );
}
