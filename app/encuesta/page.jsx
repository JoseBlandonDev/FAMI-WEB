"use client";

import React, { useState } from 'react';
import { supabase } from '@/lib/supabase';
import Button from '@/components/ui/Button';
import { Star, Send, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function EncuestaPage() {
  const [formData, setFormData] = useState({
    nombre: '',
    celular: '',
    email: '',
    calificacion_atencion: 5,
    calificacion_empatia: 5,
    claridad_informacion: 'Sí',
    calificacion_agendamiento: 5,
    tiempo_espera: '10 a 30 minutos',
    calificacion_ubicacion: 5,
    calificacion_limpieza: 5,
    calificacion_sala_espera: 5,
    red_social: 'Pagina Web',
    recomendacion: 5,
    sugerencias: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRating = (name, rating) => {
    setFormData(prev => ({ ...prev, [name]: rating }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase
        .from('encuestas')
        .insert([formData]);

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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
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

  const RatingField = ({ label, name, value }) => (
    <div className="mb-8 p-6 bg-gray-50 rounded-xl border border-gray-100">
      <label className="block text-gray-800 font-bold mb-4 text-lg">{label} <span className="text-red-500">*</span></label>
      <div className="flex flex-wrap gap-2 md:gap-4 justify-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => handleRating(name, star)}
            className={`p-2 transition-all hover:scale-110 flex flex-col items-center gap-1 ${value >= star ? 'text-yellow-400' : 'text-gray-300'}`}
          >
            <Star size={36} fill={value >= star ? "currentColor" : "none"} />
            <span className="text-sm font-medium text-gray-500">{star}</span>
          </button>
        ))}
      </div>
      <div className="flex justify-between px-4 mt-2 text-xs text-gray-400 font-medium uppercase tracking-wide">
        <span>Insatisfecho</span>
        <span>Muy Satisfecho</span>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="bg-fami-blue py-8 px-8 text-center">
          <h1 className="text-3xl font-bold text-white mb-2">Encuesta de Satisfacción</h1>
          <p className="text-white/80">Ayúdanos a mejorar tu experiencia</p>
        </div>

        <div className="p-6 md:p-12">
          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* Contact Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-blue-50/50 p-6 rounded-xl border border-blue-100">
              <div className="md:col-span-2">
                <h3 className="text-lg font-bold text-fami-blue mb-4 flex items-center gap-2">
                  Información de Contacto
                </h3>
              </div>
              <div className="md:col-span-2">
                <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-1">Nombre Completo</label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fami-blue focus:border-transparent outline-none transition-all"
                  placeholder="Tu nombre completo"
                />
              </div>
              <div>
                <label htmlFor="celular" className="block text-sm font-medium text-gray-700 mb-1">N° De celular</label>
                <input
                  type="tel"
                  id="celular"
                  name="celular"
                  value={formData.celular}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fami-blue focus:border-transparent outline-none transition-all"
                  placeholder="Ej: 3001234567"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Correo electrónico</label>
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

            <hr className="border-gray-100" />

            {/* Questions */}
            
            {/* 1 */}
            <RatingField 
              label="1. ¿Qué tan satisfecho/a está con el nivel de atención médica que recibió?"
              name="calificacion_atencion"
              value={formData.calificacion_atencion}
            />

            {/* 2 */}
            <RatingField 
              label="2. ¿Cómo calificaría la empatía del personal con sus necesidades?"
              name="calificacion_empatia"
              value={formData.calificacion_empatia}
            />

            {/* 3 */}
            <div className="mb-8 p-6 bg-gray-50 rounded-xl border border-gray-100">
              <label className="block text-gray-800 font-bold mb-4 text-lg">3. ¿Considera que el personal le explicó claramente sus exámenes y tratamientos? <span className="text-red-500">*</span></label>
              <div className="flex gap-6">
                {['Sí', 'No'].map((option) => (
                  <label key={option} className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="radio"
                      name="claridad_informacion"
                      value={option}
                      checked={formData.claridad_informacion === option}
                      onChange={handleChange}
                      className="w-5 h-5 text-fami-blue focus:ring-fami-blue border-gray-300"
                    />
                    <span className="text-lg text-gray-700 group-hover:text-fami-blue transition-colors">{option}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* 4 */}
            <RatingField 
              label="4. ¿Qué tan satisfecho/a está con el proceso para agendar la cita?"
              name="calificacion_agendamiento"
              value={formData.calificacion_agendamiento}
            />

            {/* 5 */}
            <div className="mb-8 p-6 bg-gray-50 rounded-xl border border-gray-100">
              <label className="block text-gray-800 font-bold mb-4 text-lg">5. ¿Cuánto tiempo tuvo que esperar después de su hora de cita para ser atendido/a por el médico? <span className="text-red-500">*</span></label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {['10 a 30 minutos', '30 a 1 hora', '1 a 2 horas', '3 horas o mas'].map((option) => (
                  <label key={option} className="flex items-center gap-3 cursor-pointer p-3 rounded-lg border border-transparent hover:bg-white hover:border-gray-200 transition-all">
                    <input
                      type="radio"
                      name="tiempo_espera"
                      value={option}
                      checked={formData.tiempo_espera === option}
                      onChange={handleChange}
                      className="w-5 h-5 text-fami-blue focus:ring-fami-blue border-gray-300"
                    />
                    <span className="text-gray-700">{option}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* 6 */}
            <RatingField 
              label="6. ¿Qué tan conveniente le pareció la ubicación de nuestras instalaciones?"
              name="calificacion_ubicacion"
              value={formData.calificacion_ubicacion}
            />

            {/* 7 */}
            <RatingField 
              label="7. ¿Cómo calificaría la limpieza de las instalaciones en la IPS?"
              name="calificacion_limpieza"
              value={formData.calificacion_limpieza}
            />

            {/* 8 */}
            <RatingField 
              label="8. ¿Qué tan cómodo/a se sintió en la sala de espera?"
              name="calificacion_sala_espera"
              value={formData.calificacion_sala_espera}
            />

            {/* 9 */}
            <div className="mb-8 p-6 bg-gray-50 rounded-xl border border-gray-100">
              <label className="block text-gray-800 font-bold mb-4 text-lg">9. ¿En qué red social es más probable que busque información de FAMI? <span className="text-red-500">*</span></label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {['Pagina Web', 'Facebook', 'Instagram', 'Twitter'].map((option) => (
                  <label key={option} className="flex items-center gap-3 cursor-pointer p-3 rounded-lg border border-transparent hover:bg-white hover:border-gray-200 transition-all">
                    <input
                      type="radio"
                      name="red_social"
                      value={option}
                      checked={formData.red_social === option}
                      onChange={handleChange}
                      className="w-5 h-5 text-fami-blue focus:ring-fami-blue border-gray-300"
                    />
                    <span className="text-gray-700">{option}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* 10 */}
            <RatingField 
              label="10. ¿Qué tan probable es que recomiende nuestra IPS a un amigo o familiar?"
              name="recomendacion"
              value={formData.recomendacion}
            />

            {/* 11 */}
            <div className="mb-8">
              <label htmlFor="sugerencias" className="block text-gray-800 font-bold mb-2 text-lg">11. ¿Qué sugerencias tiene para mejorar su experiencia en nuestra IPS?</label>
              <textarea
                id="sugerencias"
                name="sugerencias"
                value={formData.sugerencias}
                onChange={handleChange}
                rows="4"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-fami-blue focus:border-transparent outline-none transition-all resize-none shadow-sm"
                placeholder="Escribe tus sugerencias aquí..."
              ></textarea>
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-4 bg-red-50 text-red-600 text-sm rounded-lg mb-6 border border-red-100">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <div className="pt-4">
              <Button
                type="submit"
                variant="primary"
                className="w-full py-4 text-lg font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all"
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
