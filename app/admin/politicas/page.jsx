"use client";

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { ScrollText, Edit, Eye, Save, X } from 'lucide-react';
import dynamic from 'next/dynamic';

const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });
import 'react-quill-new/dist/quill.snow.css';

const quillModules = {
  toolbar: [
    [{ 'header': [1, 2, 3, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    ['link'],
    ['clean']
  ],
};

export default function PoliticasAdmin() {
  const [politicas, setPoliticas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editContent, setEditContent] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchPoliticas();
  }, []);

  async function fetchPoliticas() {
    const { data, error } = await supabase
      .from('politicas')
      .select('*')
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Error fetching politicas:', error);
    } else {
      setPoliticas(data || []);
    }
    setLoading(false);
  }

  function handleEdit(politica) {
    setEditingId(politica.id);
    setEditContent(politica.contenido);
  }

  function handleCancel() {
    setEditingId(null);
    setEditContent('');
  }

  async function handleSave(politica) {
    setSaving(true);
    const { error } = await supabase
      .from('politicas')
      .update({
        contenido: editContent,
        updated_at: new Date().toISOString()
      })
      .eq('id', politica.id);

    if (error) {
      console.error('Error saving:', error);
      alert('Error al guardar');
    } else {
      await fetchPoliticas();
      setEditingId(null);
      setEditContent('');
    }
    setSaving(false);
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-fami-blue/30 border-t-fami-blue rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Políticas</h1>
          <p className="text-gray-500 mt-1">Gestiona los textos legales del sitio web</p>
        </div>
      </div>

      {/* Lista de políticas */}
      <div className="space-y-4">
        {politicas.map((politica) => (
          <div key={politica.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-fami-primary rounded-lg flex items-center justify-center">
                  <ScrollText size={20} className="text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{politica.titulo}</h3>
                  <p className="text-sm text-gray-500">/{politica.slug}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={`/politicas/${politica.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-gray-400 hover:text-fami-blue hover:bg-gray-100 rounded-lg transition-colors"
                  title="Ver página"
                >
                  <Eye size={20} />
                </a>
                {editingId !== politica.id && (
                  <button
                    onClick={() => handleEdit(politica)}
                    className="p-2 text-gray-400 hover:text-fami-blue hover:bg-gray-100 rounded-lg transition-colors"
                    title="Editar"
                  >
                    <Edit size={20} />
                  </button>
                )}
              </div>
            </div>

            {editingId === politica.id ? (
              <div className="p-4 space-y-4">
                <ReactQuill
                  theme="snow"
                  value={editContent}
                  onChange={setEditContent}
                  modules={quillModules}
                  className="bg-white"
                  style={{ minHeight: '300px' }}
                />
                <div className="flex justify-end gap-2 pt-4">
                  <button
                    onClick={handleCancel}
                    className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors flex items-center gap-2"
                  >
                    <X size={18} />
                    Cancelar
                  </button>
                  <button
                    onClick={() => handleSave(politica)}
                    disabled={saving}
                    className="px-4 py-2 bg-fami-primary text-white rounded-lg hover:bg-fami-secondary transition-colors flex items-center gap-2 disabled:opacity-50"
                  >
                    <Save size={18} />
                    {saving ? 'Guardando...' : 'Guardar'}
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-4">
                <div
                  className="prose-content text-gray-600 text-sm line-clamp-3"
                  dangerouslySetInnerHTML={{ __html: politica.contenido }}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
