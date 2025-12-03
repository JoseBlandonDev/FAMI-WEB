"use client";

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Trash2, Star, Mail, User, Calendar, Loader2 } from 'lucide-react';

export default function AdminEncuestas() {
  const [surveys, setSurveys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);

  const fetchSurveys = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('encuestas')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSurveys(data || []);
    } catch (error) {
      console.error('Error fetching surveys:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSurveys();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('¿Estás seguro de que quieres eliminar esta encuesta?')) return;

    try {
      setDeleting(id);
      const { error } = await supabase
        .from('encuestas')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      setSurveys(surveys.filter(s => s.id !== id));
    } catch (error) {
      console.error('Error deleting survey:', error);
      alert('Error al eliminar la encuesta');
    } finally {
      setDeleting(null);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-CO', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-fami-blue">Encuestas de Satisfacción</h1>
        <div className="bg-blue-50 text-fami-blue px-4 py-2 rounded-lg font-medium">
          Total: {surveys.length}
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="w-10 h-10 text-fami-blue animate-spin" />
        </div>
      ) : surveys.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-xl border border-gray-200">
          <p className="text-gray-500 text-lg">No hay encuestas recibidas aún.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {surveys.map((survey) => (
            <div key={survey.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="flex flex-col md:flex-row justify-between gap-4">
                {/* Info Principal */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2 text-sm text-gray-500">
                    <Calendar size={14} />
                    {formatDate(survey.created_at)}
                  </div>
                  
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star 
                          key={star} 
                          size={20} 
                          className={star <= survey.calificacion ? "text-yellow-400 fill-current" : "text-gray-300"} 
                        />
                      ))}
                    </div>
                    <span className="font-bold text-gray-700">{survey.calificacion}/5</span>
                  </div>

                  <div className="mb-4 p-4 bg-gray-50 rounded-lg border border-gray-100 italic text-gray-700">
                    "{survey.comentario}"
                  </div>

                  <div className="flex flex-wrap gap-4 text-sm">
                    {survey.nombre && (
                      <div className="flex items-center gap-2 text-gray-600">
                        <User size={16} className="text-fami-blue" />
                        {survey.nombre}
                      </div>
                    )}
                    {survey.email && (
                      <div className="flex items-center gap-2 text-gray-600">
                        <Mail size={16} className="text-fami-blue" />
                        {survey.email}
                      </div>
                    )}
                    {!survey.nombre && !survey.email && (
                      <span className="text-gray-400 italic">Anónimo</span>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-start">
                  <button
                    onClick={() => handleDelete(survey.id)}
                    disabled={deleting === survey.id}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    title="Eliminar encuesta"
                  >
                    {deleting === survey.id ? (
                      <Loader2 size={20} className="animate-spin" />
                    ) : (
                      <Trash2 size={20} />
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

