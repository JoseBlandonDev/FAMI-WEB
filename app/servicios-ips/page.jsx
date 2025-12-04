import React from 'react';
import Button from '@/components/ui/Button';
import { Stethoscope, Smile, Eye, FlaskConical, Activity, CheckCircle2 } from 'lucide-react';

export default function Page() {
  return (
    <div className="bg-white">
       {/* Hero Banner */}
       <div className="relative h-24 md:h-32 bg-fami-blue flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-20">
             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/medical-icons.png')]"></div>
        </div>
        <h1 className="relative z-10 text-4xl md:text-5xl font-bold text-white text-center">
          Servicios IPS
        </h1>
      </div>

      <div className="container mx-auto px-4 py-16">
        
        {/* Intro */}
        <div className="max-w-4xl mx-auto mb-16 text-center">
          <h2 className="text-3xl font-bold text-fami-blue mb-6">Atención Integral al Paciente</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            En Fami creemos que tu bienestar merece la mejor atención, con calidez humana y el respaldo de un equipo profesional comprometido contigo. 
            Nuestro propósito es acompañarte en cada etapa de tu vida, brindándote soluciones de salud confiables y accesibles.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <span className="bg-fami-light text-fami-blue px-4 py-2 rounded-full font-medium text-sm">Medicina General</span>
            <span className="bg-fami-light text-fami-blue px-4 py-2 rounded-full font-medium text-sm">Especializada</span>
            <span className="bg-fami-light text-fami-blue px-4 py-2 rounded-full font-medium text-sm">Psicología</span>
            <span className="bg-fami-light text-fami-blue px-4 py-2 rounded-full font-medium text-sm">Laboratorio</span>
          </div>
        </div>

        {/* Servicios Grid */}
        <div className="space-y-20">
          
          {/* 1. Odontología */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <div className="flex items-center gap-4 mb-4">
                <Smile className="w-10 h-10 text-fami-secondary" />
                <h3 className="text-2xl font-bold text-fami-blue">Odontología</h3>
              </div>
              <h4 className="text-lg font-semibold text-gray-800 mb-4">General • Especializada • Higiene Oral</h4>
              <p className="text-gray-600 mb-6 leading-relaxed">
                En Fami Odontología sabemos que tu sonrisa es parte esencial de tu bienestar. Ofrecemos un cuidado integral 
                que va desde la odontología general hasta la especializada, siempre con un enfoque humano.
              </p>
              <p className="font-medium text-fami-blue italic">"Recuerda: una sonrisa sana comienza con una cita cumplida."</p>
            </div>
            <div className="order-1 md:order-2 bg-gray-100 h-64 rounded-2xl">
              {/* Placeholder Image */}
            </div>
          </div>

          {/* 2. Apoyo Diagnóstico */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
             <div className="bg-gray-100 h-64 rounded-2xl">
              {/* Placeholder Image */}
            </div>
            <div>
              <div className="flex items-center gap-4 mb-4">
                <Eye className="w-10 h-10 text-fami-accent" />
                <h3 className="text-2xl font-bold text-fami-blue">Apoyo Diagnóstico</h3>
              </div>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Contamos con equipos confiables y profesionales especializados que te acompañan en cada examen, 
                asegurando resultados claros y oportunos.
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                {['Audiometría clínica', 'Impedanciometría', 'Optometría', 'Ecografías', 'Espirometría', 'Protectores auditivos'].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-gray-700">
                    <CheckCircle2 className="w-4 h-4 text-fami-secondary" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

           {/* 3. Laboratorio Clínico */}
           <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <div className="flex items-center gap-4 mb-4">
                <FlaskConical className="w-10 h-10 text-fami-blue" />
                <h3 className="text-2xl font-bold text-fami-blue">Laboratorio Clínico</h3>
              </div>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Pruebas oportunas y seguras que te ayudarán a prevenir, diagnosticar y dar seguimiento a tu bienestar.
                Resultados precisos con calidez y profesionalismo.
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                {['Cuadro hemático', 'Parcial de orina', 'Test de embarazo', 'Tipo de sangre', 'Exámenes especializados'].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-gray-700">
                    <CheckCircle2 className="w-4 h-4 text-fami-secondary" /> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="order-1 md:order-2 bg-gray-100 h-64 rounded-2xl">
              {/* Placeholder Image */}
            </div>
          </div>

           {/* 4. Apoyo Terapéutico */}
           <div className="bg-fami-light rounded-2xl p-8 md:p-12">
              <div className="text-center max-w-3xl mx-auto">
                <Activity className="w-12 h-12 text-fami-blue mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-fami-blue mb-6">Apoyo Terapéutico</h3>
                <p className="text-gray-600 mb-8">
                  Creemos que la recuperación y el bienestar integral van más allá del tratamiento médico. 
                  Ofrecemos un completo servicio de apoyo terapéutico diseñado para fortalecer tus capacidades físicas, emocionales y sociales.
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  {['Terapia ocupacional', 'Fonoaudiología', 'Fisioterapia', 'Nutrición', 'Psicología', 'Trabajo social', 'Rehabilitación'].map((item) => (
                    <span key={item} className="bg-white border border-fami-blue/20 text-fami-blue px-4 py-2 rounded-lg text-sm font-medium">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
           </div>

        </div>

        <div className="mt-20 text-center">
          <h3 className="text-xl font-bold text-fami-blue mb-6">¿Listo para cuidar tu salud?</h3>
          <Button variant="primary" className="px-8 py-3 text-lg shadow-lg">
            Agendar Cita Ahora
          </Button>
        </div>

      </div>
    </div>
  );
}
