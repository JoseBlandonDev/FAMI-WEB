import React from 'react';
import Button from '@/components/ui/Button';
import { BookOpen, School, Users, Star } from 'lucide-react';
import Image from 'next/image';

export default function Page() {
  return (
    <div className="bg-white">
       {/* Hero Banner */}
       <div className="relative h-24 md:h-32 bg-fami-accent flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-20">
             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        </div>
        <h1 className="relative z-10 text-4xl md:text-5xl font-bold text-white text-center">
          Apoyos Pedagógicos
        </h1>
      </div>

      <div className="container mx-auto px-4 py-16">
        
        {/* Intro */}
        <div className="flex flex-col md:flex-row gap-12 items-center mb-20">
          <div className="w-full md:w-1/2">
            <h2 className="text-3xl font-bold text-fami-blue mb-6">
              Sembramos amor, cosechamos futuro
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              En <span className="font-bold text-fami-blue">FAMI</span> creemos que cuidar a los niños es una tarea de grandes. 
              El desarrollo integral de la infancia requiere amor, conciencia y acompañamiento.
            </p>
            <p className="text-gray-600 mb-6">
              Nuestro equipo pedagógico trabaja con compromiso y sensibilidad para fortalecer las habilidades, 
              la autonomía y la felicidad de los niños, mientras apoya a padres y cuidadores en su importante labor.
            </p>
            <div className="flex gap-4">
               <div className="flex items-center gap-2 text-fami-blue font-medium">
                 <Star className="w-5 h-5 text-fami-secondary" fill="currentColor" /> Estimulación
               </div>
               <div className="flex items-center gap-2 text-fami-blue font-medium">
                 <Star className="w-5 h-5 text-fami-secondary" fill="currentColor" /> Desarrollo
               </div>
               <div className="flex items-center gap-2 text-fami-blue font-medium">
                 <Star className="w-5 h-5 text-fami-secondary" fill="currentColor" /> Crianza
               </div>
            </div>
          </div>
          <div className="w-full md:w-1/2 bg-gray-100 h-80 rounded-3xl relative overflow-hidden">
             <Image 
               src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1740&auto=format&fit=crop"
               alt="Niños aprendiendo"
               fill
               className="object-cover"
             />
          </div>
        </div>

        {/* Servicios Clave */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:-translate-y-1 transition-transform">
            <Users className="w-12 h-12 text-fami-blue mb-4" />
            <h3 className="text-xl font-bold text-fami-blue mb-3">Orientación Pedagógica</h3>
            <p className="text-gray-600 text-sm">Asesoría personalizada adaptada a las necesidades únicas de cada niño.</p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:-translate-y-1 transition-transform">
            <BookOpen className="w-12 h-12 text-fami-secondary mb-4" />
            <h3 className="text-xl font-bold text-fami-blue mb-3">Estimulación y Desarrollo</h3>
            <p className="text-gray-600 text-sm">Actividades diseñadas según la etapa evolutiva para potenciar habilidades.</p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:-translate-y-1 transition-transform">
            <School className="w-12 h-12 text-fami-accent mb-4" />
            <h3 className="text-xl font-bold text-fami-blue mb-3">Escuela de Padres</h3>
            <p className="text-gray-600 text-sm">Espacios de formación que fortalecen el vínculo familiar y la crianza consciente.</p>
          </div>
        </div>

        {/* Paquete Escolar */}
        <div className="bg-fami-light rounded-3xl p-8 md:p-12 border-2 border-dashed border-fami-blue/20">
          <div className="text-center mb-10">
            <span className="bg-fami-secondary text-white px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wide mb-4 inline-block">
              Temporada Escolar
            </span>
            <h2 className="text-3xl font-bold text-fami-blue">Paquete Escolar Integral</h2>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              Diseñado para grupos de mínimo 20 alumnos. Garantiza un desarrollo seguro y saludable con atención confiable y ágil.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 max-w-5xl mx-auto mb-10">
            {['Certificado médico', 'Certificado odontológico', 'Coprológico', 'Audiometría', 'Visiometría'].map((item) => (
               <div key={item} className="bg-white p-4 rounded-xl text-center shadow-sm">
                  <div className="w-2 h-2 bg-fami-accent rounded-full mx-auto mb-2"></div>
                  <p className="font-medium text-fami-blue text-sm">{item}</p>
               </div>
            ))}
          </div>

          <div className="text-center">
            <p className="text-fami-blue font-medium mb-6">Tarifas flexibles y negociables para instituciones educativas.</p>
            <Button variant="primary" className="px-8 py-3">
              Cotizar Paquete Escolar
            </Button>
          </div>
        </div>

      </div>
    </div>
  );
}

