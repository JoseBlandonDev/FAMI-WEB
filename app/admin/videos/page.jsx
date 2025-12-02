"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Upload, Trash2, Plus, Save, ArrowLeft, Play, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

export default function AdminVideos() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const { data, error } = await supabase
        .from('videos')
        .select('*')
        .order('id', { ascending: true });
      if (error) throw error;
      setVideos(data || []);
    } catch (error) {
      console.error('Error fetching videos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (videoId, event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      const filename = `videos/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.]/g, '')}`;
      const { data, error } = await supabase.storage
        .from('hero-images')
        .upload(filename, file);

      if (error) throw error;

      const { data: { publicUrl } } = supabase.storage
        .from('hero-images')
        .getPublicUrl(filename);

      setVideos(videos.map(video =>
        video.id === videoId ? { ...video, thumbnail: publicUrl } : video
      ));
    } catch (error) {
      alert('Error al subir imagen: ' + error.message);
    }
  };

  const handleInputChange = (videoId, field, value) => {
    setVideos(videos.map(video =>
      video.id === videoId ? { ...video, [field]: value } : video
    ));
  };

  const addNewVideo = () => {
    const newVideo = {
      id: -Date.now(), // Negative ID for temporary local state
      title: "Nuevo video",
      description: "",
      thumbnail: "",
      video_url: "",
      featured: false,
      isNew: true
    };
    setVideos([...videos, newVideo]);
  };

  const deleteVideo = async (videoId) => {
    if (!confirm('¿Estás seguro de eliminar este video?')) return;
    
    const video = videos.find(v => v.id === videoId);
    if (video.isNew) {
      setVideos(videos.filter(v => v.id !== videoId));
      return;
    }

    try {
      const { error } = await supabase.from('videos').delete().eq('id', videoId);
      if (error) throw error;
      setVideos(videos.filter(v => v.id !== videoId));
    } catch (error) {
      alert('Error al eliminar: ' + error.message);
    }
  };

  const saveChanges = async () => {
    setSaving(true);
    try {
      // Split into new and existing items
      const newItems = videos.filter(v => v.isNew);
      const existingItems = videos.filter(v => !v.isNew);

      // 1. Handle NEW items (Insert)
      if (newItems.length > 0) {
        const itemsToInsert = newItems.map(v => ({
          title: v.title,
          description: v.description,
          thumbnail: v.thumbnail,
          video_url: v.video_url || v.videoUrl,
          featured: v.featured
        }));
        
        const { error: insertError } = await supabase
          .from('videos')
          .insert(itemsToInsert);
          
        if (insertError) throw insertError;
      }

      // 2. Handle EXISTING items (Update)
      // Since upsert can be tricky with partial updates without ID conflicts, 
      // we can use upsert if we are sure IDs exist, OR loop update.
      // Upsert is better for batching.
      if (existingItems.length > 0) {
        const itemsToUpdate = existingItems.map(v => ({
          id: v.id,
          title: v.title,
          description: v.description,
          thumbnail: v.thumbnail,
          video_url: v.video_url || v.videoUrl,
          featured: v.featured
        }));

        const { error: updateError } = await supabase
          .from('videos')
          .upsert(itemsToUpdate);
          
        if (updateError) throw updateError;
      }

      alert('Cambios guardados correctamente');
      await fetchVideos();
    } catch (error) {
      console.error('Error saving videos:', error);
      alert('Error al guardar: ' + error.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-8 text-center">Cargando videos...</div>;

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Link href="/admin" className="text-gray-500 hover:text-gray-700">
            <ArrowLeft size={24} />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Videos</h1>
            <p className="text-gray-600 text-sm">Administra los videos y sus miniaturas</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button
            onClick={addNewVideo}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Plus size={20} />
            Agregar Video
          </button>
          <button
            onClick={saveChanges}
            disabled={saving}
            className="flex items-center gap-2 px-4 py-2 bg-fami-blue text-white rounded-lg hover:bg-fami-blue/90 transition-colors disabled:opacity-50"
          >
            {saving ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
            Guardar Cambios
          </button>
        </div>
      </div>

      {/* Videos Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {videos.map((video) => (
          <div key={video.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-4 bg-gray-50 border-b flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="font-medium text-gray-700">{video.title}</span>
                {video.featured && (
                  <span className="px-2 py-1 bg-purple-500 text-white text-xs rounded-full">
                    Destacado
                  </span>
                )}
              </div>
              <button
                onClick={() => deleteVideo(video.id)}
                className="text-red-500 hover:text-red-700 p-2"
              >
                <Trash2 size={20} />
              </button>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Thumbnail Preview */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Miniatura
                  </label>
                  <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden border-2 border-dashed border-gray-300">
                    {video.thumbnail ? (
                      <Image
                        src={video.thumbnail}
                        alt={video.title}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-gray-400">Sin imagen</div>
                    )}
                    {/* Play icon overlay */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="w-12 h-12 rounded-full bg-white/80 flex items-center justify-center">
                        <Play size={20} className="text-fami-blue ml-1" fill="currentColor" />
                      </div>
                    </div>
                    <label className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer bg-black/50 opacity-0 hover:opacity-100 transition-opacity">
                      <Upload size={32} className="text-white mb-2" />
                      <span className="text-white text-sm">Cambiar miniatura</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleImageUpload(video.id, e)}
                      />
                    </label>
                  </div>
                </div>

                {/* Form Fields */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Título
                    </label>
                    <input
                      type="text"
                      value={video.title}
                      onChange={(e) => handleInputChange(video.id, 'title', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-fami-blue"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      URL del Video (YouTube)
                    </label>
                    <input
                      type="url"
                      value={video.video_url || video.videoUrl || ''}
                      onChange={(e) => handleInputChange(video.id, 'video_url', e.target.value)}
                      placeholder="https://www.youtube.com/watch?v=..."
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-fami-blue"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Descripción (opcional)
                    </label>
                    <textarea
                      value={video.description}
                      onChange={(e) => handleInputChange(video.id, 'description', e.target.value)}
                      rows={2}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-fami-blue resize-none"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id={`featured-${video.id}`}
                      checked={video.featured}
                      onChange={(e) => handleInputChange(video.id, 'featured', e.target.checked)}
                      className="w-4 h-4 text-fami-blue focus:ring-fami-blue border-gray-300 rounded"
                    />
                    <label htmlFor={`featured-${video.id}`} className="text-sm text-gray-700">
                      Marcar como video destacado
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {videos.length === 0 && (
        <div className="bg-white rounded-xl p-12 text-center">
          <p className="text-gray-500 mb-4">No hay videos configurados</p>
          <button
            onClick={addNewVideo}
            className="inline-flex items-center gap-2 px-4 py-2 bg-fami-blue text-white rounded-lg hover:bg-fami-blue/90 transition-colors"
          >
            <Plus size={20} />
            Agregar primer video
          </button>
        </div>
      )}
    </div>
  );
}
