import React from 'react';
import HeroCarousel from '@/components/sections/HeroCarousel';
import Button from '@/components/ui/Button';
import { Stethoscope, UserCheck, HeartPulse, BookOpen, Activity, Microscope } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      
      {/* Hero Carousel */}
      <HeroCarousel />

      {/* Intro / Nosotros Short */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-fami-blue mb-6">
            Bienvenidos a FAMI
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed mb-8">
            En FAMI creemos que la salud es más que un servicio: es dignidad, esperanza y transformación. 
            Somos una fundación de salud sin ánimo de lucro, comprometida con el bienestar de las comunidades 
            del suroccidente colombiano.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="flex flex-col items-center p-6 bg-fami-gray rounded-xl">
              <HeartPulse className="w-12 h-12 text-fami-orange mb-4" />
              <h3 className="font-bold text-fami-blue text-lg mb-2">Misión</h3>
              <p className="text-sm text-gray-600">Cuidar la vida en todas sus etapas con calidad humana.</p>
            </div>
            <div className="flex flex-col items-center p-6 bg-fami-gray rounded-xl">
              <UserCheck className="w-12 h-12 text-fami-cyan mb-4" />
              <h3 className="font-bold text-fami-blue text-lg mb-2">Visión</h3>
              <p className="text-sm text-gray-600">Salud como un derecho vivido con cercanía y respeto.</p>
            </div>
            <div className="flex flex-col items-center p-6 bg-fami-gray rounded-xl">
              <Activity className="w-12 h-12 text-fami-blue mb-4" />
              <h3 className="font-bold text-fami-blue text-lg mb-2">Servicios</h3>
              <p className="text-sm text-gray-600">Clínica, Promoción y Prevención integral.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Servicios Principales (IPS, Ocupacional, Pedagógico) */}
      <section className="py-16 bg-fami-gray">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-fami-blue mb-4">Nuestros Pilares</h2>
            <div className="h-1 w-20 bg-fami-orange mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Card 1: Servicios IPS */}
            <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow overflow-hidden group">
              <div className="h-48 bg-fami-blue/10 relative overflow-hidden">
                 {/* Placeholder Image for Card */}
                 <div className="absolute inset-0 bg-fami-blue/20 group-hover:bg-fami-blue/30 transition-colors"></div>
                 <Stethoscope className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 text-fami-blue opacity-50" />
              </div>
              <div className="p-8">
                <h3 className="text-xl font-bold text-fami-blue mb-3">Servicios IPS</h3>
                <p className="text-gray-600 mb-6 text-sm">
                  Medicina general y especializada, consulta psicológica, apoyo emocional y valoración integral.
                </p>
                <Button variant="outline" className="w-full text-sm">Ver Servicios Médicos</Button>
              </div>
            </div>

            {/* Card 2: Salud Ocupacional */}
            <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow overflow-hidden group">
              <div className="h-48 bg-fami-orange/10 relative overflow-hidden">
                 <div className="absolute inset-0 bg-fami-orange/20 group-hover:bg-fami-orange/30 transition-colors"></div>
                 <UserCheck className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 text-fami-orange opacity-50" />
              </div>
              <div className="p-8">
                <h3 className="text-xl font-bold text-fami-blue mb-3">Salud Ocupacional</h3>
                <p className="text-gray-600 mb-6 text-sm">
                  Evaluaciones de ingreso/egreso, seguridad y salud en el trabajo, y bienestar empresarial.
                </p>
                <Button variant="outline" className="w-full text-sm !border-fami-orange !text-fami-orange hover:!bg-fami-orange hover:!text-white">
                  Servicios Empresariales
                </Button>
              </div>
            </div>

             {/* Card 3: Apoyos Pedagógicos */}
             <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow overflow-hidden group">
              <div className="h-48 bg-fami-cyan/10 relative overflow-hidden">
                 <div className="absolute inset-0 bg-fami-cyan/20 group-hover:bg-fami-cyan/30 transition-colors"></div>
                 <BookOpen className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 text-fami-cyan opacity-50" />
              </div>
              <div className="p-8">
                <h3 className="text-xl font-bold text-fami-blue mb-3">Apoyos Pedagógicos</h3>
                <p className="text-gray-600 mb-6 text-sm">
                  Estimulación, orientación pedagógica y acompañamiento para el desarrollo infantil integral.
                </p>
                <Button variant="outline" className="w-full text-sm !border-fami-cyan !text-fami-cyan hover:!bg-fami-cyan hover:!text-white">
                  Conocer Programa
                </Button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Franja Promocional / Cita */}
      <section className="py-16 bg-fami-blue text-white relative overflow-hidden">
         <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/medical-icons.png')]"></div>
         <div className="container mx-auto px-4 text-center relative z-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">
              "Tu bienestar en las mejores manos: prevención, diagnóstico y tratamiento con calidad humana."
            </h2>
            <Button variant="primary" className="text-lg px-8 py-3 shadow-xl">
              Solicitar Cita Ahora
            </Button>
         </div>
      </section>
      
    </div>
  );
}
