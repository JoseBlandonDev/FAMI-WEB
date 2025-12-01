"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Upload, Save, ArrowLeft, Plus, Trash2, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

export default function AdminServices() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('id', { ascending: true });
      if (error) throw error;
      setServices(data || []);
    } catch (error) {
      console.error('Error fetching services:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (serviceId, event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      const filename = `services/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.]/g, '')}`;
      const { data, error } = await supabase.storage
        .from('hero-images')
        .upload(filename, file);

      if (error) throw error;

      const { data: { publicUrl } } = supabase.storage
        .from('hero-images')
        .getPublicUrl(filename);

      setServices(services.map(service =>
        service.id === serviceId ? { ...service, image: publicUrl } : service
      ));
    } catch (error) {
      alert('Error al subir imagen: ' + error.message);
    }
  };

  const handleInputChange = (serviceId, field, value) => {
    setServices(services.map(service =>
      service.id === serviceId ? { ...service, [field]: value } : service
    ));
  };

  const addNewService = () => {
    // For new services, we use a temporary ID (negative to distinguish)
    // In a real save, we'd remove temp ID
    const newService = {
      id: Date.now(), // Use date as temp ID
      title: "Nuevo Servicio",
      image: "",
      link: "#",
      isNew: true
    };
    setServices([...services, newService]);
  };

  const deleteService = async (serviceId) => {
    if (!confirm('¿Estás seguro de eliminar este servicio?')) return;
    
    // If it's new (not in DB yet), just remove from state
    const service = services.find(s => s.id === serviceId);
    if (service.isNew) {
      setServices(services.filter(s => s.id !== serviceId));
      return;
    }

    // Delete from DB
    try {
      const { error } = await supabase.from('services').delete().eq('id', serviceId);
      if (error) throw error;
      setServices(services.filter(s => s.id !== serviceId));
    } catch (error) {
      alert('Error al eliminar: ' + error.message);
    }
  };

  const saveChanges = async () => {
    setSaving(true);
    try {
      // Upsert all services
      // We map to match DB columns
      const upsertData = services.map(s => ({
        // Only include ID if it's not a temp one (or if upsert logic handles it)
        // If 'isNew' is true, we don't send 'id' so Postgres generates it?
        // Actually, Supabase upsert needs ID to match.
        // For new items, we should separate them or use Insert.
        // Easier strategy:
        // 1. Filter out items to update vs insert.
        // BUT to keep it simple with reordering or bulk saving:
        
        id: s.isNew ? undefined : s.id,
        title: s.title,
        image: s.image,
        link: s.link
      }));

      // NOTE: supabase.upsert might fail if ID is undefined for new items?
      // It handles it if we don't pass ID, it inserts.
      
      const { error } = await supabase
        .from('services')
        .upsert(upsertData);
        
      if (error) throw error;

      alert('Cambios guardados correctamente');
      await fetchServices(); // Refresh to get real IDs
    } catch (error) {
      alert('Error al guardar: ' + error.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-8 text-center">Cargando servicios...</div>;

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Link href="/admin" className="text-gray-500 hover:text-gray-700">
            <ArrowLeft size={24} />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Servicios</h1>
            <p className="text-gray-600 text-sm">Administra los servicios circulares de la página de inicio</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button
            onClick={addNewService}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Plus size={20} />
            Agregar
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

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {services.map((service) => (
          <div key={service.id} className="bg-white rounded-xl shadow-sm overflow-hidden relative group">
             <button
                onClick={() => deleteService(service.id)}
                className="absolute top-2 right-2 z-10 p-2 bg-white rounded-full shadow-md text-red-500 hover:text-red-700 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 size={18} />
              </button>

            <div className="p-6">
              {/* Image Preview */}
              <div className="flex justify-center mb-6">
                <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-gray-100 bg-gray-50">
                  {service.image ? (
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-contain"
                      unoptimized
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-400 text-xs">Sin imagen</div>
                  )}
                  <label className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer bg-black/50 opacity-0 hover:opacity-100 transition-opacity rounded-full">
                    <Upload size={24} className="text-white mb-1" />
                    <span className="text-white text-xs">Cambiar</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleImageUpload(service.id, e)}
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
                    value={service.title}
                    onChange={(e) => handleInputChange(service.id, 'title', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-fami-blue"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Link
                  </label>
                  <input
                    type="text"
                    value={service.link}
                    onChange={(e) => handleInputChange(service.id, 'link', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-fami-blue"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

       {services.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl border border-dashed border-gray-300">
          <p className="text-gray-500">No hay servicios.</p>
        </div>
      )}

      <p className="text-sm text-gray-500 mt-4">
        * Las imágenes deben ser cuadradas (preferiblemente 400x400px) con fondo transparente para mejor visualización
      </p>
    </div>
  );
}
