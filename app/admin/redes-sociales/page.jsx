"use client";

import React, { useState, useEffect } from 'react';
import { Save, Loader2, Facebook, Twitter, Instagram, Linkedin, Youtube, Globe, MessageCircle } from 'lucide-react';
import { supabase } from '@/lib/supabase';

const socialNetworks = [
  { key: 'facebook', name: 'Facebook', icon: Facebook, placeholder: 'https://facebook.com/tu-pagina', color: 'bg-blue-600' },
  { key: 'twitter', name: 'Twitter / X', icon: Twitter, placeholder: 'https://twitter.com/tu-usuario', color: 'bg-gray-800' },
  { key: 'instagram', name: 'Instagram', icon: Instagram, placeholder: 'https://instagram.com/tu-usuario', color: 'bg-pink-600' },
  { key: 'linkedin', name: 'LinkedIn', icon: Linkedin, placeholder: 'https://linkedin.com/company/tu-empresa', color: 'bg-blue-700' },
  { key: 'youtube', name: 'YouTube', icon: Youtube, placeholder: 'https://youtube.com/@tu-canal', color: 'bg-red-600' },
  { key: 'whatsapp', name: 'WhatsApp', icon: MessageCircle, placeholder: 'https://wa.me/573001234567', color: 'bg-green-500' },
  { key: 'tiktok', name: 'TikTok', icon: Globe, placeholder: 'https://tiktok.com/@tu-usuario', color: 'bg-black' },
  { key: 'website', name: 'Sitio Web', icon: Globe, placeholder: 'https://tu-sitio-web.com', color: 'bg-fami-blue' },
];

export default function AdminRedesSociales() {
  const [socialLinks, setSocialLinks] = useState({
    facebook: '',
    twitter: '',
    instagram: '',
    linkedin: '',
    youtube: '',
    whatsapp: '',
    tiktok: '',
    website: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    fetchSocialLinks();
  }, []);

  const fetchSocialLinks = async () => {
    try {
      const { data, error } = await supabase
        .from('social_media')
        .select('*')
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      if (data) {
        setSocialLinks({
          facebook: data.facebook || '',
          twitter: data.twitter || '',
          instagram: data.instagram || '',
          linkedin: data.linkedin || '',
          youtube: data.youtube || '',
          whatsapp: data.whatsapp || '',
          tiktok: data.tiktok || '',
          website: data.website || '',
        });
      }
    } catch (error) {
      console.error('Error fetching social links:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage({ type: '', text: '' });

    try {
      // First check if record exists
      const { data: existing } = await supabase
        .from('social_media')
        .select('id')
        .single();

      if (existing) {
        // Update existing record
        const { error } = await supabase
          .from('social_media')
          .update(socialLinks)
          .eq('id', existing.id);

        if (error) throw error;
      } else {
        // Insert new record
        const { error } = await supabase
          .from('social_media')
          .insert([socialLinks]);

        if (error) throw error;
      }

      setMessage({ type: 'success', text: 'Redes sociales guardadas correctamente' });
    } catch (error) {
      console.error('Error saving social links:', error);
      setMessage({ type: 'error', text: 'Error al guardar: ' + error.message });
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (key, value) => {
    setSocialLinks(prev => ({ ...prev, [key]: value }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="animate-spin text-fami-blue" size={32} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Redes Sociales</h1>
          <p className="text-gray-500 mt-1">Configura los enlaces a tus redes sociales</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-4 py-2 bg-fami-blue text-white rounded-lg hover:bg-fami-blue/90 transition-colors disabled:opacity-50"
        >
          {saving ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
          Guardar Cambios
        </button>
      </div>

      {/* Message */}
      {message.text && (
        <div className={`p-4 rounded-lg ${
          message.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'
        }`}>
          {message.text}
        </div>
      )}

      {/* Social Links Form */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {socialNetworks.map((network) => {
            const Icon = network.icon;
            return (
              <div key={network.key} className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <span className={`p-1.5 rounded ${network.color} text-white`}>
                    <Icon size={16} />
                  </span>
                  {network.name}
                </label>
                <input
                  type="url"
                  value={socialLinks[network.key]}
                  onChange={(e) => handleChange(network.key, e.target.value)}
                  placeholder={network.placeholder}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-fami-blue focus:border-transparent"
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Preview */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Vista previa</h3>
        <p className="text-sm text-gray-500 mb-4">Así se verán los iconos de redes sociales en tu sitio:</p>

        <div className="flex flex-wrap gap-3">
          {socialNetworks.map((network) => {
            const Icon = network.icon;
            const hasLink = socialLinks[network.key];

            return (
              <a
                key={network.key}
                href={hasLink || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-3 rounded-full transition-all ${
                  hasLink
                    ? `${network.color} text-white hover:opacity-80`
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
                title={hasLink ? network.name : `${network.name} (sin configurar)`}
                onClick={(e) => !hasLink && e.preventDefault()}
              >
                <Icon size={20} />
              </a>
            );
          })}
        </div>

        {!Object.values(socialLinks).some(link => link) && (
          <p className="text-sm text-gray-400 mt-4">
            Agrega enlaces a tus redes sociales para ver la vista previa
          </p>
        )}
      </div>

      {/* Instructions */}
      <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">Instrucciones</h3>
        <ul className="text-sm text-blue-700 space-y-2">
          <li>• Ingresa la URL completa de cada red social (incluyendo https://)</li>
          <li>• Para WhatsApp, usa el formato: https://wa.me/NUMERO (ej: https://wa.me/573001234567)</li>
          <li>• Deja vacío cualquier campo que no desees mostrar</li>
          <li>• Los cambios se aplicarán inmediatamente en todo el sitio web</li>
        </ul>
      </div>
    </div>
  );
}
