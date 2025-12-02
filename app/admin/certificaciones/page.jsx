"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Upload, Trash2, Plus, Save, ArrowLeft, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

export default function AdminCertifications() {
  const [certifications, setCertifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchCertifications();
  }, []);

  const fetchCertifications = async () => {
    try {
      const { data, error } = await supabase
        .from('certifications')
        .select('*')
        .order('id', { ascending: true });
      if (error) throw error;
      setCertifications(data || []);
    } catch (error) {
      console.error('Error fetching certifications:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (certId, event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      const filename = `certifications/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.]/g, '')}`;
      const { data, error } = await supabase.storage
        .from('hero-images')
        .upload(filename, file);

      if (error) throw error;

      const { data: { publicUrl } } = supabase.storage
        .from('hero-images')
        .getPublicUrl(filename);

      setCertifications(certifications.map(cert =>
        cert.id === certId ? { ...cert, image: publicUrl } : cert
      ));
    } catch (error) {
      alert('Error al subir imagen: ' + error.message);
    }
  };

  const handleInputChange = (certId, value) => {
    setCertifications(certifications.map(cert =>
      cert.id === certId ? { ...cert, name: value } : cert
    ));
  };

  const addNewCertification = () => {
    const newCert = {
      id: -Date.now(), // Negative ID for temporary local state
      name: "Nueva certificación",
      image: "",
      isNew: true
    };
    setCertifications([...certifications, newCert]);
  };

  const deleteCertification = async (certId) => {
    if (!confirm('¿Estás seguro de eliminar esta certificación?')) return;
    
    const cert = certifications.find(c => c.id === certId);
    if (cert.isNew) {
      setCertifications(certifications.filter(c => c.id !== certId));
      return;
    }

    try {
      const { error } = await supabase.from('certifications').delete().eq('id', certId);
      if (error) throw error;
      setCertifications(certifications.filter(c => c.id !== certId));
    } catch (error) {
      alert('Error al eliminar: ' + error.message);
    }
  };

  const saveChanges = async () => {
    setSaving(true);
    try {
      // Split into new and existing items
      const newItems = certifications.filter(c => c.isNew);
      const existingItems = certifications.filter(c => !c.isNew);

      // 1. Handle NEW items (Insert)
      if (newItems.length > 0) {
        const itemsToInsert = newItems.map(c => ({
          name: c.name,
          image: c.image
        }));
        
        const { error: insertError } = await supabase
          .from('certifications')
          .insert(itemsToInsert);
          
        if (insertError) throw insertError;
      }

      // 2. Handle EXISTING items (Update)
      if (existingItems.length > 0) {
        const itemsToUpdate = existingItems.map(c => ({
          id: c.id,
          name: c.name,
          image: c.image
        }));
        
        const { error: updateError } = await supabase
          .from('certifications')
          .upsert(itemsToUpdate);
          
        if (updateError) throw updateError;
      }

      alert('Cambios guardados correctamente');
      await fetchCertifications();
    } catch (error) {
      console.error('Error saving certifications:', error);
      alert('Error al guardar: ' + error.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-8 text-center">Cargando certificaciones...</div>;

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Link href="/admin" className="text-gray-500 hover:text-gray-700">
            <ArrowLeft size={24} />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Certificaciones</h1>
            <p className="text-gray-600 text-sm">Administra las imágenes de certificados y reconocimientos</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button
            onClick={addNewCertification}
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

      {/* Certifications Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certifications.map((cert) => (
          <div key={cert.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-4 bg-gray-50 border-b flex items-center justify-between">
              <span className="font-medium text-gray-700">Certificación</span>
              <button
                onClick={() => deleteCertification(cert.id)}
                className="text-red-500 hover:text-red-700 p-1"
              >
                <Trash2 size={18} />
              </button>
            </div>

            <div className="p-6">
              {/* Image Preview */}
              <div className="relative aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden border-2 border-dashed border-gray-300 mb-4">
                {cert.image && (
                  <Image
                    src={cert.image}
                    alt={cert.name}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                )}
                <label className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer bg-black/50 opacity-0 hover:opacity-100 transition-opacity">
                  <Upload size={32} className="text-white mb-2" />
                  <span className="text-white text-sm">Cambiar imagen</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleImageUpload(cert.id, e)}
                  />
                </label>
              </div>

              {/* Name Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre del reconocimiento
                </label>
                <input
                  type="text"
                  value={cert.name}
                  onChange={(e) => handleInputChange(cert.id, e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-fami-blue"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {certifications.length === 0 && (
        <div className="bg-white rounded-xl p-12 text-center">
          <p className="text-gray-500 mb-4">No hay certificaciones configuradas</p>
          <button
            onClick={addNewCertification}
            className="inline-flex items-center gap-2 px-4 py-2 bg-fami-blue text-white rounded-lg hover:bg-fami-blue/90 transition-colors"
          >
            <Plus size={20} />
            Agregar primera certificación
          </button>
        </div>
      )}
    </div>
  );
}
