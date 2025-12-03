"use client";

import React, { useState } from 'react';
import { supabase } from '@/lib/supabase';
import Button from '@/components/ui/Button';
import { Star, Send, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function EncuestaPage() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    calificacion: 5,
    comentario: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRating = (rating) => {
    setFormData(prev => ({ ...prev, calificacion: rating }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase
        .from('encuestas')
        .insert([
          {
            nombre: formData.nombre,
            email: formData.email,
            calificacion: formData.calificacion,
            comentario: formData.comentario
          }
        ]);

      if (error) throw error;

      setSubmitted(true);
    } catch (err) {
      console.error('Error enviando encuesta:', err);
      setError('Hubo un error al enviar la encuesta. Por favor intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={40} className="text-green-500" />
          </div>
          <h2 className="text-2xl font-bold text-fami-blue mb-4">¡Gracias por tu opinión!</h2>
          <p className="text-gray-600 mb-8">
            Tu respuesta ha sido registrada exitosamente. Escucharte nos ayuda a seguir creciendo y mejorando para ti.
          </p>
          <Link href="/" className="inline-block px-8 py-3 bg-fami-blue text-white rounded-lg font-medium hover:bg-fami-blue/90 transition-colors">
            Volver al Inicio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="bg-fami-blue py-8 px-8 text-center">
          <h1 className="text-3xl font-bold text-white mb-2">Encuesta de Servicio</h1>
          <p className="text-white/80">Tu opinión es muy importante para nosotros</p>
        </div>

        <div className="p-8 md:p-12">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Rating */}
            <div className="text-center mb-8">
              <label className="block text-gray-700 font-medium mb-4">¿Cómo calificarías nuestro servicio?</label>
              <div className="flex justify-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => handleRating(star)}
                    className={`p-2 transition-all hover:scale-110 ${formData.calificacion >= star ? 'text-yellow-400' : 'text-gray-300'}`}
                  >
                    <Star size={40} fill={formData.calificacion >= star ? "currentColor" : "none"} />
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-1">Nombre (Opcional)</label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fami-blue focus:border-transparent outline-none transition-all"
                  placeholder="Tu nombre"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Correo Electrónico (Opcional)</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fami-blue focus:border-transparent outline-none transition-all"
                  placeholder="tu@correo.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="comentario" className="block text-sm font-medium text-gray-700 mb-1">Comentarios o Sugerencias</label>
              <textarea
                id="comentario"
                name="comentario"
                value={formData.comentario}
                onChange={handleChange}
                rows="4"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fami-blue focus:border-transparent outline-none transition-all resize-none"
                placeholder="Cuéntanos tu experiencia..."
              ></textarea>
            </div>

            {error && (
              <div className="p-4 bg-red-50 text-red-600 text-sm rounded-lg">
                {error}
              </div>
            )}

            <div className="pt-4">
              <Button
                type="submit"
                variant="primary"
                className="w-full py-4 text-lg font-bold shadow-lg hover:shadow-xl"
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    Enviando...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    Enviar Encuesta <Send size={20} />
                  </span>
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

