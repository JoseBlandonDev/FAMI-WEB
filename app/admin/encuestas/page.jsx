"use client";

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Trash2, Star, Mail, User, Phone, Calendar, Loader2, ChevronDown, ChevronUp, CheckCircle, Clock, MapPin, Smile, Share2, ThumbsUp } from 'lucide-react';

export default function AdminEncuestas() {
  const [surveys, setSurveys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);
  const [expandedComments, setExpandedComments] = useState({});

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

  const toggleExpand = (id) => {
    setExpandedComments(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
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

  const StarRating = ({ value, label, icon: Icon }) => (
    <div className="flex flex-col gap-1 p-3 bg-gray-50 rounded-lg">
      <div className="flex items-center gap-2 text-sm font-medium text-gray-600 mb-1">
        {Icon && <Icon size={14} className="text-fami-blue" />}
        {label}
      </div>
      <div className="flex items-center gap-2">
        <div className="flex">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star 
              key={star} 
              size={14} 
              className={star <= value ? "text-yellow-400 fill-current" : "text-gray-300"} 
            />
          ))}
        </div>
        <span className="font-bold text-gray-700 text-sm">{value || 0}/5</span>
      </div>
    </div>
  );

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
        <div className="grid grid-cols-1 gap-8">
          {surveys.map((survey) => {
            const isExpanded = expandedComments[survey.id];
            const suggestions = survey.sugerencias || survey.comentario || "Sin sugerencias"; // Fallback for old data
            const isLongSuggestion = suggestions.length > 150;
            const displaySuggestion = isExpanded ? suggestions : (isLongSuggestion ? `${suggestions.substring(0, 150)}...` : suggestions);

            return (
              <div key={survey.id} className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow overflow-hidden">
                {/* Header Section */}
                <div className="bg-gray-50 p-4 border-b border-gray-100 flex flex-wrap gap-4 justify-between items-center">
                   <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Calendar size={16} />
                      {formatDate(survey.created_at)}
                   </div>
                   <button
                      onClick={() => handleDelete(survey.id)}
                      disabled={deleting === survey.id}
                      className="text-red-500 hover:text-red-700 text-sm font-medium flex items-center gap-1 transition-colors"
                    >
                      {deleting === survey.id ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
                      Eliminar
                    </button>
                </div>

                <div className="p-6">
                  {/* Contact Info */}
                  <div className="flex flex-wrap gap-6 mb-6 pb-6 border-b border-gray-100">
                    <div className="flex items-center gap-2 text-gray-700">
                      <User size={18} className="text-fami-blue" />
                      <span className="font-medium">{survey.nombre || 'Anónimo'}</span>
                    </div>
                    {survey.celular && (
                      <div className="flex items-center gap-2 text-gray-600">
                        <Phone size={18} className="text-fami-blue" />
                        <span>{survey.celular}</span>
                      </div>
                    )}
                    {survey.email && (
                      <div className="flex items-center gap-2 text-gray-600">
                         <Mail size={18} className="text-fami-blue" />
                         <span>{survey.email}</span>
                      </div>
                    )}
                  </div>

                  {/* Ratings Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <StarRating value={survey.calificacion_atencion || survey.calificacion} label="Atención Médica" icon={User} />
                    <StarRating value={survey.calificacion_empatia} label="Empatía Personal" icon={Smile} />
                    <StarRating value={survey.calificacion_agendamiento} label="Agendamiento" icon={Clock} />
                    <StarRating value={survey.calificacion_ubicacion} label="Ubicación" icon={MapPin} />
                    <StarRating value={survey.calificacion_limpieza} label="Limpieza" icon={CheckCircle} />
                    <StarRating value={survey.calificacion_sala_espera} label="Sala de Espera" icon={Clock} />
                    <StarRating value={survey.recomendacion} label="Recomendación" icon={ThumbsUp} />
                  </div>

                  {/* Text Answers Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                     <div className="p-4 bg-blue-50/50 rounded-lg">
                        <span className="block text-xs font-bold text-fami-blue uppercase tracking-wider mb-1">Explicación Clara</span>
                        <p className="font-semibold text-gray-800">{survey.claridad_informacion || 'N/A'}</p>
                     </div>
                     <div className="p-4 bg-blue-50/50 rounded-lg">
                        <span className="block text-xs font-bold text-fami-blue uppercase tracking-wider mb-1">Tiempo de Espera</span>
                        <p className="font-semibold text-gray-800">{survey.tiempo_espera || 'N/A'}</p>
                     </div>
                     <div className="p-4 bg-blue-50/50 rounded-lg">
                        <span className="block text-xs font-bold text-fami-blue uppercase tracking-wider mb-1">Red Social Favorita</span>
                        <div className="flex items-center gap-2">
                           <Share2 size={16} className="text-fami-blue" />
                           <p className="font-semibold text-gray-800">{survey.red_social || 'N/A'}</p>
                        </div>
                     </div>
                  </div>

                  {/* Suggestions Section */}
                  <div className="bg-gray-50 rounded-lg border border-gray-100">
                     <div className="p-4">
                        <h4 className="text-sm font-bold text-gray-700 mb-2">Sugerencias / Comentarios:</h4>
                        <p className="italic text-gray-600 whitespace-pre-wrap break-words">
                           "{displaySuggestion}"
                        </p>
                     </div>
                     {isLongSuggestion && (
                       <button 
                          onClick={() => toggleExpand(survey.id)}
                          className="w-full p-2 text-xs text-fami-blue font-bold uppercase tracking-wider border-t border-gray-100 hover:bg-blue-50 transition-colors flex items-center justify-center gap-1 rounded-b-lg"
                       >
                          {isExpanded ? (
                            <>Ver menos <ChevronUp size={14} /></>
                          ) : (
                            <>Ver más <ChevronDown size={14} /></>
                          )}
                       </button>
                     )}
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
