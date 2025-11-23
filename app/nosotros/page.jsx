import React from 'react';
import Image from 'next/image';
import { Heart, Users, Target } from 'lucide-react';

export default function Page() {
  return (
    <div className="bg-white">
      {/* Hero Banner */}
      <div className="relative h-64 md:h-80 bg-fami-blue flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-20">
             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/medical-icons.png')]"></div>
        </div>
        <h1 className="relative z-10 text-4xl md:text-5xl font-bold text-white text-center">
          Nosotros
        </h1>
      </div>

      <div className="container mx-auto px-4 py-16">
        
        {/* Intro Section */}
        <div className="max-w-4xl mx-auto text-center mb-20">
          <p className="text-xl text-gray-700 leading-relaxed mb-8">
            En <span className="font-bold text-fami-blue">FAMI</span> creemos que la salud es más que un servicio: es dignidad, esperanza y transformación. 
            Somos una fundación de salud sin ánimo de lucro, conformada por un equipo humano apasionado y comprometido con el 
            bienestar de las comunidades del suroccidente colombiano, especialmente en el Departamento del Cauca.
          </p>
        </div>

        {/* Mision / Vision Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
          <div className="bg-fami-gray p-10 rounded-2xl relative overflow-hidden">
            <Target className="w-16 h-16 text-fami-orange mb-6" />
            <h2 className="text-2xl font-bold text-fami-blue mb-4">Nuestra Misión</h2>
            <p className="text-gray-700 leading-relaxed">
              Nuestra misión es clara: cuidar la vida en todas sus etapas, desde los más pequeños hasta los adultos mayores, 
              con especial atención a quienes se encuentran en situación de vulnerabilidad, discapacidad o riesgo laboral.
            </p>
          </div>

          <div className="bg-fami-gray p-10 rounded-2xl relative overflow-hidden">
            <Heart className="w-16 h-16 text-fami-cyan mb-6" />
            <h2 className="text-2xl font-bold text-fami-blue mb-4">Nuestra Visión</h2>
            <p className="text-gray-700 leading-relaxed">
              Nuestra visión nos impulsa a construir un futuro donde la salud sea un derecho vivido con calidad, cercanía y respeto. 
              Trabajamos cada día para acercar servicios clínicos y programas de promoción y prevención.
            </p>
          </div>
        </div>

        {/* Valor Agregado */}
        <div className="mb-20 flex flex-col md:flex-row items-center gap-12">
          <div className="w-full md:w-1/2 relative h-80 rounded-2xl overflow-hidden shadow-lg">
            <Image 
              src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=1740&auto=format&fit=crop"
              alt="Equipo FAMI"
              fill
              className="object-cover"
            />
          </div>
          <div className="w-full md:w-1/2">
            <h3 className="text-2xl font-bold text-fami-blue mb-4">Nuestro Compromiso</h3>
            <p className="text-gray-700 mb-4 leading-relaxed">
              En FAMI trabajamos cada día para acercar servicios clínicos y programas de promoción y prevención en áreas como 
              medicina, odontología, psicología, nutrición, fisioterapia y fonoaudiología, entre otras.
            </p>
            <p className="text-gray-700 leading-relaxed font-medium">
              Cada consulta, cada orientación y cada sonrisa que recibimos es una oportunidad para sembrar bienestar y fortalecer comunidades. 
              Porque en FAMI, cuidar la salud significa unir, acompañar y transformar vidas.
            </p>
          </div>
        </div>

        {/* Reconocimientos / Proyectos */}
        <div className="bg-white border-t border-gray-100 pt-16">
          <h2 className="text-3xl font-bold text-fami-blue text-center mb-12">Proyectos Sociales y Reconocimientos</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Item 1 */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
               <h3 className="text-lg font-bold text-fami-blue mb-3">ICBF & SRPA</h3>
               <p className="text-sm text-gray-600 mb-4">
                 Aliados estratégicos del ICBF en la implementación del Sistema de Responsabilidad Penal para Adolescentes (SRPA).
                 Lideramos la modalidad de Prestación de Servicio a la Comunidad en múltiples municipios del Cauca.
               </p>
            </div>

            {/* Item 2 */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
               <h3 className="text-lg font-bold text-fami-blue mb-3">Convenio UNODC</h3>
               <p className="text-sm text-gray-600 mb-4">
                 Alianza con la Oficina de Naciones Unidas contra la droga y el delito para fortalecer comunidades juveniles 
                 y prevenir el consumo de SPA en Santander de Quilichao.
               </p>
            </div>

             {/* Item 3 */}
             <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
               <h3 className="text-lg font-bold text-fami-blue mb-3">Enfoque Étnico</h3>
               <p className="text-sm text-gray-600 mb-4">
                 Trabajo intersectorial con la comunidad Afro del Cauca y Médicos Ancestrales, dinamizando la política pública con enfoque étnico.
               </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
