"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { Upload, Trash2, Plus, Save, ArrowLeft, Play } from 'lucide-react';
import Link from 'next/link';

const initialVideos = [
  {
    id: 1,
    title: "FAMI en Video",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    thumbnail: "/images/videos/featured-video.jpg",
    videoUrl: "https://www.youtube.com/watch?v=example",
    featured: true
  },
  {
    id: 2,
    title: "Lorem Ipsum Dolor",
    description: "",
    thumbnail: "/images/videos/video-1.jpg",
    videoUrl: "https://www.youtube.com/watch?v=example",
    featured: false
  },
  {
    id: 3,
    title: "Lorem Ipsum Dolor",
    description: "",
    thumbnail: "/images/videos/video-2.jpg",
    videoUrl: "https://www.youtube.com/watch?v=example",
    featured: false
  },
  {
    id: 4,
    title: "Lorem Ipsum Dolor",
    description: "",
    thumbnail: "/images/videos/video-3.jpg",
    videoUrl: "https://www.youtube.com/watch?v=example",
    featured: false
  }
];

export default function AdminVideos() {
  const [videos, setVideos] = useState(initialVideos);

  const handleImageUpload = (videoId, event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setVideos(videos.map(video =>
          video.id === videoId ? { ...video, thumbnail: reader.result } : video
        ));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (videoId, field, value) => {
    setVideos(videos.map(video =>
      video.id === videoId ? { ...video, [field]: value } : video
    ));
  };

  const addNewVideo = () => {
    const newVideo = {
      id: Date.now(),
      title: "Nuevo video",
      description: "",
      thumbnail: "/images/videos/placeholder.jpg",
      videoUrl: "",
      featured: false
    };
    setVideos([...videos, newVideo]);
  };

  const deleteVideo = (videoId) => {
    if (confirm('¿Estás seguro de eliminar este video?')) {
      setVideos(videos.filter(video => video.id !== videoId));
    }
  };

  const saveChanges = () => {
    alert('Cambios guardados correctamente');
    console.log('Saving videos:', videos);
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
            className="flex items-center gap-2 px-4 py-2 bg-fami-blue text-white rounded-lg hover:bg-fami-blue/90 transition-colors"
          >
            <Save size={20} />
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
                    {video.thumbnail && (
                      <Image
                        src={video.thumbnail}
                        alt={video.title}
                        fill
                        className="object-cover"
                      />
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
                      value={video.videoUrl}
                      onChange={(e) => handleInputChange(video.id, 'videoUrl', e.target.value)}
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
                      Marcar como video destacado (aparece más grande)
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
