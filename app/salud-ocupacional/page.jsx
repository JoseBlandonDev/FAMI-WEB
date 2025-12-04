import React from 'react';
import Button from '@/components/ui/Button';
import { ShieldCheck, HeartHandshake, FileText, HardHat } from 'lucide-react';

export default function Page() {
  return (
    <div className="bg-white">
       {/* Hero Banner */}
       <div className="relative h-24 md:h-32 bg-fami-secondary flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-20">
             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/medical-icons.png')]"></div>
        </div>
        <h1 className="relative z-10 text-4xl md:text-5xl font-bold text-white text-center">
          Salud Ocupacional
        </h1>
      </div>

      <div className="container mx-auto px-4 py-16">
        
        {/* Intro */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <p className="text-xl text-gray-700 leading-relaxed mb-8">
            En <span className="font-bold text-fami-blue">FAMI</span> entendemos que la salud ocupacional es clave para garantizar el bienestar de los colaboradores 
            y la productividad de las empresas. Ofrecemos un servicio integral que combina experiencia, calidad humana y tecnología confiable.
          </p>
        </div>

        {/* Servicios Ocupacionales */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
          <div>
            <div className="flex items-center gap-3 mb-6">
               <ShieldCheck className="w-8 h-8 text-fami-secondary" />
               <h2 className="text-2xl font-bold text-fami-blue">Nuestros Servicios</h2>
            </div>
            <ul className="space-y-6">
              <li className="flex gap-4">
                <div className="w-2 h-2 bg-fami-blue rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-700">
                  <span className="font-bold block text-fami-blue">Evaluaciones Ocupacionales</span>
                  Ingreso, periódicas y de egreso, con historia clínica, fisioterapia y psicología.
                </p>
              </li>
              <li className="flex gap-4">
                <div className="w-2 h-2 bg-fami-blue rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-700">
                  <span className="font-bold block text-fami-blue">Examen Médico Laboral</span>
                  Realizado por profesionales especializados en medicina del trabajo.
                </p>
              </li>
              <li className="flex gap-4">
                <div className="w-2 h-2 bg-fami-blue rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-700">
                  <span className="font-bold block text-fami-blue">Pruebas Diagnósticas</span>
                  Audiometría, espirometría, visiometría, optometría y valoración psicosensométrica.
                </p>
              </li>
              <li className="flex gap-4">
                <div className="w-2 h-2 bg-fami-blue rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-700">
                  <span className="font-bold block text-fami-blue">Asesoría en SST</span>
                  Fortalecimiento de la prevención y el cumplimiento normativo en tu empresa.
                </p>
              </li>
            </ul>
          </div>
          <div className="bg-gray-100 rounded-2xl h-full min-h-[300px]">
             {/* Placeholder Image */}
          </div>
        </div>

        {/* Plan de Bienestar */}
        <div className="bg-fami-blue rounded-3xl p-8 md:p-12 text-white relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
               <HeartHandshake className="w-10 h-10 text-fami-secondary" />
               <h2 className="text-3xl font-bold">Plan de Bienestar Empresarial</h2>
            </div>
            <p className="text-lg text-white/90 mb-8 max-w-3xl">
              Una empresa saludable comienza con colaboradores felices. Nuestro plan va más allá de la prevención: 
              diseñado para fortalecer el bienestar físico, emocional y social de tu equipo.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {[
                "Exámenes de salud ocupacional",
                "Inteligencia emocional",
                "Prevención de riesgos mecánicos",
                "Pausas activas",
                "Beneficios para la familia"
              ].map((item) => (
                <div key={item} className="bg-white/10 backdrop-blur-sm p-4 rounded-lg border border-white/20">
                  <p className="font-medium">{item}</p>
                </div>
              ))}
            </div>

            <div className="border-t border-white/20 pt-6 mt-6">
              <p className="italic text-white/80 mb-6">
                "Invierte en el recurso más valioso de tu empresa: tu gente. Con FAMI, el bienestar laboral se transforma en crecimiento organizacional."
              </p>
              <Button variant="primary" className="px-8 py-3">
                Solicitar Cotización Empresarial
              </Button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
